import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { TfIdf } from '@/lib/tfidf';
import EnhancedAutoTagger from '@/lib/tfidf/enhanced-tagger';

// Validate API key
if (!process.env.GROQ_API_KEY) {
  throw new Error('GROQ_API_KEY is not set in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

// Function to intelligently extract the most relevant parts of the text
function extractRelevantSections(text: string, maxChars: number = 8000): string {
  const sections = [];
  const lowerText = text.toLowerCase();
  
  // 1. Extract title section (first 1000 characters usually contain title)
  const titleSection = text.substring(0, 1000);
  sections.push('TITLE SECTION:\n' + titleSection);
  
  // 2. Look for abstract section
  const abstractStart = lowerText.indexOf('abstract');
  if (abstractStart !== -1) {
    const abstractEnd = Math.min(abstractStart + 2000, text.length);
    const abstractSection = text.substring(abstractStart, abstractEnd);
    sections.push('\nABSTRACT SECTION:\n' + abstractSection);
  }
  
  // 3. Look for author information (usually near the beginning)
  const authorKeywords = ['by ', 'author', 'researcher', 'student'];
  for (const keyword of authorKeywords) {
    const keywordIndex = lowerText.indexOf(keyword);
    if (keywordIndex !== -1 && keywordIndex < 2000) {
      const authorStart = Math.max(0, keywordIndex - 200);
      const authorEnd = Math.min(keywordIndex + 500, text.length);
      const authorSection = text.substring(authorStart, authorEnd);
      sections.push('\nAUTHOR SECTION:\n' + authorSection);
      break;
    }
  }
  
  // 4. Look for course/department information
  const courseKeywords = ['course', 'department', 'college', 'university', 'capstone', 'thesis', 'sia'];
  for (const keyword of courseKeywords) {
    const keywordIndex = lowerText.indexOf(keyword);
    if (keywordIndex !== -1) {
      const courseStart = Math.max(0, keywordIndex - 100);
      const courseEnd = Math.min(keywordIndex + 300, text.length);
      const courseSection = text.substring(courseStart, courseEnd);
      sections.push('\nCOURSE/DEPT SECTION:\n' + courseSection);
      break;
    }
  }
  
  // 5. Look for year information
  const yearPattern = /20\d{2}/g;
  const years = text.match(yearPattern);
  if (years && years.length > 0) {
    const firstYearIndex = text.indexOf(years[0]);
    const yearStart = Math.max(0, firstYearIndex - 100);
    const yearEnd = Math.min(firstYearIndex + 200, text.length);
    const yearSection = text.substring(yearStart, yearEnd);
    sections.push('\nYEAR SECTION:\n' + yearSection);
  }
  
  // Combine sections and trim if necessary
  let combinedText = sections.join('\n\n');
  
  if (combinedText.length > maxChars) {
    // If still too long, prioritize title and abstract
    const titleAndAbstract = sections.slice(0, 2).join('\n\n');
    if (titleAndAbstract.length <= maxChars) {
      combinedText = titleAndAbstract;
    } else {
      // Just take the first part
      combinedText = text.substring(0, maxChars);
    }
  }
  
  return combinedText;
}

// Function to estimate token count (rough approximation: 1 token ≈ 4 characters)
function estimateTokenCount(text: string): number {
  return Math.ceil(text.length / 4);
}

export async function POST(req: Request) {
  try {
    const { text, rawText } = await req.json();

    if (!text || !rawText) {
      return NextResponse.json(
        { error: 'Missing required fields: text and rawText' },
        { status: 400 }
      );
    }

    console.log('📊 Original text length:', text.length, 'characters');
    console.log('📊 Raw text length:', rawText.length, 'characters');

    // Extract relevant sections and limit text size
    const relevantText = extractRelevantSections(text, 8000); // ~2000 tokens
    const estimatedTokens = estimateTokenCount(relevantText);
    
    console.log('📊 Processed text length:', relevantText.length, 'characters');
    console.log('📊 Estimated tokens:', estimatedTokens);

    // Safety check - if still too many tokens, truncate further
    if (estimatedTokens > 2000) {
      const truncatedText = relevantText.substring(0, 6000); // ~1500 tokens
      console.log('⚠️ Text truncated further to:', truncatedText.length, 'characters');
    }

    const finalText = estimatedTokens > 2000 ? relevantText.substring(0, 6000) : relevantText;

    const prompt = `
      You're an expert at extracting structured metadata from research documents.
      Given the following extracted sections from a research paper, extract:

      1. The Title (Must be in the format of Title of the paper (Title of the paper must be in uppercase))
      2. The Author(s) (Usually followed by the word "by", extract names only and separate by comma. Format: Surname, F. M. (APA Format))
      3. The Abstract (Get the first paragraph of the abstract or the first 6 sentences. If there is no abstract, generate a short abstract based on the title minimum of 100 words.)
      4. The Course Subject (Strictly follow the format: SIA, Capstone, Compiler Design, Research Writing. If none, write "Cannot Determine")
      5. The Department (Information Technology, Computer Science)
      6. The Year (must be in the format YYYY)

      Return the result strictly in this JSON format and **nothing else**:

      {
        "extractedTitle": "...",
        "extractedAuthor": "...",
        "extractedAbstract": "...",
        "extractedCourse": "...",
        "extractedDepartment": "...",
        "extractedYear": "..."
      }

      Only respond with valid JSON. Do not include explanations or any extra formatting.

      DOCUMENT SECTIONS:
      ${finalText}
    `;

    console.log('🚀 Sending request to Groq API...');

    const completion = await openai.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 1000, // Limit response tokens
    });

    const raw = completion.choices[0].message.content || '';
    console.log('📨 Received response from Groq API');

    // Attempt to extract just the JSON part
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      console.error('❌ No valid JSON found in LLM response:', raw);
      return NextResponse.json(
        { error: 'No valid JSON found in LLM response' },
        { status: 500 }
      );
    }
    
    try {
      const parsed = JSON.parse(match[0]);
      console.log('✅ Successfully parsed LLM response');
      
      // 🔍 TF-IDF Keyword Extraction (use original rawText for better keyword extraction)
      console.log('🔍 Extracting keywords using TF-IDF...');
      const tfidf = new EnhancedAutoTagger();
      
      // Limit rawText for keyword extraction too if it's very large
      const keywordText = rawText.length > 50000 ? rawText.substring(0, 50000) : rawText;
      const terms = tfidf.extractTfIdfKeywords(keywordText, 10);

      // Custom stopwords (add more as needed)
      const stopwords = [
        'information', 'technology', 'research', 'using',
        'pamantasan', 'lungsod', 'maynila', 'study',
        'system', 'based', 'data', '2020', '2021', '2022', '2023', '2024', '2025',
        'figure', 'table', 'figures', 'tables', 'will', 'user', 'page', 'book', 'datasets', 'dataset',
      ];

      const topKeywords = terms
        .filter(term =>
          term.term.length > 3 &&
          !stopwords.includes(term.term.toLowerCase()) &&
          !/^\d+$/.test(term.term)
        )
        .slice(0, 5);

      console.log('✅ Keywords extracted:', topKeywords.map(t => t.term));

      // 🧠 Append keywords to response
      const responseWithKeywords = {
        ...parsed,
        tfidfKeywords: topKeywords.map(t => t.term)
      };

      return NextResponse.json(responseWithKeywords);
    } catch (e) {
      console.error('❌ JSON parsing error:', e);
      console.error('Raw response:', raw);
      return NextResponse.json(
        { error: 'Failed to parse LLM response as JSON' },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('❌ Extraction error:', error);
    
    // Check if it's a token limit error
    if (error.message && error.message.includes('Request too large')) {
      return NextResponse.json(
        { 
          error: 'Document too large for processing. Please try with a smaller document or contact support.',
          code: 'DOCUMENT_TOO_LARGE'
        },
        { status: 413 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Extraction failed' },
      { status: 500 }
    );
  }
}