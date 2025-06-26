// src/app/component/SecureImagePDFViewer.tsx
"use client";
import React from 'react';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues
const PDFViewer = dynamic(() => import('./PDFViewerClient'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="w-8 h-8 animate-spin" />
      <span className="ml-2">Loading PDF viewer...</span>
    </div>
  )
});

interface SecurePDFViewerProps {
  paperId: string;
  userEmail: string;
  theme?: string;
}

const SecurePDFViewer: React.FC<SecurePDFViewerProps> = (props) => {
  return <PDFViewer {...props} />;
};

export default SecurePDFViewer;