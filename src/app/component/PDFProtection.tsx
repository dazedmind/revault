// Simple Working PDF Protection - No overlays, CSS only
// src/app/component/SimplePDFProtection.tsx

import { useEffect } from 'react';
import useAntiCopy from '../hooks/useAntiCopy';

interface PDFProtectionProps {
  userEmail: string;
  documentId: string;
  enabled?: boolean;
}


const PDFProtection: React.FC<PDFProtectionProps> = ({ 
  userEmail, 
  documentId, 
  enabled = true 
}) => {
  useAntiCopy();
    
  useEffect(() => {
    
    if (!enabled) return;

    // Right-click prevention
    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Add right-click event listener to the entire document
    document.addEventListener('contextmenu', handleRightClick, true);

    // Simple CSS-only protection that doesn't interfere with scrolling
    const protectionStyle = document.createElement('style');
    protectionStyle.id = 'simple-pdf-protection';
    protectionStyle.textContent = `
      /* PDF Protection - allows scrolling */
      .pdf-viewer-container,
      .react-pdf-viewer,
      .fallback-pdf-iframe {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }

      /* Block text selection highlighting */
      .pdf-viewer-container *::selection,
      .pdf-viewer-container *::-moz-selection,
      .react-pdf-viewer *::selection,
      .react-pdf-viewer *::-moz-selection {
        background: transparent !important;
        color: inherit !important;
      }

      /* CRITICAL: Allow pointer events for scrolling */
      .pdf-viewer-container object,
      .pdf-viewer-container embed,
      .pdf-viewer-container iframe,
      .react-pdf-viewer canvas,
      .react-pdf-viewer .react-pdf__Page {
        pointer-events: auto !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        user-select: none !important;
      }

      /* Prevent drag operations */
      .pdf-viewer-container *,
      .react-pdf-viewer * {
        -webkit-user-drag: none !important;
        user-drag: none !important;
      }

      /* Hide PDF text layers for security */
      .react-pdf__Page__textContent {
        display: none !important;
      }

      .react-pdf__Page__annotations {
        display: none !important;
      }
    `;

    // Remove existing protection styles
    const existingStyle = document.getElementById('simple-pdf-protection');
    if (existingStyle) {
      existingStyle.remove();
    }

    document.head.appendChild(protectionStyle);

    // Enhanced keyboard protection
    const handleKeyboard = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const isCtrl = e.ctrlKey || e.metaKey;

      // Specifically block Ctrl+S (save/download) and Ctrl+P (print)
      if (isCtrl && (key === 's' || key === 'p')) {
        e.preventDefault();
        e.stopPropagation();
        
        // Log the attempt
        fetch('/api/log-security-event', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'PDF_KEYBOARD_BLOCK',
            userEmail,
            documentId,
            timestamp: new Date().toISOString(),
            details: `Blocked: Ctrl+${key.toUpperCase()}`
          })
        }).catch(() => {});

        alert(`${key.toUpperCase()} operation (${key === 's' ? 'Save/Download' : 'Print'}) is disabled in this document.`);
        return false;
      }
    };

    // Enhanced right-click protection
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as Element;
      const isInPDF = !!(
        target?.closest?.('.pdf-viewer-container') ||
        target?.closest?.('.react-pdf-viewer') ||
        document.querySelector('.pdf-viewer-container') ||
        document.querySelector('.react-pdf-viewer')
      );
      
      if (isInPDF) {
        e.preventDefault();
        e.stopPropagation();
        
        // Log the attempt
        fetch('/api/log-security-event', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'RIGHT_CLICK_BLOCKED',
            userEmail,
            documentId,
            timestamp: new Date().toISOString()
          })
        }).catch(() => {});
        return false;
      }
    };

    // Add event listeners
    document.addEventListener('keydown', handleKeyboard, true);
    document.addEventListener('contextmenu', handleContextMenu, true);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleRightClick, true);
      document.removeEventListener('keydown', handleKeyboard, true);
      document.removeEventListener('contextmenu', handleContextMenu, true);
      
      const style = document.getElementById('simple-pdf-protection');
      if (style) {
        style.remove();
      }
    };
  }, [userEmail, documentId, enabled]);

  return null;
};

export default PDFProtection;