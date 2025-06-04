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
import { Trash } from "lucide-react";
import { useTheme } from "next-themes";
import { toast, Toaster } from "sonner";

const UploadFile = () => {
  const [title, setTitle] = useState("");
  const [fullText, setFullText] = useState("");
  const [author, setAuthor] = useState(""); // Add authors state
  const [course, setCourse] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [key, setKey] = useState(Date.now()); // forces re-render of input
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingAuthors, setIsEditingAuthors] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [isEditingAbstract, setIsEditingAbstract] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const { theme } = useTheme();

  function fixSplitAccents(text) {
    return (
      text
        // Common accents accidentally separated by spaces
        .replace(/n\s*̃\s*a/gi, "ña") // if ñ was broken down (rare but can happen)
        .replace(/([A-Za-z])\s*ñ\s*([A-Za-z])/gi, "$1ñ$2") // general case for ñ
        .replace(/([A-Za-z])\s*é\s*([A-Za-z])/gi, "$1é$2") // general case for é
        .replace(/([A-Za-z])\s*á\s*([A-Za-z])/gi, "$1á$2")
        .replace(/([A-Za-z])\s*í\s*([A-Za-z])/gi, "$1í$2")
        .replace(/([A-Za-z])\s*ó\s*([A-Za-z])/gi, "$1ó$2")
        .replace(/([A-Za-z])\s*ú\s*([A-Za-z])/gi, "$1ú$2")
    );
  }

  const handleUpload = async () => {
    try {
      const payload = {
        title,
        author,
        abstract: fullText,
        course,
        department,
        year,
        keywords,
      };

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Upload successful!");
        handleClearFile();
      } else {
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
    }
  };

  // Add progress animation function
  const startProgressAnimation = () => {
    setProgress(0);
    const duration = 2000; // 2 seconds
    const interval = 50; // Update every 50ms
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

  const [pdfUrl, setPdfUrl] = useState("");

  async function extractText(event) {
    const file = event.target.files[0];
    if (!file || file.type !== "application/pdf") return;

    setPdfUrl(URL.createObjectURL(file)); // 👈 This line enables the preview

    try {
      setIsLoading(true);
      startProgressAnimation();
      const rawText = await pdfToText(file);

      // Step 1: Get first page only by cutting off at "Table of contents"
      const firstPageEnd = rawText.toLowerCase().indexOf("table of contents");
      const firstPageText =
        firstPageEnd !== -1 ? rawText.substring(0, firstPageEnd) : rawText;

      // Step 2: Sanitize the text
      const sanitized = firstPageText.replace(/\s+/g, " ").trim();

      const response = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: sanitized, rawText }),
      });

      const result = await response.json();

      // Log the full response to debug
      console.log("Full API Response:", result);
      setKeywords(result.tfidfKeywords ?? []);

      // Access properties safely (optional chaining + nullish coalescing)
      console.log("Title:", result?.extractedTitle ?? "No title found");
      console.log("Authors:", result?.extractedAuthor ?? "No authors found");
      console.log("Course:", result?.extractedCourse ?? "No course found");
      console.log(
        "Department:",
        result?.extractedDepartment ?? "No department found",
      );

      // Update state
      if (result) {
        setTitle(result.extractedTitle ?? "");
        setAuthor(result.extractedAuthor ?? "");
        setFullText(result.extractedAbstract ?? "");
        setCourse(result.extractedCourse ?? ""); // Check for typos (extracted vs extrated)
        setDepartment(result.extractedDepartment ?? "");
        setYear(result.extractedYear ?? "");
      }
    } catch (error) {
      console.error("Error extracting text:", error);
    } finally {
      setIsLoading(false);
      setProgress(100); // Ensure progress bar is full when done
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
      ref.current.value = ""; // Clear the file input
    }
    setTitle(""); // Clear the detected title
    setFullText(""); // Clear the extracted text
    setAuthor(""); // Clear the authors
    setCourse("");
    setDepartment("");
    setYear("");
    setKeywords([]); // Clear keywords
    setKey(Date.now()); // Update key to force re-render
    setPdfUrl("");
    setIsEditingTitle(false);
    setIsEditingAuthors(false);
    setIsEditingAbstract(false);
    setIsTermsAccepted(false);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="bg-midnight dark:bg-secondary">
      <AdminNavBar />
      <div className="flex flex-col md:flex-row">
        <main className="p-8 md:mx-12">
          <div>
            <h1 className="font-bold text-3xl mb-6">Upload Research Paper</h1>
          </div>
          <div className="flex flex-row">
            <label
              htmlFor="uploadFile1"
              className=" text-slate-500 font-semibold text-base rounded w-full h-42 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gold-fg mx-auto hover:border-gold transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-11 mb-3 fill-gray-500"
                viewBox="0 0 32 32"
              >
                <path
                  d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                />
                <path
                  d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                />
              </svg>
              <span>Upload file</span>

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

              <p className="text-xs font-medium text-slate-400 mt-2">
                PDF only. Max size 15MB.
              </p>

              
            </label>

            <button
                onClick={handleClearFile}
                className={`ml-4 px-4 py-4 cursor-pointer ${theme == "light" ? "bg-tertiary" : "bg-dusk"} transition-all duration-300 hover:bg-red-warning hover:text-white hover:border-none rounded-md hover:shadow-lg`}
                disabled={isLoading}
              >
                <Trash className="w-6 h-6" />
              </button>
          </div>
          {/* <div className="flex flex-row">
            <input
              type="file"
              className="p-4 w-full md:w-4xl md:p-10 md:px-60 border-2 border-dashed border-gold rounded-md dark:bg-secondary"
              accept="application/pdf"
              onChange={extractText}
              name="file-input"
              key={ref.current?.value}
              disabled={isLoading}
            />

            <button
              onClick={handleClearFile}
              className={`ml-4 px-4 py-4 cursor-pointer ${theme == "light" ? "bg-tertiary" : "bg-dusk"} transition-all duration-300 hover:bg-red-warning hover:text-white hover:border-none rounded-md hover:shadow-lg`}
              disabled={isLoading}
            >
              <Trash className="w-6 h-6" />
            </button>
          </div>
          <label htmlFor="file-input" className="text-sm text-white-50">
            File type: .pdf and .tiff only (Maximum file size: 15MB)
          </label> */}

          {isLoading && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
                <div
                  className="bg-gold h-2.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gold mt-2">
                {progress < 100
                  ? "Extracting text from PDF..."
                  : "Processing complete!"}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-8 mt-8">
            <span className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="flex flex-row justify-between w-4xl gap-2">
                  <h3 className="text-md font-medium text-gold">
                    Research Title:
                  </h3>
                  <button
                    onClick={() =>
                      isEditingTitle
                        ? handleSaveTitle()
                        : setIsEditingTitle(true)
                    }
                    className="text-sm px-3 py-1 bg-gold/10 hover:bg-gold/20 text-gold rounded-md transition-colors"
                  >
                    {isEditingTitle ? "Save" : "Edit"}
                  </button>
                </span>
              </div>
              <textarea
                className={` w-auto p-4 bg-midnight border rounded-md md:w-4xl outline-0 dark:bg-secondary ${
                  isEditingTitle
                    ? "border-gold cursor-text"
                    : "border-white-5 cursor-default"
                }`}
                defaultValue={title.toUpperCase()}
                onChange={(e) => setTitle(e.target.value.toUpperCase())}
                readOnly={!isEditingTitle}
              />
            </span>

            <span className="flex flex-col gap-2">
              <span className="flex flex-row justify-between w-full md:w-4xl gap-2">
                <h3 className="text-md font-medium text-gold">Authors:</h3>
                <button
                  onClick={() =>
                    isEditingAuthors
                      ? handleSaveAuthors()
                      : setIsEditingAuthors(true)
                  }
                  className="text-sm px-3 py-1 bg-gold/10 hover:bg-gold/20 text-gold rounded-md transition-colors"
                >
                  {isEditingAuthors ? "Save" : "Edit"}
                </button>
              </span>
              <input
                type="text"
                className={`p-4 bg-midnight border rounded-md w-full md:w-4xl outline-0 dark:bg-secondary ${
                  isEditingAuthors
                    ? "border-gold cursor-text"
                    : "border-white-5 cursor-default"
                }`}
                defaultValue={author}
                onChange={(e) => setAuthor(e.target.value)}
                readOnly={!isEditingAuthors}
              />
            </span>

            <span className="flex flex-col gap-2">
              <h3 className="text-md font-medium text-gold">Keywords:</h3>
              <div className="flex flex-row flex-wrap gap-2">
                {keywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gold/10 text-gold rounded-md text-sm"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </span>

            <div className="flex flex-col md:flex-row gap-4">
              <span className="flex flex-col gap-2">
                <div className="flex flex-col flex-grow">
                  <Label className="text-md font-medium text-gold mb-2 dark:bg-secondary">
                    Department:
                  </Label>
                  <Select
                    name="department"
                    value={department}
                    onValueChange={setDepartment}
                  >
                    <SelectTrigger className="w-full md:w-xs p-7 px-4 text-md dark:bg-secondary border-white-5">
                      <SelectValue placeholder="Select paper department " />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem className="p-4" value="Computer Science">
                          Computer Science
                        </SelectItem>
                        <SelectItem
                          className="p-4"
                          value="Information Technology"
                        >
                          Information Technology
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </span>
              <span className="flex flex-col gap-2">
                <div className="flex flex-col flex-grow">
                  <Label className="text-md font-medium text-gold mb-2">
                    Course:
                  </Label>
                  <Select
                    name="course"
                    value={course}
                    onValueChange={setCourse}
                  >
                    <SelectTrigger className="w-auto md:w-xs p-7 px-4 text-md dark:bg-secondary border-white-5">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem className="p-4" value="SIA">
                          SIA
                        </SelectItem>
                        <SelectItem className="p-4" value="Capstone">
                          Capstone
                        </SelectItem>
                        <SelectItem className="p-4" value="Compiler Design">
                          Compiler Design
                        </SelectItem>
                        <SelectItem className="p-4" value="CS Thesis Writing">
                          CS Thesis Writing
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </span>

              <span className="flex flex-col gap-2">
                <h3 className="text-md font-medium text-gold">Year:</h3>
                <input
                  type="text"
                  className="p-4 bg-midnight border border-white-5 rounded-md w-auto md:w-xxs outline-0 dark:bg-secondary"
                  defaultValue={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                />
              </span>
            </div>

            <span className="flex flex-col gap-2">
              <span className="flex flex-row justify-between w-full md:w-4xl gap-2">
                <h3 className="text-md font-medium text-gold">Abstract:</h3>
                <button
                  onClick={() =>
                    isEditingAbstract
                      ? handleSaveAbstract()
                      : setIsEditingAbstract(true)
                  }
                  className="text-sm px-3 py-1 bg-gold/10 hover:bg-gold/20 text-gold rounded-md transition-colors"
                >
                  {isEditingAbstract ? "Save" : "Edit"}
                </button>
              </span>{" "}
              <textarea
                className={`p-4 bg-midnight border rounded-md w-auto md:w-4xl h-64 outline-0 dark:bg-secondary ${
                  isEditingAbstract
                    ? "border-gold cursor-text"
                    : "border-white-5 cursor-default"
                }`}
                defaultValue={fullText}
                onChange={(e) => setFullText(e.target.value)}
                readOnly={!isEditingAbstract}
              />
            </span>
          </div>
          {/* <Upload /> */}
        </main>

        {pdfUrl && (
          <div className="flex flex-col mx-12 m-10 md:mx-0 md:mt-10">
            <h3 className="text-md font-medium text-gold mb-2">PDF Preview:</h3>
            <iframe
              src={`${pdfUrl}#toolbar=0`}
              title="PDF Preview"
              className="w-xs h-dvh border rounded-md"
            ></iframe>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center bg-darker p-7 md:p-12 md:px-24 border-t-2 border-dashed border-white-5 dark:bg-primary">
        <span className="w-full flex flex-col justify-start items-start align-start gap-2">
          <div className="flex flex-row my-4">
            <input
              type="checkbox"
              checked={isTermsAccepted}
              onChange={(e) => setIsTermsAccepted(e.target.checked)}
            />
            <p className="font-inter text-sm ml-1">
              By uploading, you agree to our{" "}
              <span className="text-gold">Terms and Privacy Policy</span> and
              consent to its publication.
            </p>
          </div>
        </span>

        <span className="w-full md:w-auto">
          <button
            onClick={handleUpload}
            disabled={
              isLoading ||
              !title ||
              !author ||
              !course ||
              !department ||
              !year ||
              !isTermsAccepted
            }
            className="w-full md:w-auto text-center text-lg justify-center align-middle items-center bg-gradient-to-r from-gold-fg to-gold hover:bg-gradient-to-br p-2 px-8 font-sans flex gap-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-out"
          >
            Upload
          </button>
        </span>
      </div>
      <Toaster />
    </div>
  );
};

export default UploadFile;
