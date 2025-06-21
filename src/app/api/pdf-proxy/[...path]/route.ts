// src/app/api/pdf-proxy/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    // Await the params since they are now asynchronous in Next.js App Router
    const { path } = await params;
    
    // Reconstruct the original Google Cloud Storage URL
    const pathString = path.join('/');
    const originalUrl = `https://storage.googleapis.com/${pathString}`;
    
    console.log('🔄 Proxying PDF request to:', originalUrl);

    // Fetch the PDF from Google Cloud Storage (server-side, no CORS issues)
    const response = await fetch(originalUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PDF-Proxy/1.0)',
      },
    });

    if (!response.ok) {
      console.error(`❌ PDF proxy error: ${response.status} ${response.statusText}`);
      return new NextResponse(`PDF not found: ${response.statusText}`, { 
        status: response.status 
      });
    }

    // Get the PDF data
    const pdfBuffer = await response.arrayBuffer();
    console.log(`✅ PDF fetched successfully: ${pdfBuffer.byteLength} bytes`);

    // Return the PDF with proper CORS headers
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': pdfBuffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=3600',
        // CORS headers to allow frontend access
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        // Security headers for PDF viewing
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
      },
    });

  } catch (error) {
    console.error('💥 PDF proxy error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400', // 24 hours
    },
  });
}