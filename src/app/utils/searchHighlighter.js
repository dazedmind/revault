/**
 * Enhanced text highlighter that supports multiple query terms and smart matching
 */
export class SearchHighlighter {
  constructor(options = {}) {
    this.options = {
      caseSensitive: false,
      highlightClass: "search-highlight",
      maxSnippetLength: 200,
      contextWords: 3,
      ...options,
    };
  }

  /**
   * Highlight search terms in text with smart matching
   * @param {string} text - Text to highlight
   * @param {string} query - Search query
   * @param {object} options - Override default options
   * @returns {string} HTML string with highlighted terms
   */
  highlight(text, query, options = {}) {
    if (!text || !query) return text;

    const opts = { ...this.options, ...options };
    const queryTerms = this.extractQueryTerms(query);

    if (queryTerms.length === 0) return text;

    // Create a regex pattern that matches any of the query terms
    const pattern = this.createSearchPattern(queryTerms, opts.caseSensitive);

    if (!pattern) return text;

    // Highlight matches
    return text.replace(pattern, (match) => {
      return `<mark class="${opts.highlightClass}">${match}</mark>`;
    });
  }

  /**
   * Create smart snippet with highlighted terms and context
   * @param {string} text - Full text
   * @param {string} query - Search query
   * @param {object} options - Options for snippet generation
   * @returns {object} Object with snippet and metadata
   */
  createSnippet(text, query, options = {}) {
    if (!text || !query) {
      return {
        snippet: text?.substring(0, this.options.maxSnippetLength) || "",
        hasMatch: false,
        matchCount: 0,
      };
    }

    const opts = { ...this.options, ...options };
    const queryTerms = this.extractQueryTerms(query);
    const pattern = this.createSearchPattern(queryTerms, opts.caseSensitive);

    if (!pattern) {
      return {
        snippet: text.substring(0, opts.maxSnippetLength),
        hasMatch: false,
        matchCount: 0,
      };
    }

    // Find all matches with their positions
    const matches = Array.from(text.matchAll(pattern));

    if (matches.length === 0) {
      return {
        snippet: text.substring(0, opts.maxSnippetLength),
        hasMatch: false,
        matchCount: 0,
      };
    }

    // Find the best snippet containing the most relevant match
    const bestMatch = this.findBestMatch(text, matches, opts);
    const snippet = this.highlight(bestMatch.text, query, opts);

    return {
      snippet: snippet,
      hasMatch: true,
      matchCount: matches.length,
      position: bestMatch.position,
      score: bestMatch.score,
    };
  }

  /**
   * Extract meaningful terms from search query with exact match support
   * @param {string} query - Search query
   * @returns {string[]} Array of search terms
   */
  extractQueryTerms(query) {
    // 🔥 NEW: Check for exact match (quoted query) - trim whitespace first
    const trimmedQuery = query.trim();
    const isExactMatch =
      trimmedQuery.startsWith('"') &&
      trimmedQuery.endsWith('"') &&
      trimmedQuery.length > 2;

    if (isExactMatch) {
      // 🔥 NEW: Return the exact phrase as a single term (trim after removing quotes)
      return [trimmedQuery.slice(1, -1).trim().toLowerCase()];
    }

    // 🔧 EXISTING: Regular term extraction (unchanged)
    const terms = query
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((term) => term.length > 1); // Ignore single characters

    // Remove common stop words
    const stopWords = new Set([
      "the",
      "and",
      "or",
      "but",
      "in",
      "on",
      "at",
      "to",
      "for",
      "of",
      "with",
      "by",
    ]);

    return terms.filter((term) => !stopWords.has(term));
  }

  /**
   * Create regex pattern for highlighting with exact match support
   * @param {string[]} terms - Search terms
   * @param {boolean} caseSensitive - Case sensitivity
   * @returns {RegExp|null} Regex pattern
   */
  createSearchPattern(terms, caseSensitive = false) {
    if (!terms.length) return null;

    // 🔥 NEW: Check if we have a single term that might be an exact phrase
    if (terms.length === 1 && terms[0].includes(" ")) {
      // This is likely an exact phrase from quoted search
      const phrase = terms[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const flags = caseSensitive ? "g" : "gi";
      return new RegExp(phrase, flags);
    }

    // 🔧 EXISTING: Regular pattern creation (unchanged)
    // Escape special regex characters
    const escapedTerms = terms.map((term) =>
      term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    );

    // Create pattern that matches whole words or partial matches
    const pattern = escapedTerms
      .map((term) => `\\b${term}\\w*|${term}`)
      .join("|");

    const flags = caseSensitive ? "g" : "gi";

    try {
      return new RegExp(`(${pattern})`, flags);
    } catch (error) {
      console.warn("Invalid regex pattern:", error);
      return null;
    }
  }

  /**
   * Find the best snippet containing search matches
   * @param {string} text - Full text
   * @param {Array} matches - Regex matches
   * @param {object} options - Options
   * @returns {object} Best snippet info
   */
  findBestMatch(text, matches, options) {
    const maxLength = options.maxSnippetLength || 200;
    const contextWords = options.contextWords || 3;

    // Score matches based on position (earlier is better) and term frequency
    const scoredMatches = matches.map((match, index) => ({
      match,
      index,
      position: match.index,
      // Earlier matches and exact matches get higher scores
      score: 1 / (match.index + 1) + match[0].length / text.length,
    }));

    // Sort by score (highest first)
    scoredMatches.sort((a, b) => b.score - a.score);

    const bestMatch = scoredMatches[0];
    const matchPosition = bestMatch.position;

    // Calculate snippet boundaries
    const words = text.split(/\s+/);
    let wordIndex = 0;
    let charCount = 0;

    // Find word index for match position
    for (let i = 0; i < words.length; i++) {
      if (charCount >= matchPosition) {
        wordIndex = i;
        break;
      }
      charCount += words[i].length + 1; // +1 for space
    }

    // Calculate snippet boundaries
    const startWord = Math.max(0, wordIndex - contextWords);
    const endWord = Math.min(words.length, wordIndex + contextWords + 5);

    let snippetText = words.slice(startWord, endWord).join(" ");

    // Trim to max length if needed
    if (snippetText.length > maxLength) {
      snippetText = snippetText.substring(0, maxLength - 3) + "...";
    }

    // Add ellipsis if we're not at the beginning/end
    if (startWord > 0) snippetText = "..." + snippetText;
    if (endWord < words.length && snippetText.length < maxLength - 3) {
      snippetText = snippetText + "...";
    }

    return {
      text: snippetText,
      position: matchPosition,
      score: bestMatch.score,
    };
  }
}
