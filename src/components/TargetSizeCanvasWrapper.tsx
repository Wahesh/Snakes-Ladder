import React, { forwardRef } from 'react';
import { TargetSizeConfig } from '../types';
import { formatDimensionString, getAspectRatioLabel } from '../utils/targetSizes';
import { Ruler, ShieldCheck, Check } from 'lucide-react';

interface TargetSizeCanvasWrapperProps {
  targetSize: TargetSizeConfig;
  fitToScreen?: boolean;
  children: React.ReactNode;
}

export const TargetSizeCanvasWrapper = forwardRef<HTMLDivElement, TargetSizeCanvasWrapperProps>(
  ({ targetSize, fitToScreen = false, children }, ref) => {
    // Determine maximum width or height according to aspect ratio
    const isSquare = Math.abs(targetSize.aspectRatio - 1) < 0.03;
    const isLandscape = targetSize.aspectRatio > 1.05;
    const isPortrait = targetSize.aspectRatio < 0.95;

    return (
      <div className="w-full flex flex-col items-center">
        {/* Visual Measurement Frame (Proof Simulation Header) */}
        <div className="w-full max-w-[1850px] no-print mb-2 bg-slate-900 text-slate-100 px-3.5 py-2 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs border border-slate-700 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-extrabold text-white text-xs sm:text-sm">
              📐 लक्षित साइज प्रत्यक्ष प्रमाण (Live Target Size Proof):
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-900/80 text-emerald-200 font-bold border border-emerald-700 text-[11px]">
              {targetSize.name}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-300 text-[11px]">
            <span>लम्बाइ × चौडाइ: <strong className="text-white">{formatDimensionString(targetSize)}</strong></span>
            <span className="hidden sm:inline">•</span>
            <span>अनुपात: <strong className="text-emerald-300">{getAspectRatioLabel(targetSize.aspectRatio)}</strong></span>
          </div>
        </div>

        {/* Outer Staging Canvas Area with CAD Drafting Background */}
        <div className="w-full max-w-[1850px] bg-slate-200/80 p-2 sm:p-4 md:p-6 rounded-2xl border-2 border-slate-300 flex flex-col items-center justify-center overflow-x-auto">
          {/* Top Horizontal Measurement Scale Line */}
          <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] font-extrabold text-slate-600 pb-1.5 px-2 no-print">
            <span>⟵ ०</span>
            <div className="flex-1 mx-2 border-b-2 border-dashed border-slate-400 text-center relative top-[-1px]">
              <span className="bg-slate-200 px-2 py-0.5 rounded text-slate-800 font-bold">
                कुल चौडाइ: {targetSize.width} {targetSize.unit}
              </span>
            </div>
            <span>{targetSize.width} {targetSize.unit} ⟶</span>
          </div>

          {/* The Actual Export & Print Target Container - STRICT ASPECT RATIO ENFORCED */}
          <div
            ref={ref}
            id="target-size-export-canvas"
            className="w-full bg-white shadow-2xl transition-all duration-300 flex flex-col overflow-hidden"
            style={{
              aspectRatio: `${targetSize.width} / ${targetSize.height}`,
              maxWidth: fitToScreen
                ? isPortrait
                  ? '750px'
                  : isSquare
                  ? '950px'
                  : '100%'
                : isPortrait
                ? '1050px'
                : isSquare
                ? '1450px'
                : '1850px',
              width: '100%',
            }}
          >
            {children}
          </div>

          {/* Bottom Horizontal Scale Footer */}
          <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-slate-500 pt-2 px-2 no-print">
            <span>उचाइ: {targetSize.height} {targetSize.unit}</span>
            <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
              ✓ यो क्यानभास हुबहु {targetSize.name} को अनुपातमा रेन्डर हुन्छ
            </span>
            <span>रिजोल्युसन: {targetSize.recommendedDpi || 150} DPI</span>
          </div>
        </div>
      </div>
    );
  }
);

TargetSizeCanvasWrapper.displayName = 'TargetSizeCanvasWrapper';
