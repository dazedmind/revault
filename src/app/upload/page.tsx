"use client";
import NavBar from "../component/NavBar";
import Upload from "@/components/ui/upload-file";
import pdfToText from "react-pdftotext";
import { useEffect, useRef, useState } from "react";
import AdminNavBar from "../admin/components/AdminNavBar";
import ImprovedMetadataExtractor from "@/lib/metadata/improved-extractor";

const UploadFile = () => {
  const [title, setTitle] = useState("");
  const [fullText, setFullText] = useState("");
  const [authors, setAuthors] = useState("");
  const [course, setCourse] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [extractionStatus, setExtractionStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [key, setKey] = useState(Date.now());
  const ref = useRef<HTMLInputElement>(null);

  // Initialize the improved extractor
  const extractor = new ImprovedMetadataExtractor();

  async function extractText(event) {
    const file = event.target.files[0];
    if (!file || file.type !== "application/pdf") return;

    setIsProcessing(true);
    setExtractionStatus("📄 Reading PDF file...");

    try {
      // Extract raw text from PDF
      const rawText = await pdfToText(file);

      setExtractionStatus("🔍 Analyzing document structure...");
      console.log("📊 Extracted text length:", rawText.length, "characters");

      // Use the improved extractor
      const extractedMetadata = extractor.extractMetadata(rawText);

      setExtractionStatus("✅ Extraction completed!");

      // Set all extracted values
      setTitle(extractedMetadata.extractedTitle);
      setAuthors(extractedMetadata.extractedAuthor);
      setCourse(extractedMetadata.extractedCourse);
      setDepartment(extractedMetadata.extractedDepartment);
      setYear(extractedMetadata.extractedYear);
      setKeywords(extractedMetadata.tfidfKeywords || []);

      // Set the abstract/full text for display
      if (extractedMetadata.extractedAbstract !== "Cannot Determine") {
        setFullText(extractedMetadata.extractedAbstract);
      } else {
        // Fallback to first part of the document
        const textBeforeTOC = extractor.getTextBeforeTableOfContents(rawText);
        setFullText(textBeforeTOC.substring(0, 1000));
      }

      // Log extraction results for debugging
      console.log("📋 Extraction Results:", {
        title: extractedMetadata.extractedTitle,
        author: extractedMetadata.extractedAuthor,
        course: extractedMetadata.extractedCourse,
        department: extractedMetadata.extractedDepartment,
        year: extractedMetadata.extractedYear,
        keywords: extractedMetadata.tfidfKeywords,
      });

      // Clear status after 3 seconds
      setTimeout(() => setExtractionStatus(""), 3000);
    } catch (error) {
      console.error("❌ Error extracting text:", error);
      setExtractionStatus("❌ Extraction failed. Please fill manually.");

      // Clear error status after 5 seconds
      setTimeout(() => setExtractionStatus(""), 5000);
    } finally {
      setIsProcessing(false);
    }
  }

  const handleClearFile = () => {
    if (ref.current) {
      ref.current.value = "";
    }
    setTitle("");
    setFullText("");
    setAuthors("");
    setCourse("");
    setDepartment("");
    setYear("");
    setKeywords([]);
    setExtractionStatus("");
    setKey(Date.now());
  };

  const removeKeyword = (indexToRemove) => {
    setKeywords(keywords.filter((_, index) => index !== indexToRemove));
  };

  const addKeyword = (newKeyword) => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
    }
  };

  return (
    <div className="bg-midnight">
      <AdminNavBar />
      <main className="p-8 mx-12">
        <div>
          <h1 className="font-bold text-3xl mb-6">Upload Research Paper</h1>
          <p className="text-white-50 mb-6">
            Upload your PDF and let our improved extraction system automatically
            detect metadata
          </p>
        </div>

        {/* File Upload Section */}
        <div className="mb-6">
          <input
            ref={ref}
            type="file"
            className="p-10 px-40 border-2 border-dashed border-teal rounded-md"
            accept="application/pdf"
            onChange={extractText}
            name="file-input"
            key={key}
            disabled={isProcessing}
          />

          <button
            onClick={handleClearFile}
            className="ml-4 px-4 py-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-md disabled:opacity-50"
            disabled={isProcessing}
          >
            Remove File
          </button>
        </div>

        <label htmlFor="file-input" className="text-sm text-white-50">
          File type: .pdf only (Maximum file size: 50MB)
        </label>

        {/* Extraction Status */}
        {(isProcessing || extractionStatus) && (
          <div className="mt-4 p-3 bg-dusk rounded-lg border border-white-5">
            <div className="flex items-center gap-2">
              {isProcessing && (
                <div className="animate-spin w-4 h-4 border-2 border-teal border-t-transparent rounded-full"></div>
              )}
              <span className="text-sm text-white-75">{extractionStatus}</span>
            </div>
          </div>
        )}

        {/* Extracted Metadata Display */}
        <div className="flex flex-col gap-8 mt-8">
          {/* Title */}
          <span className="flex flex-col gap-2">
            <h3 className="text-md font-medium text-teal">Research Title:</h3>
            <textarea
              className="p-4 bg-midnight border border-white-5 rounded-md w-4xl outline-0 min-h-[80px]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title will be extracted automatically or enter manually"
            />
          </span>

          {/* Authors */}
          <span className="flex flex-col gap-2">
            <h3 className="text-md font-medium text-teal">Authors:</h3>
            <input
              type="text"
              className="p-4 bg-midnight border border-white-5 rounded-md w-4xl outline-0"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              placeholder="Author will be extracted automatically or enter manually"
            />
          </span>

          {/* Course and Department */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <span className="flex flex-col gap-2">
              <h3 className="text-md font-medium text-teal">Course:</h3>
              <select
                className="p-4 bg-midnight border border-white-5 rounded-md outline-0"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value="">Select Course</option>
                <option value="SIA">SIA</option>
                <option value="Capstone Project">Capstone Project</option>
                <option value="Compiler Design">Compiler Design</option>
                <option value="Thesis Writing">Thesis Writing</option>
              </select>
            </span>

            <span className="flex flex-col gap-2">
              <h3 className="text-md font-medium text-teal">Department:</h3>
              <select
                className="p-4 bg-midnight border border-white-5 rounded-md outline-0"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Computer Science">Computer Science</option>
              </select>
            </span>

            <span className="flex flex-col gap-2">
              <h3 className="text-md font-medium text-teal">Year:</h3>
              <input
                type="number"
                className="p-4 bg-midnight border border-white-5 rounded-md outline-0"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2024"
                min="2015"
                max={new Date().getFullYear() + 5}
              />
            </span>
          </div>

          {/* Keywords */}
          <span className="flex flex-col gap-2">
            <h3 className="text-md font-medium text-teal">Keywords:</h3>
            <div className="tags-card flex gap-2 items-center align-middle flex-wrap">
              {keywords.map((keyword, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center align-middle bg-dusk w-auto p-2 text-sm rounded-md"
                >
                  <p>{keyword}</p>
                  <button
                    onClick={() => removeKeyword(index)}
                    className="bg-white-5 p-1 rounded-full cursor-pointer text-xs hover:bg-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}

              <div className="flex gap-2 items-center align-middle bg-teal w-auto p-2 text-sm rounded-md">
                <button
                  onClick={() => {
                    const newKeyword = prompt("Enter new keyword:");
                    if (newKeyword) addKeyword(newKeyword);
                  }}
                  className="p-1 rounded-full cursor-pointer text-xs"
                >
                  Add +
                </button>
              </div>
            </div>
          </span>

          {/* Pre-filled Tags based on course/department */}
          <span className="flex flex-col gap-2">
            <label htmlFor="tags">Suggested Tags</label>
            <div className="tags-card flex gap-4 items-center align-middle">
              <div className="flex gap-2 items-center align-middle bg-dusk w-auto p-2 text-sm rounded-md">
                <p>{department || "Information Technology"}</p>
                <button className="bg-white-5 p-1 rounded-full cursor-pointer text-xs">
                  ×
                </button>
              </div>
              <div className="flex gap-2 items-center align-middle text-center bg-dusk w-auto p-2 text-sm rounded-md">
                <p>{course || "SIA"}</p>
                <button className="bg-white-5 p-1 rounded-full cursor-pointer text-xs">
                  ×
                </button>
              </div>
              <div className="flex gap-2 items-center align-middle bg-teal w-auto p-2 text-sm rounded-md">
                <button className="p-1 rounded-full cursor-pointer text-xs">
                  Add +
                </button>
              </div>
            </div>
          </span>

          {/* Abstract */}
          <span className="flex flex-col gap-2">
            <h3 className="text-md font-medium text-teal">Abstract:</h3>
            <textarea
              className="p-4 bg-midnight border border-white-5 rounded-md w-4xl h-64 outline-0"
              value={fullText}
              onChange={(e) => setFullText(e.target.value)}
              placeholder="Abstract will be extracted automatically or enter manually"
            />
          </span>

          {/* Extraction Summary */}
          {(title || authors || course) && (
            <div className="p-4 bg-dusk-fg rounded-lg border border-white-5">
              <h4 className="text-lg font-medium text-teal mb-3">
                Extraction Summary
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white-75">Title Status:</span>
                  <span
                    className={`ml-2 ${title && title !== "Cannot Determine" ? "text-green-400" : "text-yellow-400"}`}
                  >
                    {title && title !== "Cannot Determine"
                      ? "✅ Extracted"
                      : "⚠️ Manual entry needed"}
                  </span>
                </div>
                <div>
                  <span className="text-white-75">Author Status:</span>
                  <span
                    className={`ml-2 ${authors && authors !== "Cannot Determine" ? "text-green-400" : "text-yellow-400"}`}
                  >
                    {authors && authors !== "Cannot Determine"
                      ? "✅ Extracted"
                      : "⚠️ Manual entry needed"}
                  </span>
                </div>
                <div>
                  <span className="text-white-75">Course:</span>
                  <span
                    className={`ml-2 ${course ? "text-green-400" : "text-yellow-400"}`}
                  >
                    {course ? `✅ ${course}` : "⚠️ Not determined"}
                  </span>
                </div>
                <div>
                  <span className="text-white-75">Department:</span>
                  <span
                    className={`ml-2 ${department ? "text-green-400" : "text-yellow-400"}`}
                  >
                    {department ? `✅ ${department}` : "⚠️ Not determined"}
                  </span>
                </div>
                <div>
                  <span className="text-white-75">Keywords:</span>
                  <span
                    className={`ml-2 ${keywords.length > 0 ? "text-green-400" : "text-yellow-400"}`}
                  >
                    {keywords.length > 0
                      ? `✅ ${keywords.length} found`
                      : "⚠️ None extracted"}
                  </span>
                </div>
                <div>
                  <span className="text-white-75">Year:</span>
                  <span
                    className={`ml-2 ${year ? "text-green-400" : "text-yellow-400"}`}
                  >
                    {year ? `✅ ${year}` : "⚠️ Not determined"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer with Upload Button */}
      <div className="flex justify-between items-center bg-darker p-12 px-24 border-t-2 border-dashed border-white-5">
        <span className="flex flex-col gap-2">
          <div className="flex flex-row mt-4">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms" className="font-inter text-sm ml-1">
              By uploading your research paper, you agree to our{" "}
              <span className="text-teal">Terms and Privacy Policy</span> and
              consent to its publication.
            </label>
          </div>

          {/* Validation Status */}
          <div className="text-xs text-white-50">
            {!title || !authors || !course || !department || !year ? (
              <span className="text-yellow-400">
                ⚠️ Please fill in all required fields before uploading
              </span>
            ) : (
              <span className="text-green-400">
                ✅ All required fields completed
              </span>
            )}
          </div>
        </span>

        <span>
          <button
            className={`p-2 px-8 font-sans flex items-center gap-2 rounded-lg cursor-pointer transition-all ${
              title && authors && course && department && year
                ? "bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br"
                : "bg-gray-600 cursor-not-allowed opacity-50"
            }`}
            disabled={
              !title ||
              !authors ||
              !course ||
              !department ||
              !year ||
              isProcessing
            }
          >
            {isProcessing ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                Processing...
              </>
            ) : (
              "Upload"
            )}
          </button>
        </span>
      </div>
    </div>
  );
};

export default UploadFile;
