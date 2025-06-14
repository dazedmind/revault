import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
// import { TfIdf } from 'natural';
import { TfIdf } from '@/lib/tfidf';

// Validate API key
if (!process.env.GROQ_API_KEY) {
  throw new Error('GROQ_API_KEY is not set in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export async function POST(req: Request) {
  try {
    const { text, rawText } = await req.json();

    if (!text || !rawText) {
      return NextResponse.json(
        { error: 'Missing required fields: text and rawText' },
        { status: 400 }
      );
    }

    const prompt = `
      You're an expert at extracting structured metadata from research documents.
      Given the following raw text from a research paper, extract:

      1. The Title (Must be in the format of Title of the paper (Title of the paper must be in uppercase)),
      2. The Author(s) (Usually, followed by the word "by" just extract the names only and separate by comma. Format: Surname, F. M. (APA Format)),
      3. The Abstract. (Get the first paragraph of the abstract or the first 6 sentences. If there is no abstract, generate a short abstract based on the title.)
      4. The Course Subject. (Strictly follow the format of: SIA, Capstone, Compiler Design, Research Writing. If none just write "Cannot Determine")
      5. The Department. (Information Technology, Computer Science)
      6. The Year (must be in the format of YYYY)

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
      ${text}
    `;

    const completion = await openai.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    const raw = completion.choices[0].message.content || '';

    // Attempt to extract just the JSON part
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      return NextResponse.json(
        { error: 'No valid JSON found in LLM response' },
        { status: 500 }
      );
    }
    
    try {
      const parsed = JSON.parse(match[0]);
      // 🔍 TF-IDF Keyword Extraction
      const tfidf = new TfIdf();
      tfidf.addDocument(rawText);

      const terms = tfidf.listTerms(0);
      // Custom stopwords (add more as needed)
      const stopwords = [
        'information', 'technology', 'research', 'using',
        'pamantasan', 'lungsod', 'maynila', 'study',
        'system', 'based', 'data', '2020', '2021', '2022', '2023', '2024', '2025',
        'figure', 'table', 'figures', 'tables', 'will', 'user', 'page', 'book'
      ];

      const topKeywords = terms
        .filter(term =>
          term.term.length > 3 &&
          !stopwords.includes(term.term.toLowerCase()) &&
          !/^\d+$/.test(term.term)
        )
        .slice(0, 5);

      // 🧠 Append keywords to response
      const responseWithKeywords = {
        ...parsed,
        tfidfKeywords: topKeywords.map(t => t.term)
      };

      return NextResponse.json(responseWithKeywords);
    } catch (e) {
      console.error('JSON parsing error:', e);
      return NextResponse.json(
        { error: 'Failed to parse LLM response as JSON' },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('Extraction error:', error);
    return NextResponse.json(
      { error: error.message || 'Extraction failed' },
      { status: 500 }
    );
  }
}