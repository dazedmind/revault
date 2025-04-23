"use client";
import React, { useState } from 'react';
import NavBar from '../component/NavBar';
import Upload from '@/components/ui/upload-file';
import pdfToText from 'react-pdftotext';
import { useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';

export default function UploadFile() {
  const [title, setTitle] = useState('');
  const [fullText, setFullText] = useState('');
  const [authors, setAuthors] = useState(''); // Add authors state
  const [key, setKey] = useState(Date.now()); // forces re-render of input
  const ref = useRef();
  
  function fixSplitAccents(text) {
    return text
      // Common accents accidentally separated by spaces
      .replace(/n\s*̃\s*a/gi, 'ña') // if ñ was broken down (rare but can happen)
      .replace(/([A-Za-z])\s*ñ\s*([A-Za-z])/gi, '$1ñ$2') // general case for ñ
      .replace(/([A-Za-z])\s*é\s*([A-Za-z])/gi, '$1é$2') // general case for é
      .replace(/([A-Za-z])\s*á\s*([A-Za-z])/gi, '$1á$2')
      .replace(/([A-Za-z])\s*í\s*([A-Za-z])/gi, '$1í$2')
      .replace(/([A-Za-z])\s*ó\s*([A-Za-z])/gi, '$1ó$2')
      .replace(/([A-Za-z])\s*ú\s*([A-Za-z])/gi, '$1ú$2');
  }

  async function extractText(event) {
    const file = event.target.files[0];
    if (!file || file.type !== 'application/pdf') return;
  
    try {
      const rawText = await pdfToText(file);
  
      // Step 1: Sanitize the raw text
      const sanitized = rawText
      .replace(/([a-z])\s+([a-z])/g, '$1$2') // only join lowercase letters
      .replace(/\s+/g, ' ')                         // collapse multiple spaces
        .replace(/\n/g, ' ')                          // remove line breaks
        .trim();
  
        // Step 2: Title Extraction with fallback
        let title = 'Title not found';

        // Use sanitized version to find match

        const rawStart = rawText.indexOf('Pamantasan ng Lungsod ng Maynila');
        const rawEnd = rawText.toLowerCase().indexOf('a thesis', rawStart);
        
        if (rawStart !== -1 && rawEnd !== -1 && rawEnd > rawStart) {
          title = rawText.substring(rawStart + 'Pamantasan ng Lungsod ng Maynila'.length, rawEnd)
            .replace(/\s+/g, ' ')
            .trim();
        } else {
          const fallbackEnd = rawText.toLowerCase().indexOf('a thesis');
          if (fallbackEnd !== -1) {
            title = rawText.substring(0, fallbackEnd)
              .replace(/\s+/g, ' ')
              .trim();
          }
        }
        
        setTitle(title);

  
      // Step 3: Author Extraction and Fix Accents
      const authorMatch = sanitized.match(/By\s+(.*?)\s+Thesis\s+Adviser/i);
      const extractedAuthors = authorMatch && authorMatch[1]
        ? authorMatch[1].trim()
        : 'Authors not found';
  
      const fixedAuthors = fixSplitAccents(extractedAuthors).replace(/\s{2,}/g, ' ').trim();
  
      // Step 4: Set States
      setTitle(title);
      setAuthors(fixedAuthors);
      setFullText(sanitized);
  
    } catch (error) {
      console.error('Error extracting text:', error);
    }
  }
  

  const handleClearFile = () => {
    if (ref.current) {
      ref.current.value = ''; // Clear the file input
    }
    setTitle(''); // Clear the detected title
    setFullText(''); // Clear the extracted text
    setAuthors(''); // Clear the authors
    setKey(Date.now()); // Update key to force re-render
  };

  return (
    <div className="bg-midnight">
      <NavBar />
      <main className="p-8 mx-12">

        <div>
          <h1 className="font-bold text-3xl mb-6">Upload Research Paper</h1>
        </div>

        <div>
          <input
            type="file"
            className="p-10 px-40 border-2 border-dashed border-teal rounded-md"
            accept="application/pdf"
            onChange={extractText}
            name="file-input"
            key={ref}
            readOnly
          />
        <button
          onClick={handleClearFile}
          className="ml-4 px-4 py-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-md"
        >
          Remove File
        </button>
        </div>

        <div className="flex flex-col gap-8 mt-8">
          <span className='flex flex-col gap-2'>
            <h3 className="text-md font-medium text-teal">Research Title:</h3>
              <textarea
                className="p-4 bg-midnight border border-white-5 rounded-md w-4xl outline-0"
                value={title}
                readOnly
              />
          </span>

          <span className='flex flex-col gap-2'>
            <h3 className="text-md font-medium text-teal">Authors:</h3>
            <input
              type="text"
              className="p-4 bg-midnight border border-white-5 rounded-md w-4xl outline-0"
              value={authors}
              readOnly
            />
          </span>
      
          <span className='flex flex-col gap-2'>
            <h3 className="text-md font-medium text-teal">Keywords:</h3>
            <input
              type="text"
              className="p-4 bg-midnight border border-white-5 rounded-md w-4xl outline-0"
            />
          </span>

          <span className='flex flex-col gap-2'>
              <label htmlFor="tags">Tags</label>

              <div className='tags-card flex gap-4 items-center align-middle'>
                <div className='flex gap-2 items-center align-middle bg-dusk w-auto p-2 text-sm rounded-md'>
                  <p>Information Technology</p>
                  <button className='bg-white-5 p-1 rounded-full cursor-pointer text-xs'>x</button>
                </div>
                <div className='flex gap-2 items-center align-middle text-center bg-dusk w-auto p-2 text-sm rounded-md'>
                  <p>SIA</p>
                  <button className='bg-white-5 p-1 rounded-full cursor-pointer text-xs'>x</button>
                </div>
                <div className='flex gap-2 items-center align-middle bg-teal w-auto p-2 text-sm rounded-md'>
                  <button className=' p-1 rounded-full cursor-pointer text-xs'>Add +</button>
                </div>
              </div>
          </span>

          <span className='flex flex-col gap-2'>
            <h3 className="text-md font-medium text-teal">Abstract:</h3>
            <textarea
              className="p-4 bg-midnight border border-white-5 rounded-md w-4xl h-64 outline-0"
              value={fullText}
              readOnly
            />
          </span>
        </div>

        {/* <Upload /> */}

      </main>

      <div className="flex justify-between items-center bg-darker p-12 px-24 border-t-2 border-dashed border-white-5">
        <span className="flex flex-col gap-2">
          <div className="flex flex-row mt-4">
            <input type="checkbox" />
            <p className="font-inter text-sm ml-1">
              By uploading your research paper, you agree to our{' '}
              <span className="text-teal">Terms and Privacy Policy</span> and consent to its publication.
            </p>
          </div>
        </span>

        <span>
          <button className="bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br p-2 px-8 font-sans flex items-center gap-2 rounded-lg cursor-pointer">
            Upload
          </button>
        </span>
      </div>
    </div>
  );
}
