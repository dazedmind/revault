// src/app/admin/components/DocsCardUser.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import { GoEye, GoPencil, GoTrash } from "react-icons/go";
import {
  Calendar,
  Building,
  User,
  FileText,
  Clock,
  MoreHorizontal,
  AlertTriangle,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface DocsCardUserProps {
  img: any;
  title: string;
  abstract: string;
  author: string;
  department: string;
  year: string | number;
  paper_id: string;
  is_deleted: boolean;
  onPaperDeleted?: (paperId: string) => void; // Callback for when paper is deleted
}

const DocsCardUser: React.FC<DocsCardUserProps> = (props) => {
  const router = useRouter();
  const { theme } = useTheme();
  const { paper_id, img, title, abstract, author, department, year, onPaperDeleted, is_deleted } = props;
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const truncateText = (text: string, maxWords = 40) => {
    if (!text) return "No description available";
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  const truncateAuthor = (text: string, maxWords = 24) => {
    if (!text) return "No author available";
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  const formatDate = (dateString: Date | string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Authentication required");
        router.push("/login");
        return;
      }

      console.log('🗑️ Deleting paper with ID:', paper_id);

      const response = await fetch(`/admin/api/delete-file/${paper_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', response.headers);

      // Check if response is OK before trying to parse JSON
      if (!response.ok) {
        console.error('❌ Response not OK:', response.status, response.statusText);
        
        // Try to get error text if JSON parsing fails
        let errorMessage = 'Failed to delete paper';
        try {
          const errorText = await response.text();
          console.log('📄 Error response text:', errorText);
          
          if (errorText) {
            try {
              const errorJson = JSON.parse(errorText);
              errorMessage = errorJson.error || errorMessage;
            } catch {
              errorMessage = errorText;
            }
          }
        } catch (textError) {
          console.error('❌ Failed to read error response:', textError);
        }
        
        toast.error(errorMessage);
        return;
      }

      // Try to parse JSON response
      let result;
      try {
        const responseText = await response.text();
        console.log('📄 Response text:', responseText);
        
        if (!responseText) {
          throw new Error('Empty response from server');
        }
        
        result = JSON.parse(responseText);
        console.log('📋 Parsed result:', result);
      } catch (parseError) {
        console.error('❌ JSON parse error:', parseError);
        toast.error('Invalid response from server');
        return;
      }

      if (result.success) {
        toast.success("Paper deleted successfully");
        setShowDeleteModal(false);
        
        // Call the callback to notify parent component
        if (onPaperDeleted) {
          onPaperDeleted(paper_id);
        }
        
        // Optionally redirect or refresh the page
        router.refresh();
      } else {
        toast.error(result.error || result.message || "Failed to delete paper");
      }
    } catch (error) {
      console.error("❌ Delete error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <div
        className={`group relative transition-all duration-300 hover:shadow-lg ${
          theme === "light"
            ? "bg-white border border-gray-200 "
            : "bg-darker border border-white-5"
        } rounded-xl overflow-hidden`}
      >
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Content */}
            <div className="flex-1 min-w-0 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-xl font-bold leading-tight mb-2 group-hover:text-gold transition-colors duration-300 ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {title || "Untitled"}
                  </h3>

                  <div className="flex items-center gap-2 text-sm ">
                    <User className="w-4 h-4" />
                    <span>{truncateAuthor(author)}</span>
                  </div>
                </div>

                {/* More Options */}
                <div className="flex-shrink-0">
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Metadata Row */}
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm ">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{year}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  <span>{department}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Published: {formatDate(new Date())}</span>
                </div>
              </div>

              {/* Abstract Preview */}
              <div className="mb-4">
                <p
                  className={`text-sm ${theme === "light" ? "text-gray-700" : "text-gray-300"} line-clamp-3 leading-relaxed`}
                >
                  {truncateText(abstract)}
                </p>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div
            className={`flex items-center justify-between pt-4 mt-4 border-t ${
              theme === "light" ? "border-gray-200" : "border-white-5"
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Primary Action */}
              <Link href={`/view-file/${paper_id}`} className="flex-shrink-0">
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold to-gold-fg hover:brightness-120 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer">
                  <GoEye className="text-lg" />
                  <span className="hidden sm:inline">View</span>
                  <span className="sm:hidden">View</span>
                </button>
              </Link>

              {/* Secondary Actions */}
              {(() => {
                const userType = localStorage.getItem("userType");
                if (userType === "LIBRARIAN") {
                  return (
                    <>
                      <Link
                        href={`/edit-file/${paper_id}`}
                        className="flex-shrink-0"
                      >
                        <button
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 cursor-pointer ${
                            theme === "light"
                              ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                              : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                          }`}
                        >
                          <GoPencil className="text-lg" />
                          <span className="hidden sm:inline">Edit Details</span>
                        </button>
                      </Link>
                      
                      <button
                        onClick={handleDeleteClick}
                        disabled={isDeleting}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 cursor-pointer ${
                          isDeleting 
                            ? "opacity-50 cursor-not-allowed" 
                            : "hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                        } ${
                          theme === "light"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-gray-800 text-gray-300"
                        }`}
                      >
                        <GoTrash className="text-lg" />
                        <span className="hidden sm:inline">
                          {isDeleting ? "Deleting..." : "Delete"}
                        </span>
                      </button>
                    </>
                  );
                }
                return null;
              })()}
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-6 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <FileText className="w-3 h-3" />
                <span>Published</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className={`${
              theme === "light" ? "bg-white" : "bg-darker"
            } rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 pb-0 border-gray-200 dark:border-white-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold">Delete Paper</h3>
              </div>
              <button
                onClick={handleDeleteCancel}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className=" mb-4">
                Are you sure you want to delete this research paper? This action will move the paper to recently deleted.
              </p>
              
              <div className="bg-secondary rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-sm mb-1">Paper to be deleted:</h4>
                <p className="text-sm  line-clamp-2">
                  {title}
                </p>
                <p className="text-xs mt-1">
                  by {author}
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-red-warning rounded-lg p-3">
                <p className="text-sm text-red-warning">
                  <strong>Note:</strong> This paper will be moved to recently deleted and can be restored by the Chief Librarian if needed.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-gray-200 dark:border-white-5">
              <button
                onClick={handleDeleteCancel}
                disabled={isDeleting}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  theme === "light"
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                } ${isDeleting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className={`px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isDeleting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <GoTrash className="w-4 h-4" />
                    Delete Paper
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DocsCardUser;