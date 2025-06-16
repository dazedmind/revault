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

  // Keep all your existing functions exactly as they are
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

  // Replace your handleUpload function with this:
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a PDF file first.");
      return;
    }

    try {
      setIsLoading(true);

      // Create FormData for multipart/form-data upload
      const formData = new FormData();

      // Add the file
      formData.append("file", selectedFile);

      // Add all the form fields
      formData.append("title", title);
      formData.append("author", author);
      formData.append("abstract", fullText);
      formData.append("course", course);
      formData.append("department", department);
      formData.append("year", year);
      formData.append("keywords", JSON.stringify(keywords));

      console.log("📤 Uploading with FormData:");
      console.log("File:", selectedFile.name, selectedFile.size, "bytes");
      console.log("Title:", title);
      console.log("Author:", author);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData, // Send FormData, don't set Content-Type header
      });

      const result = await response.json();
      console.log("Upload response:", result);

      if (response.ok) {
        toast.success(
          "Upload successful! File uploaded to Google Cloud Storage.",
        );
        handleClearFile();
      } else if (response.status === 413) {
        toast.error("File too large! Please select a smaller file (max 50MB)");
      } else {
        console.error("Upload failed:", result);
        if (result.code === "P2002") {
          toast.error(
            "A paper with this title already exists. Please use a different title.",
          );
        } else {
          toast.error(result.message || "Upload failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An unexpected error occurred. Please try again.");
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

  // Modify your extractText function to also store the file
  async function extractText(event) {
    const file = event.target.files[0];
    if (!file || file.type !== "application/pdf") return;
  
    // Store the file for later upload
    setSelectedFile(file);
    setPdfUrl(URL.createObjectURL(file));
  
    try {
      setIsLoading(true);
      startProgressAnimation();
      
      console.log('📄 Processing file:', file.name, 'Size:', file.size, 'bytes');
      
      const rawText = await pdfToText(file);
      console.log('📊 Extracted text length:', rawText.length, 'characters');
  
      // Check if the file might be too large for processing
      if (rawText.length > 100000) {
        console.log('⚠️ Large document detected, may take longer to process...');
        toast.info("Large document detected. Processing may take a moment...", {
          duration: 3000
        });
      }
  
      const firstPageEnd = rawText.toLowerCase().indexOf("table of contents");
      const firstPageText =
        firstPageEnd !== -1 ? rawText.substring(0, firstPageEnd) : rawText;
  
      const sanitized = firstPageText.replace(/\s+/g, " ").trim();
  
      console.log('🚀 Sending to extraction API...');
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: sanitized, rawText }),
      });
  
      const result = await response.json();
      console.log("📨 API Response status:", response.status);
  
      if (!response.ok) {
        console.error('❌ API Error:', result);
        
        if (result.code === 'DOCUMENT_TOO_LARGE') {
          toast.error("Document is too large for automatic processing. Please try with a smaller file or fill in the details manually.", {
            duration: 6000
          });
          return; // Don't clear the form, let user fill manually
        } else if (result.code === 413){
          toast.error("File too large! Please select a smaller file (max 50MB)");
        } else {
          toast.error(result.error || "Failed to extract document information. You can fill in the details manually.", {
            duration: 4000
          });
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
          duration: 3000
        });
      }
    } catch (error) {
      console.error("❌ Error extracting text:", error);
      toast.error("Failed to process document. You can fill in the details manually.", {
        duration: 4000
      });
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

  // Update your handleClearFile function to also clear the selected file:
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
    setSelectedFile(null); // Clear the selected file
    setIsEditingTitle(false);
    setIsEditingAuthors(false);
    setIsEditingAbstract(false);
    setIsTermsAccepted(true);
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
                    isLoading
                      ? "pointer-events-none opacity-50"
                      : "hover:scale-[1.02]"
                  }`}
                >
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                      pdfUrl
                        ? "border-green-300  dark:border-green-700 "
                        : "border-gold/30 hover:border-gold/60 hover:bg-gold/5"
                    }`}
                  >
                    {pdfUrl ? (
                      <div className="space-y-3">
                        <div className="flex justify-center">
                          <CheckCircle className="w-12 h-12 text-green-500" />
                        </div>
                        <div>
                          <p className="text-green-700 dark:text-green-400 font-semibold">
                            PDF Uploaded Successfully
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-500">
                            {selectedFile && `${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(1)} MB)`}
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
                          PDF only • Max 30MB • Larger files may take longer to process
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    id="uploadFile1"
                    ref={ref}
                    className="hidden"
                    accept="application/pdf"
                    onChange={extractText}
                    name="file-input"
                    key={ref.current?.value}
                    disabled={isLoading}
                  />
                </label>
              </div>

              {isLoading && (
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin w-5 h-5 border-2 border-gold border-t-transparent rounded-full"></div>
                    <span className="text-sm font-medium text-gold">
                      {progress < 100
                        ? "Extracting text from PDF..."
                        : "Processing complete!"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-gold to-gold-fg h-full rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
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
                        : "border-white-5  cursor-default"
                    }  outline-none`}
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
                            <SelectItem className="p-3" value="Capstone Project">
                              Capstone Project
                            </SelectItem>
                            <SelectItem className="p-3" value="Compiler Design">
                              Compiler Design
                            </SelectItem>
                            <SelectItem
                              className="p-3"
                              value="Thesis Writing"
                            >
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
            {pdfUrl && (
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

            {/* Upload Progress */}
            {pdfUrl && (
              <div
                className={`bg-secondary rounded-2xl shadow-sm border ${theme === "light" ? "border-white-50" : "border-white-5"} p-6`}
              >
                <h3 className="text-lg font-semibold mb-4">Upload Progress</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      PDF uploaded
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
                I ensure the accuracy of the information above and that it contains 
                <span className="ml-1 text-gold font-medium ">
                  no clerical mistakes.
                </span>
              </p>
            </div>

            <button
              onClick={handleUpload}
              disabled={!isFormValid || isLoading}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-white transition-all duration-300 cursor-pointer ${
                isFormValid && !isLoading
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
