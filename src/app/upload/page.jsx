"use client";
import React, { useState } from 'react';
import NavBar from '../component/NavBar';
import Upload from '@/components/ui/upload-file';
// import { extractTextFromPDF } from '../utils/extractTextFromPDF';

export default function UploadFile() {
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
            // onChange={handleFileUpload}
            name="file-input"
          />
        </div>

        <Upload />

        <div className="mt-8">
          <h3 className="text-lg font-medium text-teal">Detected Title:</h3>
          <input
            type="text"
            className="w-full p-4 mb-6 bg-midnight border outline-0 rounded-md"
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
          />

          <h3 className="text-lg font-medium text-teal">Extracted Text:</h3>
          <textarea
            className="w-full h-48 p-4 bg-midnight border outline-0 rounded-md"
            readOnly
          />
        </div>
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
