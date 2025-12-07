// Fiat currencies
export type FiatCurrency = 'USD' | 'UZS' | 'RUB' | 'EUR' | 'TRY' | 'KZT' | 'GBP' | 'JPY' | 'CNY' | 'INR' | 'KRW' | 'AED' | 'SAR' | 'IDR' | 'THB' | 'VND' | 'MYR' | 'SGD' | 'PHP' | 'BRL' | 'MXN' | 'CAD' | 'AUD' | 'NZD' | 'CHF' | 'SEK' | 'NOK' | 'DKK' | 'PLN' | 'CZK' | 'HUF' | 'RON' | 'BGN' | 'HRK' | 'RSD' | 'BAM' | 'MKD' | 'ALL' | 'ISK' | 'MDL' | 'UAH' | 'BYN' | 'GEL' | 'AMD' | 'AZN' | 'TMT' | 'TJS' | 'KGS' | 'MNT';

// Cryptocurrencies
export type CryptoCurrency = 'BTC' | 'ETH' | 'BNB' | 'SOL' | 'XRP' | 'ADA' | 'DOGE' | 'DOT' | 'MATIC' | 'AVAX' | 'LINK' | 'UNI' | 'LTC' | 'ATOM' | 'ETC' | 'XLM' | 'ALGO' | 'VET' | 'FIL' | 'TRX' | 'EOS' | 'AAVE' | 'MKR' | 'COMP' | 'YFI' | 'SUSHI' | 'SNX' | 'CRV' | '1INCH' | 'BAT' | 'ZRX' | 'ENJ' | 'MANA' | 'SAND' | 'AXS' | 'GALA' | 'CHZ' | 'FLOW' | 'ICP' | 'NEAR' | 'FTM' | 'HBAR' | 'EGLD' | 'ZIL' | 'IOTA' | 'THETA' | 'XTZ' | 'WAVES' | 'NEO' | 'ONT' | 'QTUM' | 'ZEC' | 'DASH' | 'XMR';

// Precious metals
export type MetalCurrency = 'XAU' | 'XAG' | 'XPT' | 'XPD';

// All currencies
export type Currency = FiatCurrency | CryptoCurrency | MetalCurrency;

export interface CurrencyPair {
  base: Currency;
  quote: Currency;
  rate: number;
}

// Popular fiat currencies
export const FIAT_CURRENCIES: FiatCurrency[] = [
  'USD', 'EUR', 'GBP', 'JPY', 'CNY', 'RUB', 'UZS', 'KZT', 'TRY', 
  'INR', 'KRW', 'AED', 'SAR', 'IDR', 'THB', 'VND', 'MYR', 'SGD', 
  'PHP', 'BRL', 'MXN', 'CAD', 'AUD', 'NZD', 'CHF', 'SEK', 'NOK', 
  'DKK', 'PLN', 'CZK', 'HUF', 'RON', 'BGN', 'UAH', 'BYN', 'GEL'
];

// Popular cryptocurrencies
export const CRYPTO_CURRENCIES: CryptoCurrency[] = [
  'BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'ADA', 'DOGE', 'DOT', 'MATIC', 
  'AVAX', 'LINK', 'UNI', 'LTC', 'ATOM', 'ETC', 'XLM', 'ALGO', 'VET', 
  'FIL', 'TRX', 'EOS', 'AAVE', 'MKR', 'COMP', 'YFI', 'SUSHI', 'SNX', 
  'CRV', 'BAT', 'ZRX', 'ENJ', 'MANA', 'SAND', 'AXS', 'GALA', 'CHZ', 
  'ICP', 'NEAR', 'FTM', 'HBAR', 'EGLD', 'ZIL', 'IOTA', 'THETA', 'XTZ', 
  'WAVES', 'NEO', 'ZEC', 'DASH', 'XMR'
];

// Precious metals
export const METAL_CURRENCIES: MetalCurrency[] = ['XAU', 'XAG', 'XPT', 'XPD'];

// All currencies combined
export const ALL_CURRENCIES: Currency[] = [...FIAT_CURRENCIES, ...CRYPTO_CURRENCIES, ...METAL_CURRENCIES];

// Currency names in multiple languages
export const CURRENCY_NAMES: Record<Currency, { en: string; ru: string; uz: string }> = {
  // Fiat
  USD: { en: 'US Dollar', ru: 'Доллар США', uz: 'AQSH dollari' },
  UZS: { en: 'Uzbekistani Som', ru: 'Узбекский сум', uz: 'O\'zbek so\'mi' },
  RUB: { en: 'Russian Ruble', ru: 'Российский рубль', uz: 'Rossiya rubli' },
  EUR: { en: 'Euro', ru: 'Евро', uz: 'Yevro' },
  TRY: { en: 'Turkish Lira', ru: 'Турецкая лира', uz: 'Turk lirasi' },
  KZT: { en: 'Kazakhstani Tenge', ru: 'Казахстанский тенге', uz: 'Qozoq tengesi' },
  GBP: { en: 'British Pound', ru: 'Британский фунт', uz: 'Britaniya funti' },
  JPY: { en: 'Japanese Yen', ru: 'Японская иена', uz: 'Yapon iyenasi' },
  CNY: { en: 'Chinese Yuan', ru: 'Китайский юань', uz: 'Xitoy yuani' },
  INR: { en: 'Indian Rupee', ru: 'Индийская рупия', uz: 'Hind rupiyasi' },
  KRW: { en: 'South Korean Won', ru: 'Южнокорейская вона', uz: 'Janubiy Koreya vonasi' },
  AED: { en: 'UAE Dirham', ru: 'Дирхам ОАЭ', uz: 'BAA dirhami' },
  SAR: { en: 'Saudi Riyal', ru: 'Саудовский риал', uz: 'Saudiya riyali' },
  IDR: { en: 'Indonesian Rupiah', ru: 'Индонезийская рупия', uz: 'Indoneziya rupiyasi' },
  THB: { en: 'Thai Baht', ru: 'Тайский бат', uz: 'Tay bat' },
  VND: { en: 'Vietnamese Dong', ru: 'Вьетнамский донг', uz: 'Vyetnam dongi' },
  MYR: { en: 'Malaysian Ringgit', ru: 'Малайзийский ринггит', uz: 'Malayziya ringgiti' },
  SGD: { en: 'Singapore Dollar', ru: 'Сингапурский доллар', uz: 'Singapur dollari' },
  PHP: { en: 'Philippine Peso', ru: 'Филиппинское песо', uz: 'Filippin pesosi' },
  BRL: { en: 'Brazilian Real', ru: 'Бразильский реал', uz: 'Braziliya reali' },
  MXN: { en: 'Mexican Peso', ru: 'Мексиканское песо', uz: 'Meksika pesosi' },
  CAD: { en: 'Canadian Dollar', ru: 'Канадский доллар', uz: 'Kanada dollari' },
  AUD: { en: 'Australian Dollar', ru: 'Австралийский доллар', uz: 'Avstraliya dollari' },
  NZD: { en: 'New Zealand Dollar', ru: 'Новозеландский доллар', uz: 'Yangi Zelandiya dollari' },
  CHF: { en: 'Swiss Franc', ru: 'Швейцарский франк', uz: 'Shveytsariya franki' },
  SEK: { en: 'Swedish Krona', ru: 'Шведская крона', uz: 'Shvetsiya kronasi' },
  NOK: { en: 'Norwegian Krone', ru: 'Норвежская крона', uz: 'Norvegiya kronasi' },
  DKK: { en: 'Danish Krone', ru: 'Датская крона', uz: 'Daniya kronasi' },
  PLN: { en: 'Polish Zloty', ru: 'Польский злотый', uz: 'Polsha zlotiyi' },
  CZK: { en: 'Czech Koruna', ru: 'Чешская крона', uz: 'Chexiya kronasi' },
  HUF: { en: 'Hungarian Forint', ru: 'Венгерский форинт', uz: 'Vengriya forinti' },
  RON: { en: 'Romanian Leu', ru: 'Румынский лей', uz: 'Ruminiya leyi' },
  BGN: { en: 'Bulgarian Lev', ru: 'Болгарский лев', uz: 'Bolgariya levi' },
  UAH: { en: 'Ukrainian Hryvnia', ru: 'Украинская гривна', uz: 'Ukraina grivnasi' },
  BYN: { en: 'Belarusian Ruble', ru: 'Белорусский рубль', uz: 'Belarus rubli' },
  GEL: { en: 'Georgian Lari', ru: 'Грузинский лари', uz: 'Gruziya lari' },
  HRK: { en: 'Croatian Kuna', ru: 'Хорватская куна', uz: 'Xorvatiya kunasi' },
  RSD: { en: 'Serbian Dinar', ru: 'Сербский динар', uz: 'Serbiya dinari' },
  BAM: { en: 'Bosnia-Herzegovina Mark', ru: 'Конвертируемая марка', uz: 'Bosniya markasi' },
  MKD: { en: 'Macedonian Denar', ru: 'Македонский денар', uz: 'Makedoniya denari' },
  ALL: { en: 'Albanian Lek', ru: 'Албанский лек', uz: 'Albaniya leki' },
  ISK: { en: 'Icelandic Krona', ru: 'Исландская крона', uz: 'Islandiya kronasi' },
  MDL: { en: 'Moldovan Leu', ru: 'Молдавский лей', uz: 'Moldova leyi' },
  AMD: { en: 'Armenian Dram', ru: 'Армянский драм', uz: 'Arman drami' },
  AZN: { en: 'Azerbaijani Manat', ru: 'Азербайджанский манат', uz: 'Ozarbayjon manati' },
  TMT: { en: 'Turkmenistani Manat', ru: 'Туркменский манат', uz: 'Turkman manati' },
  TJS: { en: 'Tajikistani Somoni', ru: 'Таджикский сомони', uz: 'Tojik somoniyi' },
  KGS: { en: 'Kyrgystani Som', ru: 'Киргизский сом', uz: 'Qirg\'iz somi' },
  MNT: { en: 'Mongolian Tugrik', ru: 'Монгольский тугрик', uz: 'Mongoliya tugrigi' },
  
  // Crypto
  BTC: { en: 'Bitcoin', ru: 'Биткоин', uz: 'Bitcoin' },
  ETH: { en: 'Ethereum', ru: 'Эфириум', uz: 'Ethereum' },
  BNB: { en: 'Binance Coin', ru: 'Binance Coin', uz: 'Binance Coin' },
  SOL: { en: 'Solana', ru: 'Солана', uz: 'Solana' },
  XRP: { en: 'Ripple', ru: 'Рипл', uz: 'Ripple' },
  ADA: { en: 'Cardano', ru: 'Кардано', uz: 'Cardano' },
  DOGE: { en: 'Dogecoin', ru: 'Догикоин', uz: 'Dogecoin' },
  DOT: { en: 'Polkadot', ru: 'Полкадот', uz: 'Polkadot' },
  MATIC: { en: 'Polygon', ru: 'Полигон', uz: 'Polygon' },
  AVAX: { en: 'Avalanche', ru: 'Аваланч', uz: 'Avalanche' },
  LINK: { en: 'Chainlink', ru: 'Чейнлинк', uz: 'Chainlink' },
  UNI: { en: 'Uniswap', ru: 'Юнисвап', uz: 'Uniswap' },
  LTC: { en: 'Litecoin', ru: 'Лайткоин', uz: 'Litecoin' },
  ATOM: { en: 'Cosmos', ru: 'Космос', uz: 'Cosmos' },
  ETC: { en: 'Ethereum Classic', ru: 'Эфириум Классик', uz: 'Ethereum Classic' },
  XLM: { en: 'Stellar', ru: 'Стеллар', uz: 'Stellar' },
  ALGO: { en: 'Algorand', ru: 'Алгоранд', uz: 'Algorand' },
  VET: { en: 'VeChain', ru: 'ВеЧейн', uz: 'VeChain' },
  FIL: { en: 'Filecoin', ru: 'Файлкоин', uz: 'Filecoin' },
  TRX: { en: 'Tron', ru: 'Трон', uz: 'Tron' },
  EOS: { en: 'EOS', ru: 'EOS', uz: 'EOS' },
  AAVE: { en: 'Aave', ru: 'Ааве', uz: 'Aave' },
  MKR: { en: 'Maker', ru: 'Мейкер', uz: 'Maker' },
  COMP: { en: 'Compound', ru: 'Компаунд', uz: 'Compound' },
  YFI: { en: 'Yearn Finance', ru: 'Йирн Финанс', uz: 'Yearn Finance' },
  SUSHI: { en: 'SushiSwap', ru: 'СушиСвап', uz: 'SushiSwap' },
  SNX: { en: 'Synthetix', ru: 'Синтетикс', uz: 'Synthetix' },
  CRV: { en: 'Curve', ru: 'Кривая', uz: 'Curve' },
  '1INCH': { en: '1inch', ru: '1инч', uz: '1inch' },
  BAT: { en: 'Basic Attention Token', ru: 'БАТ', uz: 'BAT' },
  ZRX: { en: '0x', ru: '0x', uz: '0x' },
  ENJ: { en: 'Enjin', ru: 'Энжин', uz: 'Enjin' },
  MANA: { en: 'Decentraland', ru: 'Децентраленд', uz: 'Decentraland' },
  SAND: { en: 'The Sandbox', ru: 'Сэндбокс', uz: 'The Sandbox' },
  AXS: { en: 'Axie Infinity', ru: 'Акси Инфинити', uz: 'Axie Infinity' },
  GALA: { en: 'Gala', ru: 'Гала', uz: 'Gala' },
  CHZ: { en: 'Chiliz', ru: 'Чилиз', uz: 'Chiliz' },
  FLOW: { en: 'Flow', ru: 'Флоу', uz: 'Flow' },
  ICP: { en: 'Internet Computer', ru: 'Интернет Компьютер', uz: 'Internet Computer' },
  NEAR: { en: 'NEAR Protocol', ru: 'НИР Протокол', uz: 'NEAR Protocol' },
  FTM: { en: 'Fantom', ru: 'Фантом', uz: 'Fantom' },
  HBAR: { en: 'Hedera', ru: 'Хедера', uz: 'Hedera' },
  EGLD: { en: 'Elrond', ru: 'Элронд', uz: 'Elrond' },
  ZIL: { en: 'Zilliqa', ru: 'Зиллика', uz: 'Zilliqa' },
  IOTA: { en: 'IOTA', ru: 'ИОТА', uz: 'IOTA' },
  THETA: { en: 'Theta', ru: 'Тета', uz: 'Theta' },
  XTZ: { en: 'Tezos', ru: 'Теzos', uz: 'Tezos' },
  WAVES: { en: 'Waves', ru: 'Вейвс', uz: 'Waves' },
  NEO: { en: 'Neo', ru: 'Нео', uz: 'Neo' },
  ONT: { en: 'Ontology', ru: 'Онтология', uz: 'Ontology' },
  QTUM: { en: 'Qtum', ru: 'Ктум', uz: 'Qtum' },
  ZEC: { en: 'Zcash', ru: 'Зкэш', uz: 'Zcash' },
  DASH: { en: 'Dash', ru: 'Даш', uz: 'Dash' },
  XMR: { en: 'Monero', ru: 'Монеро', uz: 'Monero' },
  
  // Metals
  XAU: { en: 'Gold (oz)', ru: 'Золото (унция)', uz: 'Oltin (unsiya)' },
  XAG: { en: 'Silver (oz)', ru: 'Серебро (унция)', uz: 'Kumush (unsiya)' },
  XPT: { en: 'Platinum (oz)', ru: 'Платина (унция)', uz: 'Platina (unsiya)' },
  XPD: { en: 'Palladium (oz)', ru: 'Палладий (унция)', uz: 'Palladiy (unsiya)' },
};

export const DEFAULT_PINNED_PAIRS: CurrencyPair[] = [
  { base: 'UZS', quote: 'USD', rate: 0 },
  { base: 'USD', quote: 'UZS', rate: 0 },
  { base: 'UZS', quote: 'RUB', rate: 0 },
  { base: 'RUB', quote: 'UZS', rate: 0 },
];

export const pairKey = (pair: CurrencyPair): string => {
  return `${pair.base}/${pair.quote}`;
};

export const parsePairKey = (key: string): CurrencyPair | null => {
  const [base, quote] = key.split('/');
  if (!base || !quote) return null;
  const allCurrencies = ALL_CURRENCIES;
  if (!allCurrencies.includes(base as Currency) || !allCurrencies.includes(quote as Currency)) {
    return null;
  }
  return { base: base as Currency, quote: quote as Currency, rate: 0 };
};

export const getStoredPinnedPairs = (): CurrencyPair[] => {
  if (typeof window === 'undefined') return DEFAULT_PINNED_PAIRS;
  const stored = localStorage.getItem('pinnedPairs');
  if (!stored) return DEFAULT_PINNED_PAIRS;
  try {
    const parsed = JSON.parse(stored) as CurrencyPair[];
    const allCurrencies = ALL_CURRENCIES;
    return parsed.filter(p => allCurrencies.includes(p.base) && allCurrencies.includes(p.quote));
  } catch {
    return DEFAULT_PINNED_PAIRS;
  }
};

export const setStoredPinnedPairs = (pairs: CurrencyPair[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('pinnedPairs', JSON.stringify(pairs));
  }
};

// Helper to get currency category
export const getCurrencyCategory = (currency: Currency): 'fiat' | 'crypto' | 'metal' => {
  if (FIAT_CURRENCIES.includes(currency as FiatCurrency)) return 'fiat';
  if (CRYPTO_CURRENCIES.includes(currency as CryptoCurrency)) return 'crypto';
  if (METAL_CURRENCIES.includes(currency as MetalCurrency)) return 'metal';
  return 'fiat'; // default
};
