import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Crop,
  Sparkles,
  RotateCcw,
  Check,
  Eye,
  Sliders,
  Image as ImageIcon,
  AlertCircle,
  Download,
} from 'lucide-react';
import { usePosterImages } from '../context/PosterImageContext';
import {
  DEFAULT_POSTER_REGIONS,
  CropBox,
  cropImageRegion,
  loadImage,
  autoCropAll,
} from '../utils/imageCropper';

export const ImageCropperModal: React.FC = () => {
  const {
    isCropperOpen,
    closeCropper,
    headerBanner,
    leftMessages,
    rightPanels,
    footerBanner,
    boardImage,
    sourceImage,
    setCrop,
    setMultipleCrops,
    clearAllCrops,
  } = usePosterImages();

  const [activeRegion, setActiveRegion] = useState<CropBox>(DEFAULT_POSTER_REGIONS[0]);
  const [cropBox, setCropBox] = useState<{
    xPercent: number;
    yPercent: number;
    widthPercent: number;
    heightPercent: number;
  }>({
    xPercent: DEFAULT_POSTER_REGIONS[0].xPercent,
    yPercent: DEFAULT_POSTER_REGIONS[0].yPercent,
    widthPercent: DEFAULT_POSTER_REGIONS[0].widthPercent,
    heightPercent: DEFAULT_POSTER_REGIONS[0].heightPercent,
  });

  const [masterImg, setMasterImg] = useState<HTMLImageElement | null>(null);
  const [livePreviewUrl, setLivePreviewUrl] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Load existing source image if available
  useEffect(() => {
    if (sourceImage && !masterImg) {
      loadImage(sourceImage)
        .then((img) => setMasterImg(img))
        .catch((err) => console.warn('Failed to load existing source image', err));
    }
  }, [sourceImage]);

  // When active region changes, reset crop coordinates to default for that region
  useEffect(() => {
    setCropBox({
      xPercent: activeRegion.xPercent,
      yPercent: activeRegion.yPercent,
      widthPercent: activeRegion.widthPercent,
      heightPercent: activeRegion.heightPercent,
    });
  }, [activeRegion]);

  // Update live preview whenever masterImg or cropBox changes
  useEffect(() => {
    if (!masterImg) {
      setLivePreviewUrl('');
      return;
    }
    try {
      const cropped = cropImageRegion(masterImg, cropBox);
      setLivePreviewUrl(cropped);
    } catch {
      setLivePreviewUrl('');
    }
  }, [masterImg, cropBox]);

  if (!isCropperOpen) return null;

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setStatusMessage('कृपया मान्य तस्बिर फाइल (JPG, PNG, WEBP) छान्नुहोस्।');
      return;
    }
    setIsProcessing(true);
    setStatusMessage('तस्बिर लोड हुँदैछ...');
    try {
      const img = await loadImage(file);
      setMasterImg(img);

      // Read as data URL to save in context
      const reader = new FileReader();
      reader.onload = async (e) => {
        const rawSrc = e.target?.result as string;
        // Automatically crop all default regions immediately
        const crops = autoCropAll(img);
        await setMultipleCrops(crops, rawSrc);
        setIsProcessing(false);
        setStatusMessage('सफलतापूर्वक सम्पूर्ण भागहरू स्वचालित रूपमा काटिएका छन् !');
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      setStatusMessage('तस्बिर लोड गर्न सकिएन। पुनः प्रयास गर्नुहोस्।');
    }
  };

  const handleAutoCropAll = async () => {
    if (!masterImg) return;
    setIsProcessing(true);
    setStatusMessage('सबै भागहरू स्वचालित रूपमा काटिँदैछ...');
    try {
      const crops = autoCropAll(masterImg);
      await setMultipleCrops(crops, masterImg.src);
      setStatusMessage('सबै भागहरू सफलतापूर्वक पोस्टरमा लागू गरिए !');
    } catch (err) {
      console.error(err);
      setStatusMessage('काट्ने क्रममा त्रुटि भयो।');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveActiveCrop = async () => {
    if (!masterImg || !livePreviewUrl) return;
    setIsProcessing(true);
    try {
      await setCrop(activeRegion.targetSlot, livePreviewUrl);
      setStatusMessage(`"${activeRegion.nameNepali}" सफलतापूर्वक सेभ गरियो !`);
    } catch (err) {
      console.error(err);
      setStatusMessage('सेभ गर्न सकिएन।');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetAll = async () => {
    if (window.confirm('के तपाईं सबै काटिएका तस्बिरहरू हटाएर मूल कार्टुन चित्रणमा फर्कन चाहनुहुन्छ?')) {
      await clearAllCrops();
      setMasterImg(null);
      setLivePreviewUrl('');
      setStatusMessage('सबै तस्बिरहरू रिसेट गरिएका छन्।');
    }
  };

  // Helper to check if a region currently has a cropped image
  const hasCrop = (slot: string): boolean => {
    if (slot === 'headerBanner') return Boolean(headerBanner);
    if (slot === 'footerBanner') return Boolean(footerBanner);
    if (slot === 'boardImage') return Boolean(boardImage);
    if (slot.startsWith('leftMessage_')) {
      const id = parseInt(slot.replace('leftMessage_', ''), 10);
      return Boolean(leftMessages[id]);
    }
    if (slot.startsWith('rightPanel_')) {
      const type = slot.replace('rightPanel_', '');
      return Boolean(rightPanels[type]);
    }
    return false;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-emerald-500 max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-4 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700/80 border border-emerald-400 flex items-center justify-center text-xl shadow-inner">
              ✂️
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight leading-tight">
                पोस्टर तस्बिर क्रपर तथा सेग्मेन्टर (Crop & Extract Images)
              </h2>
              <p className="text-xs text-emerald-200 leading-tight">
                पोस्टर तस्बिर अपलोड गर्नुहोस् र विभिन्न भागहरू (शीर्ष गाउँ, सन्देशहरू, कार्डहरू) काटेर प्रयोग गर्नुहोस्
              </p>
            </div>
          </div>
          <button
            onClick={closeCropper}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="बन्द गर्नुहोस्"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Status Message */}
          {statusMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs sm:text-sm font-bold text-emerald-950 flex items-center justify-between">
              <span>{statusMessage}</span>
              <button
                onClick={() => setStatusMessage('')}
                className="text-emerald-700 hover:text-emerald-950 text-xs font-extrabold ml-2"
              >
                ✕
              </button>
            </div>
          )}

          {/* Upload Area */}
          {!masterImg ? (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.[0]) {
                  handleFileUpload(e.dataTransfer.files[0]);
                }
              }}
              onClick={() => fileInputRef.current?.click()}
              className="border-3 border-dashed border-emerald-400 hover:border-emerald-600 bg-emerald-50/50 hover:bg-emerald-50 rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <Upload className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-black text-slate-800">
                  पोस्टर तस्बिर यहाँ तान्नुहोस् वा छान्नुहोस्
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  तपाईंको सन्दर्भ पोस्टर (Snake & Ladder PSEA Poster) को तस्बिर अपलोड गर्नुहोस्। सिस्टमले स्वचालित रूपमा सबै भागहरू छुट्याउनेछ।
                </p>
              </div>
              <span className="px-4 py-2 bg-emerald-600 group-hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors">
                📁 फाइल छान्नुहोस् (Choose File)
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                }}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Toolbar when image is loaded */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-100 border border-slate-300 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black text-slate-800">
                    पोस्टर तस्बिर सक्रिय छ ({masterImg.naturalWidth} × {masterImg.naturalHeight} px)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAutoCropAll}
                    disabled={isProcessing}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-xs rounded-lg shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>⚡ सबै भाग स्वतः काट्नुहोस् (Auto-Crop All)</span>
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    🔄 फरक तस्बिर छान्नुहोस्
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                    }}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Slicer Workspace: Left is Target Selector & Controls, Right is Interactive Canvas Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Section Selector (3 cols) */}
                <div className="lg:col-span-4 flex flex-col gap-2 max-h-[460px] overflow-y-auto pr-1">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                    काट्ने भाग छान्नुहोस् (Select Section to Crop):
                  </label>
                  <div className="flex flex-col gap-1.5">
                    {DEFAULT_POSTER_REGIONS.map((reg) => {
                      const isSelected = reg.id === activeRegion.id;
                      const hasCropped = hasCrop(reg.targetSlot);
                      return (
                        <button
                          key={reg.id}
                          onClick={() => setActiveRegion(reg)}
                          className={`p-2 rounded-xl text-left transition-all border flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                          }`}
                        >
                          <div className="overflow-hidden pr-1">
                            <span className="text-xs font-black block text-slate-900 truncate">
                              {reg.nameNepali}
                            </span>
                            <span className="text-[10px] text-slate-500 block truncate">
                              {reg.nameEnglish}
                            </span>
                          </div>
                          <span
                            className={`shrink-0 text-[10px] font-black px-1.5 py-0.5 rounded ${
                              hasCropped
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {hasCropped ? '✓ सकियो' : 'बाँकी'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Cropping Canvas & Range Controls (8 cols) */}
                <div className="lg:col-span-8 flex flex-col gap-3">
                  {/* Visual Master Image View with Bounding Box Overlay */}
                  <div className="relative border-2 border-slate-300 rounded-xl overflow-hidden bg-slate-900 max-h-[300px] flex items-center justify-center">
                    <img
                      src={masterImg.src}
                      alt="Master Poster"
                      className="max-h-[300px] w-auto object-contain select-none"
                    />

                    {/* Semi-transparent Dark Mask with Highlight on Selected Crop Region */}
                    <div
                      className="absolute border-2 border-amber-400 bg-amber-400/20 pointer-events-none shadow-[0_0_0_9999px_rgba(0,0,0,0.45)] transition-all duration-75"
                      style={{
                        left: `${cropBox.xPercent}%`,
                        top: `${cropBox.yPercent}%`,
                        width: `${cropBox.widthPercent}%`,
                        height: `${cropBox.heightPercent}%`,
                      }}
                    >
                      <span className="absolute -top-5 left-0 bg-amber-500 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded shadow">
                        {activeRegion.nameNepali}
                      </span>
                    </div>
                  </div>

                  {/* Sliders for Precision Adjustment */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div>
                      <span className="font-bold text-slate-700 block mb-1">
                        X स्थिति (Left): {Math.round(cropBox.xPercent)}%
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={cropBox.xPercent}
                        onChange={(e) =>
                          setCropBox((prev) => ({
                            ...prev,
                            xPercent: Math.min(parseFloat(e.target.value), 100 - prev.widthPercent),
                          }))
                        }
                        className="w-full accent-emerald-600"
                      />
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 block mb-1">
                        Y स्थिति (Top): {Math.round(cropBox.yPercent)}%
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={cropBox.yPercent}
                        onChange={(e) =>
                          setCropBox((prev) => ({
                            ...prev,
                            yPercent: Math.min(parseFloat(e.target.value), 100 - prev.heightPercent),
                          }))
                        }
                        className="w-full accent-emerald-600"
                      />
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 block mb-1">
                        चौडाइ (Width): {Math.round(cropBox.widthPercent)}%
                      </span>
                      <input
                        type="range"
                        min="2"
                        max="100"
                        value={cropBox.widthPercent}
                        onChange={(e) =>
                          setCropBox((prev) => ({
                            ...prev,
                            widthPercent: Math.min(parseFloat(e.target.value), 100 - prev.xPercent),
                          }))
                        }
                        className="w-full accent-emerald-600"
                      />
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 block mb-1">
                        उचाइ (Height): {Math.round(cropBox.heightPercent)}%
                      </span>
                      <input
                        type="range"
                        min="2"
                        max="100"
                        value={cropBox.heightPercent}
                        onChange={(e) =>
                          setCropBox((prev) => ({
                            ...prev,
                            heightPercent: Math.min(parseFloat(e.target.value), 100 - prev.yPercent),
                          }))
                        }
                        className="w-full accent-emerald-600"
                      />
                    </div>
                  </div>

                  {/* Live Cropped Result Preview & Action Button */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg border-2 border-emerald-400 bg-slate-100 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                        {livePreviewUrl ? (
                          <img
                            src={livePreviewUrl}
                            alt="Crop Preview"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Eye className="w-6 h-6 text-slate-400" />
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-black text-slate-900 block">
                          काटिएको पूर्वावलोकन (Preview)
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          {activeRegion.nameNepali}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleSaveActiveCrop}
                      disabled={!livePreviewUrl || isProcessing}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-sm flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>यो भाग सेभ गर्नुहोस् (Save This Crop)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 border-t border-slate-200 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <button
            onClick={handleResetAll}
            className="px-3 py-2 text-rose-700 hover:bg-rose-50 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>सबै हटाउनुहोस् (Reset All)</span>
          </button>

          <button
            onClick={closeCropper}
            className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-extrabold shadow-sm transition-all cursor-pointer"
          >
            सम्पन्न भयो (Done & View Poster)
          </button>
        </div>
      </div>
    </div>
  );
};
