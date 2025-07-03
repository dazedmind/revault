"use client";
import pdfToText from "react-pdftotext";
import { useEffect, useRef, useState } from "react";
import AdminNavBar from "../admin/components/AdminNavBar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Trash,
  Upload,
  FileText,
  User,
  Calendar,
  Building,
  BookOpen,
  Tag,
  Edit3,
  Save,
  Eye,
  CheckCircle,
  AlertCircle,
  FileCheck,
  XCircle,
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast, Toaster } from "sonner";

const UploadFile = () => {
  const [title, setTitle] = useState("");
  const [fullText, setFullText] = useState("");
  const [author, setAuthor] = useState("");
  const [course, setCourse] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [key, setKey] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingAuthors, setIsEditingAuthors] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [isEditingAbstract, setIsEditingAbstract] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isTermsAccepted, setIsTermsAccepted] = useState(true);
  const [pdfUrl, setPdfUrl] = useState("");
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isChunkedUpload, setIsChunkedUpload] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');

  // Advanced PDF validation function
  const validatePDFFile = async (file: File): Promise<{ isValid: boolean; errorMessage?: string }> => {
    console.log("🔍 Starting comprehensive PDF validation...");
    
    // 1. Check file extension
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      return { isValid: false, errorMessage: "File must have a .pdf extension" };
    }

    // 2. Check MIME type (basic check, can be spoofed)
    if (file.type !== 'application/pdf') {
      console.warn("⚠️ MIME type is not application/pdf:", file.type);
    }

    try {
      // 3. Read file header to check PDF magic bytes
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // PDF files must start with "%PDF-" (hex: 25 50 44 46 2D)
      const pdfHeader = [0x25, 0x50, 0x44, 0x46, 0x2D]; // %PDF-
      const fileHeader = uint8Array.slice(0, 5);
      
      console.log("📄 File header bytes:", Array.from(fileHeader).map(b => b.toString(16)).join(' '));
      console.log("📄 Expected PDF header:", pdfHeader.map(b => b.toString(16)).join(' '));
      
      const hasValidPDFHeader = pdfHeader.every((byte, index) => fileHeader[index] === byte);
      
      if (!hasValidPDFHeader) {
        // Check for common fake file signatures
        const fileSignatures = {
          // Microsoft Office formats
          'D0CF11E0': 'Microsoft Office document (DOC/XLS/PPT)',
          '504B0304': 'ZIP-based file (DOCX/XLSX/PPTX)',
          '504B0506': 'Empty ZIP file',
          '504B0708': 'ZIP file',
          
          // Excel specific
          '090008000600': 'Excel XLS file',
          'FFFE': 'Excel/Word file with BOM',
          
          // Images
          'FFD8FF': 'JPEG image',
          '89504E47': 'PNG image',
          '47494638': 'GIF image',
          'FFE0': 'JPEG/JFIF image',
          
          // Other formats
          '89504E470D0A1A0A': 'PNG image',
          '424D': 'Bitmap image',
          '49492A00': 'TIFF image',
          '4D4D002A': 'TIFF image (big endian)',
        };

        const headerHex = Array.from(uint8Array.slice(0, 16))
          .map(b => b.toString(16).toUpperCase().padStart(2, '0'))
          .join('');
        
        console.log("🔍 Full file header (hex):", headerHex);
        
        // Check against known file signatures
        for (const [signature, description] of Object.entries(fileSignatures)) {
          if (headerHex.startsWith(signature)) {
            return { 
              isValid: false, 
              errorMessage: `This appears to be a ${description}, not a PDF file. Please upload a genuine PDF document.` 
            };
          }
        }
        
        return { 
          isValid: false, 
          errorMessage: "This file does not appear to be a valid PDF. The file header is incorrect." 
        };
      }

      // 4. Additional PDF structure validation
      const fileContent = new TextDecoder('latin1').decode(uint8Array);
      
      // Check for PDF version in header
      const versionMatch = fileContent.match(/%PDF-(\d+\.\d+)/);
      if (!versionMatch) {
        return { 
          isValid: false, 
          errorMessage: "Invalid PDF: No version information found in header." 
        };
      }
      
      console.log("📄 PDF Version:", versionMatch[1]);
      
      // Check for essential PDF elements
      const hasEOF = fileContent.includes('%%EOF');
      const hasXref = fileContent.includes('xref') || fileContent.includes('/Root');
      
      if (!hasEOF) {
        return { 
          isValid: false, 
          errorMessage: "Invalid PDF: Missing end-of-file marker." 
        };
      }
      
      // 5. Try to validate with PDF.js-like approach
      try {
        // Attempt to read with pdfToText (this will fail for fake PDFs)
        const testText = await pdfToText(file);
        console.log("✅ PDF text extraction test passed");
      } catch (pdfError) {
        console.error("❌ PDF text extraction failed:", pdfError);
        return { 
          isValid: false, 
          errorMessage: "This file cannot be processed as a PDF. It may be corrupted or not a genuine PDF file." 
        };
      }

      // 6. File size sanity check
      if (file.size < 100) {
        return { 
          isValid: false, 
          errorMessage: "File is too small to be a valid PDF document." 
        };
      }

      // 7. Check for suspicious patterns that indicate renamed files
      const suspiciousPatterns = [
        // Excel patterns
        'Microsoft Excel',
        'Workbook',
        'xl/workbook.xml',
        'xl/sharedStrings.xml',
        '[Content_Types].xml',
        
        // Word patterns
        'Microsoft Word',
        'word/document.xml',
        'word/_rels/',
        
        // PowerPoint patterns
        'Microsoft PowerPoint',
        'ppt/presentation.xml',
        'ppt/slides/',
      ];

      const contentCheck = fileContent.toLowerCase();
      for (const pattern of suspiciousPatterns) {
        if (contentCheck.includes(pattern.toLowerCase())) {
          return { 
            isValid: false, 
            errorMessage: `This appears to be a ${pattern.includes('Excel') ? 'Microsoft Excel' : pattern.includes('Word') ? 'Microsoft Word' : 'Microsoft Office'} file renamed as PDF. Please convert it to PDF properly.` 
          };
        }
      }

      console.log("✅ PDF validation passed all checks");
      return { isValid: true };

    } catch (error) {
      console.error("❌ PDF validation error:", error);
      return { 
        isValid: false, 
        errorMessage: "Could not validate file. Please ensure it's a proper PDF document." 
      };
    }
  };

  function fixSplitAccents(text) {
    return text
      .replace(/n\s*̃\s*a/gi, "ña")
      .replace(/([A-Za-z])\s*ñ\s*([A-Za-z])/gi, "$1ñ$2")
      .replace(/([A-Za-z])\s*é\s*([A-Za-z])/gi, "$1é$2")
      .replace(/([A-Za-z])\s*á\s*([A-Za-z])/gi, "$1á$2")
      .replace(/([A-Za-z])\s*í\s*([A-Za-z])/gi, "$1í$2")
      .replace(/([A-Za-z])\s*ó\s*([A-Za-z])/gi, "$1ó$2")
      .replace(/([A-Za-z])\s*ú\s*([A-Za-z])/gi, "$1ú$2");
  }

  const uploadFileInChunks = async (file: File, metadata: any) => {
    const CHUNK_SIZE = 1024 * 1024 * 2; // 2MB chunks (safe for Vercel)
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const uploadId = Date.now().toString();

    console.log(`📦 Starting chunked upload: ${totalChunks} chunks of ${CHUNK_SIZE} bytes each`);
    setIsChunkedUpload(true);
    setUploadProgress(0);

    try {
      for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const start = chunkIndex * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);

        console.log(`📤 Uploading chunk ${chunkIndex + 1}/${totalChunks} (${chunk.size} bytes)`);

        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('chunkIndex', chunkIndex.toString());
        formData.append('totalChunks', totalChunks.toString());
        formData.append('uploadId', uploadId);
        formData.append('fileName', file.name);
        
        // Add metadata only on the last chunk to avoid duplication
        if (chunkIndex === totalChunks - 1) {
          Object.keys(metadata).forEach(key => {
            if (metadata[key] !== null && metadata[key] !== undefined) {
              formData.append(key, metadata[key]);
            }
          });
        }

        const response = await fetch('/api/upload-chunk', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || `Chunk ${chunkIndex + 1} upload failed`);
        }

        // Update progress
        const progress = ((chunkIndex + 1) / totalChunks) * 100;
        setUploadProgress(progress);
        console.log(`✅ Chunk ${chunkIndex + 1}/${totalChunks} uploaded (${progress.toFixed(1)}%)`);

        // Small delay to prevent overwhelming the server
        if (chunkIndex < totalChunks - 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      return { success: true, message: "File uploaded successfully!" };
    } catch (error) {
      console.error("❌ Chunked upload failed:", error);
      throw error;
    } finally {
      setIsChunkedUpload(false);
      setUploadProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a PDF file first.");
      return;
    }

    // Validate required fields
    if (!title || !author || !course || !department || !year) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setIsLoading(true);
      
      const metadata = {
        title,
        author,
        abstract: fullText,
        course,
        department,
        year,
        keywords: JSON.stringify(keywords)
      };

      console.log("📤 Starting upload with metadata:");
      console.log("File:", selectedFile.name, selectedFile.size, "bytes");
      console.log("Title:", title);

      // Use chunked upload for files larger than 3MB, regular upload for smaller files
      if (selectedFile.size > 3 * 1024 * 1024) {
        console.log("📦 File is large, using chunked upload");
        await uploadFileInChunks(selectedFile, metadata);
      } else {
        console.log("📄 File is small, using regular upload");
        // Fallback to regular upload for small files
        const formData = new FormData();
        formData.append("file", selectedFile);
        Object.keys(metadata).forEach(key => {
          formData.append(key, metadata[key]);
        });

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Upload failed");
        }
      }

      toast.success("Upload successful!");
      handleClearFile();

    } catch (error: any) {
      console.error("Upload error:", error);
      if (error.message?.includes("P2002")) {
        toast.error("A paper with this title already exists. Please use a different title.");
      } else {
        toast.error(error.message || "Upload failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const startProgressAnimation = () => {
    setProgress(0);
    const duration = 2000;
    const interval = 50;
    const steps = duration / interval;
    const increment = 100 / steps;

    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        clearInterval(timer);
        setProgress(100);
      } else {
        setProgress(currentProgress);
      }
    }, interval);
  };

  // Enhanced extractText function with PDF validation
  async function extractText(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Reset validation status
    setValidationStatus('validating');
    
    // Comprehensive PDF validation
    console.log("🔍 Validating PDF file...");
    const validation = await validatePDFFile(file);
    
    if (!validation.isValid) {
      console.error("❌ PDF validation failed:", validation.errorMessage);
      setValidationStatus('invalid');
      toast.error(validation.errorMessage || "Invalid PDF file", {
        duration: 5000,
      });
      
      // Clear the file input
      if (ref.current) {
        ref.current.value = "";
      }
      return;
    }

    console.log("✅ PDF validation passed");
    setValidationStatus('valid');
    
    // Store the file for later upload
    setSelectedFile(file);
    setPdfUrl(URL.createObjectURL(file));

    try {
      setIsLoading(true);
      startProgressAnimation();

      console.log(
        "📄 Processing file:",
        file.name,
        "Size:",
        file.size,
        "bytes",
      );

      const rawText = await pdfToText(file);
      console.log("📊 Extracted text length:", rawText.length, "characters");

      // Check if the file might be too large for processing
      if (rawText.length > 100000) {
        console.log(
          "⚠️ Large document detected, may take longer to process...",
        );
        toast.info("Large document detected. Processing may take a moment...", {
          duration: 3000,
        });
      }

      const firstPageEnd = rawText.toLowerCase().indexOf("table of contents");
      const firstPageText =
        firstPageEnd !== -1 ? rawText.substring(0, firstPageEnd) : rawText;

      const sanitized = firstPageText.replace(/\s+/g, " ").trim();

      console.log("🚀 Extracting text...");
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: sanitized, rawText }),
      });

      const result = await response.json();
      console.log("📨 API Response status:", response.status);

      if (!response.ok) {
        console.error("❌ API Error:", result);

        if (result.code === "DOCUMENT_TOO_LARGE") {
          toast.error(
            "Document is too large for automatic processing. Please try with a smaller file or fill in the details manually.",
            {
              duration: 6000,
            },
          );
          return; // Don't clear the form, let user fill manually
        } else if (result.code === 413) {
          toast.error(
            "File too large! Please select a smaller file (max 50MB)",
          );
        } else {
          toast.error(
            result.error ||
              "Failed to extract document information. You can fill in the details manually.",
            {
              duration: 4000,
            },
          );
          return; // Don't clear the form
        }
      }

      console.log("✅ Extraction successful:", result);
      setKeywords(result.tfidfKeywords ?? []);

      if (result) {
        setTitle(result.extractedTitle ?? "");
        setAuthor(result.extractedAuthor ?? "");
        setFullText(result.extractedAbstract ?? "");
        setCourse(result.extractedCourse ?? "");
        setDepartment(result.extractedDepartment ?? "");
        setYear(result.extractedYear ?? "");

        toast.success("Document information extracted successfully!", {
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("❌ Error extracting text:", error);
      toast.error(
        "Failed to process document. You can fill in the details manually.",
        {
          duration: 4000,
        },
      );
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  }

  const handleSaveTitle = () => {
    setIsEditingTitle(false);
    if (!title) {
      setTitle("");
    }
  };

  const handleSaveAuthors = () => {
    setIsEditingAuthors(false);
    if (!author) {
      setAuthor("");
    }
  };

  const handleSaveAbstract = () => {
    setIsEditingAbstract(false);
    if (!fullText) {
      setFullText("");
    }
  };

  const handleClearFile = () => {
    if (ref.current) {
      ref.current.value = "";
    }
    setTitle("");
    setFullText("");
    setAuthor("");
    setCourse("");
    setDepartment("");
    setYear("");
    setKeywords([]);
    setKey(Date.now());
    setPdfUrl("");
    setSelectedFile(null);
    setIsEditingTitle(false);
    setIsEditingAuthors(false);
    setIsEditingAbstract(false);
    setIsTermsAccepted(true);
    setValidationStatus('idle');
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isFormValid =
    title && author && course && department && year && isTermsAccepted;

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-secondary" : "bg-midnight"}`}
    >
      <AdminNavBar />

      {/* Hero Section */}
      <div
        className={`${theme === "light" ? "border-b bg-tertiary" : "border-b bg-dusk"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gold/20 rounded-full">
                <Upload className="w-8 h-8 text-gold" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Upload Research Paper
            </h1>
          </div>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 `}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Upload Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* File Upload Card */}
            <div
              className={`${theme === "light" ? "bg-secondary border-white-50" : " border-white-5"} rounded-2xl shadow-sm border p-6`}
            >
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-gold" />
                  <h2 className="text-xl font-semibold">Upload Document</h2>
                </span>

                <button
                  onClick={handleClearFile}
                  className="p-3 h-fit bg-accent cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-md transition-all duration-300 hover:scale-105"
                  disabled={isLoading}
                  title="Clear file"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-4">
                <label
                  htmlFor="uploadFile1"
                  className={`flex-1 relative group cursor-pointer transition-all duration-300 ${
                    isLoading || validationStatus === 'validating'
                      ? "pointer-events-none opacity-50"
                      : "hover:scale-[1.02]"
                  }`}
                >
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                      validationStatus === 'valid' && pdfUrl
                        ? "border-green-300 dark:border-green-700"
                        : validationStatus === 'invalid'
                        ? "border-red-300 dark:border-red-700"
                        : "border-gold/30 hover:border-gold/60 hover:bg-gold/5"
                    }`}
                  >
                    {validationStatus === 'validating' ? (
                      <div className="space-y-3">
                        <div className="flex justify-center">
                          <div className="animate-spin w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
                        </div>
                        <div>
                          <p className="text-blue-700 dark:text-blue-400 font-semibold">
                            Validating PDF...
                          </p>
                          <p className="text-sm text-blue-600 dark:text-blue-500">
                            Checking file integrity and format
                          </p>
                        </div>
                      </div>
                    ) : validationStatus === 'invalid' ? (
                      <div className="space-y-3">
                        <div className="flex justify-center">
                          <XCircle className="w-12 h-12 text-red-500" />
                        </div>
                        <div>
                          <p className="text-red-700 dark:text-red-400 font-semibold">
                            Invalid PDF File
                          </p>
                          <p className="text-sm text-red-600 dark:text-red-500">
                            Please select a genuine PDF document
                          </p>
                        </div>
                      </div>
                    ) : validationStatus === 'valid' && pdfUrl ? (
                      <div className="space-y-3">
                        <div className="flex justify-center">
                          <CheckCircle className="w-12 h-12 text-green-500" />
                        </div>
                        <div>
                          <p className="text-green-700 dark:text-green-400 font-semibold">
                             PDF Uploaded Successfully
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-500">
                            {selectedFile &&
                              `${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(1)} MB)`}
                          </p>
                          <p className="text-xs text-green-600 dark:text-green-500">
                            Ready for processing
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-center">
                          <div className="p-3 bg-gold/10 rounded-full group-hover:bg-gold/20 transition-colors duration-300">
                            <Upload className="w-8 h-8 text-gold" />
                          </div>
                        </div>
                        <div>
                          <p className="text-lg font-semibold ">
                            Upload your PDF
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Drag and drop or click to browse
                          </p>
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          <div>PDF only • Max 30MB</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    id="uploadFile1"
                    ref={ref}
                    className="hidden"
                    accept="application/pdf,.pdf"
                    onChange={extractText}
                    name="file-input"
                    key={ref.current?.value}
                    disabled={isLoading || validationStatus === 'validating'}
                  />
                </label>
              </div>

              {(isLoading || validationStatus === 'validating') && (
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin w-5 h-5 border-2 border-gold border-t-transparent rounded-full"></div>
                    <span className="text-sm font-medium text-gold">
                      {validationStatus === 'validating' 
                        ? "Validating PDF file..."
                        : isChunkedUpload 
                        ? `Uploading chunks... ${uploadProgress.toFixed(1)}%`
                        : progress < 100
                        ? "Extracting text from PDF..."
                        : "Processing complete!"
                      }
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-gold to-gold-fg h-full rounded-full transition-all duration-300 ease-out"
                      style={{ 
                        width: `${
                          validationStatus === 'validating' ? 50 :
                          isChunkedUpload ? uploadProgress : progress
                        }%` 
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Form Fields */}
            {(title ||
              author ||
              fullText ||
              course ||
              department ||
              year ||
              keywords.length > 0) && (
              <div className="space-y-6">
                {/* Title Section */}
                <div
                  className={`bg-secondary rounded-2xl shadow-sm border ${theme === "light" ? "border-white-50" : "border-white-5"} p-6`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-5 h-5 text-gold" />
                      <h3 className="text-lg font-semibold">Research Title</h3>
                    </div>
                    <button
                      onClick={() =>
                        isEditingTitle
                          ? handleSaveTitle()
                          : setIsEditingTitle(true)
                      }
                      className="flex items-center gap-2 px-3 py-1.5 bg-gold/10 hover:bg-gold/20 text-gold rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                      {isEditingTitle ? (
                        <Save className="w-4 h-4" />
                      ) : (
                        <Edit3 className="w-4 h-4" />
                      )}
                      {isEditingTitle ? "Save" : "Edit"}
                    </button>
                  </div>
                  <textarea
                    className={`w-full p-4 rounded-xl border transition-all duration-200 resize-none ${
                      isEditingTitle
                        ? "border-gold bg-gold/5 focus:ring-2 focus:ring-gold/20 focus:border-gold"
                        : "border-white-5 cursor-default"
                    } outline-none`}
                    value={title.toUpperCase()}
                    onChange={(e) => setTitle(e.target.value.toUpperCase())}
                    readOnly={!isEditingTitle}
                    rows={3}
                    placeholder="Research paper title will appear here..."
                  />
                </div>

                {/* Author Section */}
                <div
                  className={`bg-secondary rounded-2xl shadow-sm border ${theme === "light" ? "border-white-50" : "border-white-5"} p-6`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gold" />
                      <h3 className="text-lg font-semibold">Authors</h3>
                    </div>
                    <button
                      onClick={() =>
                        isEditingAuthors
                          ? handleSaveAuthors()
                          : setIsEditingAuthors(true)
                      }
                      className="flex items-center gap-2 px-3 py-1.5 bg-gold/10 hover:bg-gold/20 text-gold rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                      {isEditingAuthors ? (
                        <Save className="w-4 h-4" />
                      ) : (
                        <Edit3 className="w-4 h-4" />
                      )}
                      {isEditingAuthors ? "Save" : "Edit"}
                    </button>
                  </div>
                  <input
                    type="text"
                    className={`w-full p-4 rounded-xl border transition-all duration-200 ${
                      isEditingAuthors
                        ? "border-gold bg-gold/5 focus:ring-2 focus:ring-gold/20 focus:border-gold"
                        : "border-white-5 bg-accent cursor-default"
                    } outline-none`}
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    readOnly={!isEditingAuthors}
                    placeholder="Author names will appear here..."
                  />
                </div>

                {/* Keywords Section */}
                {keywords.length > 0 && (
                  <div
                    className={`bg-secondary rounded-2xl shadow-sm border ${theme === "light" ? "border-white-50" : "border-white-5"} p-6`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Tag className="w-5 h-5 text-gold" />
                      <h3 className="text-lg font-semibold">Keywords</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-yale-blue/20 text-yale-blue rounded-full text-sm font-medium"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Metadata Section */}
                <div
                  className={`bg-secondary rounded-2xl shadow-sm border ${theme === "light" ? "border-white-50" : "border-white-5"} p-6`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Building className="w-5 h-5 text-gold" />
                    <h3 className="text-lg font-semibold">Paper Details</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-sm font-medium">
                        <Building className="w-4 h-4" />
                        Department
                      </Label>
                      <Select
                        name="department"
                        value={department}
                        onValueChange={setDepartment}
                      >
                        <SelectTrigger className="w-full p-7 px-4 text-md dark:bg-secondary border-white-5 rounded-lg">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem
                              className="p-3"
                              value="Computer Science"
                            >
                              Computer Science
                            </SelectItem>
                            <SelectItem
                              className="p-3"
                              value="Information Technology"
                            >
                              Information Technology
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-sm font-medium">
                        <BookOpen className="w-4 h-4" />
                        Course
                      </Label>
                      <Select
                        name="course"
                        value={course}
                        onValueChange={setCourse}
                        required={true}
                      >
                        <SelectTrigger className="w-full p-7 px-4 text-md dark:bg-secondary border-white-5 rounded-lg">
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem className="p-3" value="SIA">
                              SIA
                            </SelectItem>
                            <SelectItem
                              className="p-3"
                              value="Capstone Project"
                            >
                              Capstone Project
                            </SelectItem>
                            <SelectItem className="p-3" value="Compiler Design">
                              Compiler Design
                            </SelectItem>
                            <SelectItem className="p-3" value="Thesis Writing">
                              Thesis Writing
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-sm font-medium">
                        <Calendar className="w-4 h-4" />
                        Year
                      </Label>
                      <input
                        type="text"
                        className="w-full p-4 text-md dark:bg-secondary border-white-5 border-1 rounded-lg outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-200"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="2024"
                      />
                    </div>
                  </div>
                </div>

                {/* Abstract Section */}
                <div
                  className={`bg-secondary rounded-2xl shadow-sm border ${theme === "light" ? "border-white-50" : "border-white-5"} p-6`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gold" />
                      <h3 className="text-lg font-semibold">Abstract</h3>
                    </div>
                    <button
                      onClick={() =>
                        isEditingAbstract
                          ? handleSaveAbstract()
                          : setIsEditingAbstract(true)
                      }
                      className="flex items-center gap-2 px-3 py-1.5 bg-gold/10 hover:bg-gold/20 text-gold rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                      {isEditingAbstract ? (
                        <Save className="w-4 h-4" />
                      ) : (
                        <Edit3 className="w-4 h-4" />
                      )}
                      {isEditingAbstract ? "Save" : "Edit"}
                    </button>
                  </div>
                  <textarea
                    className={`w-full p-4 rounded-xl border transition-all duration-200 resize-none ${
                      isEditingAbstract
                        ? "border-gold bg-gold/5 focus:ring-2 focus:ring-gold/20 focus:border-gold"
                        : "border-white-5 bg-accent cursor-default"
                    } outline-none`}
                    value={fullText}
                    onChange={(e) => setFullText(e.target.value)}
                    readOnly={!isEditingAbstract}
                    rows={8}
                    placeholder="Paper abstract will appear here..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* PDF Preview */}
            {pdfUrl && validationStatus === 'valid' && (
              <div
                className={`bg-secondary rounded-2xl shadow-sm border ${theme === "light" ? "border-white-50" : "border-white-5"} p-6`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-5 h-5 text-gold" />
                  <h3 className="text-lg font-semibold">PDF Preview</h3>
                </div>
                <div className="relative">
                  <iframe
                    src={`${pdfUrl}#toolbar=0`}
                    title="PDF Preview"
                    className="w-full h-96 border border-white-5 rounded-xl"
                  />
                </div>
              </div>
            )}

            {/* File Validation Status */}
            {selectedFile && (
              <div
                className={`bg-secondary rounded-2xl shadow-sm border ${theme === "light" ? "border-white-50" : "border-white-5"} p-6`}
              >
                <h3 className="text-lg font-semibold mb-4">File Validation</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {validationStatus === 'validating' ? (
                      <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    ) : validationStatus === 'valid' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : validationStatus === 'invalid' ? (
                      <XCircle className="w-5 h-5 text-red-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                    )}
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {validationStatus === 'validating' 
                        ? "Validating PDF format..."
                        : validationStatus === 'valid' 
                        ? "Valid PDF document"
                        : validationStatus === 'invalid' 
                        ? "Invalid PDF file"
                        : "No file selected"
                      }
                    </span>
                  </div>
                  
                  {validationStatus === 'valid' && (
                    <>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          File header verified
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          PDF structure validated
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Text extraction possible
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Upload Progress */}
            {pdfUrl && validationStatus === 'valid' && (
              <div
                className={`bg-secondary rounded-2xl shadow-sm border ${theme === "light" ? "border-white-50" : "border-white-5"} p-6`}
              >
                <h3 className="text-lg font-semibold mb-4">Upload Progress</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      PDF validated and uploaded
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Text extracted
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {isFormValid ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                    )}
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Form {isFormValid ? "completed" : "incomplete"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Action Bar */}
      <div
        className={`${theme === "light" ? "bg-secondary border-t border-white-5" : "bg-dusk-fg border-t border-white-5"} p-6`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={isTermsAccepted}
                onChange={(e) => setIsTermsAccepted(e.target.checked)}
                className="mt-1 md:mt-0 w-4 h-4 text-gold focus:ring-gold border-white-5 rounded"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                I ensure the accuracy of the information above and that it
                contains
                <span className="ml-1 text-gold font-medium ">
                  no clerical mistakes.
                </span>
              </p>
            </div>

            <button
              onClick={handleUpload}
              disabled={!isFormValid || isLoading || validationStatus !== 'valid'}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-white transition-all duration-300 cursor-pointer ${
                isFormValid && !isLoading && validationStatus === 'valid'
                  ? "bg-gradient-to-r from-gold to-gold-fg hover:brightness-120 hover:shadow-lg shadow-gold"
                  : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Upload Paper
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default UploadFile;