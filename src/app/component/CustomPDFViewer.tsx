"use client";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  fileUrl: string;
}

const CustomPDFViewer = ({ fileUrl }: PDFViewerProps) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const res = await fetch(fileUrl);
        if (!res.ok) throw new Error("Failed to fetch PDF");
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
      } catch (err) {
        console.error("Error fetching PDF:", err);
      }
    };

    fetchPdf();
  }, [fileUrl]);

  if (!blobUrl) return <p>Loading PDF...</p>;

  return (
    <div className="overflow-y-auto h-screen">
        <Document file={blobUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
        {Array.from(new Array(numPages), (_, i) => (
            <Page key={i} pageNumber={i + 1} />
        ))}
        </Document>
    </div>
  );
};

export default CustomPDFViewer;
