import React, { useState } from 'react';
import { PrintSettings } from '../types';
import { TargetSizeControls } from './TargetSizeControls';
import {
  Sliders,
  Eye,
  FileText,
  Check,
  HelpCircle,
  Palette,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
} from 'lucide-react';
import { usePosterImages } from '../context/PosterImageContext';

interface PrintControlsProps {
  settings: PrintSettings;
  onUpdateSettings: (newSettings: Partial<PrintSettings>) => void;
  onPrint: () => void;
  posterElementRef: React.RefObject<HTMLDivElement | null>;
}

export const PrintControls: React.FC<PrintControlsProps> = ({
  settings,
  onUpdateSettings,
  onPrint,
  posterElementRef,
}) => {
  const { openImageManager } = usePosterImages();
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  return (
    <div className="space-y-4 no-print">
      {/* 1. Primary Target Size Selector & Direct Export Engine */}
      <TargetSizeControls
        settings={settings}
        onUpdateSettings={onUpdateSettings}
        posterElementRef={posterElementRef}
        onBrowserPrint={onPrint}
      />

      {/* 2. Collapsible Board Appearance & Typography Fine-Tuning */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <button
          onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
          className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-700" />
            <span className="font-bold text-xs sm:text-sm text-slate-800">
              ⚙️ थप बोर्ड सेटिङहरू (अक्षर आकार, अङ्क, चित्र तथा सामग्री नियन्त्रण)
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
            <span>{showAdvancedSettings ? 'लुकाउनुहोस्' : 'खोल्नुहोस्'}</span>
            {showAdvancedSettings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showAdvancedSettings && (
          <div className="p-4 space-y-4 border-t border-slate-100 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              {/* Text Size inside Squares */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-slate-500" />
                  <span>घरभित्रको अक्षर आकार (Text Size):</span>
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {(
                    [
                      { id: 'small', label: 'सानो' },
                      { id: 'medium', label: 'मध्यम' },
                      { id: 'large', label: 'ठूलो' },
                    ] as const
                  ).map((s) => (
                    <button
                      key={s.id}
                      onClick={() => onUpdateSettings({ textSize: s.id })}
                      className={`py-1.5 px-2 rounded font-semibold text-[11px] text-center border cursor-pointer ${
                        settings.textSize === s.id
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number Format (English 1, 2, 3 vs Nepali १, २, ३) */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-slate-500" />
                  <span>अङ्क ढाँचा (Number Digits):</span>
                </label>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => onUpdateSettings({ numberFormat: 'english' })}
                    className={`py-1.5 px-2 rounded font-semibold text-[11px] border cursor-pointer ${
                      settings.numberFormat !== 'nepali'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    English (1, 2, 3)
                  </button>
                  <button
                    onClick={() => onUpdateSettings({ numberFormat: 'nepali' })}
                    className={`py-1.5 px-2 rounded font-semibold text-[11px] border cursor-pointer ${
                      settings.numberFormat === 'nepali'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    नेपाली (१, २, ३)
                  </button>
                </div>
              </div>

              {/* Graphic Lines Toggle */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>सर्प तथा सिँढी चित्र (Overlay Lines):</span>
                </label>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => onUpdateSettings({ showSnakeLadderLines: true })}
                    className={`py-1.5 px-2 rounded font-semibold text-[11px] border cursor-pointer ${
                      settings.showSnakeLadderLines
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    देखाउने
                  </button>
                  <button
                    onClick={() => onUpdateSettings({ showSnakeLadderLines: false })}
                    className={`py-1.5 px-2 rounded font-semibold text-[11px] border cursor-pointer ${
                      !settings.showSnakeLadderLines
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    लुकाउने
                  </button>
                </div>
              </div>

              {/* Left Column Message Layout */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center justify-between text-xs">
                  <span>बायाँ सन्देशहरू (Left Messages):</span>
                </label>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => onUpdateSettings({ leftMessageColumns: 1 })}
                    className={`py-1.5 px-2 rounded font-semibold text-[11px] border cursor-pointer ${
                      (settings.leftMessageColumns || 1) === 1
                        ? 'bg-blue-800 text-white border-blue-800'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    १ लहर (1 Col)
                  </button>
                  <button
                    onClick={() => onUpdateSettings({ leftMessageColumns: 2 })}
                    className={`py-1.5 px-2 rounded font-semibold text-[11px] border cursor-pointer ${
                      settings.leftMessageColumns === 2
                        ? 'bg-blue-800 text-white border-blue-800'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    २ स्तम्भ (2 Cols)
                  </button>
                </div>
              </div>

              {/* Facilitator Corner */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block text-xs">सहजकर्ता कुना समावेश गर्ने</span>
                  <span className="text-[10px] text-slate-500">दायाँ स्तम्भका उदाहरण सामग्री</span>
                </div>
                <button
                  onClick={() =>
                    onUpdateSettings({
                      showFacilitatorCorner: !settings.showFacilitatorCorner,
                    })
                  }
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    settings.showFacilitatorCorner ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      settings.showFacilitatorCorner ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Key Messages */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block text-xs">१० मुख्य PSEA सन्देशहरू</span>
                  <span className="text-[10px] text-slate-500">बायाँ स्तम्भका सचेतना सन्देशहरू</span>
                </div>
                <button
                  onClick={() =>
                    onUpdateSettings({
                      showKeyMessages: !settings.showKeyMessages,
                    })
                  }
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    settings.showKeyMessages ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      settings.showKeyMessages ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Image Manager Modal Trigger */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block text-xs">तस्बिरहरू बदल्ने</span>
                  <span className="text-[10px] text-slate-500">शीर्ष, तल्लो ब्यानर र सन्देश तस्बिरहरू</span>
                </div>
                <button
                  onClick={() => openImageManager()}
                  className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>व्यवस्थापन</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
