import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs';

// Set workerSrc to the one served from /public
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

export async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let text = '';
  let firstPageText = '';

  // Process only the first page to reduce data size
  const page = await pdf.getPage(1);
  const content = await page.getTextContent();
  const pageText = content.items.map((item) => item.str).join('\n');

  text += pageText + '\n';

  // Extract the first meaningful line from the first page
  const lines = pageText.split('\n').map((line) => line.trim());
  firstPageText = lines.find((line) => line.length > 0) || '';

  const maxLength = 1000; // Limit to first 1000 characters
  text = pageText.slice(0, maxLength);
  
  return { fullText: text, title: firstPageText };
}
// export async function extractTextFromPDF(file) {
//   if (typeof window === 'undefined') return '';

//   // Dynamic import to avoid SSR issues
//   const pdfjsLib = await import('pdfjs-dist/build/pdf');
//   const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');

//   // Set the workerSrc manually
//   pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

//   const fileReader = new FileReader();

//   return new Promise((resolve, reject) => {
//     fileReader.onload = async () => {
//       try {
//         const pdfData = new Uint8Array(fileReader.result);
//         const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

//         let text = '';

//         for (let i = 0; i < pdf.numPages; i++) {
//           const page = await pdf.getPage(i + 1);
//           const content = await page.getTextContent();
//           content.items.forEach((item) => {
//             text += item.str + ' ';
//           });
//         }

//         resolve(text);
//       } catch (err) {
//         reject(err);
//       }
//     };

//     fileReader.onerror = (error) => reject(error);
//     fileReader.readAsArrayBuffer(file);
//   });
// }
