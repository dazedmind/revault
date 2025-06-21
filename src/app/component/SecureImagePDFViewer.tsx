// src/app/component/SecureImagePDFViewer.tsx
"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
// Remove these imports since we're disabling text/annotation layers for security
// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import 'react-pdf/dist/Page/TextLayer.css';
import WatermarkOverlay from './WatermarkOverlay';

// Set up PDF.js worker with proper CDN URL
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface SecureImagePDFViewerProps {
  paperId: string;
  userEmail: string;
  theme?: string;
}

const SecureImagePDFViewer: React.FC<SecureImagePDFViewerProps> = ({ 
  paperId, 
  userEmail,
  theme = 'dark'
}) => {
  const [paper, setPaper] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pdfError, setPdfError] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<string | null>(null);

  // Memoize PDF.js options to prevent unnecessary reloads AND disable text layer
  const pdfOptions = useMemo(() => ({
    cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/cmaps/`,
    cMapPacked: true,
    standardFontDataUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/standard_fonts/`,
    withCredentials: false,
    httpHeaders: {},
    // Disable text layer rendering to prevent cancellation warnings
    renderTextLayer: false,
    renderAnnotationLayer: false,
  }), []);

  // Get authentication token
  const getToken = () => localStorage.getItem("authToken");

  // Convert Google Cloud Storage URL to proxy URL
  const convertToProxyUrl = (originalUrl: string): string => {
    if (originalUrl.includes('storage.googleapis.com')) {
      try {
        const url = new URL(originalUrl);
        const path = url.pathname.substring(1); // Remove leading slash
        const proxyUrl = `/api/pdf-proxy/${path}`;
        console.log('🔄 Converting GCS URL to proxy:', { originalUrl, proxyUrl });
        return proxyUrl;
      } catch (error) {
        console.error('❌ Error converting URL to proxy:', error);
        return originalUrl;
      }
    }
    return originalUrl;
  };

  // Fetch PDF as blob for better security and CORS handling
  const fetchPdfAsBlob = useCallback(async (url: string) => {
    try {
      console.log('📥 Starting PDF blob fetch:', url);
      const token = getToken();
      
      // Convert to proxy URL if it's a Google Cloud Storage URL
      const fetchUrl = convertToProxyUrl(url);
      console.log('🎯 Using fetch URL:', fetchUrl);

      const response = await fetch(fetchUrl, {
        method: 'GET',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          'Cache-Control': 'no-cache',
          'Accept': 'application/pdf,*/*',
        },
        mode: 'cors',
        credentials: 'include',
      });

      console.log('📊 Fetch response:', {
        status: response.status,
        statusText: response.statusText,
        contentType: response.headers.get('content-type'),
        contentLength: response.headers.get('content-length')
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && !contentType.includes('application/pdf')) {
        console.warn('⚠️ Unexpected content type:', contentType);
      }

      const blob = await response.blob();
      console.log('✅ Blob created:', {
        size: blob.size,
        type: blob.type
      });
      
      const blobUrl = URL.createObjectURL(blob);
      console.log('🔗 Blob URL created:', blobUrl.substring(0, 50) + '...');
      
      return blobUrl;
    } catch (error) {
      console.error('💥 Error fetching PDF as blob:', error);
      throw error;
    }
  }, []);

  // Get the PDF URL directly from paper_url
  const getPdfUrl = useCallback(() => {
    if (!paper) {
      console.log('❌ No paper data available');
      return null;
    }
    
    console.log('📋 Paper data:', {
      paper_url: paper.paper_url,
      file_path: paper.file_path,
      paper_id: paper.paper_id
    });
    
    // Priority order for PDF URL:
    // 1. paper_url from database (direct Google Cloud URL)
    // 2. file_path from database
    // 3. API endpoint for download
    if (paper.paper_url) {
      console.log('✅ Using paper_url:', paper.paper_url);
      return paper.paper_url;
    } else if (paper.file_path) {
      console.log('✅ Using file_path:', paper.file_path);
      return paper.file_path;
    } else {
      const apiUrl = `/api/papers/${paperId}/download`;
      console.log('✅ Using API endpoint:', apiUrl);
      return apiUrl;
    }
  }, [paper, paperId]);

  // Fetch paper data
  const fetchPaper = useCallback(async () => {
    try {
      console.log('📄 Fetching paper with ID:', paperId);
      const token = getToken();
      
      const res = await fetch(`/api/paper/${paperId}`, {
        method: 'GET',
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      console.log('📊 Paper fetch response:', res.status, res.statusText);

      if (!res.ok) {
        throw new Error(`Failed to fetch paper: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      console.log('✅ Paper data received:', {
        paper_id: data.paper_id,
        title: data.title?.substring(0, 50) + '...',
        has_paper_url: !!data.paper_url,
        has_file_path: !!data.file_path,
        paper_url: data.paper_url
      });

      if (!data) {
        throw new Error("No paper data received");
      }

      const paperData = {
        ...data,
        paper_id: data.paper_id || "",
        title: data.title?.replace(/"/g, "") || "",
        author: data.author?.replace(/"/g, "") || "",
        paper_url: data.paper_url || null,
        file_path: data.file_path || null,
      };

      setPaper(paperData);
      console.log('✅ Paper state updated successfully');

      // Fetch PDF as blob once paper data is loaded
      const pdfUrl = paperData.paper_url || paperData.file_path || `/api/papers/${paperId}/download`;
      if (pdfUrl) {
        console.log('🚀 Starting PDF blob creation for:', pdfUrl);
        setPdfLoading(true);
        setPdfError(false);
        
        try {
          const blobUrl = await fetchPdfAsBlob(pdfUrl);
          setPdfBlob(blobUrl);
          console.log('✅ PDF blob set successfully');
        } catch (blobError) {
          console.error('💥 PDF blob creation failed:', blobError);
          setPdfError(true);
          toast.error(`Failed to load PDF: ${blobError.message}`);
        } finally {
          setPdfLoading(false);
        }
      } else {
        console.log('❌ No PDF URL found in paper data');
        setPdfError(true);
        toast.error("No PDF URL found");
      }

    } catch (err) {
      console.error('💥 Paper fetch error:', err);
      toast.error(`Failed to load paper data: ${err.message}`);
      setPdfError(true);
    } finally {
      setLoading(false);
    }
  }, [paperId, fetchPdfAsBlob]);

  // PDF Document Load Success
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log('✅ PDF loaded successfully:', numPages, 'pages');
    setNumPages(numPages);
    setPdfLoading(false);
    setPdfError(false);
    toast.success(`PDF loaded: ${numPages} pages`);
  };

  // PDF Document Load Error
  const onDocumentLoadError = (error: Error) => {
    console.error('💥 PDF load error:', error);
    setPdfError(true);
    setPdfLoading(false);
    toast.error(`Failed to load PDF document: ${error.message}`);
  };

  // Page Load Success
  const onPageLoadSuccess = () => {
    console.log('✅ Page', currentPage, 'loaded successfully');
    // Log page view
    fetch('/api/log-security-event', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        event: 'SECURE_PAGE_VIEW',
        userEmail,
        documentId: paperId,
        timestamp: new Date().toISOString(),
        details: `Viewed page ${currentPage} in secure mode`
      })
    }).catch(() => {});
  };

  // Navigation functions
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= numPages) {
      setCurrentPage(page);
    }
  };

  // Zoom functions
  const zoomIn = () => setScale(prev => Math.min(prev + 0.25, 3.0));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const resetZoom = () => setScale(1.0);

  // Rotation functions
  const rotateClockwise = () => setRotation(prev => (prev + 90) % 360);
  const resetRotation = () => setRotation(0);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't interfere with input fields
      if ((e.target as Element).tagName === 'INPUT') {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevPage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNextPage();
          break;
        case '+':
        case '=':
          e.preventDefault();
          zoomIn();
          break;
        case '-':
          e.preventDefault();
          zoomOut();
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          rotateClockwise();
          break;
        case '0':
          e.preventDefault();
          resetZoom();
          resetRotation();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, numPages]);

  // Security event handlers - Updated to not interfere with toolbar
  useEffect(() => {
    const isToolbarElement = (element: Element): boolean => {
      return !!(
        element.closest('.toolbar') ||
        element.closest('button') ||
        element.closest('input') ||
        element.classList.contains('toolbar') ||
        element.tagName === 'BUTTON' ||
        element.tagName === 'INPUT'
      );
    };

    const preventContextMenu = (e: MouseEvent) => {
      const target = e.target as Element;
      
      // Allow right-click on toolbar elements
      if (isToolbarElement(target)) {
        return true;
      }
      
      e.preventDefault();
      
      // Log security event
      fetch('/api/log-security-event', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({
          event: 'RIGHT_CLICK_BLOCKED',
          userEmail,
          documentId: paperId,
          timestamp: new Date().toISOString(),
          details: `Right-click blocked on page ${currentPage} (react-pdf secure viewer)`
        })
      }).catch(() => {});
      
      return false;
    };

    const preventDragStart = (e: DragEvent) => {
      const target = e.target as Element;
      
      // Allow drag on toolbar elements
      if (isToolbarElement(target)) {
        return true;
      }
      
      e.preventDefault();
      return false;
    };

    const preventSelectStart = (e: Event) => {
      const target = e.target as Element;
      
      // Allow selection on toolbar elements (input fields)
      if (isToolbarElement(target)) {
        return true;
      }
      
      e.preventDefault();
      return false;
    };

    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      const target = e.target as Element;
      const isCtrl = e.ctrlKey || e.metaKey;
      
      // Allow normal keyboard input in toolbar inputs
      if (isToolbarElement(target) && target.tagName === 'INPUT') {
        return true;
      }
      
      // Block common shortcuts
      if (isCtrl && ['s', 'p', 'a', 'c', 'v', 'x', 'f'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        
        // Log the attempt
        fetch('/api/log-security-event', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
          },
          body: JSON.stringify({
            event: 'KEYBOARD_SHORTCUT_BLOCKED',
            userEmail,
            documentId: paperId,
            timestamp: new Date().toISOString(),
            details: `Blocked: Ctrl+${e.key.toUpperCase()} in secure react-pdf viewer`
          })
        }).catch(() => {});
        
        toast.warning(`${e.key.toUpperCase()} operation disabled in secure mode`);
        return false;
      }
    };

    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('dragstart', preventDragStart);
    document.addEventListener('selectstart', preventSelectStart);
    document.addEventListener('keydown', preventKeyboardShortcuts);

    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('dragstart', preventDragStart);
      document.removeEventListener('selectstart', preventSelectStart);
      document.removeEventListener('keydown', preventKeyboardShortcuts);
    };
  }, [currentPage, paperId, userEmail]);

  // Initialize
  useEffect(() => {
    console.log('🚀 Component initialized with:', { paperId, userEmail });
    fetchPaper();
  }, [fetchPaper]);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (pdfBlob) {
        console.log('🧹 Cleaning up blob URL');
        URL.revokeObjectURL(pdfBlob);
      }
    };
  }, [pdfBlob]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading secure PDF viewer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`secure-pdf-viewer h-screen flex flex-col ${theme === 'light' ? 'bg-gray-100' : 'bg-dusk'}`}>
      {/* Protection Styles */}
      <style jsx global>{`
        .react-pdf__Document {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
        }

        .react-pdf__Page {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-user-drag: none !important;
          user-drag: none !important;
        }

        /* Since text/annotation layers are disabled, these shouldn't appear but keeping for safety */
        .react-pdf__Page__textContent {
          display: none !important;
        }

        .react-pdf__Page__annotations {
          display: none !important;
        }

        .react-pdf__Page canvas {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-user-drag: none !important;
          user-drag: none !important;
          /* Allow pointer events for scrolling */
          pointer-events: auto !important;
        }

        /* Ensure toolbar buttons are clickable */
        .toolbar button {
          pointer-events: auto !important;
          z-index: 1000 !important;
        }

        .toolbar input {
          pointer-events: auto !important;
          z-index: 1000 !important;
        }

        /* Print protection */
        @media print {
          .secure-pdf-viewer {
            display: none !important;
          }
          
          body::after {
            content: "This document cannot be printed from the secure viewer. Please use the official download option.";
            font-size: 24px;
            color: red;
            text-align: center;
            display: block;
            margin: 20px;
          }
        }
      `}</style>

      {/* Toolbar */}
      <div className={`toolbar flex items-center justify-between p-4 border-b w-3xl ${
        theme === 'light' ? 'bg-white border-gray-300' : 'bg-dusk border-white-5'
      }`}>
        {/* Navigation */}
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPrevPage}
            disabled={currentPage <= 1}
            className="p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="px-3 py-1 text-sm">
            Page {currentPage} of {numPages}
          </span>
          
          <button
            onClick={goToNextPage}
            disabled={currentPage >= numPages}
            className="p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Page Input */}
        <div className="flex items-center space-x-2">
          <span className="text-sm">Go to page:</span>
          <input
            type="number"
            min={1}
            max={numPages}
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (!isNaN(page) && page >= 1 && page <= numPages) {
                goToPage(page);
              }
            }}
            className="w-16 px-2 py-1 text-sm border rounded bg-accent"
          />
        </div>


        {/* Zoom Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className="p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          
          <span className="px-3 py-1 text-sm min-w-[60px] text-center">
            {Math.round(scale * 100)}%
          </span>
          
          <button
            onClick={zoomIn}
            disabled={scale >= 3.0}
            className="p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
          >
            <ZoomIn className="w-5 h-5" />
          </button>

          <button
            onClick={rotateClockwise}
            className="p-2 rounded hover:bg-gray-200"
          >
            <RotateCw className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              resetZoom();
              resetRotation();
            }}
            className="px-3 py-1 text-sm rounded hover:bg-gray-200"
          >
            Reset
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4">
        {pdfBlob && !pdfError ? (
          <div className="relative">
            {pdfLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
              </div>
            )}
            
            <WatermarkOverlay userEmail={userEmail} />
            <Document
              file={pdfBlob}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <span className="ml-2">Loading PDF...</span>
                </div>
              }
              error={
                <div className="flex flex-col items-center justify-center p-8 bg-red-50 dark:bg-red-900/20 rounded">
                  <p className="text-red-600 dark:text-red-400 mb-4">Failed to load PDF</p>
                  <button
                    onClick={() => {
                      setPdfError(false);
                      setPdfLoading(true);
                      fetchPaper();
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Retry
                  </button>
                </div>
              }
              className="shadow-lg"
              options={pdfOptions}
            >
              <Page
                pageNumber={currentPage}
                scale={scale}
                rotate={rotation}
                onLoadSuccess={onPageLoadSuccess}
                // Explicitly disable text and annotation layers
                renderTextLayer={false}
                renderAnnotationLayer={false}
                loading={
                  <div className="flex items-center justify-center w-full h-96 bg-gray-100 ">
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                }
                error={
                  <div className="flex items-center justify-center w-full h-96 bg-red-50 dark:bg-red-900/20">
                    <p className="text-red-600 dark:text-red-400">Failed to load page {currentPage}</p>
                  </div>
                }
                className="border border-gray-300 dark:border-gray-600"
              />
            </Document>
          </div>
        ) : (
          // Error state
          <div className="flex flex-col items-center justify-center w-full h-96 p-8 bg-gray-100 rounded border">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                PDF Not Available
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The PDF file could not be loaded in secure mode.
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Check the browser console for detailed error information.
              </p>
              <button
                onClick={() => {
                  setPdfError(false);
                  setPdfLoading(true);
                  fetchPaper();
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-300"
              >
                Retry
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Security Notice & Keyboard Shortcuts */}
      <div className={`text-xs p-3 border-t text-center ${
        theme === 'light' ? 'bg-yale-blue/10 border-yale-blue-fg text-yale-blue-fg' : 'bg-yale-blue/20 border-yale-blue-fg text-yale-blue'
      }`}>
        🔒 SECURE MODE: All interactions monitored • Content watermarked • Text selection disabled<br/>
        Shortcuts: ← → (navigate) • + - (zoom) • R (rotate) • 0 (reset) • Unauthorized sharing prohibited
      </div>
    </div>
  );
};

export default SecureImagePDFViewer;