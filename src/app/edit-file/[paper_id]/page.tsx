"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LoadingScreen from "../../component/LoadingScreen";
import ProtectedRoute from "../../component/ProtectedRoute";
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
  ArrowLeft, 
  Save, 
  FileText, 
  User, 
  Calendar, 
  Building, 
  BookOpen, 
  Tag,
  Edit3,
  Eye,
  FileCheck
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast, Toaster } from "sonner";
import AdminNavBar from "@/app/admin/components/AdminNavBar";

interface Paper {
  paper_id: number;
  title: string;
  author: string;
  abstract: string;
  course: string;
  department: string;
  year: number;
  keywords: string[] | string;
}

export default function EditFilePage() {
  const params = useParams();
  const router = useRouter();
  const paper_id = params.paper_id as string;
  const { theme } = useTheme();
  
  const [paper, setPaper] = useState<Paper | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  // Form states matching upload page
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [fullText, setFullText] = useState("");
  const [course, setCourse] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isTermsAccepted, setIsTermsAccepted] = useState(true); // Pre-accepted for edit
  
  // Edit states
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingAuthors, setIsEditingAuthors] = useState(false);
  const [isEditingAbstract, setIsEditingAbstract] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const fetchPaper = async () => {
      if (!paper_id) return;

      try {
        const res = await fetch(`/api/paper/${paper_id}`);
        
        if (!res.ok) {
          throw new Error('Paper not found');
        }

        const data = await res.json();
        setPaper(data);
        
        // Populate form fields
        setTitle(data.title || "");
        setAuthor(data.author || "");
        setFullText(data.abstract || "");
        setCourse(data.course || "");
        setDepartment(data.department || "");
        setYear(data.year?.toString() || "");
        
        // Handle keywords
        if (Array.isArray(data.keywords)) {
          setKeywords(data.keywords);
        } else if (typeof data.keywords === 'string') {
          setKeywords(data.keywords.split(',').map(k => k.trim()));
        } else {
          setKeywords([]);
        }
        
      } catch (err) {
        console.error('Error fetching paper:', err);
        setError('Failed to load paper');
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();
  }, [paper_id]);

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

  const handleUpdate = async () => {
    if (!paper) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/paper/${paper_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          author,
          abstract: fullText,
          course,
          department,
          year: parseInt(year),
          keywords,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update paper');
      }

      toast.success('Paper updated successfully!');
      router.push(`/view-file/${paper_id}`);
    } catch (err) {
      console.error('Error updating paper:', err);
      toast.error('Failed to update paper');
    } finally {
      setSaving(false);
    }
  };

  if (!mounted) return null;

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !paper) {
    return (
      <ProtectedRoute>
        <AdminNavBar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p className="text-gray-600 mb-4">{error || 'Paper not found'}</p>
            <button
              onClick={() => router.back()}
              className="bg-gold hover:brightness-110 text-white px-4 py-2 rounded-lg"
            >
              Go Back
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const isFormValid = title && author && course && department && year && isTermsAccepted;

  return (
    <ProtectedRoute>
      <div className={`min-h-screen ${theme === 'light' ? 'bg-secondary' : 'bg-midnight'}`}>
        <AdminNavBar />
        
        {/* Hero Section */}
        <div className={`${theme === 'light' ? 'border-b bg-tertiary' : 'border-b bg-dusk'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gold/20 rounded-full">
                  <Edit3 className="w-8 h-8 text-gold" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Edit Research Paper
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Update your research paper information
              </p>
            </div>
          </div>
        </div>

        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Edit Section */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Back Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.back()}
                  className="flex items-center gap-2 px-3 py-2 bg-accent cursor-pointer hover:bg-card-foreground rounded-lg transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                
                {/* Title Section */}
                <div className={`bg-secondary rounded-2xl shadow-sm border ${theme === 'light' ? 'border-white-50' : 'border-white-5'} p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-5 h-5 text-gold" />
                      <h3 className="text-lg font-semibold">Research Title</h3>
                    </div>
                    <button
                      onClick={() => isEditingTitle ? handleSaveTitle() : setIsEditingTitle(true)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gold/10 hover:bg-gold/20 text-gold rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                      {isEditingTitle ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                      {isEditingTitle ? "Save" : "Edit"}
                    </button>
                  </div>
                  <textarea
                    className={`w-full p-4 rounded-xl border transition-all duration-200 resize-none ${
                      isEditingTitle
                        ? "border-gold bg-gold/5 focus:ring-2 focus:ring-gold/20 focus:border-gold"
                        : "border-white-5 bg-accent cursor-default"
                    } outline-none`}
                    value={title.toUpperCase()}
                    onChange={(e) => setTitle(e.target.value.toUpperCase())}
                    readOnly={!isEditingTitle}
                    rows={3}
                    placeholder="Research paper title..."
                  />
                </div>

                {/* Author Section */}
                <div className={`bg-secondary rounded-2xl shadow-sm border ${theme === 'light' ? 'border-white-50' : 'border-white-5'} p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gold" />
                      <h3 className="text-lg font-semibold">Authors</h3>
                    </div>
                    <button
                      onClick={() => isEditingAuthors ? handleSaveAuthors() : setIsEditingAuthors(true)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gold/10 hover:bg-gold/20 text-gold rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                      {isEditingAuthors ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
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
                    placeholder="Author names..."
                  />
                </div>

                {/* Keywords Section */}
                {keywords.length > 0 && (
                  <div className={`bg-secondary rounded-2xl shadow-sm border ${theme === 'light' ? 'border-white-50' : 'border-white-5'} p-6`}>
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
                <div className={`bg-secondary rounded-2xl shadow-sm border ${theme === 'light' ? 'border-white-50' : 'border-white-5'} p-6`}>
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
                      <Select name="department" value={department} onValueChange={setDepartment}>
                        <SelectTrigger className="w-full p-7 px-4 text-md dark:bg-secondary border-white-5 rounded-lg">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem className="p-3" value="Computer Science">
                              Computer Science
                            </SelectItem>
                            <SelectItem className="p-3" value="Information Technology">
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
                      <Select name="course" value={course} onValueChange={setCourse} required={true}>
                        <SelectTrigger className="w-full p-7 px-4 text-md dark:bg-secondary border-white-5 rounded-lg">
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem className="p-3" value="SIA">SIA</SelectItem>
                            <SelectItem className="p-3" value="Capstone">Capstone</SelectItem>
                            <SelectItem className="p-3" value="Compiler Design">Compiler Design</SelectItem>
                            <SelectItem className="p-3" value="CS Thesis Writing">CS Thesis Writing</SelectItem>
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
                <div className={`bg-secondary rounded-2xl shadow-sm border ${theme === 'light' ? 'border-white-50' : 'border-white-5'} p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gold" />
                      <h3 className="text-lg font-semibold">Abstract</h3>
                    </div>
                    <button
                      onClick={() => isEditingAbstract ? handleSaveAbstract() : setIsEditingAbstract(true)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gold/10 hover:bg-gold/20 text-gold rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                      {isEditingAbstract ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
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
                    placeholder="Paper abstract..."
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 mt-18">
              {/* Paper Info */}
              <div className={`bg-secondary rounded-2xl shadow-sm border ${theme === 'light' ? 'border-white-50' : 'border-white-5'} p-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-gold" />
                  <h3 className="text-lg font-semibold">Paper Information</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Paper ID</span>
                    <span className="font-medium">#{paper.paper_id}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Status</span>
                    <span className="px-2 py-1 bg-green-400/30 text-green-600 rounded-full text-xs font-medium">
                      Published
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => router.push(`/view-file/${paper_id}`)}
                    className="w-full flex items-center gap-2 px-3 py-2 my-2 cursor-pointer hover:bg-card-foreground rounded-lg transition-colors duration-200 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View Paper
                  </button>
                </div>
              </div>

        
            </div>
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className={`${theme === 'light' ? 'bg-secondary border-t border-white-5' : 'bg-dusk-fg border-t border-white-5'} p-6`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 text-gold focus:ring-gold border-white-5 rounded"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  I confirm that these changes are accurate and maintain the integrity of the research paper.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => router.back()}
                  className="px-4 py-3 border cursor-pointer border-gray-300 rounded-xl hover:bg-gray-50 hover:text-midnight transition-colors font-medium"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={!isFormValid || saving}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-white transition-all duration-300 cursor-pointer ${
                    isFormValid && !saving
                      ? "bg-gradient-to-r from-gold to-gold-fg hover:brightness-120 hover:shadow-lg shadow-gold"
                      : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                  }`}
                >
                  {saving ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save strokeWidth={2} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <Toaster />
      </div>
    </ProtectedRoute>
  );
}