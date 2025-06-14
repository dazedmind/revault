/*
Enhanced TF-IDF with BM25 Integration
Based on original Natural.js TfIdf implementation
Enhanced for database integration and BM25 support
*/

const _ = require('underscore')
const Tokenizer = require('../tokenizers/regexp_tokenizer').WordTokenizer
let tokenizer = new Tokenizer()
let stopwords = require('../util/stopwords').words
const fs = require('fs')

// Enhanced document builder with term positions and metadata
function buildDocument(text, key, metadata = {}) {
  let stopOut

  if (typeof text === 'string') {
    text = tokenizer.tokenize(text.toLowerCase())
    stopOut = true
  } else if (!_.isArray(text)) {
    stopOut = false
    return text
  }

  const document = text.reduce(function (doc, term, index) {
    // Skip function properties issue
    if (typeof doc[term] === 'function') {
      doc[term] = { count: 0, positions: [] }
    }
    
    if (!stopOut || stopwords.indexOf(term) < 0) {
      if (!doc[term]) {
        doc[term] = { count: 0, positions: [] }
      }
      doc[term].count += 1
      doc[term].positions.push(index) // Store term positions for BM25
    }
    return doc
  }, { 
    __key: key,
    __length: text.length,
    __metadata: metadata,
    __uniqueTerms: 0
  })

  // Calculate unique terms count
  document.__uniqueTerms = Object.keys(document).filter(key => 
    !key.startsWith('__') && typeof document[key] === 'object'
  ).length

  return document
}

function documentHasTerm(term, document) {
  return document[term] && document[term].count > 0
}

function getTermFrequency(term, document) {
  return document[term] ? document[term].count : 0
}

// backwards compatibility for < node 0.10
function isEncoding(encoding) {
  if (typeof Buffer.isEncoding !== 'undefined') { return Buffer.isEncoding(encoding) }
  switch ((encoding + '').toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
    case 'raw':
      return true
  }
  return false
}

class TfIdf {
  constructor(deserialized, options = {}) {
    if (deserialized) {
      this.documents = deserialized.documents
      this.globalStats = deserialized.globalStats || {}
    } else {
      this.documents = []
      this.globalStats = {}
    }
    
    this._idfCache = {}
    this._bm25Cache = {}
    
    // BM25 parameters
    this.k1 = options.k1 || 1.2  // Term frequency saturation parameter
    this.b = options.b || 0.75   // Length normalization parameter
    
    // Database integration options
    this.prisma = options.prisma || null
    this.autoSave = options.autoSave || false
    this.batchSize = options.batchSize || 100
  }

  static tf(term, document) {
    return getTermFrequency(term, document)
  }

  // Enhanced IDF calculation with smoothing
  idf(term, force) {
    if (this._idfCache[term] && force !== true) {
      return this._idfCache[term]
    }

    const docsWithTerm = this.documents.reduce(function (count, document) {
      return count + (documentHasTerm(term, document) ? 1 : 0)
    }, 0)

    // Enhanced IDF with smoothing to prevent division by zero
    const totalDocs = this.documents.length
    const idf = Math.log((totalDocs + 1) / (docsWithTerm + 1)) + 1

    this._idfCache[term] = idf
    return idf
  }

  // Calculate BM25 score for a term in a document
  bm25(term, documentIndex, queryTerms = []) {
    if (documentIndex >= this.documents.length) {
      return 0
    }

    const document = this.documents[documentIndex]
    const tf = getTermFrequency(term, document)
    
    if (tf === 0) {
      return 0
    }

    const idf = this.idf(term)
    const docLength = document.__length || 0
    const avgDocLength = this.getAverageDocumentLength()
    
    // BM25 formula
    const numerator = tf * (this.k1 + 1)
    const denominator = tf + this.k1 * (1 - this.b + this.b * (docLength / avgDocLength))
    
    return idf * (numerator / denominator)
  }

  // Calculate average document length for BM25
  getAverageDocumentLength() {
    if (this.documents.length === 0) return 0
    
    const totalLength = this.documents.reduce((sum, doc) => {
      return sum + (doc.__length || 0)
    }, 0)
    
    return totalLength / this.documents.length
  }

  // Enhanced document addition with database integration
  async addDocument(document, key, restoreCache, metadata = {}) {
    const processedDoc = buildDocument(document, key, metadata)
    this.documents.push(processedDoc)

    // Update global statistics
    this.updateGlobalStats()

    // Cache invalidation
    if (restoreCache === true) {
      for (const term in this._idfCache) {
        this.idf(term, true)
      }
      this._bm25Cache = {} // Clear BM25 cache
    } else {
      this._idfCache = Object.create(null)
      this._bm25Cache = Object.create(null)
    }

    // Auto-save to database if enabled
    if (this.autoSave && this.prisma) {
      await this.saveTermScoresToDatabase(this.documents.length - 1)
    }

    return processedDoc
  }

  // Update global statistics for BM25
  updateGlobalStats() {
    const totalDocs = this.documents.length
    const totalLength = this.documents.reduce((sum, doc) => sum + (doc.__length || 0), 0)
    const avgLength = totalDocs > 0 ? totalLength / totalDocs : 0

    this.globalStats = {
      totalDocs,
      totalLength,
      avgDocLength: avgLength,
      updatedAt: new Date()
    }
  }

  // Enhanced term listing with BM25 scores
  listTermsWithScores(documentIndex, queryTerms = []) {
    if (documentIndex >= this.documents.length) {
      return []
    }

    const document = this.documents[documentIndex]
    const terms = []

    for (const term in document) {
      if (document[term] && term !== '__key' && term !== '__length' && 
          term !== '__metadata' && term !== '__uniqueTerms' && 
          typeof document[term] === 'object') {
        
        const tf = getTermFrequency(term, document)
        const idf = this.idf(term)
        const tfidf = tf * idf
        const bm25 = this.bm25(term, documentIndex, queryTerms)

        terms.push({
          term,
          tf,
          idf: parseFloat(idf.toFixed(6)),
          tfidf: parseFloat(tfidf.toFixed(6)),
          bm25: parseFloat(bm25.toFixed(6)),
          positions: document[term].positions || [],
          documentIndex
        })
      }
    }

    return terms.sort((x, y) => y.bm25 - x.bm25)
  }

  // Save term scores to database
  async saveTermScoresToDatabase(documentIndex, paperId = null) {
    if (!this.prisma) {
      throw new Error('Prisma client not provided')
    }

    const document = this.documents[documentIndex]
    const paperIdToUse = paperId || this.extractPaperIdFromKey(document.__key)
    
    if (!paperIdToUse) {
      throw new Error('Paper ID not found')
    }

    try {
      // Get all terms with scores
      const termsWithScores = this.listTermsWithScores(documentIndex)
      
      // Prepare token frequencies for BM25 index
      const tokenFrequencies = {}
      termsWithScores.forEach(termData => {
        tokenFrequencies[termData.term] = {
          tf: termData.tf,
          positions: termData.positions
        }
      })

      // Start transaction
      await this.prisma.$transaction(async (tx) => {
        // 1. Clear existing term scores for this paper
        await tx.term_score.deleteMany({
          where: { paper_id: paperIdToUse }
        })

        // 2. Clear existing BM25 index
        await tx.paper_bm25_index.deleteMany({
          where: { paper_id: paperIdToUse }
        })

        // 3. Insert new term scores (batch insert)
        const termScoreData = termsWithScores.map(termData => ({
          paper_id: paperIdToUse,
          term: termData.term,
          tf: termData.tf,
          tfidf: termData.tfidf,
          bm25: termData.bm25
        }))

        // Insert in batches to avoid hitting database limits
        for (let i = 0; i < termScoreData.length; i += this.batchSize) {
          const batch = termScoreData.slice(i, i + this.batchSize)
          await tx.term_score.createMany({
            data: batch
          })
        }

        // 4. Insert BM25 index data
        await tx.paper_bm25_index.create({
          data: {
            paper_id: paperIdToUse,
            token_frequencies: tokenFrequencies,
            document_length: document.__length || 0
          }
        })

        // 5. Update global stats
        await tx.global_stats.upsert({
          where: { id: 1 },
          update: {
            total_docs: this.globalStats.totalDocs,
            avg_doc_length: this.globalStats.avgDocLength,
            updated_at: new Date()
          },
          create: {
            id: 1,
            total_docs: this.globalStats.totalDocs,
            avg_doc_length: this.globalStats.avgDocLength,
            updated_at: new Date()
          }
        })
      })

      console.log(`✅ Saved ${termsWithScores.length} term scores for paper ${paperIdToUse}`)
      return {
        success: true,
        termCount: termsWithScores.length,
        paperId: paperIdToUse
      }

    } catch (error) {
      console.error('❌ Failed to save term scores:', error)
      throw error
    }
  }

  // Extract paper ID from document key
  extractPaperIdFromKey(key) {
    if (typeof key === 'number') return key
    if (typeof key === 'string') {
      const match = key.match(/paper_(\d+)/) || key.match(/(\d+)/)
      return match ? parseInt(match[1]) : null
    }
    return null
  }

  // Batch process all documents in corpus
  async saveAllTermScoresToDatabase() {
    if (!this.prisma) {
      throw new Error('Prisma client not provided')
    }

    const results = []
    console.log(`🔄 Processing ${this.documents.length} documents...`)

    for (let i = 0; i < this.documents.length; i++) {
      try {
        const result = await this.saveTermScoresToDatabase(i)
        results.push(result)
        
        if ((i + 1) % 10 === 0) {
          console.log(`✅ Processed ${i + 1}/${this.documents.length} documents`)
        }
      } catch (error) {
        console.error(`❌ Failed to process document ${i}:`, error)
        results.push({
          success: false,
          error: error.message,
          documentIndex: i
        })
      }
    }

    return {
      totalProcessed: this.documents.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results
    }
  }

  // Load existing data from database
  async loadFromDatabase() {
    if (!this.prisma) {
      throw new Error('Prisma client not provided')
    }

    try {
      // Load papers with their content
      const papers = await this.prisma.papers.findMany({
        select: {
          paper_id: true,
          title: true,
          abstract: true,
          keywords: true,
          term_score: true,
          paper_bm25_index: true
        }
      })

      // Rebuild corpus from database
      this.documents = []
      this._idfCache = {}
      this._bm25Cache = {}

      for (const paper of papers) {
        const fullText = `${paper.title || ''} ${paper.abstract || ''} ${(paper.keywords || []).join(' ')}`
        await this.addDocument(fullText, paper.paper_id, false, {
          title: paper.title,
          abstract: paper.abstract,
          keywords: paper.keywords
        })
      }

      console.log(`📚 Loaded ${papers.length} papers from database`)
      return papers.length

    } catch (error) {
      console.error('❌ Failed to load from database:', error)
      throw error
    }
  }

  // Search documents using BM25
  searchBM25(query, limit = 10) {
    const queryTerms = typeof query === 'string' 
      ? tokenizer.tokenize(query.toLowerCase())
      : query

    const scores = this.documents.map((doc, index) => {
      const score = queryTerms.reduce((sum, term) => {
        return sum + this.bm25(term, index, queryTerms)
      }, 0)

      return {
        documentIndex: index,
        paperId: this.extractPaperIdFromKey(doc.__key),
        score: parseFloat(score.toFixed(6)),
        document: doc
      }
    })

    return scores
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  }

  // Legacy compatibility methods
  tfidf(terms, d) {
    const _this = this

    if (!_.isArray(terms)) {
      terms = tokenizer.tokenize(terms.toString().toLowerCase())
    }

    return terms.reduce(function (value, term) {
      let idf = _this.idf(term)
      idf = idf === Infinity ? 0 : idf
      return value + (TfIdf.tf(term, _this.documents[d]) * idf)
    }, 0.0)
  }

  listTerms(d) {
    return this.listTermsWithScores(d).map(term => ({
      term: term.term,
      tf: term.tf,
      idf: term.idf,
      tfidf: term.tfidf
    }))
  }

  tfidfs(terms, callback) {
    const tfidfs = new Array(this.documents.length)

    for (let i = 0; i < this.documents.length; i++) {
      tfidfs[i] = this.tfidf(terms, i)
      if (callback) { 
        callback(i, tfidfs[i], this.documents[i].__key) 
      }
    }

    return tfidfs
  }

  removeDocument(key) {
    const index = this.documents.findIndex(function (document) {
      return document.__key === key
    })
    
    if (index > -1) {
      this.documents.splice(index, 1)
      this._idfCache = Object.create(null)
      this._bm25Cache = Object.create(null)
      this.updateGlobalStats()
      return true
    }

    return false
  }

  addFileSync(path, encoding, key, restoreCache) {
    if (!encoding) { encoding = 'utf8' }
    if (!isEncoding(encoding)) { throw new Error('Invalid encoding: ' + encoding) }

    const document = fs.readFileSync(path, encoding)
    return this.addDocument(document, key, restoreCache)
  }

  setTokenizer(t) {
    if (!_.isFunction(t.tokenize)) { throw new Error('Expected a valid Tokenizer') }
    tokenizer = t
  }

  setStopwords(customStopwords) {
    if (!Array.isArray(customStopwords)) { return false }

    let wrongElement = false
    customStopwords.forEach(stopword => {
      if ((typeof stopword) !== 'string') {
        wrongElement = true
      }
    })
    if (wrongElement) {
      return false
    }

    stopwords = customStopwords
    return true
  }

  // Serialize for storage
  serialize() {
    return {
      documents: this.documents,
      globalStats: this.globalStats,
      idfCache: this._idfCache,
      options: {
        k1: this.k1,
        b: this.b
      }
    }
  }

  // Get statistics
  getStats() {
    return {
      documentCount: this.documents.length,
      averageDocumentLength: this.getAverageDocumentLength(),
      totalTerms: Object.keys(this._idfCache).length,
      globalStats: this.globalStats
    }
  }
}

module.exports = TfIdf