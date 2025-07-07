// src/app/admin/security/recently-deleted/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Trash2,
  RotateCcw,
  Search,
  Filter,
  Calendar,
  User,
  Building,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { toast, Toaster } from "sonner";

interface DeletedPaper {
  paper_id: number;
  title: string;
  author: string;
  abstract: string;
  keywords: string[];
  department: string;
  course: string;
  year: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  paper_url: string;
  deleted_by: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const RecentlyDeletedPage = () => {
  const router = useRouter();
  const { theme } = useTheme();
  
  const [papers, setPapers] = useState<DeletedPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 10,
    hasNext: false,
    hasPrev: false,
  });
  
  const [filters, setFilters] = useState({
    department: "",
    author: "",
    sortBy: "deleted_at",
    sortOrder: "desc",
  });
  
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<DeletedPaper | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  // Fetch deleted papers
  const fetchDeletedPapers = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      
      if (!token) {
        router.push("/login");
        return;
      }

      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      });

      if (filters.department) {
        params.append("department", filters.department);
      }
      if (filters.author) {
        params.append("author", filters.author);
      }

      const response = await fetch(`/admin/api/recently-deleted?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch deleted papers");
      }

      const data = await response.json();
      
      if (data.success) {
        setPapers(data.papers);
        setPagination(data.pagination);
      } else {
        toast.error("Failed to load deleted papers");
      }
    } catch (error) {
      console.error("Error fetching deleted papers:", error);
      toast.error("Failed to load deleted papers");
    } finally {
      setLoading(false);
    }
  };

  // Handle restore paper
  const handleRestore = async () => {
    if (!selectedPaper) return;

    setIsRestoring(true);
    
    try {
      const token = localStorage.getItem("authToken");
      
      const response = await fetch(`/admin/api/restore-paper/${selectedPaper.paper_id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Paper restored successfully");
        setShowRestoreModal(false);
        setSelectedPaper(null);
        fetchDeletedPapers(pagination.currentPage); // Refresh the list
      } else {
        toast.error(result.error || "Failed to restore paper");
      }
    } catch (error) {
      console.error("Restore error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsRestoring(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedPaper) return;
      
    setIsDeleting(true);
    
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(`/admin/api/permanent-delete/${selectedPaper.paper_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Paper deleted successfully");
        setShowDeleteModal(false);
        setSelectedPaper(null);
        fetchDeletedPapers(pagination.currentPage); // Refresh the list
      } else {
        toast.error(result.error || "Failed to delete paper");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  // Apply filters
  const applyFilters = () => {
    fetchDeletedPapers(1);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      department: "",
      author: "",
      sortBy: "deleted_at",
      sortOrder: "desc",
    });
    setTimeout(() => fetchDeletedPapers(1), 100);
  };

  // Page navigation
  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchDeletedPapers(page);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Truncate text
  const truncateText = (text: string, maxLength = 100) => {
    if (!text) return "No description available";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  useEffect(() => {
    fetchDeletedPapers();
  }, []);

  return (
    <div
      className={`flex flex-col w-auto ${
        theme === "light" ? "bg-secondary border-white-50" : "bg-midnight"
      } p-6 rounded-xl border-1 border-white-5`}
    >
      {/* Header */}
      <span className="flex items-center justify-between">
        <h1 className="text-2xl font-bold ml-1">Recently Deleted</h1>
        <div className="text-sm ">
            {pagination.totalCount} deleted papers
        </div>
      </span>
 
      <div className={`h-0.5 w-auto my-4 ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'}`}></div>

      <div className="w-full px-4 sm:px-6 lg:px-2 py-2">
        {/* Filters */}
        <div className={`${theme === "light" ? "bg-white" : "bg-darker"} rounded-xl border ${theme === "light" ? "border-gray-200" : "border-white-5"} p-6 mb-2`}>
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-gold" />
            <h3 className="text-lg font-semibold">Filters</h3>
          </div>

          <div className="flex gap-4 w-full">
            <div>
              <select
                value={filters.department}
                onChange={(e) => handleFilterChange("department", e.target.value)}
                className={`w-full p-3 rounded-lg border ${theme === "light" ? "border-gray-300" : "border-white-5 bg-secondary"} outline-none focus:ring-2 focus:ring-gold`}
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
              </select>
            </div>

            <div>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                className={`w-full p-3 rounded-lg border ${theme === "light" ? "border-gray-300" : "border-white-5 bg-secondary"} outline-none focus:ring-2 focus:ring-gold`}
              >
                <option value="deleted_at">Sort By</option>
                <option value="year">Year</option>
                <option value="title">Title</option>
              </select>
            </div>

            
            <div className="flex gap-2">
                <button
                onClick={applyFilters}
                className="flex items-center gap-2 px-4 py-1 cursor-pointer bg-gold text-white rounded-lg hover:bg-gold-fg transition-colors"
                >
                <Search className="w-4 h-4" />
                Apply Filters
                </button>
                <button
                onClick={clearFilters}
                className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg transition-colors ${theme === "light" ? "bg-gray-100 hover:bg-gray-200 text-gray-700" : "bg-gray-800 hover:bg-gray-700 text-gray-300"}`}
                >
                <X className="w-4 h-4" />
                Clear
                </button>
            </div>
          </div>

        </div>

        {/* Papers List */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-5">
              <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full"></div>
            </div>
          ) : papers.length === 0 ? (
            <div className={`${theme === "light" ? "bg-white" : "bg-darker"} rounded-xl border ${theme === "light" ? "border-gray-200" : "border-white-5"} p-12 text-center`}>
              <Trash2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Deleted Papers</h3>
              <p className="">
                There are no deleted papers to display.
              </p>
            </div>
          ) : (
            papers.map((paper) => (
              <div
                key={paper.paper_id}
                className={`${theme === "light" ? "bg-white" : "bg-darker"} rounded-xl border ${theme === "light" ? "border-gray-200" : "border-white-5"} p-6 hover:shadow-lg transition-shadow`}
              >
                <div className="flex flex-col items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">
                      {paper.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm  mb-2">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{paper.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        <span>{paper.department}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{paper.year}</span>
                      </div>
                    </div>
                    <p className="text-sm  mb-3">
                      {truncateText(paper.abstract)}
                    </p>
                    <div className="text-xs text-red-600 dark:text-red-400">
                        Deleted by: {paper.deleted_by}
                    </div>
                    <div className="text-xs text-red-600 dark:text-red-400">
                      Deleted on: {formatDate(paper.deleted_at)}
                    </div>
                 
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={() => {
                        setSelectedPaper(paper);
                        setShowRestoreModal(true);
                      }}
                      className="flex items-center gap-2 px-3 py-2 cursor-pointer bg-yale-blue hover:bg-yale-blue/80 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Restore
                    </button>

                    <button
                      onClick={() => {
                        setSelectedPaper(paper);
                        setShowDeleteModal(true);
                      }}
                      className="flex items-center gap-2 px-3 py-2 cursor-pointer bg-red-warning hover:bg-red-warning-fg text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Permanently Delete
                    </button>
                  </div>
                </div>

        
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-8">
            <div className="text-sm ">
              Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to{" "}
              {Math.min(pagination.currentPage * pagination.limit, pagination.totalCount)} of{" "}
              {pagination.totalCount} results
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(pagination.currentPage - 1)}
                disabled={!pagination.hasPrev}
                className={`p-2 rounded-lg ${pagination.hasPrev ? "hover:bg-gray-100 dark:hover:bg-gray-800" : "opacity-50 cursor-not-allowed"}`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter(page => 
                  page === 1 || 
                  page === pagination.totalPages || 
                  Math.abs(page - pagination.currentPage) <= 2
                )
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                    <button
                      onClick={() => goToPage(page)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        page === pagination.currentPage
                          ? "bg-gold text-white"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}

              <button
                onClick={() => goToPage(pagination.currentPage + 1)}
                disabled={!pagination.hasNext}
                className={`p-2 rounded-lg ${pagination.hasNext ? "hover:bg-gray-100 dark:hover:bg-gray-800" : "opacity-50 cursor-not-allowed"}`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Restore Confirmation Modal */}
      {showRestoreModal && selectedPaper && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className={`${
              theme === "light" ? "bg-white" : "bg-darker"
            } rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 pb-0 border-gray-200 dark:border-white-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yale-blue/30 rounded-full">
                  <RotateCcw className="w-5 h-5 text-yale-blue" />
                </div>
                <h3 className="text-lg font-semibold">Restore Paper</h3>
              </div>
              <button
                onClick={() => setShowRestoreModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className=" mb-4">
                Are you sure you want to restore this research paper? It will be moved back to the active papers list.
              </p>
              
              <div className="bg-secondary rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-sm mb-1">Paper to be restored:</h4>
                <p className="text-sm  line-clamp-2">
                  {selectedPaper.title}
                </p>
                <p className="text-xs mt-1">
                  by {selectedPaper.author}
                </p>
              </div>

              <div className="bg-yale-blue/30 border border-yale-blue rounded-lg p-3">
                <p className="text-sm text-yale-blue">
                  <strong>Note:</strong> This paper will be restored and become available to all users again.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6  border-white-5">
              <button
                onClick={() => setShowRestoreModal(false)}
                disabled={isRestoring}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  theme === "light"
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                } ${isRestoring ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                Cancel
              </button>
              <button
                onClick={handleRestore}
                disabled={isRestoring}
                className={`px-4 py-2 bg-yale-blue hover:bg-yale-blue/80 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isRestoring ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isRestoring ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Restoring...
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-4 h-4" />
                    Restore Paper
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedPaper && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
         <div
           className={`${
             theme === "light" ? "bg-white" : "bg-darker"
           } rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden`}
         >
           {/* Modal Header */}
           <div className="flex items-center justify-between p-6 pb-0 border-gray-200 dark:border-white-5">
             <div className="flex items-center gap-3">
               <div className="p-2 bg-red-warning/30 rounded-full">
                 <Trash2 className="w-5 h-5 text-red-warning" />
               </div>
               <h3 className="text-lg font-semibold">Delete Paper</h3>
             </div>
             <button
               onClick={() => setShowDeleteModal(false)}
               className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
             >
               <X className="w-5 h-5" />
             </button>
           </div>

           {/* Modal Body */}
           <div className="p-6">
             <p className=" mb-4">
               Are you sure you want to delete this research paper? It will be <strong>permanently deleted</strong> and cannot be restored.
             </p>
             
             <div className="bg-secondary rounded-lg p-4 mb-6">
               <h4 className="font-semibold text-sm mb-1">Paper to be deleted:</h4>
               <p className="text-sm  line-clamp-2">
                 {selectedPaper.title}
               </p>
               <p className="text-xs mt-1">
                 by {selectedPaper.author}
               </p>
             </div>

             <div className="bg-red-warning/30 border border-red-warning rounded-lg p-3">
               <p className="text-sm text-red-warning">
                 <strong>Note:</strong> This paper will be permanently deleted and cannot be restored.
               </p>
             </div>
           </div>

           {/* Modal Footer */}
           <div className="flex items-center justify-end gap-3 p-6  border-white-5">
             <button
               onClick={() => setShowDeleteModal(false)}
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
               onClick={handleDelete}
               disabled={isDeleting}
               className={`px-4 py-2 bg-red-warning hover:bg-red-warning/80 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                 isDeleting ? "opacity-50 cursor-not-allowed" : ""
               }`}
             >
               {isRestoring ? (
                 <>
                   <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                   Deleting...
                 </>
               ) : (
                 <>
                   <Trash2 className="w-4 h-4" />
                   Delete Permanently
                 </>
               )}
             </button>
           </div>
         </div>
       </div>
      )}
      <Toaster />
    </div>
  );
};

export default RecentlyDeletedPage;