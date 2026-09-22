import { TargetSizeConfig, SizeUnit } from '../types';
export type { TargetSizeConfig, SizeUnit };

export const TARGET_SIZE_PRESETS: TargetSizeConfig[] = [
  {
    id: '8x8-flex',
    name: '८×८ फिट ठूलो फ्लेक्स (8×8 ft)',
    category: 'flex',
    width: 8,
    height: 8,
    unit: 'ft',
    aspectRatio: 1,
    description: '९६×९६ इन्च (२४४×२४४ सेमी) - भुइँ म्याट तथा पर्खालमा टाँस्नका लागि सबैभन्दा लोकप्रिय',
    recommendedDpi: 100,
  },
  {
    id: '6x6-flex',
    name: '६×६ फिट मध्यम फ्लेक्स (6×6 ft)',
    category: 'flex',
    width: 6,
    height: 6,
    unit: 'ft',
    aspectRatio: 1,
    description: '७२×७२ इन्च (१८३×१८३ सेमी) - मध्यम कोठा तथा कक्षाकोठामा राख्न सहज',
    recommendedDpi: 120,
  },
  {
    id: '5x5-flex',
    name: '५×५ फिट सानो फ्लेक्स (5×5 ft)',
    category: 'flex',
    width: 5,
    height: 5,
    unit: 'ft',
    aspectRatio: 1,
    description: '६०×६० इन्च (१५२×१५२ सेमी) - बालबालिकालाई गोलबन्द गरी खेलाउन उपयुक्त',
    recommendedDpi: 150,
  },
  {
    id: '10x10-flex',
    name: '१०×१० फिट विशाल फ्लेक्स (10×10 ft)',
    category: 'flex',
    width: 10,
    height: 10,
    unit: 'ft',
    aspectRatio: 1,
    description: '१२०×१२० इन्च (३०५×३०५ सेमी) - ठूलो चौर वा समुदायिक हलमा सामूहिक खेलका लागि',
    recommendedDpi: 72,
  },
  {
    id: '6x4-flex',
    name: '६×४ फिट तेर्सो ब्यानर (6×4 ft)',
    category: 'flex',
    width: 6,
    height: 4,
    unit: 'ft',
    aspectRatio: 1.5,
    description: '७२×४८ इन्च (१८३×१२२ सेमी) - मञ्च तथा भित्तामा तेर्सो ब्यानरका रूपमा',
    recommendedDpi: 120,
  },
  {
    id: '8x4-flex',
    name: '८×४ फिट फराकिलो ब्यानर (8×4 ft)',
    category: 'flex',
    width: 8,
    height: 4,
    unit: 'ft',
    aspectRatio: 2,
    description: '९६×४८ इन्च (२४४×१२२ सेमी) - २:१ फराकिलो फ्लेक्स बोर्ड',
    recommendedDpi: 100,
  },
  {
    id: '4x3-flex',
    name: '४×३ फिट स्ट्यान्डर्ड (4×3 ft)',
    category: 'flex',
    width: 4,
    height: 3,
    unit: 'ft',
    aspectRatio: 4 / 3,
    description: '४८×३६ इन्च (१२२×९१ सेमी) - सूचना पाटी तथा कोठाको भित्ताका लागि',
    recommendedDpi: 150,
  },
  {
    id: 'a0-poster',
    name: 'A0 ठूलो पोस्टर (A0 Sheet)',
    category: 'paper',
    width: 841,
    height: 1189,
    unit: 'mm',
    aspectRatio: 841 / 1189,
    description: '८४.१ × ११८.९ सेमी (३३.१ × ४६.८ इन्च) - ठूलो कागज पोस्टर',
    recommendedDpi: 200,
  },
  {
    id: 'a1-poster',
    name: 'A1 पोस्टर (A1 Sheet)',
    category: 'paper',
    width: 594,
    height: 841,
    unit: 'mm',
    aspectRatio: 594 / 841,
    description: '५९.४ × ८४.१ सेमी (२३.४ × ३३.१ इन्च) - स्पष्ट सचेतना पोस्टर',
    recommendedDpi: 250,
  },
  {
    id: 'a2-poster',
    name: 'A2 पोस्टर (A2 Sheet)',
    category: 'paper',
    width: 420,
    height: 594,
    unit: 'mm',
    aspectRatio: 420 / 594,
    description: '४२ × ५९.४ सेमी (१६.५ × २३.४ इन्च) - मध्यम भित्ते पोस्टर',
    recommendedDpi: 300,
  },
  {
    id: 'a3-poster',
    name: 'A3 पोस्टर (A3 Sheet)',
    category: 'paper',
    width: 297,
    height: 420,
    unit: 'mm',
    aspectRatio: 297 / 420,
    description: '२९.७ × ४२ सेमी (११.७ × १६.५ इन्च) - साधारण कार्यालय प्रिन्टरबाट छाप्न सकिने',
    recommendedDpi: 300,
  },
  {
    id: 'a4-portrait',
    name: 'A4 ठाडो (A4 Portrait)',
    category: 'paper',
    width: 210,
    height: 297,
    unit: 'mm',
    aspectRatio: 210 / 297,
    description: '२१ × २९.७ सेमी (८.३ × ११.७ इन्च) - पुस्तिका वा हातमा लिने ब्रोसर',
    recommendedDpi: 300,
  },
  {
    id: 'a4-landscape',
    name: 'A4 तेर्सो (A4 Landscape)',
    category: 'paper',
    width: 297,
    height: 210,
    unit: 'mm',
    aspectRatio: 297 / 210,
    description: '२९.७ × २१ सेमी (११.७ × ८.३ इन्च) - डेस्कटप तेर्सो पाना',
    recommendedDpi: 300,
  },
];

export const DEFAULT_TARGET_SIZE: TargetSizeConfig = TARGET_SIZE_PRESETS[0];

export function getPresetById(id: string): TargetSizeConfig {
  const found = TARGET_SIZE_PRESETS.find((p) => p.id === id);
  return found || DEFAULT_TARGET_SIZE;
}

export function convertToInches(value: number, unit: SizeUnit): number {
  switch (unit) {
    case 'ft':
      return value * 12;
    case 'in':
      return value;
    case 'cm':
      return value / 2.54;
    case 'mm':
      return value / 25.4;
    case 'px':
      return value / 96; // Standard 96 DPI CSS pixels
    default:
      return value;
  }
}

export function convertToMillimeters(value: number, unit: SizeUnit): number {
  switch (unit) {
    case 'ft':
      return value * 304.8;
    case 'in':
      return value * 25.4;
    case 'cm':
      return value * 10;
    case 'mm':
      return value;
    case 'px':
      return (value / 96) * 25.4;
    default:
      return value;
  }
}

export function formatDimensionString(config: TargetSizeConfig): string {
  const wIn = Math.round(convertToInches(config.width, config.unit) * 10) / 10;
  const hIn = Math.round(convertToInches(config.height, config.unit) * 10) / 10;
  const wCm = Math.round(convertToMillimeters(config.width, config.unit) / 10 * 10) / 10;
  const hCm = Math.round(convertToMillimeters(config.height, config.unit) / 10 * 10) / 10;

  return `${config.width} ${config.unit} × ${config.height} ${config.unit} (${wIn}" × ${hIn}" / ${wCm} × ${hCm} सेमी)`;
}

export function getAspectRatioLabel(ratio: number): string {
  const rounded = Math.round(ratio * 100) / 100;
  if (Math.abs(rounded - 1) < 0.03) return '१:१ वर्गाकार (Square)';
  if (Math.abs(rounded - 1.5) < 0.05) return '३:२ तेर्सो (Landscape 3:2)';
  if (Math.abs(rounded - 1.33) < 0.05) return '४:३ स्ट्यान्डर्ड (Standard 4:3)';
  if (Math.abs(rounded - 2) < 0.05) return '२:१ फराकिलो (Wide 2:1)';
  if (Math.abs(rounded - 0.707) < 0.05) return '१:१.४१ स्ट्यान्डर्ड ISO ठाडो (Portrait A-Series)';
  if (Math.abs(rounded - 1.414) < 0.05) return '१.४१:१ स्ट्यान्डर्ड ISO तेर्सो (Landscape A-Series)';
  return `${rounded}:१ अनुकूल अनुपात (Custom)`;
}
