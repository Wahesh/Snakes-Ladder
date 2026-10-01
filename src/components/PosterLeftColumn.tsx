import React, { useRef } from 'react';
import { PseaMessageCartoon } from './CartoonIllustrations';
import { usePosterImages } from '../context/PosterImageContext';
import { Camera, RotateCcw } from 'lucide-react';
import leftMessage1 from '../assets/images/poster-defaults/left-message-1.jpg';
import leftMessage2 from '../assets/images/poster-defaults/left-message-2.jpg';
import leftMessage3 from '../assets/images/poster-defaults/left-message-3.jpg';
import leftMessage4 from '../assets/images/poster-defaults/left-message-4.jpg';
import leftMessage5 from '../assets/images/poster-defaults/left-message-5.jpg';
import leftMessage6 from '../assets/images/poster-defaults/left-message-6.jpg';
import leftMessage7 from '../assets/images/poster-defaults/left-message-7.jpg';
import leftMessage8 from '../assets/images/poster-defaults/left-message-8.webp';
import leftMessage9 from '../assets/images/poster-defaults/left-message-9.jpg';
import leftMessage10 from '../assets/images/poster-defaults/left-message-10.jpg';

const DEFAULT_LEFT_IMAGES: Record<number, string> = {
  1: leftMessage1,
  2: leftMessage2,
  3: leftMessage3,
  4: leftMessage4,
  5: leftMessage5,
  6: leftMessage6,
  7: leftMessage7,
  8: leftMessage8,
  9: leftMessage9,
  10: leftMessage10,
};

interface MessageItem {
  id: number;
  line1: string;
  line2: string;
  fullText: string;
}

const PSEA_ITEMS: MessageItem[] = [
  {
    id: 1,
    line1: 'मेरो शरीर',
    line2: 'मेरो आफ्नाे हो ।',
    fullText: 'मेरो शरीर मेरो आफ्नाे हो ।',
  },
  {
    id: 2,
    line1: 'म सुरक्षित रहने',
    line2: 'अधिकार राख्छु ।',
    fullText: 'म सुरक्षित रहने अधिकार राख्छु ।',
  },
  {
    id: 3,
    line1: 'सहायता र सेवा',
    line2: 'निःशुल्क हुन्छन् ।',
    fullText: 'सहायता र सेवा निःशुल्क हुन्छन् ।',
  },
  {
    id: 4,
    line1: 'सहयोगको बदलामा कसैले पनि',
    line2: 'कुनै फाइदा माग्न मिल्दैन ।',
    fullText: 'सहयोगको बदलामा कसैले पनि कुनै व्यक्तिगत वा यौनजन्य फाइदा माग्न मिल्दैन ।',
  },
  {
    id: 5,
    line1: 'मलाई मन नपरे',
    line2: '"हुँदैन" भन्न सक्छु ।',
    fullText: 'मलाई मन नपरे "हुँदैन" भन्न सक्छु ।',
  },
  {
    id: 6,
    line1: 'विश्वसनीय व्यक्त्तिले',
    line2: 'सहयोग गर्न सक्छन् ।',
    fullText: 'विश्वसनीय व्यक्त्तिले मलाई सहयोग गर्न सक्छन् ।',
  },
  {
    id: 7,
    line1: 'आवाज उठाउनु र बोल्नु',
    line2: 'साहसिक काम हो ।',
    fullText: 'बोल्नु साहसिक काम हो ।',
  },
  {
    id: 8,
    line1: 'सबै बालबालिकाले',
    line2: 'सम्मान पाउनुपर्छ ।',
    fullText: 'सबै बालबालिकाले सम्मान पाउनुपर्छ ।',
  },
  {
    id: 9,
    line1: 'केटा र केटी दुवैलाई',
    line2: 'समान सुरक्षाको अधिकार छ ।',
    fullText: 'केटा र केटी दुवैलाई समान सुरक्षा पाउने अधिकार छ ।',
  },
  {
    id: 10,
    line1: 'घटनाको रिपोर्टिङले सबैलाई',
    line2: 'सुरक्षित राख्न मद्दत गर्छ ।',
    fullText: 'रिपोर्टिङले सबैलाई सुरक्षित राख्न मद्दत गर्छ ।',
  },
];

interface PosterLeftColumnProps {
  columns?: 1 | 2;
}

export const PosterLeftColumn: React.FC<PosterLeftColumnProps> = ({ columns = 1 }) => {
  const { leftMessages, updateImage, removeImage } = usePosterImages();
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const handleFileChange = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await updateImage(`leftMessage_${id}`, file);
    } catch (err) {
      console.error('Failed to update message image', err);
    } finally {
      e.target.value = '';
    }
  };

  return (
    <div className="w-full flex flex-col justify-between h-full bg-slate-50/95 border-r-2 border-slate-300 p-1.5 sm:p-2 space-y-1 sm:space-y-1.5 select-none">
      {/* Header Pill - Formatted into TWO lines for maximum prominence and readability */}
      <div className="w-full bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 text-white py-1.5 sm:py-2 px-2 rounded-xl text-center shadow-xs border border-blue-950 shrink-0">
        <h2 className="text-xs sm:text-sm font-black leading-tight flex flex-col items-center justify-center gap-0.5">
          <div className="flex items-center gap-1">
            <span className="text-xs sm:text-sm">🛡️</span>
            <span className="text-white">मुख्य PSEA</span>
          </div>
          <span className="text-amber-300 text-[11px] sm:text-xs md:text-[13px] font-extrabold tracking-wide">
            सन्देशहरू
          </span>
        </h2>
      </div>

      {/* 10 Illustrated Message Cards - Each message cleanly formatted into TWO lines */}
      <div
        className={`flex-1 py-0.5 min-h-0 ${
          columns === 2
            ? 'grid grid-cols-2 gap-1 content-between'
            : 'flex flex-col justify-between gap-1'
        }`}
      >
        {PSEA_ITEMS.map((item) => {
          const uploadedImg = leftMessages[item.id];
          const croppedImg = uploadedImg || DEFAULT_LEFT_IMAGES[item.id];
          return (
            <div
              key={item.id}
              className={`group/item relative flex items-center bg-white border border-slate-200 rounded-xl shadow-2xs hover:shadow-xs transition-shadow ${
                columns === 2
                  ? 'p-1.5 gap-1.5 flex-col text-center justify-center'
                  : 'p-1 sm:p-1.5 lg:p-2 gap-2 sm:gap-2.5'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                ref={(el) => {
                  fileInputRefs.current[item.id] = el;
                }}
                onChange={(e) => handleFileChange(item.id, e)}
                className="hidden"
              />

              {/* High Quality Relevant Cartoon Vignette or Cropped Photo (Enlarged & Sharp) */}
              <div
                className={`relative shrink-0 rounded-full overflow-hidden border-2 border-blue-500 bg-blue-50 shadow-xs flex items-center justify-center group/avatar ${
                  columns === 2
                    ? 'w-8 h-8 sm:w-10 sm:h-10'
                    : 'w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12'
                }`}
              >
                {croppedImg ? (
                  <img
                    src={croppedImg}
                    alt={item.fullText}
                    className="absolute inset-0 w-full h-full object-cover select-none"
                  />
                ) : (
                  <PseaMessageCartoon id={item.id} />
                )}

                {/* Direct browse overlay on avatar hover (no-print) */}
                <button
                  onClick={() => fileInputRefs.current[item.id]?.click()}
                  className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer print:hidden"
                  title="नयाँ तस्बिर छान्नुहोस् (Browse)"
                >
                  <Camera className="w-4 h-4 text-emerald-300" />
                </button>
              </div>

              {/* Message Text formatted into TWO clean lines (Prominent & Clear) */}
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <span className="text-[9.5px] sm:text-[10.5px] md:text-[11.5px] lg:text-[12.5px] font-black text-slate-900 leading-tight">
                  {item.line1}
                </span>
                <span className="text-[9.5px] sm:text-[10.5px] md:text-[11.5px] lg:text-[12.5px] font-black text-blue-900 leading-tight">
                  {item.line2}
                </span>
              </div>

              {/* Action Buttons on card hover (no-print, zero layout space) */}
              <div className="absolute top-1 right-1 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center gap-1 bg-white/90 p-0.5 rounded shadow-2xs print:hidden z-30 pointer-events-none group-hover/item:pointer-events-auto">
                <button
                  onClick={() => fileInputRefs.current[item.id]?.click()}
                  className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[9px] font-bold cursor-pointer"
                  title="तस्बिर बदल्नुहोस् (Browse)"
                >
                  <Camera className="w-3 h-3 text-slate-600" />
                </button>
                {uploadedImg && (
                  <button
                    onClick={() => removeImage(`leftMessage_${item.id}`)}
                    className="p-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 text-[9px] font-bold cursor-pointer"
                    title="मूल चित्रमा फर्काउनुहोस्"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
