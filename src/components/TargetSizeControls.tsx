import React, { useState } from 'react';
import { TargetSizeConfig, SizeUnit, PrintSettings } from '../types';
import {
  TARGET_SIZE_PRESETS,
  getPresetById,
  convertToInches,
  convertToMillimeters,
  formatDimensionString,
  getAspectRatioLabel,
} from '../utils/targetSizes';
import {
  exportPosterAsPng,
  exportPosterAsJpeg,
  exportPosterAsPdf,
  ExportProgress,
} from '../utils/exportEngine';
import {
  Maximize2,
  FileDown,
  Printer,
  Sliders,
  Sparkles,
  Layers,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  FileText,
  Ruler,
  Image as ImageIcon,
} from 'lucide-react';

interface TargetSizeControlsProps {
  settings: PrintSettings;
  onUpdateSettings: (newSettings: Partial<PrintSettings>) => void;
  posterElementRef: React.RefObject<HTMLDivElement | null>;
  onBrowserPrint: () => void;
}

export const TargetSizeControls: React.FC<TargetSizeControlsProps> = ({
  settings,
  onUpdateSettings,
  posterElementRef,
  onBrowserPrint,
}) => {
  const [activeCategory, setActiveCategory] = useState<'flex' | 'paper' | 'custom'>('flex');
  const [customWidth, setCustomWidth] = useState<number>(8);
  const [customHeight, setCustomHeight] = useState<number>(8);
  const [customUnit, setCustomUnit] = useState<SizeUnit>('ft');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState<ExportProgress | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);
  const [exportResolutionScale, setExportResolutionScale] = useState<number>(2); // 1x, 2x, 3x

  const currentSize = settings.targetSize || TARGET_SIZE_PRESETS[0];

  const handleSelectPreset = (preset: TargetSizeConfig) => {
    onUpdateSettings({
      paperSize: preset.id,
      targetSize: preset,
    });
  };

  const handleApplyCustomSize = () => {
    const w = Math.max(0.1, Number(customWidth) || 1);
    const h = Math.max(0.1, Number(customHeight) || 1);
    const aspect = w / h;

    const customConfig: TargetSizeConfig = {
      id: `custom-${w}x${h}-${customUnit}`,
      name: `अनुकूल: ${w}×${h} ${customUnit}`,
      category: 'custom',
      width: w,
      height: h,
      unit: customUnit,
      aspectRatio: aspect,
      description: `${formatDimensionString({
        id: 'temp',
        name: '',
        category: 'custom',
        width: w,
        height: h,
        unit: customUnit,
        aspectRatio: aspect,
        description: '',
      })}`,
      recommendedDpi: 150,
    };

    onUpdateSettings({
      paperSize: customConfig.id,
      targetSize: customConfig,
    });
  };

  const handleExport = async (format: 'png' | 'jpeg' | 'pdf') => {
    if (!posterElementRef.current) {
      alert('पोस्टर एलिमेन्ट फेला परेन। कृपया पुनः प्रयास गर्नुहोस्।');
      return;
    }

    setIsExporting(true);
    setExportError(null);
    const baseName = `PSEA-Poster-${currentSize.width}x${currentSize.height}${currentSize.unit}`;

    try {
      if (format === 'png') {
        await exportPosterAsPng(
          posterElementRef.current,
          baseName,
          exportResolutionScale,
          (prog) => setExportProgress(prog),
          currentSize
        );
      } else if (format === 'jpeg') {
        await exportPosterAsJpeg(
          posterElementRef.current,
          baseName,
          exportResolutionScale,
          0.95,
          (prog) => setExportProgress(prog),
          currentSize
        );
      } else if (format === 'pdf') {
        await exportPosterAsPdf(
          posterElementRef.current,
          currentSize,
          baseName,
          (prog) => setExportProgress(prog)
        );
      }
    } catch (error: any) {
      console.error('Export failed:', error);
      setExportError(error?.message || String(error));
    } finally {
      setIsExporting(false);
      setExportProgress(null);
    }
  };

  return (
    <div className="bg-white border-2 border-emerald-300 rounded-2xl p-3.5 sm:p-5 shadow-sm space-y-4 no-print">
      {/* 1. Header & Quick Export Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-slate-900 leading-tight">
                लक्षित साइज छनोट र तत्काल एक्सपोर्ट (Target Size & Direct Export)
              </h3>
              <p className="text-xs text-slate-500">
                आफ्नो चाहना अनुसारको नाप (८×८ फिट, A3, वा आफ्नै साइज) छान्नुहोस् र सोही नापमा सिधै फाइल डाउनलोड गर्नुहोस्
              </p>
            </div>
          </div>
        </div>

        {/* Action Export Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* PNG High-Res Download */}
          <button
            onClick={() => handleExport('png')}
            disabled={isExporting}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            title="लक्षित नापमा उच्च गुणस्तर PNG तस्बिर डाउनलोड गर्नुहोस्"
          >
            <ImageIcon className="w-4 h-4 text-emerald-200" />
            <span>PNG डाउनलोड (High-Res)</span>
          </button>

          {/* JPEG Download */}
          <button
            onClick={() => handleExport('jpeg')}
            disabled={isExporting}
            className="px-3.5 py-2 bg-teal-700 hover:bg-teal-800 active:scale-98 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            title="प्रिन्टिङ प्रेसका लागि JPEG तस्बिर डाउनलोड गर्नुहोस्"
          >
            <FileDown className="w-4 h-4 text-teal-200" />
            <span>JPEG डाउनलोड</span>
          </button>

          {/* Direct PDF Download */}
          <button
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
            className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 active:scale-98 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            title="लक्षित आकारमा सिधै PDF डकुमेन्ट बनाउनुहोस्"
          >
            <FileText className="w-4 h-4 text-blue-200" />
            <span>PDF डाउनलोड</span>
          </button>

          {/* Browser / System Print */}
          <button
            onClick={onBrowserPrint}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-900 active:scale-98 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            title="सिस्टम प्रिन्ट विन्डो खोल्नुहोस्"
          >
            <Printer className="w-4 h-4 text-slate-300" />
            <span className="hidden sm:inline">प्रिन्टर प्रिन्ट</span>
          </button>
        </div>
      </div>

      {/* Export Error Banner (if any) */}
      {exportError && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-xl p-3 text-xs space-y-1 text-rose-900 font-bold">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              ⚠️ निर्यात त्रुटि (Export Error):
            </span>
            <button
              onClick={() => setExportError(null)}
              className="text-rose-700 hover:text-rose-900 text-xs px-1.5 py-0.5 bg-rose-200 rounded cursor-pointer"
            >
              बन्द गर्नुहोस् (Dismiss)
            </button>
          </div>
          <p className="text-rose-800 font-mono text-[11px] bg-rose-100 p-1.5 rounded">
            {exportError}
          </p>
        </div>
      )}

      {/* Export Progress Notification (if active) */}
      {isExporting && exportProgress && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-3 text-xs space-y-1.5 animate-pulse">
          <div className="flex items-center justify-between font-bold text-emerald-900">
            <span className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
              {exportProgress.message}
            </span>
            <span>{exportProgress.progressPercent}%</span>
          </div>
          <div className="w-full bg-emerald-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${exportProgress.progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* 2. Target Size Selection Tabs */}
      <div className="space-y-3">
        {/* Category Selector Tabs */}
        <div className="flex border-b border-slate-200 gap-2">
          <button
            onClick={() => setActiveCategory('flex')}
            className={`pb-2 px-3 font-extrabold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer ${
              activeCategory === 'flex'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            🌟 फ्लेक्स ब्यानरहरू (८×८, ६×६, ५×५...)
          </button>

          <button
            onClick={() => setActiveCategory('paper')}
            className={`pb-2 px-3 font-extrabold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer ${
              activeCategory === 'paper'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            📄 कागजी पोस्टरहरू (A0, A1, A2, A3, A4)
          </button>

          <button
            onClick={() => setActiveCategory('custom')}
            className={`pb-2 px-3 font-extrabold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer ${
              activeCategory === 'custom'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            ✏️ आफ्नै अनुकूल नाप (Custom Size)
          </button>
        </div>

        {/* Tab 1: Flex Banners Presets */}
        {activeCategory === 'flex' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {TARGET_SIZE_PRESETS.filter((p) => p.category === 'flex').map((preset) => {
              const isSelected = currentSize.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-black text-xs ${isSelected ? 'text-emerald-900' : 'text-slate-800'}`}>
                      {preset.name}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </div>
                  <p className="text-[10.5px] text-slate-500 leading-tight">
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {/* Tab 2: Paper Sizes Presets */}
        {activeCategory === 'paper' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {TARGET_SIZE_PRESETS.filter((p) => p.category === 'paper').map((preset) => {
              const isSelected = currentSize.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-black text-xs ${isSelected ? 'text-emerald-900' : 'text-slate-800'}`}>
                      {preset.name.split(' ')[0]}
                    </span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {preset.width}×{preset.height} {preset.unit}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {/* Tab 3: Custom Dimensions Input */}
        {activeCategory === 'custom' && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <p className="text-xs font-bold text-slate-700">
              आफ्नो आवश्यक लम्बाइ र चौडाइ तोक्नुहोस्:
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {/* Width */}
              <div className="flex items-center gap-1.5">
                <label className="text-xs font-bold text-slate-600">चौडाइ (Width):</label>
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-emerald-600"
                />
              </div>

              {/* Height */}
              <div className="flex items-center gap-1.5">
                <label className="text-xs font-bold text-slate-600">उचाइ (Height):</label>
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-emerald-600"
                />
              </div>

              {/* Unit */}
              <div className="flex items-center gap-1.5">
                <label className="text-xs font-bold text-slate-600">इकाइ (Unit):</label>
                <select
                  value={customUnit}
                  onChange={(e) => setCustomUnit(e.target.value as SizeUnit)}
                  className="px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-emerald-600 cursor-pointer"
                >
                  <option value="ft">फिट (Feet / ft)</option>
                  <option value="in">इन्च (Inches / in)</option>
                  <option value="cm">सेन्टिमिटर (cm)</option>
                  <option value="mm">मिमी (mm)</option>
                  <option value="px">पिक्सेल (px)</option>
                </select>
              </div>

              {/* Apply Button */}
              <button
                onClick={handleApplyCustomSize}
                className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                लागू गर्नुहोस् (Apply Custom Size)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Target Size Live Information Strip & Viewport Helpers */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl p-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 font-black rounded-md text-[10px] uppercase tracking-wide">
              सक्रिय लक्षित नाप (Active Target)
            </span>
            <span className="font-extrabold text-white text-sm">
              {currentSize.name}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-300 text-[11px]">
            <span>📐 <strong>नाप:</strong> {formatDimensionString(currentSize)}</span>
            <span>🖼️ <strong>अनुपात:</strong> {getAspectRatioLabel(currentSize.aspectRatio)}</span>
            {currentSize.recommendedDpi && (
              <span>🖨️ <strong>सिफारिस DPI:</strong> {currentSize.recommendedDpi} DPI</span>
            )}
          </div>
        </div>

        {/* Viewport Zoom & Resolution Quality Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Resolution Multiplier */}
          <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">
            <span className="text-[10px] text-slate-400 font-bold">एक्सपोर्ट क्वालिटी:</span>
            <select
              value={exportResolutionScale}
              onChange={(e) => setExportResolutionScale(Number(e.target.value))}
              className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
              title="डाउनलोड हुने PNG/JPEG को रिजोल्युसन"
            >
              <option value="1" className="bg-slate-900">1x (साधारण)</option>
              <option value="2" className="bg-slate-900">2x (उच्च - 2K HD)</option>
              <option value="3" className="bg-slate-900">3x (अति-उच्च - 3K Flex)</option>
            </select>
          </div>

          {/* Fit to Screen toggle */}
          <button
            onClick={() => onUpdateSettings({ fitToScreen: !settings.fitToScreen })}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1 ${
              settings.fitToScreen
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="पर्दामा ट्याक्क मिल्ने गरी मिलाउनुहोस्"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>पर्दामा मिलाउनुहोस्</span>
          </button>
        </div>
      </div>
    </div>
  );
};
