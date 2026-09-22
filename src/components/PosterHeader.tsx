import React, { useState, useRef } from 'react';
import { VillageHeaderLandscape } from './CartoonIllustrations';
import { usePosterImages } from '../context/PosterImageContext';
import { Upload, RotateCcw } from 'lucide-react';
import headerBannerImg from '../assets/images/regenerated_image_1789980781678.jpg';

export const PosterHeader: React.FC = () => {
  const { headerBanner, updateImage, removeImage } = usePosterImages();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const activeBanner = headerBanner || headerBannerImg;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      await updateImage('headerBanner', file);
    } catch (err) {
      console.error('Failed to update header banner image', err);
      alert('तस्बिर अपलोड गर्न सकिएन।');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-t-xl bg-sky-200 border-b-4 border-emerald-600 shadow-md select-none group">
      {/* Hidden file input for direct browsing */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Floating direct edit button on hover (no-print) */}
      <div className="absolute top-2 right-2 z-30 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity print:hidden">
        <button
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-1.5 bg-slate-900/90 hover:bg-slate-900 text-white rounded-lg text-xs font-bold shadow-md backdrop-blur-xs flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-105"
          title="शीर्ष ब्यानरको लागि नयाँ तस्बिर छान्नुहोस्"
        >
          <Upload className="w-3.5 h-3.5 text-emerald-400" />
          <span>{isUploading ? 'अपलोड हुँदै...' : 'शीर्ष तस्बिर बदल्नुहोस् (Browse)'}</span>
        </button>

        {headerBanner && (
          <button
            onClick={() => removeImage('headerBanner')}
            className="p-1.5 bg-slate-900/90 hover:bg-rose-900 text-white rounded-lg text-xs font-bold shadow-md backdrop-blur-xs cursor-pointer transition-colors"
            title="मूल चित्रमा फर्काउनुहोस्"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-300" />
          </button>
        )}
      </div>

      {/* 1. Generous, High-Quality Nepali Village Cartoon Panorama */}
      <div className="relative w-full h-[145px] sm:h-[175px] md:h-[195px] overflow-hidden shrink-0">
        {activeBanner ? (
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={activeBanner}
              alt="Village & Children Himalayan Header"
              className="w-full h-full object-cover object-top select-none brightness-105 contrast-105"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <div className="relative w-full h-full">
            <VillageHeaderLandscape />
          </div>
        )}

        {/* Center: Iconic Arched 3D Cartoon Title "सर्प र सिँढी खेल" (kept at top 40px) */}
        <div className="absolute inset-x-0 top-[40px] z-20 px-2 sm:px-4 pointer-events-none flex flex-col items-center justify-center text-center">
          <div className="pointer-events-auto flex flex-col items-center justify-center text-center">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-wide text-red-600 drop-shadow-[0_6px_8px_rgba(0,0,0,0.6)] transform -rotate-2 hover:rotate-0 transition-transform duration-300 flex items-center justify-center flex-nowrap py-1 select-none"
              style={{
                fontFamily: "'Mukta', sans-serif",
                WebkitTextStroke: '2.5px #ffffff',
                textShadow: '3px 4px 0 #991c1c, 6px 7px 0 #7f1d1d, -2px -2px 0 #ffffff, 2px -2px 0 #ffffff, -2px 2px 0 #ffffff, 2px 2px 0 #ffffff, 0 8px 16px rgba(0,0,0,0.55)',
              }}
            >
              {/* Word 1: सर्प - curved down-left */}
              <span className="inline-block transform -rotate-[7deg] translate-y-2.5 sm:translate-y-3.5 mx-1 sm:mx-1.5 hover:scale-105 transition-transform">
                सर्प
              </span>
              {/* Word 2: र - arch crest left */}
              <span className="inline-block transform -rotate-[2deg] -translate-y-1 sm:-translate-y-1.5 mx-1 sm:mx-1.5 hover:scale-105 transition-transform">
                र
              </span>
              {/* Word 3: सिँढी - arch crest right */}
              <span className="inline-block transform rotate-[3deg] -translate-y-1 sm:-translate-y-1.5 mx-1 sm:mx-1.5 hover:scale-105 transition-transform">
                सिँढी
              </span>
              {/* Word 4: खेल - curved down-right */}
              <span className="inline-block transform rotate-[8deg] translate-y-2.5 sm:translate-y-4 mx-1 sm:mx-1.5 hover:scale-105 transition-transform">
                खेल
              </span>
            </h1>

            {/* Tagline Ribbon with colored badges */}
            <div className="mt-1 flex items-center gap-1.5 sm:gap-2.5 text-xs sm:text-sm md:text-base font-black text-slate-900 bg-white/95 px-4 py-1 rounded-full shadow-lg border-2 border-amber-400 transform -rotate-1 hover:rotate-0 transition-transform">
              <span className="text-blue-700 font-extrabold">सिकौं</span>
              <span className="text-amber-500">★</span>
              <span className="text-purple-700 font-extrabold">सोचौँ</span>
              <span className="text-amber-500">★</span>
              <span className="text-red-600 font-extrabold">सुरक्षित रहौं</span>
              <span className="text-amber-500">★</span>
              <span className="text-emerald-700 font-extrabold">अघि बढौं</span>
            </div>
          </div>
        </div>

        {/* Left: Child Voice Cloud Speech Bubble (compact bottom-left) */}
        <div className="absolute bottom-1 sm:bottom-2 left-1.5 sm:left-3 z-20 pointer-events-auto">
          <div className="relative bg-white text-emerald-950 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl shadow-md border-1.5 sm:border-2 border-emerald-500 max-w-[135px] sm:max-w-[160px] transform -rotate-1 hover:rotate-0 transition-transform duration-200">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[11px] sm:text-xs">🎒</span>
              <span className="text-[9px] sm:text-[10px] font-black text-emerald-800 uppercase tracking-tight">
                बाल आवाज
              </span>
            </div>
            <p className="text-[9.5px] sm:text-[10.5px] font-extrabold leading-tight text-slate-900">
              हामी सबै सँगै सुरक्षित भविष्य बनाउँछौँ !
            </p>
            {/* Speech Bubble Arrow pointing left */}
            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-3 border-t-transparent border-r-4 border-r-emerald-500 border-b-3 border-b-transparent" />
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-0 h-0 border-t-2 border-t-transparent border-r-3 border-r-white border-b-2 border-b-transparent" />
          </div>
        </div>

        {/* Right Side: Free Help & Community Golden Badge (compact bottom-right) */}
        <div className="absolute bottom-1 sm:bottom-2 right-1.5 sm:right-3 z-20 pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          <div className="relative bg-white text-blue-950 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl shadow-md border-1.5 sm:border-2 border-blue-500 max-w-[135px] sm:max-w-[160px] transform rotate-1 hover:rotate-0 transition-transform duration-200">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[11px] sm:text-xs">🛡️</span>
              <span className="text-[9px] sm:text-[10px] font-black text-blue-800 uppercase tracking-tight">
                निःशुल्क सहायता
              </span>
            </div>
            <p className="text-[9.5px] sm:text-[10.5px] font-extrabold leading-tight text-slate-900">
              हरेक बालबालिकाको अधिकार सुरक्षा र सम्मान !
            </p>
            {/* Speech Bubble Arrow pointing right */}
            <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-3 border-t-transparent border-l-4 border-l-blue-500 border-b-3 border-b-transparent" />
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0 h-0 border-t-2 border-t-transparent border-l-3 border-l-white border-b-2 border-b-transparent" />
          </div>

          {/* Golden Badge: "सुरक्षित बालबालिका सबल समुदाय" (compact) */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-xl bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 border-2 border-amber-800/90 shadow-md p-0.5 flex flex-col items-center justify-center text-center leading-tight rotate-1 shrink-0">
            <div className="w-full h-full border border-dashed border-amber-900 rounded-lg flex flex-col items-center justify-center p-0.5">
              <span className="text-[7px] sm:text-[8px] font-black text-amber-950">
                सुरक्षित
              </span>
              <span className="text-[6.5px] sm:text-[7.5px] font-extrabold text-amber-950">
                बालबालिका
              </span>
              <span className="text-[6px] sm:text-[7px] font-black text-amber-900">
                सबल समुदाय
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
