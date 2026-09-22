import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { TargetSizeConfig } from '../types';
import { convertToMillimeters } from './targetSizes';

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
 * Common html2canvas options with complete getComputedStyle interception for oklch
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
    onclone: (clonedDoc: Document) => {
      // Intercept window.getComputedStyle in the cloned document so html2canvas never sees oklch
      const win = clonedDoc.defaultView;
      if (win) {
        const originalGetComputedStyle = win.getComputedStyle.bind(win);
        win.getComputedStyle = (elt: Element, pseudoElt?: string | null) => {
          const style = originalGetComputedStyle(elt, pseudoElt);
          return new Proxy(style, {
            get(target, prop, receiver) {
              if (prop === 'getPropertyValue') {
                return (propertyName: string) => {
                  try {
                    const val = target.getPropertyValue(propertyName);
                    if (val && typeof val === 'string' && val.includes('oklch')) {
                      return '#334155';
                    }
                    return val;
                  } catch (e) {
                    return '';
                  }
                };
              }
              const val = Reflect.get(target, prop, receiver);
              if (val && typeof val === 'string' && val.includes('oklch')) {
                return '#334155';
              }
              return val;
            },
          });
        };
      }
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
  onProgress?: (progress: ExportProgress) => void
): Promise<void> {
  try {
    onProgress?.({
      status: 'rendering',
      message: 'तस्बिर रेन्डर हुँदैछ (PNG)...',
      progressPercent: 30,
    });

    const canvas = await html2canvas(element, getHtml2CanvasOptions(scale));

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
  onProgress?: (progress: ExportProgress) => void
): Promise<void> {
  try {
    onProgress?.({
      status: 'rendering',
      message: 'तस्बिर रेन्डर हुँदैछ (JPEG)...',
      progressPercent: 30,
    });

    const canvas = await html2canvas(element, getHtml2CanvasOptions(scale));

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

    const scale = widthMm > 1500 ? 1.5 : 2;

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
