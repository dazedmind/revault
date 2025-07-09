// Fixed search API route with proper TypeScript types
// File: src/app/api/search/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Type definitions
interface Paper {
  paper_id: number;
  title: string | null;
  author: string | null;
  abstract: string | null;
  keywords: string[] | null;
  department: string | null;
  course: string | null;
  year: number | null;
  created_at: Date;
  paper_url: string | null;
  is_deleted: boolean;
}

interface EnhancedPaper extends Paper {
  relevanceScore: number;
  highlights: {
    title?: string;
    abstract?: string;
    author?: string;
  };
  matchedFields: string[];
}

interface SearchFilters {
  department?: string | null;
  year?: number | null;
  course?: string | null;
  author?: string | null;
}

interface Match {
  start: number;
  end: number;
  score: number;
  type: "phrase" | "term";
  term?: string;
}

interface Region {
  start: number;
  end: number;
  matches: Match[];
  score: number;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Search parameters
    const query = searchParams.get("q")?.trim();
    const department = searchParams.get("department");
    const year = searchParams.get("year");
    const course = searchParams.get("course");
    const author = searchParams.get("author");
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);
    const page = Math.max(parseInt(searchParams.get("page") || "1"), 1);
    const sortBy = searchParams.get("sortBy") || "relevance";

    // Validation
    if (!query || query.length < 2) {
      return NextResponse.json(
        {
          error: "Search query must be at least 2 characters long",
          suggestions: [
            "Try using more specific keywords",
            "Check spelling",
            "Use different terms",
          ],
        },
        { status: 400 },
      );
    }

    const skip = (page - 1) * limit;

    // Build search conditions
    const searchConditions = buildSearchConditions(query, {
      department,
      year: year ? parseInt(year) : null,
      course,
      author,
    });

    console.log("🔍 Search query:", query);

    // Get total count for pagination
    const totalCount = await prisma.papers.count({
      where: searchConditions,
    });

    // Build orderBy clause
    const orderBy = buildOrderBy(sortBy);

    // Execute search query
    const papers = (await prisma.papers.findMany({
      where: {
        ...searchConditions,
        is_deleted: false,
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
        is_deleted: true,
      },
      orderBy: orderBy as any,
      skip,
      take: limit,
    })) as Paper[];

    // Calculate relevance scores and generate enhanced highlights
    const enhancedResults: EnhancedPaper[] = papers.map((paper) => {
      const relevanceScore = calculateRelevanceScore(paper, query);
      const highlights = generateEnhancedHighlights(paper, query);

      return {
        ...paper,
        relevanceScore,
        highlights,
        matchedFields: getMatchedFields(paper, query),
      };
    });

    // Sort by relevance if requested
    if (sortBy === "relevance") {
      enhancedResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
    }

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    // Search suggestions for no results
    const suggestions =
      totalCount === 0 ? await generateSearchSuggestions(query) : [];

    const responseData = {
      success: true,
      results: enhancedResults,
      pagination: {
        total: totalCount,
        pages: totalPages,
        current: page,
        hasNext,
        hasPrev,
        limit,
      },
      query: {
        search: query,
        filters: { department, year, course, author },
        sortBy,
      },
      suggestions,
      performance: {
        searchTime: Date.now(),
        resultsFound: enhancedResults.length,
      },
    };

    console.log(`✅ Search completed: ${enhancedResults.length} results found`);
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("❌ Search API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 },
    );
  }
}

// Enhanced highlight generation with intelligent snippet extraction
function generateEnhancedHighlights(
  paper: Paper,
  query: string,
): { title?: string; abstract?: string; author?: string } {
  const queryTerms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((term) => term.length > 1);
  const highlights: { title?: string; abstract?: string; author?: string } = {};

  // Enhanced highlight text function that finds the best matching snippet
  const highlightText = (
    text: string | null,
    maxLength: number = 300,
  ): string => {
    if (!text) return "";

    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();

    // Find all positions where query terms appear
    const matches: Match[] = [];

    // First, check for exact phrase matches
    if (textLower.includes(queryLower)) {
      let pos = textLower.indexOf(queryLower);
      while (pos !== -1) {
        matches.push({
          start: pos,
          end: pos + queryLower.length,
          score: 10, // High score for exact phrase match
          type: "phrase",
        });
        pos = textLower.indexOf(queryLower, pos + 1);
      }
    }

    // Then find individual term matches
    queryTerms.forEach((term) => {
      if (term.length < 2) return;

      let pos = textLower.indexOf(term);
      while (pos !== -1) {
        // Check if this position is already covered by a phrase match
        const isOverlapping = matches.some(
          (match) => pos >= match.start && pos < match.end,
        );

        if (!isOverlapping) {
          matches.push({
            start: pos,
            end: pos + term.length,
            score: 3, // Lower score for individual terms
            type: "term",
            term: term,
          });
        }
        pos = textLower.indexOf(term, pos + 1);
      }
    });

    if (matches.length === 0) {
      // No matches found, return beginning of text
      return text.length <= maxLength
        ? text
        : text.substring(0, maxLength) + "...";
    }

    // Find the best snippet that contains the most matches
    const bestSnippet = findBestSnippet(text, matches, maxLength);

    return bestSnippet;
  };

  // Generate highlights for different fields
  if (paper.title) {
    highlights.title = highlightText(paper.title, 200);
  }

  if (paper.abstract) {
    highlights.abstract = highlightText(paper.abstract, 350);
  }

  if (paper.author) {
    highlights.author = highlightText(paper.author, 100);
  }

  return highlights;
}

// Find the best snippet that contains the most relevant matches
function findBestSnippet(
  text: string,
  matches: Match[],
  maxLength: number,
): string {
  if (matches.length === 0) {
    return text.length <= maxLength
      ? text
      : text.substring(0, maxLength) + "...";
  }

  // If text is short enough, return the whole text
  if (text.length <= maxLength) {
    return text;
  }

  // Group nearby matches to find the best region
  const regions: Region[] = [];
  let currentRegion: Region = {
    start: matches[0].start,
    end: matches[0].end,
    matches: [matches[0]],
    score: matches[0].score,
  };

  for (let i = 1; i < matches.length; i++) {
    const match = matches[i];
    const distance = match.start - currentRegion.end;

    // If matches are close (within 80 characters), group them
    if (distance <= 80) {
      currentRegion.end = Math.max(currentRegion.end, match.end);
      currentRegion.matches.push(match);
      currentRegion.score += match.score;
    } else {
      // Start a new region
      regions.push(currentRegion);
      currentRegion = {
        start: match.start,
        end: match.end,
        matches: [match],
        score: match.score,
      };
    }
  }
  regions.push(currentRegion);

  // Find the region with the highest score
  const bestRegion = regions.reduce((best, region) =>
    region.score > best.score ? region : best,
  );

  // Calculate snippet boundaries around the best region
  const regionCenter = (bestRegion.start + bestRegion.end) / 2;
  const halfLength = Math.floor(maxLength / 2);

  let snippetStart = Math.max(0, regionCenter - halfLength);
  let snippetEnd = Math.min(text.length, snippetStart + maxLength);

  // Adjust start if we hit the end
  if (snippetEnd === text.length) {
    snippetStart = Math.max(0, snippetEnd - maxLength);
  }

  // Try to break at sentence boundaries for better readability
  const adjustedBoundaries = adjustToSentenceBoundaries(
    text,
    snippetStart,
    snippetEnd,
    maxLength,
  );
  snippetStart = adjustedBoundaries.start;
  snippetEnd = adjustedBoundaries.end;

  let snippet = text.substring(snippetStart, snippetEnd);

  // Add ellipsis if needed
  if (snippetStart > 0) {
    snippet = "..." + snippet.trim();
  }
  if (snippetEnd < text.length) {
    snippet = snippet.trim() + "...";
  }

  return snippet;
}

// Adjust snippet boundaries to sentence boundaries when possible
function adjustToSentenceBoundaries(
  text: string,
  start: number,
  end: number,
  maxLength: number,
): { start: number; end: number } {
  const sentenceEnders = /[.!?]\s+/g;

  // Find sentence boundaries near the start
  let adjustedStart = start;
  if (start > 0) {
    // Look backwards for the start of a sentence
    const beforeStart = text.substring(Math.max(0, start - 100), start);
    const matches = Array.from(beforeStart.matchAll(sentenceEnders));
    const lastSentenceMatch = matches[matches.length - 1];

    if (lastSentenceMatch && lastSentenceMatch.index !== undefined) {
      const sentenceStart =
        start - 100 + lastSentenceMatch.index + lastSentenceMatch[0].length;
      if (sentenceStart > start - 50) {
        // Don't go too far back
        adjustedStart = sentenceStart;
      }
    }
  }

  // Find sentence boundaries near the end
  let adjustedEnd = end;
  if (end < text.length) {
    // Look forward for the end of a sentence
    const afterEnd = text.substring(end, Math.min(text.length, end + 100));
    const sentenceEndMatch = afterEnd.match(sentenceEnders);
    if (sentenceEndMatch && sentenceEndMatch.index !== undefined) {
      const newEnd = end + sentenceEndMatch.index + sentenceEndMatch[0].length;
      if (newEnd < end + 50) {
        // Don't go too far forward
        adjustedEnd = newEnd;
      }
    }
  }

  // Make sure we don't exceed our maximum length too much
  if (adjustedEnd - adjustedStart > maxLength + 50) {
    adjustedEnd = adjustedStart + maxLength;
  }

  return { start: adjustedStart, end: adjustedEnd };
}

// Build search conditions
function buildSearchConditions(query: string, filters: SearchFilters) {
  const conditions: any[] = [];
  const queryTerms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((term) => term.length > 1);

  // Text search conditions
  const textSearchConditions: any[] = [];

  queryTerms.forEach((term) => {
    textSearchConditions.push(
      { title: { contains: term, mode: "insensitive" } },
      { abstract: { contains: term, mode: "insensitive" } },
      { author: { contains: term, mode: "insensitive" } },
      { keywords: { has: term } },
    );
  });

  if (textSearchConditions.length > 0) {
    conditions.push({ OR: textSearchConditions });
  }

  // Additional filters
  if (filters.department) {
    conditions.push({
      department: { contains: filters.department, mode: "insensitive" },
    });
  }

  if (filters.year) {
    conditions.push({ year: filters.year });
  }

  if (filters.course) {
    conditions.push({
      course: { contains: filters.course, mode: "insensitive" },
    });
  }

  if (filters.author) {
    conditions.push({
      author: { contains: filters.author, mode: "insensitive" },
    });
  }

  return conditions.length > 0 ? { AND: conditions } : {};
}

// Build orderBy clause
function buildOrderBy(sortBy: string) {
  switch (sortBy) {
    case "date":
      return [{ created_at: "desc" }, { paper_id: "desc" }];
    case "title":
      return [{ title: "asc" }];
    case "year":
      return [{ year: "desc" }, { created_at: "desc" }];
    case "author":
      return [{ author: "asc" }];
    case "relevance":
    default:
      return [{ created_at: "desc" }];
  }
}

// Calculate relevance score
function calculateRelevanceScore(paper: Paper, query: string): number {
  const queryLower = query.toLowerCase();
  const queryTerms = queryLower.split(/\s+/).filter((term) => term.length > 1);

  let score = 0;

  // Title matches (highest weight)
  if (paper.title) {
    const titleLower = paper.title.toLowerCase();
    if (titleLower.includes(queryLower)) {
      score += 10;
    }
    queryTerms.forEach((term) => {
      if (titleLower.includes(term)) {
        score += 5;
      }
    });
  }

  // Abstract matches
  if (paper.abstract) {
    const abstractLower = paper.abstract.toLowerCase();
    if (abstractLower.includes(queryLower)) {
      score += 3;
    }
    queryTerms.forEach((term) => {
      if (abstractLower.includes(term)) {
        score += 1;
      }
    });
  }

  // Author matches
  if (paper.author) {
    const authorLower = paper.author.toLowerCase();
    if (authorLower.includes(queryLower)) {
      score += 4;
    }
  }

  // Keywords matches
  if (paper.keywords && Array.isArray(paper.keywords)) {
    const keywordsLower = paper.keywords.map((k) => k.toLowerCase());
    queryTerms.forEach((term) => {
      if (keywordsLower.some((keyword) => keyword.includes(term))) {
        score += 3;
      }
    });
  }

  // Boost recent papers slightly
  if (paper.year && paper.year >= new Date().getFullYear() - 2) {
    score += 0.5;
  }

  return parseFloat(score.toFixed(2));
}

// Get matched fields
function getMatchedFields(paper: Paper, query: string): string[] {
  const queryLower = query.toLowerCase();
  const matchedFields: string[] = [];

  if (paper.title?.toLowerCase().includes(queryLower)) {
    matchedFields.push("title");
  }
  if (paper.abstract?.toLowerCase().includes(queryLower)) {
    matchedFields.push("abstract");
  }
  if (paper.author?.toLowerCase().includes(queryLower)) {
    matchedFields.push("author");
  }
  if (paper.keywords?.some((k) => k.toLowerCase().includes(queryLower))) {
    matchedFields.push("keywords");
  }

  return matchedFields;
}

// Generate search suggestions
async function generateSearchSuggestions(query: string): Promise<string[]> {
  try {
    const popularKeywords = await prisma.papers.findMany({
      select: { keywords: true },
      take: 100,
      orderBy: { created_at: "desc" },
    });

    const allKeywords = popularKeywords
      .flatMap((p) => p.keywords || [])
      .map((k) => k.toLowerCase())
      .filter((k) => k.length > 2);

    const keywordCounts: { [key: string]: number } = {};
    allKeywords.forEach((keyword) => {
      keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
    });

    const suggestions = Object.keys(keywordCounts)
      .filter((keyword) => {
        const similarity = calculateStringSimilarity(
          query.toLowerCase(),
          keyword,
        );
        return similarity > 0.3 && keyword !== query.toLowerCase();
      })
      .sort((a, b) => keywordCounts[b] - keywordCounts[a])
      .slice(0, 5);

    return suggestions.length > 0
      ? suggestions
      : [
          "Try using more general terms",
          "Check your spelling",
          "Use different keywords",
          "Browse by department or year",
        ];
  } catch (error) {
    console.error("Failed to generate suggestions:", error);
    return [
      "Try using more general terms",
      "Check your spelling",
      "Use different keywords",
    ];
  }
}

// Simple string similarity calculation
function calculateStringSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) return 1.0;

  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

// Levenshtein distance calculation
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1, // deletion
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}
