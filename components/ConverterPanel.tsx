'use client';

import { motion } from 'framer-motion';
import { Currency, ALL_CURRENCIES, FIAT_CURRENCIES, CRYPTO_CURRENCIES, METAL_CURRENCIES, CurrencyPair } from '@/lib/currency';
import { CURRENCY_NAMES } from '@/lib/currency';
import { getTranslation, type Language } from '@/lib/i18n';
import { useState, useEffect } from 'react';
import { getPairRate } from '@/lib/api';

interface ConverterPanelProps {
  language: Language;
  theme: 'dark' | 'light';
  allPairs: CurrencyPair[];
}

export default function ConverterPanel({
  language,
  theme,
  allPairs,
}: ConverterPanelProps) {
  const t = getTranslation(language);
  const [fromCurrency, setFromCurrency] = useState<Currency>('USD');
  const [toCurrency, setToCurrency] = useState<Currency>('UZS');
  const [amount, setAmount] = useState<string>('1');
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const rate = getPairRate(allPairs, fromCurrency, toCurrency);
    if (rate !== null) {
      const numAmount = parseFloat(amount) || 0;
      setResult(numAmount * rate);
    } else {
      setResult(null);
    }
  }, [fromCurrency, toCurrency, amount, allPairs]);

  const formatResult = (value: number | null): string => {
    if (value === null) return '--';
    if (value >= 1) {
      return value.toFixed(4);
    } else if (value >= 0.01) {
      return value.toFixed(6);
    } else {
      return value.toFixed(8);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl p-4 md:p-6 h-fit ${
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
        {t.converterTitle}
      </h3>

      <div className="space-y-4">
        <div>
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

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {t.amount}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
            className={`w-full px-4 py-2 rounded-lg transition-all font-mono ${
              theme === 'dark'
                ? 'bg-white/5 text-white border border-white/10 hover:bg-white/10 focus:border-cyan-500/50'
                : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 focus:border-blue-500'
            }`}
          />
        </div>

        <div>
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

        <div
          className={`rounded-lg p-4 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30'
              : 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200'
          }`}
        >
          <div
            className={`text-sm font-medium mb-1 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {t.result}
          </div>
          <div
            className={`text-2xl md:text-3xl font-bold font-mono ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'
            }`}
          >
            {formatResult(result)} {toCurrency}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

