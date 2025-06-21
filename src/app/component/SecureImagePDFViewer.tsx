// src/app/component/SecureImagePDFViewer.tsx
"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import WatermarkOverlay from './WatermarkOverlay';
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

interface SecureImagePDFViewerProps {
  paperId: string;
  userEmail: string;
  theme?: string;
}

const SecureImagePDFViewer: React.FC<SecureImagePDFViewerProps> = (props) => {
  return <PDFViewer {...props} />;
};

export default SecureImagePDFViewer;