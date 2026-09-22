import React, { useState, useRef } from 'react';
import { VillageFooterLandscape } from './CartoonIllustrations';
import { usePosterImages } from '../context/PosterImageContext';
import { Upload, RotateCcw } from 'lucide-react';

// Candidate asset paths to probe in public/assets and public/
const CANDIDATE_ASSET_PATHS = [
  '/assets/bottom-banner.png',
  '/assets/image.png',
  '/assets/bottom_banner.png',
  '/assets/banner.png',
  '/image.png',
];

export const PosterBottomFooter: React.FC = () => {
  const { footerBanner, updateImage, removeImage } = usePosterImages();
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageError = () => {
    if (candidateIndex < CANDIDATE_ASSET_PATHS.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setAllFailed(true);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      await updateImage('footerBanner', file);
    } catch (err) {
      console.error('Failed to update bottom banner image', err);
      alert('तस्बिर अपलोड गर्न सकिएन।');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const activeSrc = footerBanner || (!allFailed ? CANDIDATE_ASSET_PATHS[candidateIndex] : null);

  return (
    <div className="relative w-full overflow-hidden rounded-b-xl border-t-2 border-emerald-600 shadow-md select-none bg-sky-300 group/footer shrink-0 h-[80px] sm:h-[95px] md:h-[110px]">
      {/* Hidden file input for direct browsing */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Floating direct edit button on hover (no-print) */}
      <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 opacity-0 group-hover/footer:opacity-100 transition-opacity print:hidden">
        <button
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-1.5 bg-slate-900/90 hover:bg-slate-900 text-white rounded-lg text-xs font-bold shadow-md backdrop-blur-xs flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-105"
          title="तल्लो ब्यानरको लागि नयाँ तस्बिर छान्नुहोस्"
        >
          <Upload className="w-3.5 h-3.5 text-emerald-400" />
          <span>{isUploading ? 'अपलोड हुँदै...' : 'तल्लो तस्बिर बदल्नुहोस् (Browse)'}</span>
        </button>

        {footerBanner && (
          <button
            onClick={() => removeImage('footerBanner')}
            className="p-1.5 bg-slate-900/90 hover:bg-rose-900 text-white rounded-lg text-xs font-bold shadow-md backdrop-blur-xs cursor-pointer transition-colors"
            title="मूल चित्रमा फर्काउनुहोस्"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-300" />
          </button>
        )}
      </div>

      {activeSrc ? (
        <img
          id="poster-bottom-banner-img"
          src={activeSrc}
          alt="PSEA Child Protection Banner - Child Helpline 1098"
          className="w-full h-full object-cover object-center block select-none"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          onError={handleImageError}
        />
      ) : (
        <div className="relative w-full h-full">
          <VillageFooterLandscape />
        </div>
      )}
    </div>
  );
};

