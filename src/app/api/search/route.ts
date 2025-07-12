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

    const query = searchParams.get("q")?.trim();
    const department = searchParams.get("department");
    const year = searchParams.get("year");
    const course = searchParams.get("course");
    const author = searchParams.get("author");
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);
    const page = Math.max(parseInt(searchParams.get("page") || "1"), 1);
    const sortBy = searchParams.get("sortBy") || "relevance";

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

    // 🔧 FIX: Get ALL matching results first (no pagination at DB level)
    const searchConditions = buildSearchConditions(query, {
      department,
      year: year ? parseInt(year) : null,
      course,
      author,
    });

    console.log(
      "🔍 Executing search with conditions:",
      JSON.stringify(searchConditions, null, 2),
    );

    // Get all papers matching the search
    const allPapers = await prisma.papers.findMany({
      where: searchConditions,
      orderBy: { created_at: "desc" },
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
    });

    console.log(`📊 Found ${allPapers.length} matching papers from database`);

    // Calculate relevance scores and enhance papers
    const enhancedPapers = allPapers
      .map((paper) => {
        const relevanceScore = calculateRelevanceScore(paper, query);
        const highlights = generateEnhancedHighlights(paper, query);
        const matchedFields = getMatchedFields(paper, query);

        return {
          ...paper,
          relevanceScore,
          highlights,
          matchedFields,
        } as EnhancedPaper;
      })
      .filter((paper) => paper.relevanceScore > 0); // Only include papers with positive relevance

    // Sort by relevance score (descending)
    enhancedPapers.sort((a, b) => b.relevanceScore - a.relevanceScore);

    const totalCount = allPapers.length;
    const totalRelevant = enhancedPapers.length;

    console.log(
      `🎯 ${totalRelevant} relevant results (${totalCount} total matches)`,
    );

    // Apply pagination to the sorted results
    const startIndex = (page - 1) * limit;
    const paginatedResults = enhancedPapers.slice(
      startIndex,
      startIndex + limit,
    );

    const totalPages = Math.ceil(totalRelevant / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    // Generate search suggestions if we have time
    const suggestions =
      totalRelevant < 3 ? await generateSearchSuggestions(query) : [];

    const responseData = {
      success: true,
      results: paginatedResults,
      pagination: {
        total: totalRelevant,
        totalOriginal: totalCount,
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
        resultsFound: paginatedResults.length,
        totalRelevant: totalRelevant,
      },
    };

    console.log(
      `✅ Search completed: ${paginatedResults.length}/${totalRelevant} relevant results (${totalCount} total)`,
    );
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
  // 🔥 NEW: Check if it's an exact match query (trim whitespace first)
  const trimmedQuery = query.trim();
  const isExactMatch =
    trimmedQuery.startsWith('"') &&
    trimmedQuery.endsWith('"') &&
    trimmedQuery.length > 2;

  let queryTerms: string[];
  if (isExactMatch) {
    // 🔥 NEW: For exact match, use the whole phrase (trim after removing quotes)
    queryTerms = [trimmedQuery.slice(1, -1).trim().toLowerCase()];
  } else {
    // 🔧 EXISTING: Regular term extraction (unchanged)
    queryTerms = query
      .toLowerCase()
      .split(/\s+/)
      .filter((term) => term.length > 1);
  }

  const highlights: { title?: string; abstract?: string; author?: string } = {};

  // Enhanced highlight text function that finds the best matching snippet
  const highlightText = (
    text: string | null,
    maxLength: number = 300,
  ): string => {
    if (!text) return "";

    const textLower = text.toLowerCase();

    // Find all positions where query terms appear
    const matches: Match[] = [];

    if (isExactMatch) {
      // 🔥 NEW: For exact match, only look for the complete phrase
      const exactPhrase = queryTerms[0];
      let pos = textLower.indexOf(exactPhrase);
      while (pos !== -1) {
        matches.push({
          start: pos,
          end: pos + exactPhrase.length,
          score: 10, // High score for exact phrase match
          type: "phrase",
        });
        pos = textLower.indexOf(exactPhrase, pos + 1);
      }
    } else {
      // 🔧 EXISTING: Regular search logic for individual terms
      // First, check for exact phrase matches
      const queryLower = query.toLowerCase();
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
    }

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

// Build search conditions with exact match support
function buildSearchConditions(query: string, filters: SearchFilters) {
  const conditions: any[] = [];

  // 🔥 NEW: Check if query is wrapped in quotes for exact match (trim whitespace first)
  const trimmedQuery = query.trim();
  const isExactMatch =
    trimmedQuery.startsWith('"') &&
    trimmedQuery.endsWith('"') &&
    trimmedQuery.length > 2;

  let textSearchConditions: any[] = [];

  if (isExactMatch) {
    // 🔥 NEW: Extract the exact phrase (remove quotes and trim)
    const exactPhrase = trimmedQuery.slice(1, -1).trim().toLowerCase();

    // 🔥 NEW: Create exact match conditions
    textSearchConditions.push(
      { title: { contains: exactPhrase, mode: "insensitive" } },
      { abstract: { contains: exactPhrase, mode: "insensitive" } },
      { author: { contains: exactPhrase, mode: "insensitive" } },
    );

    console.log(`🎯 Exact match search for: "${exactPhrase}"`);
  } else {
    // 🔧 EXISTING: Regular search logic (unchanged)
    const queryTerms = query
      .toLowerCase()
      .split(/\s+/)
      .filter((term) => term.length > 1);

    // Text search conditions
    queryTerms.forEach((term) => {
      textSearchConditions.push(
        { title: { contains: term, mode: "insensitive" } },
        { abstract: { contains: term, mode: "insensitive" } },
        { author: { contains: term, mode: "insensitive" } },
        { keywords: { has: term } },
      );
    });
  }

  if (textSearchConditions.length > 0) {
    conditions.push({ OR: textSearchConditions });
  }

  // 🔧 EXISTING: Additional filters (unchanged)
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

// Calculate relevance score for a paper
function calculateRelevanceScore(paper: Paper, query: string): number {
  let score = 0;
  const queryLower = query.toLowerCase();

  // 🔥 NEW: Check if it's an exact match query (trim whitespace first)
  const trimmedQuery = query.trim();
  const isExactMatch =
    trimmedQuery.startsWith('"') &&
    trimmedQuery.endsWith('"') &&
    trimmedQuery.length > 2;

  if (isExactMatch) {
    // 🔥 NEW: For exact match, only score based on exact phrase presence (trim after removing quotes)
    const exactPhrase = trimmedQuery.slice(1, -1).trim().toLowerCase();

    if (paper.title?.toLowerCase().includes(exactPhrase)) score += 10;
    if (paper.abstract?.toLowerCase().includes(exactPhrase)) score += 8;
    if (paper.author?.toLowerCase().includes(exactPhrase)) score += 6;

    return score;
  }

  // 🔧 EXISTING: Regular scoring logic (unchanged)
  const queryTerms = queryLower.split(/\s+/).filter((term) => term.length > 1);

  // Title matches (highest weight)
  if (paper.title) {
    const titleLower = paper.title.toLowerCase();
    queryTerms.forEach((term) => {
      if (titleLower.includes(term)) {
        score += 5;
      }
    });
  }

  // Abstract matches
  if (paper.abstract) {
    const abstractLower = paper.abstract.toLowerCase();
    queryTerms.forEach((term) => {
      if (abstractLower.includes(term)) {
        score += 3;
      }
    });
  }

  // Author matches
  if (paper.author) {
    const authorLower = paper.author.toLowerCase();
    queryTerms.forEach((term) => {
      if (authorLower.includes(term)) {
        score += 4;
      }
    });
  }

  // Keywords matches
  if (paper.keywords && Array.isArray(paper.keywords)) {
    const keywordsLower = paper.keywords.join(" ").toLowerCase();
    queryTerms.forEach((term) => {
      if (keywordsLower.includes(term)) {
        score += 2;
      }
    });
  }

  return score;
}

// Get matched fields for a paper
function getMatchedFields(paper: Paper, query: string): string[] {
  const matchedFields: string[] = [];
  const queryLower = query.toLowerCase();

  // 🔥 NEW: Check if it's an exact match query (trim whitespace first)
  const trimmedQuery = query.trim();
  const isExactMatch =
    trimmedQuery.startsWith('"') &&
    trimmedQuery.endsWith('"') &&
    trimmedQuery.length > 2;

  if (isExactMatch) {
    // 🔥 NEW: For exact match, check exact phrase presence (trim after removing quotes)
    const exactPhrase = trimmedQuery.slice(1, -1).trim().toLowerCase();

    if (paper.title?.toLowerCase().includes(exactPhrase))
      matchedFields.push("title");
    if (paper.abstract?.toLowerCase().includes(exactPhrase))
      matchedFields.push("abstract");
    if (paper.author?.toLowerCase().includes(exactPhrase))
      matchedFields.push("author");

    return matchedFields;
  }

  // 🔧 EXISTING: Regular field matching logic (unchanged)
  const queryTerms = queryLower.split(/\s+/).filter((term) => term.length > 1);

  queryTerms.forEach((term) => {
    if (
      paper.title?.toLowerCase().includes(term) &&
      !matchedFields.includes("title")
    ) {
      matchedFields.push("title");
    }
    if (
      paper.abstract?.toLowerCase().includes(term) &&
      !matchedFields.includes("abstract")
    ) {
      matchedFields.push("abstract");
    }
    if (
      paper.author?.toLowerCase().includes(term) &&
      !matchedFields.includes("author")
    ) {
      matchedFields.push("author");
    }
    if (
      paper.keywords?.some((keyword) => keyword.toLowerCase().includes(term)) &&
      !matchedFields.includes("keywords")
    ) {
      matchedFields.push("keywords");
    }
  });

  return matchedFields;
}

// Generate search suggestions when few results are found
async function generateSearchSuggestions(query: string): Promise<string[]> {
  const suggestions: string[] = [];

  try {
    // Get common terms from existing papers
    const papers = await prisma.papers.findMany({
      select: { title: true, keywords: true },
      take: 100,
      orderBy: { created_at: "desc" },
    });

    const allTerms = new Set<string>();
    papers.forEach((paper) => {
      if (paper.title) {
        paper.title
          .toLowerCase()
          .split(/\s+/)
          .forEach((term) => {
            if (term.length > 3) allTerms.add(term);
          });
      }
      if (paper.keywords) {
        paper.keywords.forEach((keyword) => {
          if (keyword.length > 3) allTerms.add(keyword.toLowerCase());
        });
      }
    });

    // Find similar terms
    const queryLower = query.toLowerCase();
    const similarTerms = Array.from(allTerms).filter(
      (term) => term.includes(queryLower) || queryLower.includes(term),
    );

    suggestions.push(...similarTerms.slice(0, 3));

    // Add some generic suggestions
    if (suggestions.length < 3) {
      suggestions.push(
        "Try using broader keywords",
        "Check spelling",
        "Use synonyms",
      );
    }
  } catch (error) {
    console.error("Error generating suggestions:", error);
  }

  return suggestions.slice(0, 5);
}
