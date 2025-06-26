// src/lib/metadata/improved-extractor.js
// Improved non-LLM metadata extraction with better pattern matching

class ImprovedMetadataExtractor {
  constructor() {
    this.patterns = this.initializePatterns();
  }

  initializePatterns() {
    return {
      // Enhanced title patterns - more comprehensive matching
      title: [
        // Title followed by thesis/project indicators
        /^([A-Z][A-Za-z\s\-:,()&.]{10,120}?)(?:\s*(?:A\s+)?(?:thesis|project|research|paper|study|capstone|sia))/im,

        // Standalone title on first lines (all caps or title case)
        /^([A-Z][A-Z\s\-:,()&.]{15,100})\s*$/m,
        /^([A-Z][A-Za-z\s\-:,()&.]{15,100})\s*$(?=\s*\n\s*(?:by|author|student|a\s+thesis|submitted))/im,

        // Title: prefix
        /(?:title|research\s+title)[:\s]*([A-Za-z][A-Za-z\s\-:,()&.]{10,120})/i,

        // First substantial line before common separators
        /^([A-Z][A-Za-z\s\-:,()&.]{15,120})(?=\s*\n\s*(?:by\s+|a\s+thesis|a\s+research|a\s+project|submitted))/im,
      ],

      // Enhanced author patterns
      author: [
        // Standard "By [Name]" patterns
        /(?:by|author[s]?)[:\s]+([A-Z][a-z]+(?:\s+[A-Z]\.?\s*)*[A-Z][a-z]+)/i,

        // Student name patterns
        /(?:student|researcher|prepared\s+by)[:\s]*([A-Z][a-z]+(?:\s+[A-Z]\.?\s*)*[A-Z][a-z]+)/i,

        // Name before thesis/project indicators
        /([A-Z][a-z]+(?:\s+[A-Z]\.?\s*)*[A-Z][a-z]+)\s*(?:thesis|research|project|capstone|sia)/i,

        // Submitted by patterns
        /submitted\s+by[:\s]*([A-Z][a-z]+(?:\s+[A-Z]\.?\s*)*[A-Z][a-z]+)/i,

        // Name patterns with common academic context
        /([A-Z][a-z]+(?:\s+[A-Z]\.?\s*)*[A-Z][a-z]+)\s*\n\s*(?:student|researcher|bachelor|bs|b\.s\.)/i,
      ],

      // Department detection patterns
      department: [
        /(?:department|college|school)\s+of\s+(information\s+technology|computer\s+science)/i,
        /bachelor.*(?:information\s+technology|computer\s+science)/i,
        /(information\s+technology|computer\s+science)\s+department/i,
        /(?:bs|b\.s\.)\s+(?:in\s+)?(information\s+technology|computer\s+science)/i,
        /(it|cs)\s+department/i,
      ],

      // Course-specific patterns with your constraints
      course: {
        // CS Department courses
        cs: [/compiler\s*design/i, /(?:thesis|research)\s*writing/i],

        // IT Department courses
        it: [
          /\bsia\b/i,
          /systems?\s+integration/i,
          /capstone\s*project/i,
          /final\s*project/i,
        ],
      },

      // Year patterns
      year: [
        /(20\d{2})(?=\s*(?:\n|$|[^\d]))/g,
        /(?:academic\s+year|year)[:\s]*(20\d{2})/i,
        /(?:copyright|©|\(c\))\s*(20\d{2})/i,
        /submitted.*?(20\d{2})/i,
      ],

      // Abstract section patterns
      abstract: [
        /(?:abstract|executive\s+summary)[:\s]+([\s\S]{100,1500})(?=\n\s*(?:keywords|introduction|chapter|table|acknowledgment|1\.|I\.))/i,
        /(?:summary)[:\s]+([\s\S]{100,800})(?=\n\s*(?:keywords|introduction|chapter))/i,
      ],
    };
  }

  // Main extraction method
  extractMetadata(rawText) {
    console.log("🔍 Starting improved extraction...");

    // Get text before table of contents for easier parsing
    const textBeforeTOC = this.getTextBeforeTableOfContents(rawText);

    const metadata = {
      extractedTitle: this.extractTitle(textBeforeTOC, rawText),
      extractedAuthor: this.extractAuthor(textBeforeTOC),
      extractedDepartment: this.extractDepartment(textBeforeTOC),
      extractedCourse: this.extractCourse(textBeforeTOC, rawText),
      extractedYear: this.extractYear(textBeforeTOC),
      extractedAbstract: this.extractAbstract(rawText), // Use full text for abstract
      tfidfKeywords: this.extractKeywords(textBeforeTOC),
    };

    return this.validateAndClean(metadata);
  }

  getTextBeforeTableOfContents(text) {
    const tocMarkers = [
      "table of contents",
      "contents",
      "chapter 1",
      "chapter i",
      "introduction",
    ];

    let cutoffPosition = -1;
    let usedMarker = "";

    for (const marker of tocMarkers) {
      const position = text.toLowerCase().indexOf(marker);
      if (
        position !== -1 &&
        (cutoffPosition === -1 || position < cutoffPosition)
      ) {
        cutoffPosition = position;
        usedMarker = marker;
      }
    }

    if (cutoffPosition !== -1) {
      console.log(
        `📋 Using text before "${usedMarker}" (${cutoffPosition} chars)`,
      );
      return text.substring(0, cutoffPosition);
    }

    // Fallback: use first 3000 characters
    return text.substring(0, 3000);
  }

  extractTitle(textBeforeTOC, rawText) {
    console.log("📝 Extracting title...");

    // Try each title pattern
    for (const pattern of this.patterns.title) {
      const match = textBeforeTOC.match(pattern);
      if (match) {
        let title = match[1].trim();

        // Clean up the title
        title = this.cleanTitle(title);

        // Validate title quality
        if (this.isValidTitle(title)) {
          console.log("✅ Title found:", title);
          return title;
        }
      }
    }

    // Fallback: try to get first substantial line
    const lines = textBeforeTOC.split("\n");
    for (const line of lines) {
      const cleaned = line.trim();
      if (
        cleaned.length > 15 &&
        cleaned.length < 120 &&
        this.isValidTitle(cleaned)
      ) {
        console.log("✅ Title found (fallback):", cleaned);
        return this.cleanTitle(cleaned);
      }
    }

    console.log("❌ Title not found");
    return "Cannot Determine";
  }

  extractAuthor(textBeforeTOC) {
    console.log("👤 Extracting author...");

    for (const pattern of this.patterns.author) {
      const match = textBeforeTOC.match(pattern);
      if (match) {
        let author = match[1].trim();

        // Apply accent fixes from your original code
        author = this.fixSplitAccents(author);

        // Format in APA style
        author = this.formatAuthorName(author);

        console.log("✅ Author found:", author);
        return author;
      }
    }

    console.log("❌ Author not found");
    return "Cannot Determine";
  }

  extractDepartment(textBeforeTOC) {
    console.log("🏢 Extracting department...");

    for (const pattern of this.patterns.department) {
      const match = textBeforeTOC.match(pattern);
      if (match) {
        const dept = match[1].toLowerCase();

        if (dept.includes("information technology") || dept.includes("it")) {
          console.log("✅ Department: Information Technology");
          return "Information Technology";
        }

        if (dept.includes("computer science") || dept.includes("cs")) {
          console.log("✅ Department: Computer Science");
          return "Computer Science";
        }
      }
    }

    // Default to IT for PLM context
    console.log("🔄 Department defaulting to Information Technology");
    return "Information Technology";
  }

  extractCourse(textBeforeTOC, rawText) {
    console.log("📚 Extracting course...");

    // First, determine department based on title and content
    const title = this.extractTitle(textBeforeTOC, rawText);
    const isCS = this.isComputerScienceCourse(title, rawText);

    if (isCS) {
      console.log("🔍 Checking CS courses...");

      // Check for "An enhancement" in title -> Thesis Writing
      if (title.toLowerCase().includes("an enhancement")) {
        console.log(
          '✅ Course: Thesis Writing (CS - title contains "an enhancement")',
        );
        return "Thesis Writing";
      }

      // Check for "Compiler" in raw text -> Compiler Design
      if (/compiler/i.test(rawText)) {
        console.log('✅ Course: Compiler Design (CS - contains "compiler")');
        return "Compiler Design";
      }

      // Default CS course
      console.log("✅ Course: Thesis Writing (CS - default)");
      return "Thesis Writing";
    } else {
      console.log("🔍 Checking IT courses...");

      // IT Department - check for SIA or Capstone
      for (const pattern of this.patterns.course.it) {
        if (pattern.test(textBeforeTOC) || pattern.test(rawText)) {
          if (
            /\bsia\b|systems?\s+integration/i.test(textBeforeTOC) ||
            /\bsia\b|systems?\s+integration/i.test(rawText)
          ) {
            console.log("✅ Course: SIA (IT)");
            return "SIA";
          }

          if (
            /capstone|final\s*project/i.test(textBeforeTOC) ||
            /capstone|final\s*project/i.test(rawText)
          ) {
            console.log("✅ Course: Capstone Project (IT)");
            return "Capstone Project";
          }
        }
      }

      // Default IT course
      console.log("✅ Course: SIA (IT - default)");
      return "SIA";
    }
  }

  isComputerScienceCourse(title, rawText) {
    // Check title for "An enhancement" pattern (CS indicator)
    if (title.toLowerCase().includes("an enhancement")) {
      return true;
    }

    // Check for compiler-related content (CS indicator)
    if (/compiler/i.test(rawText)) {
      return true;
    }

    // Check for explicit CS department mentions
    if (/computer\s*science|cs\s*department/i.test(rawText)) {
      return true;
    }

    // Default to IT
    return false;
  }

  extractYear(textBeforeTOC) {
    console.log("📅 Extracting year...");

    const years = [];
    const currentYear = new Date().getFullYear();

    for (const pattern of this.patterns.year) {
      const matches = textBeforeTOC.matchAll(pattern);
      for (const match of matches) {
        const year = parseInt(match[1]);
        if (year >= 2015 && year <= currentYear + 2) {
          years.push(year);
        }
      }
    }

    if (years.length > 0) {
      // Use most recent year
      const mostRecent = Math.max(...years);
      console.log("✅ Year found:", mostRecent);
      return mostRecent.toString();
    }

    // Fallback to current year
    console.log("🔄 Year defaulting to current year");
    return currentYear.toString();
  }

  extractAbstract(fullText) {
    console.log("📄 Extracting abstract...");

    for (const pattern of this.patterns.abstract) {
      const match = fullText.match(pattern);
      if (match) {
        let abstract = match[1].trim();

        // Clean up the abstract
        abstract = abstract.replace(/\s+/g, " ").replace(/\n+/g, " ").trim();

        // Limit length
        if (abstract.length > 500) {
          abstract = abstract.substring(0, 497) + "...";
        }

        if (abstract.length > 100) {
          console.log("✅ Abstract found:", abstract.substring(0, 100) + "...");
          return abstract;
        }
      }
    }

    console.log("❌ Abstract not found");
    return "Cannot Determine";
  }

  extractKeywords(text) {
    console.log("🏷️ Extracting keywords...");

    // Simple keyword extraction based on frequency and relevance
    const words = text.toLowerCase().match(/\b[a-z]{4,15}\b/g) || [];

    const stopwords = new Set([
      "system",
      "using",
      "data",
      "information",
      "technology",
      "research",
      "study",
      "analysis",
      "method",
      "approach",
      "university",
      "college",
      "student",
      "paper",
      "project",
      "development",
      "application",
      "thesis",
      "pamantasan",
      "lungsod",
      "maynila",
      "department",
      "bachelor",
    ]);

    const techTerms = new Set([
      "web",
      "mobile",
      "database",
      "software",
      "network",
      "security",
      "algorithm",
      "programming",
      "design",
      "interface",
      "platform",
      "framework",
      "artificial",
      "intelligence",
      "machine",
      "learning",
    ]);

    const wordCount = {};
    words.forEach((word) => {
      if (!stopwords.has(word) && word.length > 3) {
        wordCount[word] = (wordCount[word] || 0) + 1;
        // Boost technical terms
        if (techTerms.has(word)) {
          wordCount[word] += 2;
        }
      }
    });

    const keywords = Object.entries(wordCount)
      .filter(([word, count]) => count > 1)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([word]) => this.capitalizeWord(word));

    console.log("✅ Keywords extracted:", keywords);
    return keywords;
  }

  // Utility methods
  cleanTitle(title) {
    return title
      .replace(/^\s*(?:title|research\s*title)[:\s]*/i, "")
      .replace(/\s{2,}/g, " ")
      .replace(/[.,;:]$/, "")
      .trim();
  }

  isValidTitle(title) {
    return (
      title.length >= 10 &&
      title.length <= 150 &&
      !/^(?:chapter|section|table|figure|page|\d+)/i.test(title) &&
      !/^(?:abstract|introduction|methodology|conclusion)/i.test(title) &&
      /[a-zA-Z]/.test(title)
    );
  }

  fixSplitAccents(text) {
    return text
      .replace(/n\s*̃\s*a/gi, "ña")
      .replace(/([A-Za-z])\s*ñ\s*([A-Za-z])/gi, "$1ñ$2")
      .replace(/([A-Za-z])\s*é\s*([A-Za-z])/gi, "$1é$2")
      .replace(/([A-Za-z])\s*á\s*([A-Za-z])/gi, "$1á$2")
      .replace(/([A-Za-z])\s*í\s*([A-Za-z])/gi, "$1í$2")
      .replace(/([A-Za-z])\s*ó\s*([A-Za-z])/gi, "$1ó$2")
      .replace(/([A-Za-z])\s*ú\s*([A-Za-z])/gi, "$1ú$2");
  }

  formatAuthorName(name) {
    // Remove prefixes and clean
    const cleaned = name
      .replace(/^(?:by|author|student|researcher)[:\s]*/i, "")
      .trim();

    // Try to format as "Last, F. M." (APA style)
    const parts = cleaned.split(/\s+/);
    if (parts.length >= 2 && !cleaned.includes(",")) {
      const lastName = parts[parts.length - 1];
      const firstNames = parts.slice(0, -1);
      const initials = firstNames
        .map((n) => n.charAt(0).toUpperCase() + ".")
        .join(" ");
      return `${lastName}, ${initials}`;
    }

    return cleaned;
  }

  capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  validateAndClean(metadata) {
    // Ensure all fields have valid values
    Object.keys(metadata).forEach((key) => {
      if (typeof metadata[key] === "string") {
        metadata[key] = metadata[key].trim();
        if (metadata[key] === "" || metadata[key] === "undefined") {
          metadata[key] = "Cannot Determine";
        }
      }
    });

    // Special handling for year
    const year = parseInt(metadata.extractedYear);
    if (isNaN(year) || year < 2015 || year > new Date().getFullYear() + 5) {
      metadata.extractedYear = new Date().getFullYear().toString();
    }

    // Ensure keywords is array
    if (!Array.isArray(metadata.tfidfKeywords)) {
      metadata.tfidfKeywords = [];
    }

    return metadata;
  }
}

// Export for use in your application
export default ImprovedMetadataExtractor;
