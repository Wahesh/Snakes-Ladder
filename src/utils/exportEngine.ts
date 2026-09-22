import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';
import { TargetSizeConfig } from '../types';
import { convertToMillimeters, convertToInches } from './targetSizes';

/**
 * Compute the html2canvas raster scale needed so the exported image actually holds
 * enough pixels for the target's recommended print DPI (instead of a flat multiplier
 * that leaves tiny board-square text a blurry mess once stretched across a physical
 * banner). Capped so the canvas doesn't blow past what browsers can safely render.
 */
function computeDpiAwareScale(
  element: HTMLElement,
  targetSize: TargetSizeConfig,
  maxDimensionPx = 8000,
  maxScale = 8 // stay safely under html2canvas-pro's hard 10x scale ceiling
): number {
  const domWidthPx = element.offsetWidth || element.getBoundingClientRect().width || 1;
  const widthIn = convertToInches(targetSize.width, targetSize.unit);
  const dpi = targetSize.recommendedDpi || 150;

  const desiredScale = (widthIn * dpi) / domWidthPx;
  const pixelCapScale = maxDimensionPx / domWidthPx;
  const scale = Math.min(desiredScale, pixelCapScale, maxScale);
  return Math.max(1, scale);
}

export interface ExportProgress {
  status: 'idle' | 'rendering' | 'generating-pdf' | 'saving' | 'completed' | 'error';
  message: string;
  progressPercent: number;
}

/**
 * Trigger file download directly in browser
 */
function triggerDownload(dataUrl: string, fileName: string) {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Common html2canvas-pro options (html2canvas-pro natively supports oklch/lab/color-mix)
 */
function getHtml2CanvasOptions(scale = 2) {
  return {
    scale: scale,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
    imageTimeout: 15000,
    ignoreElements: (node: Element) => {
      if (!node.classList) return false;
      return node.classList.contains('no-print') || node.classList.contains('print:hidden');
    },
  };
}

/**
 * Export high-resolution PNG image locked to target size using html2canvas
 */
export async function exportPosterAsPng(
  element: HTMLElement,
  fileName = 'PSEA-Poster',
  scale = 2,
  onProgress?: (progress: ExportProgress) => void,
  targetSize?: TargetSizeConfig
): Promise<void> {
  try {
    onProgress?.({
      status: 'rendering',
      message: 'तस्बिर रेन्डर हुँदैछ (PNG)...',
      progressPercent: 30,
    });

    const effectiveScale = targetSize ? Math.max(scale, computeDpiAwareScale(element, targetSize)) : scale;
    const canvas = await html2canvas(element, getHtml2CanvasOptions(effectiveScale));

    onProgress?.({
      status: 'saving',
      message: 'PNG फाइल सुरक्षित गरिँदैछ...',
      progressPercent: 85,
    });

    const dataUrl = canvas.toDataURL('image/png');
    const cleanFileName = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
    triggerDownload(dataUrl, cleanFileName);

    onProgress?.({
      status: 'completed',
      message: 'PNG डाउनलोड सम्पन्न भयो !',
      progressPercent: 100,
    });
  } catch (err: any) {
    console.error('PNG EXPORT ERROR DETAILS:', {
      name: err?.name,
      message: err?.message,
      stack: err?.stack,
      error: err,
    });
    onProgress?.({
      status: 'error',
      message: `PNG निर्यात त्रुटि: ${err?.message || 'अज्ञात'}`,
      progressPercent: 0,
    });
    throw err;
  }
}

/**
 * Export JPEG image locked to target size using html2canvas
 */
export async function exportPosterAsJpeg(
  element: HTMLElement,
  fileName = 'PSEA-Poster',
  scale = 2,
  quality = 0.95,
  onProgress?: (progress: ExportProgress) => void,
  targetSize?: TargetSizeConfig
): Promise<void> {
  try {
    onProgress?.({
      status: 'rendering',
      message: 'तस्बिर रेन्डर हुँदैछ (JPEG)...',
      progressPercent: 30,
    });

    const effectiveScale = targetSize ? Math.max(scale, computeDpiAwareScale(element, targetSize)) : scale;
    const canvas = await html2canvas(element, getHtml2CanvasOptions(effectiveScale));

    onProgress?.({
      status: 'saving',
      message: 'JPEG फाइल सुरक्षित गरिँदैछ...',
      progressPercent: 85,
    });

    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    const cleanFileName = fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') ? fileName : `${fileName}.jpg`;
    triggerDownload(dataUrl, cleanFileName);

    onProgress?.({
      status: 'completed',
      message: 'JPEG डाउनलोड सम्पन्न भयो !',
      progressPercent: 100,
    });
  } catch (err: any) {
    console.error('JPEG EXPORT ERROR DETAILS:', {
      name: err?.name,
      message: err?.message,
      stack: err?.stack,
      error: err,
    });
    onProgress?.({
      status: 'error',
      message: `JPEG निर्यात त्रुटि: ${err?.message || 'अज्ञात'}`,
      progressPercent: 0,
    });
    throw err;
  }
}

/**
 * Export real PDF matching target physical dimensions exactly using html2canvas & jsPDF
 */
export async function exportPosterAsPdf(
  element: HTMLElement,
  targetSize: TargetSizeConfig,
  fileName = 'PSEA-Poster',
  onProgress?: (progress: ExportProgress) => void
): Promise<void> {
  try {
    onProgress?.({
      status: 'rendering',
      message: 'PDF का लागि क्यानभास तयार हुँदैछ...',
      progressPercent: 25,
    });

    const widthMm = convertToMillimeters(targetSize.width, targetSize.unit);
    const heightMm = convertToMillimeters(targetSize.height, targetSize.unit);

    const scale = computeDpiAwareScale(element, targetSize);

    const canvas = await html2canvas(element, getHtml2CanvasOptions(scale));

    onProgress?.({
      status: 'generating-pdf',
      message: 'लक्षित साइजमा PDF डकुमेन्ट सिर्जना गरिँदैछ...',
      progressPercent: 65,
    });

    const orientation = widthMm >= heightMm ? 'landscape' : 'portrait';
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: [widthMm, heightMm],
      compress: true,
    });

    const dataUrl = canvas.toDataURL('image/png');
    pdf.addImage(dataUrl, 'PNG', 0, 0, widthMm, heightMm, undefined, 'FAST');

    onProgress?.({
      status: 'saving',
      message: 'PDF फाइल डाउनलोड गरिँदैछ...',
      progressPercent: 90,
    });

    const cleanFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
    pdf.save(cleanFileName);

    onProgress?.({
      status: 'completed',
      message: 'PDF सफलतापूर्वक डाउनलोड भयो !',
      progressPercent: 100,
    });
  } catch (err: any) {
    console.error('PDF EXPORT ERROR DETAILS:', {
      name: err?.name,
      message: err?.message,
      stack: err?.stack,
      error: err,
    });
    onProgress?.({
      status: 'error',
      message: `PDF निर्यात त्रुटि: ${err?.message || 'अज्ञात'}`,
      progressPercent: 0,
    });
    throw err;
  }
}
