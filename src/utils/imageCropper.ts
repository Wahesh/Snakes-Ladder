// Utility to crop specific regions from a master poster image

export interface CropBox {
  id: string;
  nameNepali: string;
  nameEnglish: string;
  xPercent: number; // 0 to 100
  yPercent: number; // 0 to 100
  widthPercent: number; // 0 to 100
  heightPercent: number; // 0 to 100
  targetSlot: string; // e.g. 'headerBanner', 'leftMessage_1', 'rightPanel_exploitation', etc.
}

// Pre-calibrated regions according to standard Nepali PSEA Snake & Ladder poster layout
export const DEFAULT_POSTER_REGIONS: CropBox[] = [
  // 1. Top Header Village Landscape & Waving Children
  {
    id: 'header_banner',
    nameNepali: 'शीर्ष ब्यानर (गाउँ, हिमाल र बालबालिका)',
    nameEnglish: 'Top Village Header & Children',
    xPercent: 0,
    yPercent: 0,
    widthPercent: 100,
    heightPercent: 19.5,
    targetSlot: 'headerBanner',
  },
  // 2. Top-Left Waving Children Cluster specifically (optional high zoom)
  {
    id: 'header_children_cluster',
    nameNepali: 'हात हल्लाइरहेका बालबालिका (Header Kids)',
    nameEnglish: 'Waving Children Cluster',
    xPercent: 2,
    yPercent: 2,
    widthPercent: 32,
    heightPercent: 17,
    targetSlot: 'headerChildren',
  },
  // 3. Left Column 10 Core Messages (Circle Icons)
  ...Array.from({ length: 10 }, (_, i) => {
    const idNum = i + 1;
    // The 10 messages are vertically arranged between y: 20% and 86%
    const step = 6.4;
    const yStart = 20.2 + i * step;
    return {
      id: `left_message_${idNum}`,
      nameNepali: `बायाँ सन्देश ${idNum} (PSEA Message ${idNum})`,
      nameEnglish: `Left Message ${idNum} Icon`,
      xPercent: 1.5,
      yPercent: yStart,
      widthPercent: 20,
      heightPercent: 6.0,
      targetSlot: `leftMessage_${idNum}`,
    };
  }),
  // 4. Right Column 3 Guidance Scenario Panels
  {
    id: 'right_panel_exploitation',
    nameNepali: 'दायाँ कार्ड १: यौन शोषण (Exploitation)',
    nameEnglish: 'Right Panel 1: Sexual Exploitation',
    xPercent: 78.5,
    yPercent: 20.0,
    widthPercent: 20.5,
    heightPercent: 21.0,
    targetSlot: 'rightPanel_exploitation',
  },
  {
    id: 'right_panel_abuse',
    nameNepali: 'दायाँ कार्ड २: यौन दुर्व्यवहार (Abuse)',
    nameEnglish: 'Right Panel 2: Sexual Abuse',
    xPercent: 78.5,
    yPercent: 42.0,
    widthPercent: 20.5,
    heightPercent: 21.0,
    targetSlot: 'rightPanel_abuse',
  },
  {
    id: 'right_panel_harassment',
    nameNepali: 'दायाँ कार्ड ३: यौन दुर्व्यवहार/हस्तक्षेप (Harassment)',
    nameEnglish: 'Right Panel 3: Sexual Harassment',
    xPercent: 78.5,
    yPercent: 64.0,
    widthPercent: 20.5,
    heightPercent: 21.0,
    targetSlot: 'rightPanel_harassment',
  },
  // 5. Bottom Footer Banner (Meadow, Children & Helpline)
  {
    id: 'footer_banner',
    nameNepali: 'तल्लो ब्यानर (बालबालिका र हेल्पलाइन १०९८)',
    nameEnglish: 'Bottom Footer & Helpline Banner',
    xPercent: 0,
    yPercent: 86.5,
    widthPercent: 100,
    heightPercent: 13.5,
    targetSlot: 'footerBanner',
  },
  // 6. Snakes and Ladders Central Board (8x8 or 10x10)
  {
    id: 'center_board',
    nameNepali: 'केन्द्रीय खेल बोर्ड (Snakes & Ladders Board)',
    nameEnglish: 'Center Snakes and Ladders Board',
    xPercent: 22.0,
    yPercent: 19.5,
    widthPercent: 56.0,
    heightPercent: 66.5,
    targetSlot: 'boardImage',
  },
];

/**
 * Crops a defined sub-rectangle from an Image or Canvas and returns a PNG DataURL.
 */
export function cropImageRegion(
  source: HTMLImageElement | HTMLCanvasElement,
  crop: {
    xPercent: number;
    yPercent: number;
    widthPercent: number;
    heightPercent: number;
  },
  targetWidth?: number,
  targetHeight?: number
): string {
  const canvas = document.createElement('canvas');
  const srcWidth = source instanceof HTMLImageElement ? source.naturalWidth : source.width;
  const srcHeight = source instanceof HTMLImageElement ? source.naturalHeight : source.height;

  const sx = Math.max(0, (crop.xPercent / 100) * srcWidth);
  const sy = Math.max(0, (crop.yPercent / 100) * srcHeight);
  const sw = Math.min(srcWidth - sx, (crop.widthPercent / 100) * srcWidth);
  const sh = Math.min(srcHeight - sy, (crop.heightPercent / 100) * srcHeight);

  // Determine output resolution
  canvas.width = targetWidth || Math.round(sw);
  canvas.height = targetHeight || Math.round(sh);

  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(source, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL('image/png', 0.95);
}

/**
 * Loads an image from a URL or File object.
 */
export function loadImage(src: string | File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);

    if (typeof src === 'string') {
      img.src = src;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(src);
    }
  });
}

/**
 * Auto-crops all default regions from a source image.
 */
export function autoCropAll(img: HTMLImageElement): Record<string, string> {
  const results: Record<string, string> = {};
  for (const region of DEFAULT_POSTER_REGIONS) {
    try {
      const cropped = cropImageRegion(img, region);
      if (cropped) {
        results[region.targetSlot] = cropped;
      }
    } catch (err) {
      console.warn(`Failed to crop region ${region.id}`, err);
    }
  }
  return results;
}
