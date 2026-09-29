export interface Ladder {
  start: number;
  end: number;
  message: string;
}

export interface Snake {
  head: number;
  tail: number;
  message: string;
  /** Curve bulge direction (1 | -1) and strength multiplier, tuned so this snake's
   * body routes around nearby ladders/snakes instead of crossing them. Falls back
   * to a default alternating direction and 1x strength when omitted. */
  curveDir?: 1 | -1;
  curveMult?: number;
}

export interface SpecialSquare {
  square: number;
  icon: string;
  question: string;
  answer?: string;
  hint?: string;
}

export interface Player {
  id: number;
  name: string;
  color: string;
  borderColor: string;
  bgColor: string;
  position: number;
  hasWon: boolean;
}

export type SizeUnit = 'ft' | 'in' | 'cm' | 'mm' | 'px';

export interface TargetSizeConfig {
  id: string;
  name: string;
  category: 'flex' | 'paper' | 'custom';
  width: number;
  height: number;
  unit: SizeUnit;
  aspectRatio: number;
  description: string;
  recommendedDpi?: number;
}

export interface PrintSettings {
  paperSize: string;
  targetSize: TargetSizeConfig;
  previewScale?: number;
  fitToScreen?: boolean;
  layoutMode?: 'flex-8x8' | 'poster-3col';
  showFacilitatorCorner: boolean;
  showKeyMessages: boolean;
  showSnakeLadderLines: boolean;
  textSize: 'small' | 'medium' | 'large';
  highContrastPrint: boolean;
  numberFormat?: 'english' | 'nepali';
  leftMessageColumns?: 1 | 2;
}
