// Tagging Management Utilities
// File: src/lib/tagging-utils.js

const { prisma } = require('@/lib/prisma');
const EnhancedAutoTagger = require('./enhanced-tagger');

class TaggingManager {
  constructor() {
    this.tagger = new EnhancedAutoTagger();
  }

  // Analyze keyword quality across all papers
  async analyzeKeywordQuality() {
    const papers = await prisma.papers.findMany({
      select: {
        paper_id: true,
        title: true,
        abstract: true,
        keywords: true,
        department: true,
        course: true,
        year: true
      }
    });

    const analysis = {
      totalPapers: papers.length,
      papersWithKeywords: 0,
      papersWithoutKeywords: 0,
      averageKeywordsPerPaper: 0,
      mostCommonKeywords: {},
      keywordsByDepartment: {},
      keywordsByYear: {},
      qualityMetrics: {
        singleWordKeywords: 0,
        multiWordKeywords: 0,
        technicalTerms: 0,
        genericTerms: 0
      }
    };

    let totalKeywords = 0;

    papers.forEach(paper => {
      const keywords = paper.keywords || [];
      
      if (keywords.length > 0) {
        analysis.papersWithKeywords++;
        totalKeywords += keywords.length;

        // Count keyword occurrences
        keywords.forEach(keyword => {
          const kw = keyword.toLowerCase();
          analysis.mostCommonKeywords[kw] = (analysis.mostCommonKeywords[kw] || 0) + 1;
          
          // Quality metrics
          if (keyword.includes(' ')) {
            analysis.qualityMetrics.multiWordKeywords++;
          } else {
            analysis.qualityMetrics.singleWordKeywords++;
          }

          if (this.isTechnicalTerm(keyword)) {
            analysis.qualityMetrics.technicalTerms++;
          } else {
            analysis.qualityMetrics.genericTerms++;
          }
        });

        // Department analysis
        if (paper.department) {
          if (!analysis.keywordsByDepartment[paper.department]) {
            analysis.keywordsByDepartment[paper.department] = {};
          }
          keywords.forEach(kw => {
            const dept = analysis.keywordsByDepartment[paper.department];
            dept[kw.toLowerCase()] = (dept[kw.toLowerCase()] || 0) + 1;
          });
        }

        // Year analysis
        if (paper.year) {
          if (!analysis.keywordsByYear[paper.year]) {
            analysis.keywordsByYear[paper.year] = {};
          }
          keywords.forEach(kw => {
            const year = analysis.keywordsByYear[paper.year];
            year[kw.toLowerCase()] = (year[kw.toLowerCase()] || 0) + 1;
          });
        }
      } else {
        analysis.papersWithoutKeywords++;
      }
    });

    analysis.averageKeywordsPerPaper = totalKeywords / analysis.papersWithKeywords || 0;

    // Sort most common keywords
    analysis.mostCommonKeywords = Object.entries(analysis.mostCommonKeywords)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 20)
      .reduce((obj, [key, val]) => {
        obj[key] = val;
        return obj;
      }, {});

    return analysis;
  }

  // Identify and clean up poor quality keywords
  async cleanupKeywords() {
    const papers = await prisma.papers.findMany({
      select: {
        paper_id: true,
        keywords: true
      }
    });

    const cleanupResults = {
      papersProcessed: 0,
      keywordsRemoved: 0,
      keywordsReplaced: 0,
      commonReplacements: {}
    };

    const lowQualityPatterns = [
      /^\d+$/, // Just numbers
      /^[a-z]$/, // Single letters
      /^(the|and|or|but|in|on|at|to|for|of|with|by|is|are|was|were|be|been|have|has|had|do|does|did|will|would|could|should|may|might)$/i,
      /^.{1,2}$/, // Too short
      /^.{50,}$/, // Too long
      /^[^a-zA-Z]*$/, // No letters
      /^\s*$/ // Empty or whitespace
    ];

    const replacementMap = {
      'ai': 'Artificial Intelligence',
      'ml': 'Machine Learning',
      'ui': 'User Interface',
      'ux': 'User Experience',
      'api': 'Application Programming Interface',
      'iot': 'Internet of Things',
      'db': 'Database',
      'js': 'JavaScript',
      'css': 'Cascading Style Sheets',
      'html': 'HyperText Markup Language'
    };

    for (const paper of papers) {
      const originalKeywords = paper.keywords || [];
      const cleanedKeywords = [];
      let removedCount = 0;
      let replacedCount = 0;

      originalKeywords.forEach(keyword => {
        const trimmed = keyword.trim();
        
        // Check if keyword should be removed
        const shouldRemove = lowQualityPatterns.some(pattern => pattern.test(trimmed));
        
        if (shouldRemove) {
          removedCount++;
          return;
        }

        // Check for replacements
        const lower = trimmed.toLowerCase();
        if (replacementMap[lower]) {
          cleanedKeywords.push(replacementMap[lower]);
          cleanupResults.commonReplacements[lower] = replacementMap[lower];
          replacedCount++;
        } else {
          cleanedKeywords.push(trimmed);
        }
      });

      // Update paper if keywords changed
      if (removedCount > 0 || replacedCount > 0) {
        await prisma.papers.update({
          where: { paper_id: paper.paper_id },
          data: { keywords: cleanedKeywords }
        });

        cleanupResults.papersProcessed++;
        cleanupResults.keywordsRemoved += removedCount;
        cleanupResults.keywordsReplaced += replacedCount;
      }
    }

    return cleanupResults;
  }

  // Generate keyword suggestions for papers missing keywords
  async generateMissingKeywords(limit = 50) {
    await this.tagger.initializeWithExistingPapers(
      await prisma.papers.findMany({
        select: { paper_id: true, title: true, abstract: true, keywords: true }
      })
    );

    const papersWithoutKeywords = await prisma.papers.findMany({
      where: {
        OR: [
          { keywords: { equals: [] } },
          { keywords: null }
        ]
      },
      take: limit,
      orderBy: { created_at: 'desc' }
    });

    const suggestions = [];

    for (const paper of papersWithoutKeywords) {
      const fullText = `${paper.title} ${paper.abstract || ''}`;
      
      if (fullText.trim().length < 50) {
        continue; // Skip papers with insufficient text
      }

      const extractedKeywords = this.tagger.extractKeywords(fullText, {
        maxKeywords: 6,
        includeNGrams: true,
        useDomainContext: true
      });

      suggestions.push({
        paper_id: paper.paper_id,
        title: paper.title,
        suggestedKeywords: extractedKeywords.map(k => k.term),
        confidence: extractedKeywords.reduce((sum, k) => sum + k.score, 0) / extractedKeywords.length
      });
    }

    return suggestions.sort((a, b) => b.confidence - a.confidence);
  }

  // Find duplicate or similar keywords across papers
  async findDuplicateKeywords() {
    const papers = await prisma.papers.findMany({
      select: {
        paper_id: true,
        title: true,
        keywords: true
      }
    });

    const keywordMap = new Map();
    const similarityThreshold = 0.8;

    // Build keyword frequency map
    papers.forEach(paper => {
      (paper.keywords || []).forEach(keyword => {
        const key = keyword.toLowerCase().trim();
        if (!keywordMap.has(key)) {
          keywordMap.set(key, []);
        }
        keywordMap.get(key).push({
          paper_id: paper.paper_id,
          title: paper.title,
          originalKeyword: keyword
        });
      });
    });

    const duplicates = Array.from(keywordMap.entries())
      .filter(([, papers]) => papers.length > 1)
      .sort((a, b) => b[1].length - a[1].length);

    // Find similar keywords using string similarity
    const similarGroups = [];
    const processed = new Set();

    Array.from(keywordMap.keys()).forEach(keyword1 => {
      if (processed.has(keyword1)) return;

      const similarKeywords = [keyword1];
      
      Array.from(keywordMap.keys()).forEach(keyword2 => {
        if (keyword1 !== keyword2 && !processed.has(keyword2)) {
          const similarity = this.calculateStringSimilarity(keyword1, keyword2);
          if (similarity > similarityThreshold) {
            similarKeywords.push(keyword2);
            processed.add(keyword2);
          }
        }
      });

      if (similarKeywords.length > 1) {
        similarGroups.push({
          group: similarKeywords,
          totalUsage: similarKeywords.reduce((sum, kw) => sum + keywordMap.get(kw).length, 0)
        });
      }
      
      processed.add(keyword1);
    });

    return {
      exactDuplicates: duplicates.slice(0, 20),
      similarGroups: similarGroups.sort((a, b) => b.totalUsage - a.totalUsage).slice(0, 10)
    };
  }

  // Calculate string similarity using Levenshtein distance
  calculateStringSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = this.levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }

  levenshteinDistance(str1, str2) {
    const matrix = Array(str2.length + 1).fill().map(() => Array(str1.length + 1).fill(0));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + cost
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  // Check if a term is technical
  isTechnicalTerm(term) {
    const technicalPatterns = [
      /^[A-Z]{2,}$/, // Acronyms
      /\b(algorithm|framework|system|platform|protocol|architecture|methodology)\b/i,
      /\b(javascript|python|java|react|angular|node|mysql|mongodb)\b/i,
      /\b(machine learning|artificial intelligence|deep learning|neural network)\b/i
    ];
    
    return technicalPatterns.some(pattern => pattern.test(term));
  }

  // Generate keyword trends over time
  async generateKeywordTrends() {
    const papers = await prisma.papers.findMany({
      select: {
        keywords: true,
        year: true,
        department: true
      },
      where: {
        year: { not: null },
        keywords: { not: null }
      },
      orderBy: { year: 'asc' }
    });

    const trends = {};
    const departmentTrends = {};

    papers.forEach(paper => {
      const year = paper.year;
      const dept = paper.department || 'Unknown';
      
      if (!trends[year]) trends[year] = {};
      if (!departmentTrends[dept]) departmentTrends[dept] = {};
      if (!departmentTrends[dept][year]) departmentTrends[dept][year] = {};

      (paper.keywords || []).forEach(keyword => {
        const kw = keyword.toLowerCase();
        trends[year][kw] = (trends[year][kw] || 0) + 1;
        departmentTrends[dept][year][kw] = (departmentTrends[dept][year][kw] || 0) + 1;
      });
    });

    // Find emerging and declining keywords
    const emergingKeywords = this.findEmergingKeywords(trends);
    const decliningKeywords = this.findDecliningKeywords(trends);

    return {
      yearlyTrends: trends,
      departmentTrends: departmentTrends,
      emergingKeywords: emergingKeywords.slice(0, 10),
      decliningKeywords: decliningKeywords.slice(0, 10)
    };
  }

  findEmergingKeywords(trends) {
    const keywordGrowth = {};
    const years = Object.keys(trends).sort();
    
    if (years.length < 2) return [];

    const recentYear = years[years.length - 1];
    const previousYear = years[years.length - 2];

    Object.keys(trends[recentYear] || {}).forEach(keyword => {
      const recentCount = trends[recentYear][keyword] || 0;
      const previousCount = trends[previousYear]?.[keyword] || 0;
      
      if (recentCount > previousCount) {
        keywordGrowth[keyword] = {
          growth: recentCount - previousCount,
          growthRate: previousCount > 0 ? (recentCount - previousCount) / previousCount : 1,
          recentCount,
          previousCount
        };
      }
    });

    return Object.entries(keywordGrowth)
      .sort(([,a], [,b]) => b.growthRate - a.growthRate)
      .map(([keyword, data]) => ({ keyword, ...data }));
  }

  findDecliningKeywords(trends) {
    const keywordDecline = {};
    const years = Object.keys(trends).sort();
    
    if (years.length < 2) return [];

    const recentYear = years[years.length - 1];
    const previousYear = years[years.length - 2];

    Object.keys(trends[previousYear] || {}).forEach(keyword => {
      const recentCount = trends[recentYear]?.[keyword] || 0;
      const previousCount = trends[previousYear][keyword] || 0;
      
      if (previousCount > recentCount && previousCount > 1) {
        keywordDecline[keyword] = {
          decline: previousCount - recentCount,
          declineRate: (previousCount - recentCount) / previousCount,
          recentCount,
          previousCount
        };
      }
    });

    return Object.entries(keywordDecline)
      .sort(([,a], [,b]) => b.declineRate - a.declineRate)
      .map(([keyword, data]) => ({ keyword, ...data }));
  }

  // Export keywords for external analysis
  async exportKeywordsToCSV() {
    const papers = await prisma.papers.findMany({
      select: {
        paper_id: true,
        title: true,
        author: true,
        department: true,
        course: true,
        year: true,
        keywords: true,
        created_at: true
      }
    });

    const csvHeader = 'paper_id,title,author,department,course,year,keywords,keyword_count,created_at\n';
    
    const csvRows = papers.map(paper => {
      const keywords = (paper.keywords || []).join(';');
      const keywordCount = (paper.keywords || []).length;
      
      return [
        paper.paper_id,
        `"${(paper.title || '').replace(/"/g, '""')}"`,
        `"${(paper.author || '').replace(/"/g, '""')}"`,
        `"${(paper.department || '').replace(/"/g, '""')}"`,
        `"${(paper.course || '').replace(/"/g, '""')}"`,
        paper.year || '',
        `"${keywords.replace(/"/g, '""')}"`,
        keywordCount,
        paper.created_at?.toISOString() || ''
      ].join(',');
    });

    return csvHeader + csvRows.join('\n');
  }

  // Batch update keywords with improved extraction
  async batchUpdateKeywords(options = {}) {
    const {
      limit = 100,
      onlyEmptyKeywords = true,
      departments = null,
      minYear = null,
      maxYear = null
    } = options;

    // Build query conditions
    const whereConditions = [];
    
    if (onlyEmptyKeywords) {
      whereConditions.push({
        OR: [
          { keywords: { equals: [] } },
          { keywords: null }
        ]
      });
    }
    
    if (departments && departments.length > 0) {
      whereConditions.push({ department: { in: departments } });
    }
    
    if (minYear) {
      whereConditions.push({ year: { gte: minYear } });
    }
    
    if (maxYear) {
      whereConditions.push({ year: { lte: maxYear } });
    }

    const papers = await prisma.papers.findMany({
      where: whereConditions.length > 0 ? { AND: whereConditions } : {},
      take: limit,
      orderBy: { created_at: 'desc' }
    });

    // Initialize tagger with existing corpus
    await this.tagger.initializeWithExistingPapers(
      await prisma.papers.findMany({
        select: { paper_id: true, title: true, abstract: true, keywords: true }
      })
    );

    const results = [];
    let successCount = 0;
    let errorCount = 0;

    console.log(`🔄 Starting batch update for ${papers.length} papers...`);

    for (const [index, paper] of papers.entries()) {
      try {
        const fullText = `${paper.title || ''} ${paper.abstract || ''}`.trim();
        
        if (fullText.length < 20) {
          console.log(`⚠️ Skipping paper ${paper.paper_id}: insufficient text`);
          continue;
        }

        const extractedKeywords = this.tagger.extractKeywords(fullText, {
          maxKeywords: 8,
          includeNGrams: true,
          useDomainContext: true,
          boostTitleTerms: true
        });

        const keywordStrings = extractedKeywords.map(k => k.term);
        
        await prisma.papers.update({
          where: { paper_id: paper.paper_id },
          data: { keywords: keywordStrings }
        });

        results.push({
          paper_id: paper.paper_id,
          title: paper.title,
          newKeywords: keywordStrings,
          keywordScores: extractedKeywords.map(k => ({
            term: k.term,
            score: k.score
          }))
        });

        successCount++;
        
        if ((index + 1) % 10 === 0) {
          console.log(`✅ Processed ${index + 1}/${papers.length} papers`);
        }

      } catch (error) {
        console.error(`❌ Error processing paper ${paper.paper_id}:`, error);
        errorCount++;
        
        results.push({
          paper_id: paper.paper_id,
          error: error.message
        });
      }
    }

    console.log(`🎉 Batch update completed: ${successCount} successful, ${errorCount} errors`);

    return {
      success: true,
      totalProcessed: papers.length,
      successCount,
      errorCount,
      results
    };
  }
}

module.exports = TaggingManager;