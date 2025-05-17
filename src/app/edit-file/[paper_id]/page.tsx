"use client";
import pdfToText from "react-pdftotext";
import { useEffect, useRef, useState } from "react";
import AdminNavBar from "@/app/admin/components/AdminNavBar";
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
import { useParams } from "next/navigation";
import { toast } from "sonner";

const EditFile = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingAuthors, setIsEditingAuthors] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [isEditingAbstract, setIsEditingAbstract] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [paperData, setPaperData] = useState(null);
  
  const [title, setTitle] = useState(paperData?.title || '');
  const [fullText, setFullText] = useState(paperData?.abstract || '');
  const [authors, setAuthors] = useState(paperData?.authors || ''); // Add authors state
  const [course, setCourse] = useState(paperData?.course || '');
  const [department, setDepartment] = useState(paperData?.department || '');
  const [year, setYear] = useState(paperData?.year || '');
  const [key, setKey] = useState(Date.now()); // forces re-render of input
  const params = useParams();
  const paperId = params?.paper_id;


  useEffect(() => {
    async function fetchPaper() {
      try {
        console.log("Fetching paper with ID:", paperId);
        const res = await fetch(`/api/paper/${paperId}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        
        if (!res.ok) {
          throw new Error(`Failed to fetch paper: ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log("Fetched paper data:", data);
        
        if (!data) {
          throw new Error('No paper data received');
        }

        setPaperData({
          ...data,
          title: data.title?.replace(/"/g, "") || "",
          author: data.author?.replace(/"/g, "") || "",
          keywords: Array.isArray(data.keywords) 
            ? data.keywords.flatMap(k => k.split(',').map(item => item.trim()))
            : [],
          course: data.course?.replace(/"/g, "") || "",
          department: data.department?.replace(/"/g, "") || "",
          abstract: data.abstract?.replace(/"/g, "") || "",
        });
      } catch (err) {
        console.error("Error fetching paper:", err);
        toast.error("Failed to load paper data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPaper();
  }, [paperId]);

  


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

  async function extractText(event) {
    const file = event.target.files[0];
    if (!file || file.type !== "application/pdf") return;

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

      if (!response.ok) {
        const errorText = await response.text(); // <-- Will likely show HTML error
        console.error("Error in extract API:", response.status, errorText);
        return;
      }
      

      // const jsonString = await response.text(); // first get raw text
      // const result = JSON.parse(jsonString); // then parse it into object
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
      console.log("Year:", result?.extractedYear ?? "No year found");

      // Update state
      if (result) {
        setTitle(result.extractedTitle ?? "");
        setAuthors(result.extractedAuthor ?? "");
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

  const handleClearFile = () => {
    if (ref.current) {
      ref.current.value = ""; // Clear the file input
    }
    setTitle(""); // Clear the detected title
    setFullText(""); // Clear the extracted text
    setAuthors(""); // Clear the authors
    setCourse("");
    setDepartment("");
    setYear("");
    setKey(Date.now()); // Update key to force re-render
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="bg-midnight dark:bg-secondary">
      <AdminNavBar />
      <main className="p-8 md:mx-12">
        <div>
          <h1 className="font-bold text-3xl mb-6">Upload Research Paper</h1>
        </div>

        <div className="flex flex-row">
          <input
            type="file"
            className="p-4 w-full md:w-4xl md:p-10 md:px-60 border-2 border-dashed border-teal rounded-md dark:bg-secondary"
            accept="application/pdf"
            onChange={extractText}
            name="file-input"
            key={ref.current?.value}
            disabled={isLoading}
            value={ref.current?.value}
          />

          <button
            onClick={handleClearFile}
            className="ml-4 px-4 py-4 cursor-pointer bg-dusk hover:bg-red-warning text-white rounded-md"
            disabled={isLoading}
          >
            <Trash className="w-6 h-6" />
          </button>
        </div>
        <label htmlFor="file-input" className="text-sm text-white-50">
          File type: .pdf and .tiff only (Maximum file size: 15MB)
        </label>

        {isLoading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
              <div
                className="bg-teal h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-teal mt-2">
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
                <h3 className="text-md font-medium text-teal">
                  Research Title:
                </h3>
                <button
                  onClick={() => setIsEditingTitle(!isEditingTitle)}
                  className="text-sm px-3 py-1 bg-teal/10 hover:bg-teal/20 text-teal rounded-md transition-colors"
                >
                  {isEditingTitle ? "Save" : "Edit"}
                </button>
              </span>
            </div>
            <textarea
              className={` w-auto p-4 bg-midnight border rounded-md md:w-4xl outline-0 dark:bg-secondary ${
                isEditingTitle
                  ? "border-teal cursor-text"
                  : "border-white-5 cursor-default"
              }`}
              defaultValue={paperData?.title}
              onChange={(e) => setTitle(e.target.value)}
              readOnly={!isEditingTitle}
            />
          </span>

          <span className="flex flex-col gap-2">
            <span className="flex flex-row justify-between w-full md:w-4xl gap-2">
              <h3 className="text-md font-medium text-teal">Authors:</h3>
              <button
                onClick={() => setIsEditingAuthors(!isEditingAuthors)}
                className="text-sm px-3 py-1 bg-teal/10 hover:bg-teal/20 text-teal rounded-md transition-colors"
              >
                {isEditingAuthors ? "Save" : "Edit"}
              </button>
            </span>
            <input
              type="text"
              className={`p-4 bg-midnight border rounded-md w-full md:w-4xl outline-0 dark:bg-secondary ${
                isEditingAuthors
                  ? "border-teal cursor-text"
                  : "border-white-5 cursor-default"
              }`}
              defaultValue={paperData?.author}
              onChange={(e) => setAuthors(e.target.value)}
              readOnly={!isEditingAuthors}
            />
          </span>

          <span className="flex flex-col gap-2">
            <h3 className="text-md font-medium text-teal">Keywords:</h3>
            <div className="flex flex-row flex-wrap gap-2">
              {keywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-teal/10 text-teal rounded-md text-sm"
                >
                  {paperData?.keywords[idx]}
                  {kw}
                </span>
              ))}
            </div>
          </span>


          <div className="flex flex-col md:flex-row gap-4">
          <span className="flex flex-col gap-2">
            <div className="flex flex-col flex-grow">
              <Label className="text-md font-medium text-teal mb-2 dark:bg-secondary">
                Department:
              </Label>
              <Select
                name="department"
                value={paperData?.department}
                onValueChange={setDepartment}
              >
                <SelectTrigger className="w-full md:w-xs p-7 px-4 text-md dark:bg-secondary">
                  <SelectValue placeholder="Select paper department " />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem className="p-4" value="Computer Science">
                      Computer Science
                    </SelectItem>
                    <SelectItem className="p-4" value="Information Technology">
                      Information Technology
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </span>
            <span className="flex flex-col gap-2">
              <div className="flex flex-col flex-grow">
                <Label className="text-md font-medium text-teal mb-2">
                  Course:
                </Label>
                <Select 
                  name="course" 
                  value={paperData?.course} 
                  onValueChange={setCourse}
                >
                  <SelectTrigger className="w-auto md:w-xs p-7 px-4 text-md dark:bg-secondary">
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
              <h3 className="text-md font-medium text-teal">Year:</h3>
              <input
                type="text"
                className="p-4 bg-midnight border border-white-5 rounded-md w-auto md:w-xxs outline-0 dark:bg-secondary"
                defaultValue={paperData?.year}
                onChange={()=>{}}
              />
            </span>
          </div>

          <span className="flex flex-col gap-2">
            <span className="flex flex-row justify-between w-full md:w-4xl gap-2">
              <h3 className="text-md font-medium text-teal">Abstract:</h3>
              <button
                onClick={() => setIsEditingAbstract(!isEditingAbstract)}
                className="text-sm px-3 py-1 bg-teal/10 hover:bg-teal/20 text-teal rounded-md transition-colors"
              >
                {isEditingAbstract ? "Save" : "Edit"}
              </button>
            </span>{" "}
            <textarea
              className={`p-4 bg-midnight border rounded-md w-auto md:w-4xl h-64 outline-0 dark:bg-secondary ${
                isEditingAbstract
                  ? "border-teal cursor-text"
                  : "border-white-5 cursor-default"
              }`}
              defaultValue={paperData?.abstract}
              onChange={(e) => setFullText(e.target.value)}
              readOnly={!isEditingAbstract}
            />
          </span>
        </div>

        {/* <Upload /> */}
      </main>

      <div className="flex justify-between items-center bg-darker p-4 md:p-12 md:px-24 border-t-2 border-dashed border-white-5 dark:bg-primary">
        <span className="flex flex-col gap-2">
          <div className="flex flex-row mt-4">
            <input type="checkbox" />
            <p className="font-inter text-sm ml-1">
              By uploading your research paper, you agree to our{" "}
              <span className="text-teal">Terms and Privacy Policy</span> and
              consent to its publication.
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
};

export default EditFile;
