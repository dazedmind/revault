// Enhanced TF-IDF Auto-Tagging System
// File: src/lib/enhanced-tagger.js

const TfIdf = require('./tfidf');
const _ = require('underscore');

class EnhancedAutoTagger {
  constructor() {
    this.globalTfIdf = new TfIdf();
    this.domainSpecificStopwords = new Set([
      // Academic stopwords
      'information', 'technology', 'research', 'using', 'system', 'based',
      'data', 'study', 'analysis', 'method', 'approach', 'paper', 'article',
      'chapter', 'section', 'figure', 'table', 'page', 'university', 'college',
      
      // Institution specific
      'pamantasan', 'lungsod', 'maynila', 'plm', 'thesis', 'dissertation',
      
      // Common tech terms that are too generic
      'computer', 'software', 'application', 'program', 'development',
      
      // Years and numbers
      '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028',
      
      // Generic words
      'will', 'user', 'users', 'book', 'books', 'document', 'documents',
      'file', 'files', 'project', 'projects', 'work', 'works'
    ]);

    this.academicDomains = {
      'computer_science': ['algorithm', 'programming', 'database', 'network', 'security', 'ai', 'machine learning'],
      'information_technology': ['systems', 'infrastructure', 'web', 'mobile', 'cloud', 'devops'],
      'engineering': ['design', 'optimization', 'simulation', 'modeling', 'architecture'],
      'business': ['management', 'strategy', 'marketing', 'finance', 'analytics'],
      'education': ['learning', 'teaching', 'curriculum', 'assessment', 'pedagogy']
    };
  }

  // Initialize with existing papers to build domain knowledge
  async initializeWithExistingPapers(papers) {
    console.log(`🔄 Initializing tagger with ${papers.length} existing papers...`);
    
    papers.forEach((paper, index) => {
      if (paper.abstract && paper.title) {
        const fullText = `${paper.title} ${paper.abstract}`;
        this.globalTfIdf.addDocument(fullText, `paper_${paper.paper_id || index}`);
      }
    });
    
    console.log(`✅ Tagger initialized with corpus of ${this.globalTfIdf.documents.length} documents`);
  }

  // Enhanced keyword extraction with multiple strategies
  extractKeywords(text, options = {}) {
    const {
      maxKeywords = 8,
      minTermLength = 3,
      includeNGrams = true,
      useDomainContext = true,
      boostTitleTerms = true
    } = options;

    // Strategy 1: TF-IDF based extraction
    const tfidfKeywords = this.extractTfIdfKeywords(text, maxKeywords);
    
    // Strategy 2: N-gram extraction for multi-word terms
    const ngramKeywords = includeNGrams ? this.extractNGrams(text, 3) : [];
    
    // Strategy 3: Domain-specific term detection
    const domainKeywords = useDomainContext ? this.extractDomainTerms(text) : [];
    
    // Strategy 4: Named entity-like extraction (simplified)
    const entityKeywords = this.extractEntities(text);

    // Combine and score all keywords
    const allKeywords = new Map();

    // Add TF-IDF keywords with high weight
    tfidfKeywords.forEach(kw => {
      allKeywords.set(kw.toLowerCase(), (allKeywords.get(kw.toLowerCase()) || 0) + kw.score * 1.0);
    });

    // Add n-gram keywords with medium weight
    ngramKeywords.forEach(kw => {
      allKeywords.set(kw.toLowerCase(), (allKeywords.get(kw.toLowerCase()) || 0) + 0.7);
    });

    // Add domain keywords with high weight
    domainKeywords.forEach(kw => {
      allKeywords.set(kw.toLowerCase(), (allKeywords.get(kw.toLowerCase()) || 0) + 0.9);
    });

    // Add entity keywords with medium weight
    entityKeywords.forEach(kw => {
      allKeywords.set(kw.toLowerCase(), (allKeywords.get(kw.toLowerCase()) || 0) + 0.6);
    });

    // Sort by score and return top keywords
    const sortedKeywords = Array.from(allKeywords.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxKeywords)
      .map(([term, score]) => ({
        term: this.capitalizeKeyword(term),
        score: parseFloat(score.toFixed(3))
      }));

    return sortedKeywords;
  }

  // TF-IDF keyword extraction
  extractTfIdfKeywords(text, maxKeywords) {
    const localTfIdf = new TfIdf();
    
    // Add current document
    localTfIdf.addDocument(text, 'current');
    
    // Add to global corpus for better IDF calculation
    this.globalTfIdf.addDocument(text, `doc_${Date.now()}`);
    
    const terms = localTfIdf.listTerms(0);
    
    return terms
      .filter(term => this.isValidKeyword(term.term))
      .slice(0, maxKeywords)
      .map(term => ({
        term: term.term,
        score: term.tfidf,
        tf: term.tf,
        idf: term.idf
      }));
  }

  // N-gram extraction for multi-word terms
  extractNGrams(text, maxN = 3) {
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !this.domainSpecificStopwords.has(word));

    const ngrams = [];
    
    for (let n = 2; n <= maxN; n++) {
      for (let i = 0; i <= words.length - n; i++) {
        const ngram = words.slice(i, i + n).join(' ');
        if (this.isValidNGram(ngram)) {
          ngrams.push(ngram);
        }
      }
    }

    // Count frequency and get top n-grams
    const ngramCount = _.countBy(ngrams);
    return Object.entries(ngramCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([ngram, count]) => ngram);
  }

  // Domain-specific term extraction
  extractDomainTerms(text) {
    const lowerText = text.toLowerCase();
    const foundTerms = [];

    Object.entries(this.academicDomains).forEach(([domain, terms]) => {
      terms.forEach(term => {
        if (lowerText.includes(term.toLowerCase())) {
          foundTerms.push(term);
        }
      });
    });

    return [...new Set(foundTerms)]; // Remove duplicates
  }

  // Simple named entity extraction (technology names, methodologies, etc.)
  extractEntities(text) {
    const entities = [];
    
    // Technology patterns
    const techPatterns = [
      /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*(?:\s+(?:Algorithm|Framework|System|Platform|Tool|API|SDK))\b/g,
      /\b(?:React|Angular|Vue|Node\.js|Python|Java|JavaScript|TypeScript|PHP|Ruby|Go|Rust)\b/gi,
      /\b(?:MySQL|PostgreSQL|MongoDB|Firebase|AWS|Azure|Docker|Kubernetes)\b/gi,
      /\b(?:Machine Learning|Deep Learning|Neural Network|Blockchain|IoT|AR|VR|AI)\b/gi
    ];

    techPatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        entities.push(...matches);
      }
    });

    return [...new Set(entities)].slice(0, 5);
  }

  // Validate if a term is a good keyword
  isValidKeyword(term) {
    return (
      term.length >= 3 &&
      term.length <= 25 &&
      !this.domainSpecificStopwords.has(term.toLowerCase()) &&
      !/^\d+$/.test(term) && // Not just numbers
      !/^[^a-zA-Z]*$/.test(term) && // Contains letters
      !term.includes('_') && // Avoid technical variables
      !/^(the|and|or|but|in|on|at|to|for|of|with|by)$/i.test(term)
    );
  }

  // Validate n-gram quality
  isValidNGram(ngram) {
    const words = ngram.split(' ');
    return (
      words.length >= 2 &&
      words.length <= 3 &&
      words.every(word => !this.domainSpecificStopwords.has(word)) &&
      !words.some(word => /^\d+$/.test(word)) &&
      ngram.length <= 30
    );
  }

  // Capitalize keywords properly
  capitalizeKeyword(keyword) {
    // Handle acronyms and special cases
    const acronyms = ['ai', 'iot', 'api', 'sdk', 'ui', 'ux', 'it', 'hr', 'crm', 'erp'];
    const specialCases = {
      'javascript': 'JavaScript',
      'typescript': 'TypeScript',
      'nodejs': 'Node.js',
      'mongodb': 'MongoDB',
      'mysql': 'MySQL',
      'postgresql': 'PostgreSQL'
    };

    const lower = keyword.toLowerCase();
    
    if (specialCases[lower]) {
      return specialCases[lower];
    }
    
    if (acronyms.includes(lower)) {
      return lower.toUpperCase();
    }

    // Regular title case
    return keyword.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  // Auto-categorize papers based on extracted keywords
  categorizePaper(keywords) {
    const categories = {
      'Web Development': ['web', 'html', 'css', 'javascript', 'react', 'angular', 'vue', 'frontend', 'backend'],
      'Mobile Development': ['mobile', 'android', 'ios', 'react native', 'flutter', 'app'],
      'Data Science': ['data', 'analytics', 'machine learning', 'ai', 'statistics', 'visualization'],
      'Cybersecurity': ['security', 'encryption', 'authentication', 'vulnerability', 'firewall'],
      'Database Systems': ['database', 'sql', 'nosql', 'mongodb', 'mysql', 'postgresql'],
      'Network Systems': ['network', 'routing', 'protocol', 'tcp', 'ip', 'wireless'],
      'Software Engineering': ['software', 'development', 'agile', 'testing', 'deployment'],
      'Human-Computer Interaction': ['ui', 'ux', 'interface', 'usability', 'user experience']
    };

    const scores = {};
    const keywordTexts = keywords.map(k => typeof k === 'string' ? k.toLowerCase() : k.term.toLowerCase());

    Object.entries(categories).forEach(([category, categoryKeywords]) => {
      scores[category] = categoryKeywords.reduce((score, catKeyword) => {
        return score + keywordTexts.filter(kw => kw.includes(catKeyword)).length;
      }, 0);
    });

    const topCategory = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .filter(([, score]) => score > 0)[0];

    return topCategory ? topCategory[0] : 'General';
  }

  // Suggest related papers based on keyword similarity
  findRelatedPapers(targetKeywords, allPapers, limit = 5) {
    const targetSet = new Set(targetKeywords.map(k => 
      (typeof k === 'string' ? k : k.term).toLowerCase()
    ));

    const scores = allPapers.map(paper => {
      const paperKeywords = new Set(
        (paper.keywords || []).map(k => k.toLowerCase())
      );
      
      const intersection = [...targetSet].filter(k => paperKeywords.has(k));
      const union = new Set([...targetSet, ...paperKeywords]);
      
      const jaccardSimilarity = intersection.length / union.size;
      
      return {
        paper,
        similarity: jaccardSimilarity,
        commonKeywords: intersection
      };
    });

    return scores
      .filter(s => s.similarity > 0.1) // Minimum similarity threshold
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);
  }
}

module.exports = EnhancedAutoTagger;