'use client';

import { motion } from 'framer-motion';
import { Currency, ALL_CURRENCIES, FIAT_CURRENCIES, CRYPTO_CURRENCIES, METAL_CURRENCIES, CurrencyPair } from '@/lib/currency';
import { CURRENCY_NAMES } from '@/lib/currency';
import { getTranslation, type Language } from '@/lib/i18n';
import { useState } from 'react';

interface PairSelectorProps {
  language: Language;
  theme: 'dark' | 'light';
  onAddPair: (pair: CurrencyPair) => void;
  existingPairs: CurrencyPair[];
}

export default function PairSelector({
  language,
  theme,
  onAddPair,
  existingPairs,
}: PairSelectorProps) {
  const t = getTranslation(language);
  const [fromCurrency, setFromCurrency] = useState<Currency>('USD');
  const [toCurrency, setToCurrency] = useState<Currency>('UZS');

  const handleAdd = () => {
    if (fromCurrency === toCurrency) {
      return;
    }

    const pairExists = existingPairs.some(
      (p) => p.base === fromCurrency && p.quote === toCurrency
    );

    if (!pairExists) {
      onAddPair({ base: fromCurrency, quote: toCurrency, rate: 0 });
    }
  };

  const pairExists = existingPairs.some(
    (p) => p.base === fromCurrency && p.quote === toCurrency
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl p-4 md:p-6 mb-6 ${
        theme === 'dark'
          ? 'bg-white/5 backdrop-blur-xl border border-white/10'
          : 'bg-white border border-gray-200 shadow-sm'
      }`}
    >
      <h3
        className={`text-lg md:text-xl font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}
      >
        {t.addToDashboard}
      </h3>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label
            className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {t.fromCurrency}
          </label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value as Currency)}
            className={`w-full px-4 py-2 rounded-lg transition-all ${
              theme === 'dark'
                ? 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <optgroup label={language === 'uz' ? 'Fiat valyutalar' : language === 'ru' ? 'Фиатные валюты' : 'Fiat Currencies'}>
              {FIAT_CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency} - {CURRENCY_NAMES[currency][language]}
                </option>
              ))}
            </optgroup>
            <optgroup label={language === 'uz' ? 'Kriptovalyutalar' : language === 'ru' ? 'Криптовалюты' : 'Cryptocurrencies'}>
              {CRYPTO_CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency} - {CURRENCY_NAMES[currency][language]}
                </option>
              ))}
            </optgroup>
            <optgroup label={language === 'uz' ? 'Qimmatbaho metallar' : language === 'ru' ? 'Драгоценные металлы' : 'Precious Metals'}>
              {METAL_CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency} - {CURRENCY_NAMES[currency][language]}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
        <div className="flex-1">
          <label
            className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {t.toCurrency}
          </label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value as Currency)}
            className={`w-full px-4 py-2 rounded-lg transition-all ${
              theme === 'dark'
                ? 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <optgroup label={language === 'uz' ? 'Fiat valyutalar' : language === 'ru' ? 'Фиатные валюты' : 'Fiat Currencies'}>
              {FIAT_CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency} - {CURRENCY_NAMES[currency][language]}
                </option>
              ))}
            </optgroup>
            <optgroup label={language === 'uz' ? 'Kriptovalyutalar' : language === 'ru' ? 'Криптовалюты' : 'Cryptocurrencies'}>
              {CRYPTO_CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency} - {CURRENCY_NAMES[currency][language]}
                </option>
              ))}
            </optgroup>
            <optgroup label={language === 'uz' ? 'Qimmatbaho metallar' : language === 'ru' ? 'Драгоценные металлы' : 'Precious Metals'}>
              {METAL_CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency} - {CURRENCY_NAMES[currency][language]}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
        <div className="flex items-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            disabled={fromCurrency === toCurrency || pairExists}
            className={`px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600'
                : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
            }`}
          >
            {t.addToDashboard}
          </motion.button>
        </div>
      </div>
      {(fromCurrency === toCurrency || pairExists) && (
        <p
          className={`text-sm mt-2 font-medium ${
            theme === 'dark' ? 'text-red-300' : 'text-red-700'
          }`}
        >
          {fromCurrency === toCurrency
            ? t.cannotSelectSame
            : t.pairExists}
        </p>
      )}
    </motion.div>
  );
}

