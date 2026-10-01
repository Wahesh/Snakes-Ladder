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
  /** Multiplier for the second bezier control point's bulge, overriding the default
   * 0.85 (which bulges opposite the first control point, giving a symmetric S-curve).
   * A negative value bulges the same side as the first control point instead, for a
   * C-shaped curve that stays on one side through most of its length -- used when a
   * snake needs to pass near two waypoints on the same side before its tail. */
  curveMult2?: number;
  /** Forces which corner of the tail square the tail tip lands in, overriding the
   * default (left if the tail column is left of or equal to the head column, else
   * right). Used to fix individual snakes whose auto-picked side looks wrong. */
  tailSide?: 'left' | 'right';
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
