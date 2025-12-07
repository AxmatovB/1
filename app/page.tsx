'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import useSWR from 'swr';
import { CurrencyPair, getStoredPinnedPairs, setStoredPinnedPairs, pairKey, DEFAULT_PINNED_PAIRS } from '@/lib/currency';
import { fetchExchangeRates, computeAllPairs } from '@/lib/api';
import { getStoredLanguage, setStoredLanguage, getTranslation, type Language } from '@/lib/i18n';
import Header from '@/components/Header';
import PinnedSection from '@/components/PinnedSection';
import PairSelector from '@/components/PairSelector';
import PairCard from '@/components/PairCard';
import ConverterPanel from '@/components/ConverterPanel';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [pinnedPairs, setPinnedPairs] = useState<CurrencyPair[]>([]);
  const [allPairs, setAllPairs] = useState<CurrencyPair[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    const storedLang = getStoredLanguage();
    const storedTheme = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    const storedPinned = getStoredPinnedPairs();

    setLanguage(storedLang);
    setTheme(storedTheme);
    setPinnedPairs(storedPinned.length > 0 ? storedPinned : DEFAULT_PINNED_PAIRS);
    setIsInitialized(true);

    // Apply theme to document
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    document.documentElement.classList.toggle('light', storedTheme === 'light');
  }, []);

  // Fetch exchange rates with optimized settings
  const { data: rates, error, mutate, isLoading } = useSWR(
    isInitialized ? 'exchange-rates' : null,
    fetchExchangeRates,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 3000,
      dedupingInterval: 10000, // Dedupe requests within 10 seconds
    }
  );

  // Update pairs when rates change (optimized with useMemo)
  useEffect(() => {
    if (rates && Object.keys(rates).length > 0) {
      const computed = computeAllPairs(rates);
      setAllPairs(computed);
      setLastUpdated(new Date());

      // Update rates in pinned pairs, preserving all pinned pairs
      setPinnedPairs((prev) => {
        if (prev.length === 0) {
          // If no pinned pairs, use default
          return DEFAULT_PINNED_PAIRS.map((pair) => {
            const found = computed.find(
              (p) => p.base === pair.base && p.quote === pair.quote
            );
            return found || { ...pair, rate: 0 };
          });
        }
        // Update existing pinned pairs with new rates
        return prev.map((pair) => {
          const found = computed.find(
            (p) => p.base === pair.base && p.quote === pair.quote
          );
          return found || { ...pair, rate: pair.rate || 0 };
        });
      });
    }
  }, [rates]);

  // Save pinned pairs to localStorage (debounced)
  useEffect(() => {
    if (pinnedPairs.length > 0 && isInitialized) {
      const timeoutId = setTimeout(() => {
        setStoredPinnedPairs(pinnedPairs);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [pinnedPairs, isInitialized]);

  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang);
    setStoredLanguage(lang);
  }, []);

  const handleThemeChange = useCallback((newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    document.documentElement.classList.toggle('light', newTheme === 'light');
  }, []);

  const handleRefresh = useCallback(() => {
    mutate();
  }, [mutate]);

  const handlePin = useCallback((pair: CurrencyPair) => {
    setPinnedPairs((prev) => {
      const exists = prev.some(
        (p) => p.base === pair.base && p.quote === pair.quote
      );
      if (exists) return prev;
      return [...prev, pair];
    });
  }, []);

  const handleUnpin = useCallback((pair: CurrencyPair) => {
    setPinnedPairs((prev) =>
      prev.filter((p) => !(p.base === pair.base && p.quote === pair.quote))
    );
  }, []);

  const handleAddPair = useCallback((pair: CurrencyPair) => {
    handlePin(pair);
  }, [handlePin]);

  // Memoize pinned pairs with rates
  const pinnedPairsWithRates = useMemo(() => {
    return pinnedPairs.map((pinned) => {
      const found = allPairs.find(
        (p) => p.base === pinned.base && p.quote === pinned.quote
      );
      return found || pinned;
    });
  }, [pinnedPairs, allPairs]);

  // Memoize unpinned pairs
  const unpinnedPairs = useMemo(() => {
    const pinnedKeys = new Set(pinnedPairs.map(p => pairKey(p)));
    return allPairs.filter((pair) => !pinnedKeys.has(pairKey(pair)));
  }, [allPairs, pinnedPairs]);

  const t = getTranslation(language);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'dark' : 'light'
      }`}
    >
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        theme={theme}
        onThemeChange={handleThemeChange}
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
      />

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <PinnedSection
          pinnedPairs={pinnedPairsWithRates}
          language={language}
          theme={theme}
          onUnpin={handleUnpin}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 min-w-0">
            <PairSelector
              language={language}
              theme={theme}
              onAddPair={handleAddPair}
              existingPairs={pinnedPairs}
            />

            <h2
              className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {t.allPairs}
            </h2>

            {isLoading && (
              <div
                className={`rounded-xl p-4 mb-6 ${
                  theme === 'dark'
                    ? 'bg-white/5 text-cyan-400 border border-cyan-500/30'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent"></div>
                  <span className="font-medium">{t.loading}</span>
                </div>
              </div>
            )}

            {error && (
              <div
                className={`rounded-xl p-4 mb-6 ${
                  theme === 'dark'
                    ? 'bg-red-500/20 text-red-200 border-2 border-red-500/50'
                    : 'bg-red-50 text-red-800 border-2 border-red-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1">
                    <div className="font-semibold mb-1">{t.errorTitle}</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-red-300/90' : 'text-red-700/90'}`}>
                      {t.errorMessage}
                    </div>
                    <button
                      onClick={handleRefresh}
                      className={`mt-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        theme === 'dark'
                          ? 'bg-red-500/30 text-red-100 hover:bg-red-500/40 border border-red-500/50'
                          : 'bg-red-100 text-red-800 hover:bg-red-200 border border-red-300'
                      }`}
                    >
                      {t.retry}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!error && !isLoading && unpinnedPairs.length === 0 && allPairs.length > 0 && (
              <div
                className={`rounded-xl p-4 ${
                  theme === 'dark'
                    ? 'bg-white/5 text-gray-300 border border-white/10'
                    : 'bg-gray-50 text-gray-700 border border-gray-200'
                }`}
              >
                {t.allPinned}
              </div>
            )}

            {!error && !isLoading && unpinnedPairs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {unpinnedPairs.map((pair, index) => (
                  <PairCard
                    key={pairKey(pair)}
                    pair={pair}
                    language={language}
                    theme={theme}
                    isPinned={false}
                    onPinToggle={() => handlePin(pair)}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1 min-w-0">
            <ConverterPanel
              language={language}
              theme={theme}
              allPairs={allPairs}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
