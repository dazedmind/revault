// src/app/component/PDFViewerClient.tsx
"use client";
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import WatermarkOverlay from './WatermarkOverlay';

// Dynamic imports for PDF.js
let Document: any = null;
let Page: any = null;
let pdfjs: any = null;

interface PDFViewerClientProps {
  paperId: string;
  userEmail: string;
  theme?: string;
}

const PDFViewerClient: React.FC<PDFViewerClientProps> = ({ 
  paperId, 
  userEmail,
  theme = 'dark'
}) => {
  const [componentsLoaded, setComponentsLoaded] = useState(false);
  const [paper, setPaper] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pdfError, setPdfError] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<string | null>(null);

  // Add refs for screenshot detection
  const screenshotAttempts = useRef(0);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  // Load PDF.js components
  useEffect(() => {
    const loadPDFComponents = async () => {
      try {
        const pdfModule = await import('react-pdf');
        Document = pdfModule.Document;
        Page = pdfModule.Page;
        pdfjs = pdfModule.pdfjs;
        
        // Set worker
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
        
        setComponentsLoaded(true);
      } catch (error) {
        console.error('Failed to load PDF components:', error);
        setPdfError(true);
      }
    };

    loadPDFComponents();
  }, []);

  // Memoize PDF.js options to prevent unnecessary reloads AND disable text layer
  const pdfOptions = useMemo(() => ({
    cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/`,
    cMapPacked: true,
    standardFontDataUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/standard_fonts/`,
    withCredentials: false,
    httpHeaders: {},
    // Disable text layer rendering to prevent cancellation warnings
    renderTextLayer: false,
    renderAnnotationLayer: false,
  }), []);

  // Get authentication token
  const getToken = () => localStorage.getItem("authToken");

  // Simplified security logging function - ONLY for specific screenshot attempts
  const logSecurityEvent = useCallback(async (eventType: string, details: string) => {
    try {
      // Get user email from JWT token to ensure accuracy
      const token = getToken();
      let currentUserEmail = userEmail;
      
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          currentUserEmail = payload.email || userEmail;
        } catch (jwtError) {
          console.warn('Could not parse JWT for email, using prop:', jwtError);
        }
      }

      await fetch('/api/log-security-event', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          event: eventType,
          userEmail: currentUserEmail,
          documentId: paperId,
          timestamp: new Date().toISOString(),
          details: `${details} on page ${currentPage} (react-pdf secure viewer)`,
          screenshotAttempts: screenshotAttempts.current
        })
      });
      console.log(`🔒 Security event logged: ${eventType} - ${details}`);
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }, [paperId, userEmail, currentPage]);

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
  };

  // Navigation functions
  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);
  
  const goToNextPage = useCallback(() => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, numPages]);
  
  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= numPages) {
      setCurrentPage(page);
    }
  }, [numPages]);

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
  }, [goToPrevPage, goToNextPage]);


  useEffect(() => {
    // Mouse leave detection
    const handleMouseLeave = () => {
      logSecurityEvent(
        'POTENTIAL_SCREENSHOT',
        `Mouse left window or screen dimmed - potential screenshot (Attempt #${screenshotAttempts.current})`
      );
    };



    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [logSecurityEvent]);

  // SIMPLIFIED Security event handlers - ONLY log specific screenshot attempts
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

    // Basic right-click prevention (no logging)
    const preventContextMenu = (e: MouseEvent) => {
      const target = e.target as Element;
      
      // Allow right-click on toolbar elements
      if (isToolbarElement(target)) {
        return true;
      }
      
      e.preventDefault();
      toast.warning('Right-click disabled in secure mode');
      return false;
    };

    // Basic drag prevention (no logging)
    const preventDragStart = (e: DragEvent) => {
      const target = e.target as Element;
      
      // Allow drag on toolbar elements
      if (isToolbarElement(target)) {
        return true;
      }
      
      e.preventDefault();
      return false;
    };

    // Basic text selection prevention (no logging)
    const preventSelectStart = (e: Event) => {
      const target = e.target as Element;
      
      // Allow selection on toolbar elements (input fields)
      if (isToolbarElement(target)) {
        return true;
      }
      
      e.preventDefault();
      return false;
    };

    // SPECIFIC keyboard shortcut detection - ONLY log the 4 specified actions
    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      const target = e.target as Element;
      const isCtrl = e.ctrlKey || e.metaKey;
      
      // Allow normal keyboard input in toolbar inputs
      if (isToolbarElement(target) && target.tagName === 'INPUT') {
        return true;
      }
      
      // ONLY log and block these 4 specific screenshot attempts
      if (isCtrl && ['s', 'p', 'c'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        

        // Add this useEffect after the existing security event handlers useEffect
  
        // Increment screenshot attempts for these specific keys
        
        // Log ONLY these specific attempts
        let eventType = '';
        let details = '';
        
        switch (e.key.toLowerCase()) {
          case 'p':
            eventType = 'CTRL_P';
            details = `Ctrl+P blocked - print attempt`;
            break;
          case 's':
            eventType = 'CTRL_S';
            details = `Ctrl+S blocked - save attempt`;
            break;
          case 'c':
            eventType = 'CTRL_C';
            details = `Ctrl+C blocked - copy attempt (Screenshot attempt #${screenshotAttempts.current})`;
            break;
        }
        
        if (eventType) {
          logSecurityEvent(eventType, details);
        }
        
        toast.warning(`${e.key.toUpperCase()} operation disabled in secure mode`);
        return false;
      }

      // Log Print Screen attempts
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        screenshotAttempts.current++;
        logSecurityEvent(
          'PRINT_SCREEN_ATTEMPT', 
          `Print Screen blocked - screenshot attempt (Screenshot attempt #${screenshotAttempts.current})`
        );
        toast.error('Screenshots disabled in secure mode');
        return false;
      }

      // Block other common shortcuts without logging
      if (isCtrl && ['v', 'x', 'a'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        toast.warning(`${e.key.toUpperCase()} operation disabled in secure mode`);
        return false;
      }

      // Block Windows screenshot tool without logging
      if (e.metaKey && e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        toast.error('Screenshot tools disabled in secure mode');
        return false;
      }
    };

    // Add all event listeners
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
  }, [logSecurityEvent]);

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

  if (!componentsLoaded || loading) {
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
          z-index: 30 !important;
          cursor: pointer !important;
        }

        .toolbar input {
          pointer-events: auto !important;
          z-index: 30 !important;
        }

        /* Fixed PDF container dimensions - prevents layout shift during loading/zooming */
        .pdf-fixed-container {
          width: 100% !important;
          max-width: 1200px !important; /* Match toolbar max-width */
          min-height: 800px !important; /* Larger minimum height */
          height: calc(100vh - 200px) !important; /* Full height minus toolbar and security notice */
          overflow: auto !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          position: relative !important;
          margin: 0 auto !important; /* Center the container */
        }

        /* Zoom container that doesn't affect outer layout */
        .pdf-zoom-container {
          transform-origin: center center !important;
          transition: transform 0.2s ease-in-out !important;
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
      <div className={`toolbar flex items-center justify-between p-4 border-b w-full max-w-6xl mx-auto ${
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
          
          <span className=" py-1 text-sm">
             {currentPage} of {numPages || '?'}
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
        <div className="flex items-center gap-1">
          <span className="text-sm hidden md:block">Go to page:</span>
          <span className="text-sm block md:hidden">Page:</span>
          <input
            type="number"
            min={1}
            max={numPages || 999}
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (!isNaN(page) && page >= 1 && page <= (numPages || 999)) {
                goToPage(page);
              }
            }}
            className="w-12 px-2 py-1 text-sm border rounded bg-accent"
          />
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center">
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
        </div>
      </div>

      {/* PDF Viewer with Fixed Container */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4">
        {/* Fixed-size container that matches toolbar width and doesn't change during loading or zooming */}
        <div 
          ref={pdfContainerRef}
          className="pdf-fixed-container border border-gray-300 dark:border-gray-600 shadow-lg rounded-lg"
        >
          {pdfLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
              <div className="text-center text-white">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                <p>Loading secure PDF...</p>
              </div>
            </div>
          )}
          
          <WatermarkOverlay userEmail={userEmail} />
          
          {pdfBlob && !pdfError ? (
            <div 
              className="pdf-zoom-container"
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
              }}
            >
              {Document && Page && (
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
                    scale={1.0} // Keep base scale at 1.0, use CSS transform for zooming
                    rotate={0}  // Keep base rotation at 0, use CSS transform for rotating
                    onLoadSuccess={onPageLoadSuccess}
                    // Explicitly disable text and annotation layers
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    loading={
                      <div className="flex items-center justify-center w-full h-96 bg-gray-100">
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
              )}
            </div>
          ) : (
            // Error/Loading state with fixed dimensions
            <div className="flex flex-col items-center justify-center w-full h-full p-8 bg-gray-50 dark:bg-gray-800 rounded">
              <div className="text-center max-w-md mx-auto">
                {pdfLoading ? (
                  <>
                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Loader2 className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-spin" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      Loading PDF...
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Preparing secure document viewer
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full animate-pulse w-3/4"></div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">
                      PDF Not Available
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      The PDF file could not be loaded in secure mode.
                    </p>
                    <p className="text-xs text-gray-500 mb-6">
                      Check the browser console for detailed error information.
                    </p>
                    <button
                      onClick={() => {
                        setPdfError(false);
                        setPdfLoading(true);
                        fetchPaper();
                      }}
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium"
                    >
                      Retry Loading
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Simplified Security Notice */}
      <div className={`text-xs p-3 border-t text-center ${
        theme === 'light' ? 'bg-yale-blue/10 border-yale-blue-fg text-yale-blue-fg' : 'bg-yale-blue/20 border-yale-blue-fg text-yale-blue'
      }`}>
        🔒 SECURE MODE: Content protection active • Unauthorized sharing prohibited<br/>
        Shortcuts: ← → (navigate) • + - (zoom) • R (rotate) • 0 (reset)
      </div>
    </div>
  );
};

export default PDFViewerClient;