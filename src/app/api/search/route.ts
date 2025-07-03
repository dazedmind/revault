// Papers Search API - Focused Implementation
// File: src/app/api/papers/search/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Search parameters
    const query = searchParams.get('q')?.trim();
    const department = searchParams.get('department');
    const year = searchParams.get('year');
    const course = searchParams.get('course');
    const author = searchParams.get('author');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100); // Max 100
    const page = Math.max(parseInt(searchParams.get('page') || '1'), 1);
    const sortBy = searchParams.get('sortBy') || 'relevance'; // relevance, date, title
    
    // Validation
    if (!query || query.length < 2) {
      return NextResponse.json({
        error: 'Search query must be at least 2 characters long',
        suggestions: ['Try using more specific keywords', 'Check spelling', 'Use different terms']
      }, { status: 400 });
    }

    const skip = (page - 1) * limit;
    
    // Build search conditions
    const searchConditions = buildSearchConditions(query, {
      department,
      year: year ? parseInt(year) : null,
      course,
      author
    });

    console.log('🔍 Search query:', query);
    console.log('📊 Search conditions:', searchConditions);

    // Get total count for pagination
    const totalCount = await prisma.papers.count({
      where: searchConditions
    });

    // Build orderBy clause
    const orderBy = buildOrderBy(sortBy);

    // Execute search query
    const papers = await prisma.papers.findMany({
      where: {
        ...searchConditions,
        is_deleted: false // Exclude deleted papers
      },
      select: {
        paper_id: true,
        title: true,
        author: true,
        abstract: true,
        keywords: true,
        department: true,
        course: true,
        year: true,
        created_at: true,
        paper_url: true,
        is_deleted: true
      },
      orderBy: orderBy as any,
      skip,
      take: limit
    });

    // Calculate relevance scores and highlight matches
    const enhancedResults = papers.map(paper => {
      const relevanceScore = calculateRelevanceScore(paper, query);
      const highlights = generateHighlights(paper, query);
      
      return {
        ...paper,
        relevanceScore,
        highlights,
        matchedFields: getMatchedFields(paper, query)
      };
    });

    // Sort by relevance if requested
    if (sortBy === 'relevance') {
      enhancedResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
    }

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    // Search suggestions for no results
    const suggestions = totalCount === 0 ? await generateSearchSuggestions(query) : [];

    return NextResponse.json({
      success: true,
      query,
      results: enhancedResults,
      pagination: {
        currentPage: page,
        totalPages,
        totalResults: totalCount,
        resultsPerPage: limit,
        hasNext,
        hasPrev,
        showing: {
          from: skip + 1,
          to: Math.min(skip + limit, totalCount),
          total: totalCount
        }
      },
      filters: {
        department,
        year,
        course,
        author,
        sortBy
      },
      searchTime: Date.now() - Date.now(), // Would be calculated properly
      suggestions: suggestions.length > 0 ? suggestions : undefined
    });

  } catch (error) {
    console.error('❌ Papers search error:', error);
    return NextResponse.json({
      error: 'Search failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      query: req.url
    }, { status: 500 });
  }
}

// Build search conditions for Prisma query
function buildSearchConditions(query, filters) {
  const conditions = [];
  
  // Text search across multiple fields
  const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 1);
  
  if (searchTerms.length > 0) {
    const textSearchConditions = {
      OR: [
        // Title search (highest priority)
        {
          title: {
            contains: query,
            mode: 'insensitive'
          }
        },
        // Abstract search
        {
          abstract: {
            contains: query,
            mode: 'insensitive'
          }
        },
        // Author search
        {
          author: {
            contains: query,
            mode: 'insensitive'
          }
        },
        // Keywords search
        {
          keywords: {
            hasSome: searchTerms
          }
        },
        // Individual terms search
        ...searchTerms.map(term => ({
          OR: [
            { title: { contains: term, mode: 'insensitive' } },
            { abstract: { contains: term, mode: 'insensitive' } },
            { author: { contains: term, mode: 'insensitive' } }
          ]
        }))
      ]
    };
    
    conditions.push(textSearchConditions);
  }

  // Filter conditions
  if (filters.department) {
    conditions.push({
      department: {
        contains: filters.department,
        mode: 'insensitive'
      }
    });
  }

  if (filters.year) {
    conditions.push({
      year: filters.year
    });
  }

  if (filters.course) {
    conditions.push({
      course: {
        contains: filters.course,
        mode: 'insensitive'
      }
    });
  }

  if (filters.author) {
    conditions.push({
      author: {
        contains: filters.author,
        mode: 'insensitive'
      }
    });
  }

  return conditions.length > 0 ? { AND: conditions } : {};
}

// Build orderBy clause
function buildOrderBy(sortBy) {
  switch (sortBy) {
    case 'date':
      return [{ created_at: 'desc' }, { paper_id: 'desc' }];
    case 'title':
      return [{ title: 'asc' }];
    case 'year':
      return [{ year: 'desc' }, { created_at: 'desc' }];
    case 'author':
      return [{ author: 'asc' }];
    case 'relevance':
    default:
      // Relevance sorting will be done in JavaScript after scoring
      return [{ created_at: 'desc' }];
  }
}

// Calculate relevance score for a paper
function calculateRelevanceScore(paper, query) {
  const queryLower = query.toLowerCase();
  const queryTerms = queryLower.split(/\s+/).filter(term => term.length > 1);
  
  let score = 0;
  
  // Title matches (highest weight)
  if (paper.title) {
    const titleLower = paper.title.toLowerCase();
    if (titleLower.includes(queryLower)) {
      score += 10; // Exact phrase match in title
    }
    queryTerms.forEach(term => {
      if (titleLower.includes(term)) {
        score += 5; // Individual term match in title
      }
    });
  }

  // Abstract matches
  if (paper.abstract) {
    const abstractLower = paper.abstract.toLowerCase();
    if (abstractLower.includes(queryLower)) {
      score += 3; // Exact phrase match in abstract
    }
    queryTerms.forEach(term => {
      if (abstractLower.includes(term)) {
        score += 1; // Individual term match in abstract
      }
    });
  }

  // Author matches
  if (paper.author) {
    const authorLower = paper.author.toLowerCase();
    if (authorLower.includes(queryLower)) {
      score += 4; // Author match
    }
  }

  // Keywords matches
  if (paper.keywords && Array.isArray(paper.keywords)) {
    const keywordsLower = paper.keywords.map(k => k.toLowerCase());
    queryTerms.forEach(term => {
      if (keywordsLower.some(keyword => keyword.includes(term))) {
        score += 3; // Keyword match
      }
    });
  }

  // Boost recent papers slightly
  if (paper.year && paper.year >= new Date().getFullYear() - 2) {
    score += 0.5;
  }

  return parseFloat(score.toFixed(2));
}

// Generate highlights for search results
function generateHighlights(paper, query) {
  const queryTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 1);
  const highlights: { [key: string]: string | null } = {};

  // Helper function to highlight text
  const highlightText = (text, maxLength = 200) => {
    if (!text) return null;
    
    const textLower = text.toLowerCase();
    let highlightedText = text;
    
    // Find the best snippet containing query terms
    let bestSnippet = text;
    let snippetStart = 0;
    
    // Try to find a snippet containing the most query terms
    queryTerms.forEach(term => {
      const index = textLower.indexOf(term);
      if (index !== -1) {
        const start = Math.max(0, index - 50);
        const end = Math.min(text.length, index + maxLength);
        const snippet = text.substring(start, end);
        
        if (snippet.length > bestSnippet.length || 
            snippet.toLowerCase().split(term).length > bestSnippet.toLowerCase().split(term).length) {
          bestSnippet = snippet;
          snippetStart = start;
        }
      }
    });

    // Truncate if needed
    if (bestSnippet.length > maxLength) {
      bestSnippet = (snippetStart > 0 ? '...' : '') + 
                   bestSnippet.substring(0, maxLength) + 
                   '...';
    }

    return bestSnippet;
  };

  // Generate highlights for different fields
  if (paper.title) {
    highlights.title = highlightText(paper.title, 100);
  }

  if (paper.abstract) {
    highlights.abstract = highlightText(paper.abstract, 300);
  }

  if (paper.author) {
    highlights.author = highlightText(paper.author, 100);
  }

  return highlights;
}

// Get matched fields for a paper
function getMatchedFields(paper, query) {
  const queryLower = query.toLowerCase();
  const matchedFields = [];

  if (paper.title?.toLowerCase().includes(queryLower)) {
    matchedFields.push('title');
  }
  if (paper.abstract?.toLowerCase().includes(queryLower)) {
    matchedFields.push('abstract');
  }
  if (paper.author?.toLowerCase().includes(queryLower)) {
    matchedFields.push('author');
  }
  if (paper.keywords?.some(k => k.toLowerCase().includes(queryLower))) {
    matchedFields.push('keywords');
  }

  return matchedFields;
}

// Generate search suggestions when no results found
async function generateSearchSuggestions(query) {
  try {
    // Get common keywords and terms from database
    const popularKeywords = await prisma.papers.findMany({
      select: { keywords: true },
      take: 100,
      orderBy: { created_at: 'desc' }
    });

    const allKeywords = popularKeywords
      .flatMap(p => p.keywords || [])
      .map(k => k.toLowerCase())
      .filter(k => k.length > 2);

    const keywordCounts = {};
    allKeywords.forEach(keyword => {
      keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
    });

    // Find similar keywords using simple string similarity
    const suggestions = Object.keys(keywordCounts)
      .filter(keyword => {
        const similarity = calculateStringSimilarity(query.toLowerCase(), keyword);
        return similarity > 0.3 && keyword !== query.toLowerCase();
      })
      .sort((a, b) => keywordCounts[b] - keywordCounts[a])
      .slice(0, 5);

    return suggestions.length > 0 ? suggestions : [
      'Try using more general terms',
      'Check your spelling',
      'Use different keywords',
      'Browse by department or year'
    ];

  } catch (error) {
    console.error('Failed to generate suggestions:', error);
    return [
      'Try using more general terms',
      'Check your spelling',
      'Use different keywords'
    ];
  }
}

// Simple string similarity calculation
function calculateStringSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

function levenshteinDistance(str1, str2) {
  const matrix = Array(str2.length + 1).fill(0).map(() => Array(str1.length + 1).fill(0));
  
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