// TF-IDF BM25 Integration Guide and Usage Examples
// File: src/lib/search-integration.js

const { prisma } = require('@/lib/prisma');
const TfIdf = require('../tfidf/tfidf');

class SearchEngine {
  constructor() {
    this.tfidf = new EnhancedTfIdf(null, {
      prisma: prisma,
      autoSave: true,
      k1: 1.2,  // BM25 parameter
      b: 0.75,  // BM25 parameter
      batchSize: 100
    });
    this.initialized = false;
  }

  // Initialize the search engine with existing papers
  async initialize() {
    try {
      console.log('🚀 Initializing search engine...');
      
      // Load existing papers from database
      const paperCount = await this.tfidf.loadFromDatabase();
      
      this.initialized = true;
      console.log(`✅ Search engine initialized with ${paperCount} papers`);
      
      return paperCount;
    } catch (error) {
      console.error('❌ Failed to initialize search engine:', error);
      throw error;
    }
  }

  // Add a new paper to the index
  async addPaper(paperId, title, abstract, keywords = []) {
    try {
      const fullText = `${title} ${abstract} ${keywords.join(' ')}`;
      
      const document = await this.tfidf.addDocument(fullText, paperId, false, {
        title,
        abstract,
        keywords
      });

      // Save term scores to database
      const documentIndex = this.tfidf.documents.length - 1;
      await this.tfidf.saveTermScoresToDatabase(documentIndex, paperId);

      console.log(`✅ Added paper ${paperId} to search index`);
      return document;
      
    } catch (error) {
      console.error(`❌ Failed to add paper ${paperId}:`, error);
      throw error;
    }
  }

  // Search papers using BM25
  async search(query, options = {}) {
    const {
      limit = 10,
      minScore = 0.1,
      includeMetadata = true
    } = options;

    try {
      if (!this.initialized) {
        await this.initialize();
      }

      // Perform BM25 search
      const results = this.tfidf.searchBM25(query, limit * 2); // Get more results to filter

      // Filter by minimum score and limit
      const filteredResults = results
        .filter(result => result.score >= minScore)
        .slice(0, limit);

      if (!includeMetadata) {
        return filteredResults;
      }

      // Enrich results with paper metadata from database
      const paperIds = filteredResults.map(r => r.paperId).filter(Boolean);
      
      const papers = await prisma.papers.findMany({
        where: {
          paper_id: { in: paperIds }
        },
        select: {
          paper_id: true,
          title: true,
          author: true,
          abstract: true,
          keywords: true,
          department: true,
          year: true,
          course: true
        }
      });

      // Merge search results with paper metadata
      const enrichedResults = filteredResults.map(result => {
        const paper = papers.find(p => p.paper_id === result.paperId);
        return {
          ...result,
          paper: paper || null,
          relevanceScore: result.score
        };
      });

      return enrichedResults;

    } catch (error) {
      console.error('❌ Search failed:', error);
      throw error;
    }
  }

  // Reindex all papers (useful for maintenance)
  async reindexAll() {
    try {
      console.log('🔄 Starting full reindex...');
      
      // Clear current index
      this.tfidf = new EnhancedTfIdf(null, {
        prisma: prisma,
        autoSave: false, // We'll save manually
        k1: 1.2,
        b: 0.75,
        batchSize: 100
      });

      // Get all papers
      const papers = await prisma.papers.findMany({
        select: {
          paper_id: true,
          title: true,
          abstract: true,
          keywords: true
        }
      });

      console.log(`📚 Reindexing ${papers.length} papers...`);

      // Add each paper to the index
      for (const paper of papers) {
        const fullText = `${paper.title || ''} ${paper.abstract || ''} ${(paper.keywords || []).join(' ')}`;
        
        await this.tfidf.addDocument(fullText, paper.paper_id, false, {
          title: paper.title,
          abstract: paper.abstract,
          keywords: paper.keywords
        });
      }

      // Save all term scores to database
      const results = await this.tfidf.saveAllTermScoresToDatabase();
      
      this.initialized = true;
      console.log(`✅ Reindex completed: ${results.successful} successful, ${results.failed} failed`);
      
      return results;

    } catch (error) {
      console.error('❌ Reindex failed:', error);
      throw error;
    }
  }

  // Get search statistics
  getStats() {
    return this.tfidf.getStats();
  }

  // Get term analysis for a specific paper
  async getTermAnalysis(paperId) {
    try {
      // Find document index for this paper
      const documentIndex = this.tfidf.documents.findIndex(doc => 
        this.tfidf.extractPaperIdFromKey(doc.__key) === paperId
      );

      if (documentIndex === -1) {
        throw new Error(`Paper ${paperId} not found in index`);
      }

      // Get term scores
      const terms = this.tfidf.listTermsWithScores(documentIndex);
      
      // Get stored data from database for comparison
      const storedTerms = await prisma.term_score.findMany({
        where: { paper_id: paperId },
        orderBy: { bm25: 'desc' }
      });

      return {
        paperId,
        documentIndex,
        computedTerms: terms.slice(0, 20), // Top 20 terms
        storedTerms: storedTerms.slice(0, 20),
        termCount: terms.length,
        averageScore: terms.reduce((sum, t) => sum + t.bm25, 0) / terms.length
      };

    } catch (error) {
      console.error(`❌ Failed to get term analysis for paper ${paperId}:`, error);
      throw error;
    }
  }
}

// Usage Examples and API Integration

// 1. Initialize search engine in your API
async function initializeSearchAPI() {
  const searchEngine = new SearchEngine();
  await searchEngine.initialize();
  return searchEngine;
}

// 2. Add to your upload API
async function enhanceUploadAPI(paperId, title, abstract, keywords) {
  try {
    const searchEngine = new SearchEngine();
    await searchEngine.addPaper(paperId, title, abstract, keywords);
    
    // Get term analysis for the newly added paper
    const analysis = await searchEngine.getTermAnalysis(paperId);
    
    return {
      success: true,
      paperId,
      termCount: analysis.termCount,
      topTerms: analysis.computedTerms.slice(0, 5).map(t => ({
        term: t.term,
        bm25Score: t.bm25,
        tfIdfScore: t.tfidf
      }))
    };
    
  } catch (error) {
    console.error('Failed to enhance upload with search indexing:', error);
    throw error;
  }
}

// 3. Search API endpoint
async function searchAPI(query, options = {}) {
  try {
    const searchEngine = new SearchEngine();
    const results = await searchEngine.search(query, options);
    
    return {
      success: true,
      query,
      resultCount: results.length,
      results: results.map(result => ({
        paperId: result.paperId,
        title: result.paper?.title,
        author: result.paper?.author,
        relevanceScore: result.relevanceScore,
        abstract: result.paper?.abstract?.substring(0, 200) + '...',
        keywords: result.paper?.keywords || []
      }))
    };
    
  } catch (error) {
    console.error('Search API failed:', error);
    throw error;
  }
}

// 4. Maintenance API for reindexing
async function reindexAPI() {
  try {
    const searchEngine = new SearchEngine();
    const results = await searchEngine.reindexAll();
    
    return {
      success: true,
      message: `Reindex completed: ${results.successful} papers processed successfully`,
      stats: {
        totalProcessed: results.totalProcessed,
        successful: results.successful,
        failed: results.failed
      }
    };
    
  } catch (error) {
    console.error('Reindex API failed:', error);
    throw error;
  }
}

// 5. Database migration helper
async function migrateLegacyData() {
  try {
    console.log('🔄 Starting legacy data migration...');
    
    // Find papers without term scores
    const papersWithoutScores = await prisma.papers.findMany({
      where: {
        term_score: {
          none: {}
        }
      },
      select: {
        paper_id: true,
        title: true,
        abstract: true,
        keywords: true
      }
    });

    console.log(`📊 Found ${papersWithoutScores.length} papers without term scores`);

    const searchEngine = new SearchEngine();
    let processed = 0;
    
    for (const paper of papersWithoutScores) {
      try {
        await searchEngine.addPaper(
          paper.paper_id,
          paper.title || '',
          paper.abstract || '',
          paper.keywords || []
        );
        processed++;
        
        if (processed % 10 === 0) {
          console.log(`✅ Migrated ${processed}/${papersWithoutScores.length} papers`);
        }
        
      } catch (error) {
        console.error(`❌ Failed to migrate paper ${paper.paper_id}:`, error);
      }
    }

    console.log(`🎉 Migration completed: ${processed} papers migrated`);
    return { processed, total: papersWithoutScores.length };
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

module.exports = {
  SearchEngine,
  initializeSearchAPI,
  enhanceUploadAPI,
  searchAPI,
  reindexAPI,
  migrateLegacyData
};