import React from 'react';
import { CORE_PSEA_MESSAGES, toNepaliNumber } from '../data/pseaData';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface KeyMessagesBannerProps {
  layout?: 'grid' | 'horizontal' | 'compact';
}

export const KeyMessagesBanner: React.FC<KeyMessagesBannerProps> = ({
  layout = 'grid',
}) => {
  return (
    <div className="bg-white border-2 border-emerald-300 rounded-xl p-3 sm:p-4 shadow-xs avoid-break">
      <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-emerald-100">
        <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-emerald-900 leading-tight">
            मुख्य PSEA सुरक्षा सन्देशहरू (Key Protection Messages)
          </h3>
          <p className="text-xs text-emerald-700">
            सबै बालबालिका तथा समुदायका सदस्यहरूले सम्झनुपर्ने अनिवार्य नियमहरू
          </p>
        </div>
      </div>

      <div
        className={`grid gap-2 ${
          layout === 'compact'
            ? 'grid-cols-1 sm:grid-cols-2 text-xs'
            : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 text-xs sm:text-sm'
        }`}
      >
        {CORE_PSEA_MESSAGES.map((msg, index) => (
          <div
            key={index}
            className="flex items-start gap-2 p-1.5 sm:p-2 rounded-lg bg-emerald-50/70 border border-emerald-200/80 text-emerald-950 font-medium leading-snug"
          >
            <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
              {toNepaliNumber(index + 1)}
            </span>
            <span>{msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
