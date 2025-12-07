'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CurrencyPair } from '@/lib/currency';
import { getTranslation, type Language } from '@/lib/i18n';
import PairCard from './PairCard';

interface PinnedSectionProps {
  pinnedPairs: CurrencyPair[];
  language: Language;
  theme: 'dark' | 'light';
  onUnpin: (pair: CurrencyPair) => void;
}

export default function PinnedSection({
  pinnedPairs,
  language,
  theme,
  onUnpin,
}: PinnedSectionProps) {
  const t = getTranslation(language);

  if (pinnedPairs.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-4 md:p-6"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          {t.pinnedPairs}
        </h2>
        <div className="overflow-x-auto pb-4 -mx-4 md:mx-0">
          <div className="flex gap-4 md:gap-6 px-4 md:px-0 min-w-max md:min-w-0 md:grid md:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {pinnedPairs.map((pair, index) => (
                <motion.div
                  key={`${pair.base}/${pair.quote}`}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="min-w-[280px] md:min-w-0 flex-shrink-0"
                >
                  <PairCard
                    pair={pair}
                    language={language}
                    theme={theme}
                    isPinned={true}
                    onPinToggle={() => onUnpin(pair)}
                    index={index}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
