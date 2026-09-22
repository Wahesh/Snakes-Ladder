import React, { useState, useRef } from 'react';
import { usePosterImages } from '../context/PosterImageContext';
import { X, Upload, RotateCcw, Image as ImageIcon, Check, Sparkles, AlertCircle } from 'lucide-react';
import headerBannerDefault from '../assets/images/regenerated_image_1789980781678.jpg';

interface SlotDefinition {
  key: string;
  category: 'banner' | 'left' | 'right';
  nepaliTitle: string;
  subTitle?: string;
  aspectRatio: string;
  recommendedSize: string;
}

const SLOTS: SlotDefinition[] = [
  {
    key: 'headerBanner',
    category: 'banner',
    nepaliTitle: 'शीर्ष ब्यानर (Top Header Banner)',
    subTitle: 'हिमाल, गाउँ र बालबालिकाको दृश्य सहितको मुख्य शीर्षक',
    aspectRatio: 'aspect-[16/4]',
    recommendedSize: '१६:४ वा ४:१ (लगभग १२०० × ३०० पिक्सेल)',
  },
  {
    key: 'footerBanner',
    category: 'banner',
    nepaliTitle: 'तल्लो ब्यानर (Bottom Footer Banner)',
    subTitle: 'बालबालिका, नारा र बाल हेल्पलाइन १०९८ सहितको तल्लो ब्यानर',
    aspectRatio: 'aspect-[16/3.5]',
    recommendedSize: '१६:३.५ वा ५:१ (लगभग १२०० × २५० पिक्सेल)',
  },
  {
    key: 'leftMessage_1',
    category: 'left',
    nepaliTitle: 'सन्देश १: मेरो शरीर मेरो आफ्नो हो',
    subTitle: 'PSEA मुख्य सन्देश १ को चित्र',
    aspectRatio: 'aspect-square',
    recommendedSize: '१:१ गोलाकार (लगभग २०० × २०० पिक्सेल)',
  },
  {
    key: 'leftMessage_2',
    category: 'left',
    nepaliTitle: 'सन्देश २: म सुरक्षित रहने अधिकार राख्छु',
    subTitle: 'PSEA मुख्य सन्देश २ को चित्र',
    aspectRatio: 'aspect-square',
    recommendedSize: '१:१ गोलाकार (लगभग २०० × २०० पिक्सेल)',
  },
  {
    key: 'leftMessage_3',
    category: 'left',
    nepaliTitle: 'सन्देश ३: सहायता र सेवा निःशुल्क हुन्छन्',
    subTitle: 'PSEA मुख्य सन्देश ३ को चित्र',
    aspectRatio: 'aspect-square',
    recommendedSize: '१:१ गोलाकार (लगभग २०० × २०० पिक्सेल)',
  },
  {
    key: 'leftMessage_4',
    category: 'left',
    nepaliTitle: 'सन्देश ४: फाइदा माग्न मिल्दैन',
    subTitle: 'सहयोगको बदलामा व्यक्तिगत वा यौनजन्य फाइदा निषेध',
    aspectRatio: 'aspect-square',
    recommendedSize: '१:१ गोलाकार (लगभग २०० × २०० पिक्सेल)',
  },
  {
    key: 'leftMessage_5',
    category: 'left',
    nepaliTitle: 'सन्देश ५: मन नपरे "हुँदैन" भन्न सक्छु',
    subTitle: 'अस्वीकार गर्ने अधिकार',
    aspectRatio: 'aspect-square',
    recommendedSize: '१:१ गोलाकार (लगभग २०० × २०० पिक्सेल)',
  },
  {
    key: 'leftMessage_6',
    category: 'left',
    nepaliTitle: 'सन्देश ६: विश्वसनीय वयस्कको सहयोग',
    subTitle: 'सहयोग पाउने उपाय',
    aspectRatio: 'aspect-square',
    recommendedSize: '१:१ गोलाकार (लगभग २०० × २०० पिक्सेल)',
  },
  {
    key: 'leftMessage_7',
    category: 'left',
    nepaliTitle: 'सन्देश ७: बोल्नु साहसिक काम हो',
    subTitle: 'आवाज उठाउने साहस',
    aspectRatio: 'aspect-square',
    recommendedSize: '१:१ गोलाकार (लगभग २०० × २०० पिक्सेल)',
  },
  {
    key: 'leftMessage_8',
    category: 'left',
    nepaliTitle: 'सन्देश ८: सबै बालबालिकाले सम्मान पाउनुपर्छ',
    subTitle: 'समान मर्यादा र सम्मान',
    aspectRatio: 'aspect-square',
    recommendedSize: '१:१ गोलाकार (लगभग २०० × २०० पिक्सेल)',
  },
  {
    key: 'leftMessage_9',
    category: 'left',
    nepaliTitle: 'सन्देश ९: केटा र केटी दुवैलाई समान सुरक्षा',
    subTitle: 'लैङ्गिक समानता र सुरक्षा',
    aspectRatio: 'aspect-square',
    recommendedSize: '१:१ गोलाकार (लगभग २०० × २०० पिक्सेल)',
  },
  {
    key: 'leftMessage_10',
    category: 'left',
    nepaliTitle: 'सन्देश १०: रिपोर्टिङले सबैलाई सुरक्षित राख्छ',
    subTitle: 'रिपोर्टिङको महत्व',
    aspectRatio: 'aspect-square',
    recommendedSize: '१:१ गोलाकार (लगभग २०० × २०० पिक्सेल)',
  },
  {
    key: 'rightPanel_exploitation',
    category: 'right',
    nepaliTitle: 'दायाँ कार्ड १: यौन शोषण (Sexual Exploitation)',
    subTitle: 'राहत वा सेवाको बदलामा अनुचित फाइदा माग्ने कार्य सम्बन्धी उदाहरण',
    aspectRatio: 'aspect-[4/3]',
    recommendedSize: '४:३ आयताकार (लगभग ४०० × ३०० पिक्सेल)',
  },
  {
    key: 'rightPanel_abuse',
    category: 'right',
    nepaliTitle: 'दायाँ कार्ड २: यौन दुर्व्यवहार (Sexual Abuse)',
    subTitle: 'इच्छा विपरीत छुनु वा अनुचित व्यवहार गर्नु सम्बन्धी उदाहरण',
    aspectRatio: 'aspect-[4/3]',
    recommendedSize: '४:३ आयताकार (लगभग ४०० × ३०० पिक्सेल)',
  },
  {
    key: 'rightPanel_harassment',
    category: 'right',
    nepaliTitle: 'दायाँ कार्ड ३: यौन उत्पीडन (Sexual Harassment)',
    subTitle: 'अशोभनीय टिप्पणी वा बारम्बार कल/सन्देश पठाउनु सम्बन्धी उदाहरण',
    aspectRatio: 'aspect-[4/3]',
    recommendedSize: '४:३ आयताकार (लगभग ४०० × ३०० पिक्सेल)',
  },
];

export const ImageManagerModal: React.FC = () => {
  const {
    isImageManagerOpen,
    closeImageManager,
    headerBanner,
    footerBanner,
    leftMessages,
    rightPanels,
    updateImage,
    removeImage,
    clearAllCrops,
    selectedSlotKey,
  } = usePosterImages();

  const [activeTab, setActiveTab] = useState<'all' | 'banner' | 'left' | 'right'>('all');
  const [updatingKey, setUpdatingKey] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  if (!isImageManagerOpen) return null;

  const getCurrentImg = (key: string): string | null => {
    if (key === 'headerBanner') return headerBanner || headerBannerDefault;
    if (key === 'footerBanner') return footerBanner || '/assets/bottom-banner.png';
    if (key.startsWith('leftMessage_')) {
      const num = parseInt(key.replace('leftMessage_', ''), 10);
      return leftMessages[num] || null;
    }
    if (key.startsWith('rightPanel_')) {
      const type = key.replace('rightPanel_', '');
      return rightPanels[type] || null;
    }
    return null;
  };

  const isCustomUploaded = (key: string): boolean => {
    if (key === 'headerBanner') return Boolean(headerBanner);
    if (key === 'footerBanner') return Boolean(footerBanner);
    if (key.startsWith('leftMessage_')) {
      const num = parseInt(key.replace('leftMessage_', ''), 10);
      return Boolean(leftMessages[num]);
    }
    if (key.startsWith('rightPanel_')) {
      const type = key.replace('rightPanel_', '');
      return Boolean(rightPanels[type]);
    }
    return false;
  };

  const handleFileSelected = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUpdatingKey(key);
      await updateImage(key, file);
      setSuccessMsg(`तस्बिर सफलतापूर्वक अद्यावधिक भयो !`);
      setTimeout(() => setSuccessMsg(null), 3500);
    } catch (err) {
      console.error(err);
      alert('तस्बिर अपलोड गर्न सकिएन। कृपया अर्को तस्बिर प्रयास गर्नुहोस्।');
    } finally {
      setUpdatingKey(null);
      e.target.value = '';
    }
  };

  const handleReset = async (key: string) => {
    try {
      setUpdatingKey(key);
      await removeImage(key);
      setSuccessMsg('मूल पूर्वनिर्धारित तस्बिरमा फर्काइयो।');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingKey(null);
    }
  };

  const filteredSlots = SLOTS.filter((s) => {
    if (activeTab === 'all') return true;
    return s.category === activeTab;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white border-b border-emerald-950 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-xl">
              <ImageIcon className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                तस्बिर व्यवस्थापन (Browse & Update Images Separately)
              </h2>
              <p className="text-xs text-emerald-200 font-medium">
                पोस्टरका प्रत्येक तस्बिर (शीर्ष, तल्लो ब्यानर, सन्देश र कार्डहरू) छुट्टाछुट्टै छान्नुहोस् र बदल्नुहोस्
              </p>
            </div>
          </div>

          <button
            onClick={closeImageManager}
            className="p-1.5 rounded-xl hover:bg-white/20 transition-colors text-white/80 hover:text-white cursor-pointer"
            title="बन्द गर्नुहोस्"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert Banner */}
        {successMsg && (
          <div className="px-5 py-2.5 bg-emerald-50 border-b border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center justify-between animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-slate-100 border-b border-slate-200 shrink-0 overflow-x-auto gap-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              सबै तस्बिरहरू ({SLOTS.length})
            </button>
            <button
              onClick={() => setActiveTab('banner')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'banner'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              ब्यानरहरू (२)
            </button>
            <button
              onClick={() => setActiveTab('left')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'left'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              बायाँ सन्देशहरू (१०)
            </button>
            <button
              onClick={() => setActiveTab('right')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'right'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              दायाँ सुरक्षा कार्डहरू (३)
            </button>
          </div>

          <button
            onClick={() => {
              if (window.confirm('के तपाईं सबै अपलोड गरिएका तस्बिरहरू हटाएर मूल चित्रमा फर्काउन चाहनुहुन्छ?')) {
                clearAllCrops();
                setSuccessMsg('सबै तस्बिरहरू मूल अवस्थामा फर्काइयो।');
                setTimeout(() => setSuccessMsg(null), 3000);
              }
            }}
            className="text-xs text-rose-700 hover:text-rose-800 font-bold px-2 py-1 rounded-md hover:bg-rose-50 flex items-center gap-1 transition-colors cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>सबै रिसेट</span>
          </button>
        </div>

        {/* List / Grid of Image Slots */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredSlots.map((slot) => {
              const currentUrl = getCurrentImg(slot.key);
              const isCustom = isCustomUploaded(slot.key);
              const isHighlighted = selectedSlotKey === slot.key;

              return (
                <div
                  key={slot.key}
                  className={`relative flex flex-col justify-between p-3.5 rounded-xl border-2 transition-all bg-white shadow-2xs hover:shadow-sm ${
                    isHighlighted
                      ? 'border-emerald-500 ring-2 ring-emerald-400/50 bg-emerald-50/20'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="space-y-2">
                    {/* Title & Badges */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                          {slot.nepaliTitle}
                        </h3>
                        {slot.subTitle && (
                          <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                            {slot.subTitle}
                          </p>
                        )}
                      </div>

                      {isCustom ? (
                        <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>कस्टम तस्बिर</span>
                        </span>
                      ) : (
                        <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          पूर्वनिर्धारित
                        </span>
                      )}
                    </div>

                    {/* Image Preview Box */}
                    <div className="relative w-full h-28 sm:h-32 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center group/preview">
                      {currentUrl ? (
                        <img
                          src={currentUrl}
                          alt={slot.nepaliTitle}
                          className="w-full h-full object-cover select-none"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                          <ImageIcon className="w-8 h-8 text-slate-300 mb-1" />
                          <span className="text-[11px] font-semibold">कार्टुन दृष्टान्त प्रयोग भइरहेको छ</span>
                        </div>
                      )}

                      {/* Hover Overlay Button */}
                      <button
                        onClick={() => fileInputRefs.current[slot.key]?.click()}
                        className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white font-bold text-xs cursor-pointer backdrop-blur-2xs"
                      >
                        <Upload className="w-4 h-4" />
                        <span>नयाँ तस्बिर छान्नुहोस्</span>
                      </button>
                    </div>

                    <div className="text-[10px] text-slate-400 font-medium">
                      सिफारिस साइज: {slot.recommendedSize}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      ref={(el) => {
                        fileInputRefs.current[slot.key] = el;
                      }}
                      onChange={(e) => handleFileSelected(slot.key, e)}
                      className="hidden"
                    />

                    <button
                      disabled={updatingKey === slot.key}
                      onClick={() => fileInputRefs.current[slot.key]?.click()}
                      className="flex-1 py-1.5 px-3 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer disabled:opacity-50"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{updatingKey === slot.key ? 'अपलोड हुँदै...' : 'तस्बिर ब्राउज गर्नुहोस् (Browse)'}</span>
                    </button>

                    {isCustom && (
                      <button
                        disabled={updatingKey === slot.key}
                        onClick={() => handleReset(slot.key)}
                        className="py-1.5 px-2.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200 hover:border-rose-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        title="मूल चित्रमा फर्काउनुहोस्"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>हटाउनुहोस्</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>सबै परिवर्तनहरू तत्काल सेभ हुन्छन् र प्रिन्ट/PDF मा समेत सुरक्षित रहन्छन्।</span>
          </div>

          <button
            onClick={closeImageManager}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            सम्पन्न भयो (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
