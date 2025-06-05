"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NavBar from "../../component/NavBar";
import LoadingScreen from "../../component/LoadingScreen";
import ProtectedRoute from "../../component/ProtectedRoute";

interface Paper {
  paper_id: number;
  title: string;
  author: string;
  abstract: string;
  course: string;
  department: string;
  year: number;
  keywords: string[];
}

export default function EditFilePage() {
  const params = useParams();
  const router = useRouter();
  const paper_id = params.paper_id as string;
  
  const [paper, setPaper] = useState<Paper | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      } catch (err) {
        console.error('Error fetching paper:', err);
        setError('Failed to load paper');
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();
  }, [paper_id]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !paper) {
    return (
      <ProtectedRoute>
        <NavBar />
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

  return (
    <ProtectedRoute>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-secondary rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-6">Edit Paper</h1>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={paper.title}
                  onChange={(e) => setPaper({...paper, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Author(s)</label>
                <input
                  type="text"
                  value={paper.author}
                  onChange={(e) => setPaper({...paper, author: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Abstract</label>
                <textarea
                  value={paper.abstract}
                  onChange={(e) => setPaper({...paper, abstract: e.target.value})}
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Course</label>
                  <select
                    value={paper.course}
                    onChange={(e) => setPaper({...paper, course: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  >
                    <option value="">Select Course</option>
                    <option value="SIA">SIA</option>
                    <option value="Capstone">Capstone</option>
                    <option value="CS Thesis Writing">CS Thesis Writing</option>
                    <option value="Research Writing">Research Writing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Department</label>
                  <select
                    value={paper.department}
                    onChange={(e) => setPaper({...paper, department: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  >
                    <option value="">Select Department</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Year</label>
                <input
                  type="number"
                  value={paper.year}
                  onChange={(e) => setPaper({...paper, year: parseInt(e.target.value)})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  min="1900"
                  max="2030"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Keywords</label>
                <input
                  type="text"
                  value={Array.isArray(paper.keywords) ? paper.keywords.join(', ') : ''}
                  onChange={(e) => setPaper({...paper, keywords: e.target.value.split(',').map(k => k.trim())})}
                  placeholder="Enter keywords separated by commas"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gold hover:brightness-110 text-white rounded-lg transition-all duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}