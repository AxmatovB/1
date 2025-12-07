'use client';

import { motion } from 'framer-motion';
import { getTranslation, type Language } from '@/lib/i18n';
import { useState, useEffect } from 'react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: 'dark' | 'light';
  onThemeChange: (theme: 'dark' | 'light') => void;
  lastUpdated: Date | null;
  onRefresh: () => void;
}

export default function Header({
  language,
  onLanguageChange,
  theme,
  onThemeChange,
  lastUpdated,
  onRefresh,
}: HeaderProps) {
  const t = getTranslation(language);
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    setMounted(true);
    // Real-time clock update every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date | null): string => {
    if (!date) return '--:--:--';
    return new Intl.DateTimeFormat(language === 'uz' ? 'en-US' : language, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return new Intl.DateTimeFormat(language === 'uz' ? 'en-US' : language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  if (!mounted) {
    return (
      <header className="w-full p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-16" />
        </div>
      </header>
    );
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full p-4 md:p-6 sticky top-0 z-50 ${
        theme === 'dark'
          ? 'bg-white/5 backdrop-blur-xl border-b border-white/10'
          : 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col min-w-0">
            <motion.h1
              className={`text-2xl md:text-3xl font-bold truncate ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'
              }`}
            >
              {t.appName}
            </motion.h1>
            <p
              className={`text-sm md:text-base mt-1 truncate ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {t.subtitle}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 flex-shrink-0">
            <div className="flex flex-col items-start md:items-end">
              <div
                className={`text-xs md:text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <span className="font-medium">{t.lastUpdated}</span>{' '}
                <span className="font-mono">{formatTime(lastUpdated)}</span>
              </div>
              {lastUpdated && (
                <div
                  className={`text-xs mt-1 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                  }`}
                >
                  {formatDate(lastUpdated)}
                </div>
              )}
              <div
                className={`text-xs mt-1 font-mono ${
                  theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'
                }`}
              >
                {formatTime(currentTime)}
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRefresh}
                className={`px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  theme === 'dark'
                    ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30'
                    : 'bg-blue-500/20 text-blue-600 hover:bg-blue-500/30 border border-blue-500/30'
                }`}
              >
                {t.refresh}
              </motion.button>

              <div className="flex items-center gap-2">
                <select
                  value={language}
                  onChange={(e) => onLanguageChange(e.target.value as Language)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    theme === 'dark'
                      ? 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                      : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <option value="en">EN</option>
                  <option value="ru">RU</option>
                  <option value="uz">UZ</option>
                </select>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
                  className={`px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    theme === 'dark'
                      ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/30'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300'
                  }`}
                >
                  {theme === 'dark' ? t.themeLight : t.themeDark}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
