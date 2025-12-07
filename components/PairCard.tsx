'use client';

import { motion } from 'framer-motion';
import { CurrencyPair } from '@/lib/currency';
import { CURRENCY_NAMES } from '@/lib/currency';
import { getTranslation, type Language } from '@/lib/i18n';

interface PairCardProps {
  pair: CurrencyPair;
  language: Language;
  theme: 'dark' | 'light';
  isPinned: boolean;
  onPinToggle: () => void;
  index?: number;
}

export default function PairCard({
  pair,
  language,
  theme,
  isPinned,
  onPinToggle,
  index = 0,
}: PairCardProps) {
  const t = getTranslation(language);
  const baseName = CURRENCY_NAMES[pair.base]?.[language] || pair.base;
  const quoteName = CURRENCY_NAMES[pair.quote]?.[language] || pair.quote;

  const formatRate = (rate: number): string => {
    if (!rate || rate === 0 || !isFinite(rate) || isNaN(rate)) {
      return '0.00000000';
    }
    
    if (rate >= 1) {
      return rate.toFixed(4);
    } else if (rate >= 0.01) {
      return rate.toFixed(6);
    } else if (rate >= 0.0001) {
      return rate.toFixed(8);
    } else {
      return rate.toFixed(10);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className={`relative rounded-xl p-4 md:p-6 transition-all duration-300 overflow-hidden ${
        theme === 'dark'
          ? 'bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20'
          : 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-200/50'
      }`}
    >
      <div className="flex items-start justify-between mb-3 min-w-0">
        <div className="flex flex-col min-w-0 flex-1">
          <div
            className={`text-lg md:text-xl font-bold truncate ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'
            }`}
          >
            {pair.base}/{pair.quote}
          </div>
          <div
            className={`text-xs md:text-sm mt-1 truncate ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {baseName} → {quoteName}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onPinToggle}
          className={`p-2 rounded-lg transition-all flex-shrink-0 ml-2 ${
            theme === 'dark'
              ? isPinned
                ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-purple-400'
              : isPinned
              ? 'bg-blue-500/20 text-blue-600 hover:bg-blue-500/30'
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-blue-600'
          }`}
          title={isPinned ? t.unpin : t.pin}
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill={isPinned ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </motion.button>
      </div>

      <div
        className={`text-2xl md:text-3xl font-bold font-mono mt-4 break-all ${
          theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'
        }`}
      >
        {formatRate(pair.rate)}
      </div>
    </motion.div>
  );
}
