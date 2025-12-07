import { Currency, CurrencyPair, ALL_CURRENCIES, FIAT_CURRENCIES, CRYPTO_CURRENCIES, METAL_CURRENCIES } from './currency';

export interface ExchangeRatesResponse {
  rates: Record<string, number>;
  base: string;
  date: string;
}

// Optimized API endpoints
const FIAT_API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';
const FIAT_API_FALLBACK = 'https://api.exchangerate.host/latest?base=USD';
const CRYPTO_API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana,ripple,cardano,dogecoin,polkadot,matic-network,avalanche-2,chainlink,uniswap,litecoin,cosmos,ethereum-classic,stellar,algorand,vechain,filecoin,tron,eos,aave,maker,compound,yearn-finance,sushiswap,synthetix-network-token,curve-dao-token,1inch,basic-attention-token,0x,enjincoin,decentraland,the-sandbox,axie-infinity,gala,chiliz,flow,internet-computer,near,fantom,hedera,elrond,zilliqa,iota,theta,tezos,waves,neo,ontology,qtum,zcash,dash,monero&vs_currencies=usd';

// Crypto mapping
const CRYPTO_MAPPING: Record<string, Currency> = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  binancecoin: 'BNB',
  solana: 'SOL',
  ripple: 'XRP',
  cardano: 'ADA',
  dogecoin: 'DOGE',
  polkadot: 'DOT',
  'matic-network': 'MATIC',
  'avalanche-2': 'AVAX',
  chainlink: 'LINK',
  uniswap: 'UNI',
  litecoin: 'LTC',
  cosmos: 'ATOM',
  'ethereum-classic': 'ETC',
  stellar: 'XLM',
  algorand: 'ALGO',
  vechain: 'VET',
  filecoin: 'FIL',
  tron: 'TRX',
  eos: 'EOS',
  aave: 'AAVE',
  maker: 'MKR',
  compound: 'COMP',
  'yearn-finance': 'YFI',
  sushiswap: 'SUSHI',
  'synthetix-network-token': 'SNX',
  'curve-dao-token': 'CRV',
  '1inch': '1INCH',
  'basic-attention-token': 'BAT',
  '0x': 'ZRX',
  enjincoin: 'ENJ',
  decentraland: 'MANA',
  'the-sandbox': 'SAND',
  'axie-infinity': 'AXS',
  gala: 'GALA',
  chiliz: 'CHZ',
  flow: 'FLOW',
  'internet-computer': 'ICP',
  near: 'NEAR',
  fantom: 'FTM',
  hedera: 'HBAR',
  elrond: 'EGLD',
  zilliqa: 'ZIL',
  iota: 'IOTA',
  theta: 'THETA',
  tezos: 'XTZ',
  waves: 'WAVES',
  neo: 'NEO',
  ontology: 'ONT',
  qtum: 'QTUM',
  zcash: 'ZEC',
  dash: 'DASH',
  monero: 'XMR',
};

// Cache for rates
let ratesCache: Record<Currency, number> | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 30000; // 30 seconds cache

// Fetch fiat exchange rates (optimized)
const fetchFiatRates = async (): Promise<Record<Currency, number>> => {
  const rates: Partial<Record<Currency, number>> = { USD: 1 };
  
  // Try primary API with timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(FIAT_API_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data = await response.json();
      if (data?.rates && typeof data.rates === 'object') {
        FIAT_CURRENCIES.forEach(currency => {
          if (currency !== 'USD' && data.rates[currency]) {
            const rate = data.rates[currency];
            if (typeof rate === 'number' && rate > 0) {
              rates[currency] = rate;
            }
          }
        });
        
        if (Object.keys(rates).length > 10) {
          return rates as Record<Currency, number>;
        }
      }
    }
  } catch (error) {
    console.warn('Primary fiat API failed:', error);
  }
  
  // Fallback with timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(FIAT_API_FALLBACK, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data: ExchangeRatesResponse = await response.json();
      if (data?.rates && typeof data.rates === 'object') {
        FIAT_CURRENCIES.forEach(currency => {
          if (currency !== 'USD' && data.rates[currency]) {
            const rate = data.rates[currency];
            if (typeof rate === 'number' && rate > 0) {
              rates[currency] = rate;
            }
          }
        });
      }
    }
  } catch (error) {
    console.warn('Fallback fiat API failed:', error);
  }
  
  return rates as Record<Currency, number>;
};

// Fetch cryptocurrency rates (optimized)
const fetchCryptoRates = async (): Promise<Record<Currency, number>> => {
  const rates: Partial<Record<Currency, number>> = {};
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const response = await fetch(CRYPTO_API_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data = await response.json();
      if (data && typeof data === 'object') {
        Object.keys(data).forEach(key => {
          const currency = CRYPTO_MAPPING[key];
          if (currency && data[key]?.usd) {
            const rate = data[key].usd;
            if (typeof rate === 'number' && rate > 0) {
              rates[currency] = rate;
            }
          }
        });
      }
    }
  } catch (error) {
    console.warn('Crypto API failed:', error);
  }
  
  return rates as Record<Currency, number>;
};

// Fetch precious metals rates (optimized)
const fetchMetalRates = async (): Promise<Record<Currency, number>> => {
  const rates: Partial<Record<Currency, number>> = {};
  
  // Use fallback rates immediately for speed
  rates.XAU = 2000; // Gold ~2000 USD/oz
  rates.XAG = 25;   // Silver ~25 USD/oz
  rates.XPT = 1000; // Platinum ~1000 USD/oz
  rates.XPD = 2000; // Palladium ~2000 USD/oz
  
  // Try to fetch real rates in background (non-blocking)
  fetch('https://api.metals.live/v1/spot', {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return null;
    })
    .then(data => {
      if (data) {
        if (data.gold) rates.XAU = data.gold;
        if (data.silver) rates.XAG = data.silver;
        if (data.platinum) rates.XPT = data.platinum;
        if (data.palladium) rates.XPD = data.palladium;
      }
    })
    .catch(() => {
      // Silently fail, using fallback rates
    });
  
  return rates as Record<Currency, number>;
};

// Main function to fetch all exchange rates (optimized)
export const fetchExchangeRates = async (): Promise<Record<Currency, number>> => {
  // Check cache first
  const now = Date.now();
  if (ratesCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return ratesCache;
  }
  
  try {
    // Fetch all rates in parallel with Promise.allSettled for better error handling
    const [fiatResult, cryptoResult, metalResult] = await Promise.allSettled([
      fetchFiatRates(),
      fetchCryptoRates(),
      fetchMetalRates(),
    ]);
    
    // Combine all rates
    const allRates: Record<Currency, number> = {
      USD: 1,
    };
    
    if (fiatResult.status === 'fulfilled') {
      Object.assign(allRates, fiatResult.value);
    }
    
    if (cryptoResult.status === 'fulfilled') {
      Object.assign(allRates, cryptoResult.value);
    }
    
    if (metalResult.status === 'fulfilled') {
      Object.assign(allRates, metalResult.value);
    }
    
    // Update cache
    ratesCache = allRates;
    cacheTimestamp = now;
    
    return allRates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    // Return cache if available, otherwise throw
    if (ratesCache) {
      return ratesCache;
    }
    throw error;
  }
};

export const computeAllPairs = (rates: Record<Currency, number>): CurrencyPair[] => {
  const pairs: CurrencyPair[] = [];
  const currencies = Object.keys(rates).filter(c => rates[c as Currency] > 0) as Currency[];
  
  // Optimize: only compute pairs for currencies that have rates
  currencies.forEach(base => {
    currencies.forEach(quote => {
      if (base !== quote && rates[base] && rates[quote] && rates[base] > 0 && rates[quote] > 0) {
        let rate: number;
        if (base === 'USD') {
          rate = rates[quote];
        } else if (quote === 'USD') {
          rate = 1 / rates[base];
        } else {
          rate = rates[quote] / rates[base];
        }
        
        // Only add valid rates
        if (rate > 0 && isFinite(rate) && !isNaN(rate)) {
          pairs.push({ base, quote, rate });
        }
      }
    });
  });
  
  return pairs;
};

export const getPairRate = (
  pairs: CurrencyPair[],
  base: Currency,
  quote: Currency
): number | null => {
  const pair = pairs.find(p => p.base === base && p.quote === quote);
  return pair ? pair.rate : null;
};
