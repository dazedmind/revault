import React, { useState, useEffect } from 'react';
import { 
  Download, 
  ExternalLink, 
  Eye, 
  Smartphone, 
  Monitor, 
  ArrowLeft 
} from 'lucide-react';
import { toast } from 'sonner';

const MobileFriendlyPDFViewer = ({ pdfUrl, pdfError, handlePdfError, theme }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState('auto'); // 'auto', 'iframe', 'google'

  useEffect(() => {
    // More accurate mobile detection - only detect actual mobile devices, not just small screens
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      // Only consider it mobile if it's actually a mobile device, not just a small screen
      return /android|iphone|ipad|ipod|blackberry|iemobile/i.test(userAgent.toLowerCase());
    };
    
    setIsMobile(checkMobile());
    
    // Don't change mobile detection on resize - keep it based on device type only
  }, []);

  // Handle error states first
  if (!pdfUrl || pdfError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-8 bg-gray-100 dark:bg-gray-800">
        <div className="text-center">
          {pdfError ? (
            <>
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                PDF Not Available
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The PDF file could not be loaded. It may have been moved or deleted.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={() => window.history.back()}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
                >
                  Go Back
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gold hover:brightness-110 text-white px-4 py-2 rounded-lg transition-all duration-300"
                >
                  Retry
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                No PDF File Available
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This document doesn&apos;t have an associated PDF file.
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  // DESKTOP: Use the original object tag approach (for all non-mobile devices)
  if (!isMobile) {
    const pdfDisplayUrl = `${pdfUrl}#toolbar=0`;
    
    return (
      <object
        data={pdfDisplayUrl}
        type="application/pdf"
        width="100%"
        height="100%"
        className="h-screen w-full"
        onError={handlePdfError}
      >
        {/* Fallback content when PDF can't be displayed on desktop */}
        <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-100 dark:bg-gray-800">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              PDF Viewer Not Supported
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your browser doesn&apos;t support inline PDF viewing.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">

              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
              >
                Open in New Tab
              </a>
            </div>
          </div>
        </div>
      </object>
    );
  }

  // MOBILE: Use mobile-friendly options (only for actual mobile devices)
  const googleViewerUrl = `https://docs.google.com/gviewr?url=${encodeURIComponent(pdfUrl)}&embedded=true`;

  // Mobile options menu
  if (viewMode === 'auto') {
    return (
      <div className="flex flex-col items-center justify-center h-dvh p-4 bg-gray-100 dark:bg-gray-800">
        <div className="text-center max-w-sm w-fu0ll">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Smartphone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-base font-semibold mb-2">
            Mobile PDF Viewer
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-xs">
            Choose how to view this PDF
          </p>
          
          <div className="space-y-2">
            {/* Google Docs Viewer Option */}
            <button
              onClick={() => setViewMode('google')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-xs"
            >
              <Eye className="w-3 h-3" />
              View in Browser
            </button>
            
            {/* Try iframe */}
            <button
              onClick={() => setViewMode('iframe')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-xs"
            >
              <Monitor className="w-3 h-3" />
              Try Direct View
            </button>
            
            
            {/* Open in New Tab */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-xs"
            >
              <ExternalLink className="w-3 h-3" />
              Open in New Tab
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Google Docs Viewer mode (mobile)
  if (viewMode === 'google') {
    return (
      <div className="relative h-screen">
        <div className="absolute top-2 left-2 z-10">
          <button
            onClick={() => setViewMode('auto')}
            className="bg-black/70 text-white px-2 py-1 rounded text-xs hover:bg-black/90 transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" />
            Back
          </button>
        </div>
        <iframe
          src={googleViewerUrl}
          width="100%"
          height="100%"
          className="border-0"
          title="PDF Viewer"
          onError={() => {
            toast.error("Google Viewer failed to load");
            setViewMode('iframe');
          }}
        />
      </div>
    );
  }

  // Iframe mode (mobile fallback)
  if (viewMode === 'iframe') {
    return (
      <div className="relative h-screen">
        <div className="absolute top-2 left-2 z-10">
          <button
            onClick={() => setViewMode('auto')}
            className="bg-black/70 text-white px-2 py-1 rounded text-xs hover:bg-black/90 transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" />
            Back
          </button>
        </div>
        
        <iframe
          src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
          width="100%"
          height="100%"
          className="border-0"
          title="PDF Viewer"
          onError={() => {
            console.error("Iframe failed to load PDF");
            toast.error("Direct view failed. Try another option.");
            setViewMode('auto');
          }}
        />
      </div>
    );
  }

  return null;
};

export default MobileFriendlyPDFViewer;