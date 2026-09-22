import React, { useRef } from 'react';
import { ProtectionCartoonCard } from './CartoonIllustrations';
import { usePosterImages } from '../context/PosterImageContext';
import { Camera, RotateCcw } from 'lucide-react';

export const PosterRightColumn: React.FC = () => {
  const { rightPanels, updateImage, removeImage } = usePosterImages();
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFileChange = async (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await updateImage(`rightPanel_${type}`, file);
    } catch (err) {
      console.error('Failed to update scenario image', err);
    } finally {
      e.target.value = '';
    }
  };

  return (
    <div className="w-full flex flex-col justify-between h-full bg-slate-50/95 border-l-2 border-slate-300 p-1.5 sm:p-2 space-y-1 select-none">
      {/* Header Banner */}
      <div className="w-full bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 text-red-800 py-1 px-2 rounded-xl text-center shadow-xs border border-amber-400 shrink-0">
        <h2 className="text-[9.5px] font-black leading-tight flex items-center justify-center gap-1.5">
          <span className="text-sm">⚠️</span>
          <span>सहायताकर्मीबाट हुने यौन शोषण तथा दुर्व्यवहारका उदाहरण</span>
        </h2>
      </div>

      {/* 3 Protection Guidance Scenario Cards - INCREASED HEIGHT & FONT SIZE */}
      <div className="flex-1 flex flex-col justify-between gap-1 py-0 min-h-0">
        {/* Card 1: यौन शोषण (Sexual Exploitation) */}
        <div className="group/card relative bg-rose-50/95 border-2 border-rose-300 rounded-xl p-1.5 sm:p-2 shadow-2xs flex-1 min-h-0 flex flex-col justify-between">
          <input
            type="file"
            accept="image/*"
            ref={(el) => {
              fileInputRefs.current['exploitation'] = el;
            }}
            onChange={(e) => handleFileChange('exploitation', e)}
            className="hidden"
          />

          <div className="flex items-center justify-between border-b border-rose-200 shrink-0">
            <div className="text-center flex-1">
              <h3 className="text-[10.5px] font-black text-rose-900 leading-tight">
                यौन शोषण
              </h3>
              <span className="text-[8px] font-extrabold text-rose-700">
                (Sexual Exploitation)
              </span>
            </div>

            <div className="opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center gap-1 absolute top-1.5 right-1.5 print:hidden">
              <button
                onClick={() => fileInputRefs.current['exploitation']?.click()}
                className="p-1 rounded bg-white/90 hover:bg-white text-slate-700 shadow-2xs text-[9px] font-bold cursor-pointer"
                title="तस्बिर बदल्नुहोस् (Browse)"
              >
                <Camera className="w-3 h-3 text-rose-600" />
              </button>
              {rightPanels['exploitation'] && (
                <button
                  onClick={() => removeImage('rightPanel_exploitation')}
                  className="p-1 rounded bg-white/90 hover:bg-rose-100 text-rose-600 shadow-2xs text-[9px] font-bold cursor-pointer"
                  title="मूल चित्रमा फर्काउनुहोस्"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* High Quality Relevant Cartoon Story Vignette or Cropped Master Photo */}
          {rightPanels['exploitation'] ? (
            <div className="relative w-full flex-1 min-h-0 rounded-lg overflow-hidden border border-rose-300 bg-white shadow-inner group/img my-0.5">
              <img
                src={rightPanels['exploitation']}
                alt="यौन शोषण"
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => fileInputRefs.current['exploitation']?.click()}
                className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-bold gap-1 cursor-pointer print:hidden"
              >
                <Camera className="w-4 h-4 text-emerald-300" />
                <span>तस्बिर बदल्नुहोस्</span>
              </button>
            </div>
          ) : (
            <div className="relative flex-1 min-h-0 group/img my-0.5">
              <ProtectionCartoonCard type="exploitation" />
              <button
                onClick={() => fileInputRefs.current['exploitation']?.click()}
                className="absolute inset-0 bg-slate-900/50 rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-bold gap-1 cursor-pointer print:hidden"
              >
                <Camera className="w-4 h-4 text-emerald-300" />
                <span>तस्बिर छान्नुहोस् (Browse)</span>
              </button>
            </div>
          )}

          {/* Bullet Points with INCREASED font size */}
          <ul className="text-[10px] sm:text-[11.5px] md:text-xs font-black text-slate-900 space-y-0.5 leading-[1.1]">
            <li className="flex items-start gap-1.5">
              <span className="text-red-600 font-black text-xs sm:text-sm leading-none shrink-0 mt-0.5">•</span>
              <span>राहत सामग्रीको बदलामा अनुचित फाइदा माग्नु ।</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-600 font-black text-xs sm:text-sm leading-none shrink-0 mt-0.5">•</span>
              <span>विशेष सुविधा दिने आशा देखाउनु ।</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-600 font-black text-xs sm:text-sm leading-none shrink-0 mt-0.5">•</span>
              <span>सहयोग नदिने धम्की दिनु ।</span>
            </li>
          </ul>
        </div>

        {/* Card 2: यौन दुर्व्यवहार (Sexual Abuse) */}
        <div className="group/card relative bg-rose-50/95 border-2 border-rose-300 rounded-xl p-1.5 sm:p-2 shadow-2xs flex-1 min-h-0 flex flex-col justify-between">
          <input
            type="file"
            accept="image/*"
            ref={(el) => {
              fileInputRefs.current['abuse'] = el;
            }}
            onChange={(e) => handleFileChange('abuse', e)}
            className="hidden"
          />

          <div className="flex items-center justify-between border-b border-rose-200 shrink-0">
            <div className="text-center flex-1">
              <h3 className="text-[10.5px] font-black text-rose-900 leading-tight">
                यौन दुर्व्यवहार
              </h3>
              <span className="text-[8px] font-extrabold text-rose-700">
                (Sexual Abuse)
              </span>
            </div>

            <div className="opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center gap-1 absolute top-1.5 right-1.5 print:hidden">
              <button
                onClick={() => fileInputRefs.current['abuse']?.click()}
                className="p-1 rounded bg-white/90 hover:bg-white text-slate-700 shadow-2xs text-[9px] font-bold cursor-pointer"
                title="तस्बिर बदल्नुहोस् (Browse)"
              >
                <Camera className="w-3 h-3 text-rose-600" />
              </button>
              {rightPanels['abuse'] && (
                <button
                  onClick={() => removeImage('rightPanel_abuse')}
                  className="p-1 rounded bg-white/90 hover:bg-rose-100 text-rose-600 shadow-2xs text-[9px] font-bold cursor-pointer"
                  title="मूल चित्रमा फर्काउनुहोस्"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* High Quality Relevant Cartoon Story Vignette or Cropped Master Photo */}
          {rightPanels['abuse'] ? (
            <div className="relative w-full flex-1 min-h-0 rounded-lg overflow-hidden border border-rose-300 bg-white shadow-inner group/img my-0.5">
              <img
                src={rightPanels['abuse']}
                alt="यौन दुर्व्यवहार"
                className="w-full h-full object-cover select-none"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => fileInputRefs.current['abuse']?.click()}
                className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-bold gap-1 cursor-pointer print:hidden"
              >
                <Camera className="w-4 h-4 text-emerald-300" />
                <span>तस्बिर बदल्नुहोस्</span>
              </button>
            </div>
          ) : (
            <div className="relative flex-1 min-h-0 group/img my-0.5">
              <ProtectionCartoonCard type="abuse" />
              <button
                onClick={() => fileInputRefs.current['abuse']?.click()}
                className="absolute inset-0 bg-slate-900/50 rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-bold gap-1 cursor-pointer print:hidden"
              >
                <Camera className="w-4 h-4 text-emerald-300" />
                <span>तस्बिर छान्नुहोस् (Browse)</span>
              </button>
            </div>
          )}

          {/* Bullet Points with INCREASED font size */}
          <ul className="text-[10px] sm:text-[11.5px] md:text-xs font-black text-slate-900 space-y-0.5 leading-[1.1]">
            <li className="flex items-start gap-1.5">
              <span className="text-red-600 font-black text-xs sm:text-sm leading-none shrink-0 mt-0.5">•</span>
              <span>कसैको इच्छा विपरीत छुनु ।</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-600 font-black text-xs sm:text-sm leading-none shrink-0 mt-0.5">•</span>
              <span>डर, धम्की वा दबाब दिएर अनुचित व्यवहार गर्नु ।</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-600 font-black text-xs sm:text-sm leading-none shrink-0 mt-0.5">•</span>
              <span>कुनै पनि अवाञ्छित यौन व्यवहार गर्नु ।</span>
            </li>
          </ul>
        </div>

        {/* Card 3: यौन उत्पीडन (Sexual Harassment) */}
        <div className="group/card relative bg-rose-50/95 border-2 border-rose-300 rounded-xl p-1.5 sm:p-2 shadow-2xs flex-1 min-h-0 flex flex-col justify-between">
          <input
            type="file"
            accept="image/*"
            ref={(el) => {
              fileInputRefs.current['harassment'] = el;
            }}
            onChange={(e) => handleFileChange('harassment', e)}
            className="hidden"
          />

          <div className="flex items-center justify-between border-b border-rose-200 shrink-0">
            <div className="text-center flex-1">
              <h3 className="text-[10.5px] font-black text-rose-900 leading-tight">
                यौन उत्पीडन
              </h3>
              <span className="text-[8px] font-extrabold text-rose-700">
                (Sexual Harassment)
              </span>
            </div>

            <div className="opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center gap-1 absolute top-1.5 right-1.5 print:hidden">
              <button
                onClick={() => fileInputRefs.current['harassment']?.click()}
                className="p-1 rounded bg-white/90 hover:bg-white text-slate-700 shadow-2xs text-[9px] font-bold cursor-pointer"
                title="तस्बिर बदल्नुहोस् (Browse)"
              >
                <Camera className="w-3 h-3 text-rose-600" />
              </button>
              {rightPanels['harassment'] && (
                <button
                  onClick={() => removeImage('rightPanel_harassment')}
                  className="p-1 rounded bg-white/90 hover:bg-rose-100 text-rose-600 shadow-2xs text-[9px] font-bold cursor-pointer"
                  title="मूल चित्रमा फर्काउनुहोस्"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* High Quality Relevant Cartoon Story Vignette or Cropped Master Photo */}
          {rightPanels['harassment'] ? (
            <div className="relative w-full flex-1 min-h-0 rounded-lg overflow-hidden border border-rose-300 bg-white shadow-inner group/img my-0.5">
              <img
                src={rightPanels['harassment']}
                alt="यौन उत्पीडन"
                className="w-full h-full object-cover select-none"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => fileInputRefs.current['harassment']?.click()}
                className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-bold gap-1 cursor-pointer print:hidden"
              >
                <Camera className="w-4 h-4 text-emerald-300" />
                <span>तस्बिर बदल्नुहोस्</span>
              </button>
            </div>
          ) : (
            <div className="relative flex-1 min-h-0 group/img my-0.5">
              <ProtectionCartoonCard type="harassment" />
              <button
                onClick={() => fileInputRefs.current['harassment']?.click()}
                className="absolute inset-0 bg-slate-900/50 rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-bold gap-1 cursor-pointer print:hidden"
              >
                <Camera className="w-4 h-4 text-emerald-300" />
                <span>तस्बिर छान्नुहोस् (Browse)</span>
              </button>
            </div>
          )}

          {/* Bullet Points with INCREASED font size */}
          <ul className="text-[10px] sm:text-[11.5px] md:text-xs font-black text-slate-900 space-y-0.5 leading-[1.1]">
            <li className="flex items-start gap-1.5">
              <span className="text-red-600 font-black text-xs sm:text-sm leading-none shrink-0 mt-0.5">•</span>
              <span>अशोभनीय टिप्पणी गर्नु वा जिस्क्याउनु ।</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-600 font-black text-xs sm:text-sm leading-none shrink-0 mt-0.5">•</span>
              <span>बारम्बार अवाञ्छित सन्देश वा कल पठाउनु ।</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-600 font-black text-xs sm:text-sm leading-none shrink-0 mt-0.5">•</span>
              <span>पटक-पटक निजी भेटघाटको प्रस्ताव राख्नु ।</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Callout Speech Bubble with Megaphone */}
      <div className="relative pt-1 shrink-0">
        <div className="relative bg-white text-emerald-950 px-1.5 py-1 rounded-xl border-2 sm:border-3 border-emerald-600 shadow-md text-center">
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-base sm:text-lg">📢</span>
            <span className="text-[9px] font-black text-emerald-800">सुरक्षा सल्लाह (Safety Advice)</span>
          </div>
          <p className="text-[9px] font-black leading-[1.15] text-slate-950">
            केही गलत लागेमा विश्वसनीय वयस्क वा १०९८ मा भन्नुहोस् !
          </p>
          {/* Speech bubble pointer */}
          <div className="absolute -top-2 right-6 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-5 border-b-emerald-600" />
        </div>
      </div>
    </div>
  );
};
