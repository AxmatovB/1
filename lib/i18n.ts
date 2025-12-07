export type Language = 'en' | 'ru' | 'uz';

export const translations = {
  en: {
    appName: "UZS FX Monitor",
    subtitle: "Live exchange rates dashboard",
    lastUpdated: "Last updated:",
    refresh: "Refresh",
    themeDark: "Dark",
    themeLight: "Light",
    language: "Language",
    pinnedPairs: "Pinned pairs",
    allPairs: "All currency pairs",
    addToDashboard: "Add to dashboard",
    fromCurrency: "From currency",
    toCurrency: "To currency",
    converterTitle: "Quick converter",
    amount: "Amount",
    result: "Result",
    unpin: "Unpin",
    pin: "Pin",
    loading: "Loading exchange rates...",
    errorTitle: "Failed to load exchange rates",
    errorMessage: "Please check your internet connection and try again.",
    retry: "Retry",
    allPinned: "All pairs are pinned. Unpin some to see them here.",
    cannotSelectSame: "Cannot select same currency",
    pairExists: "Pair already exists",
  },
  ru: {
    appName: "UZS FX Монитор",
    subtitle: "Панель курсов валют в реальном времени",
    lastUpdated: "Последнее обновление:",
    refresh: "Обновить",
    themeDark: "Тёмная",
    themeLight: "Светлая",
    language: "Язык",
    pinnedPairs: "Закрепленные пары",
    allPairs: "Все валютные пары",
    addToDashboard: "Добавить на панель",
    fromCurrency: "Из валюты",
    toCurrency: "В валюту",
    converterTitle: "Быстрый конвертер",
    amount: "Сумма",
    result: "Результат",
    unpin: "Открепить",
    pin: "Закрепить",
    loading: "Загрузка курсов валют...",
    errorTitle: "Не удалось загрузить курсы валют",
    errorMessage: "Пожалуйста, проверьте подключение к интернету и попробуйте снова.",
    retry: "Повторить",
    allPinned: "Все пары закреплены. Открепите некоторые, чтобы увидеть их здесь.",
    cannotSelectSame: "Нельзя выбрать одну и ту же валюту",
    pairExists: "Пара уже существует",
  },
  uz: {
    appName: "UZS FX Monitor",
    subtitle: "Valyuta kurslari paneli",
    lastUpdated: "Oxirgi yangilanish:",
    refresh: "Yangilash",
    themeDark: "Qorong'i",
    themeLight: "Yorug'",
    language: "Til",
    pinnedPairs: "Biriktirilgan juftliklar",
    allPairs: "Barcha valyuta juftliklari",
    addToDashboard: "Panelga qo'shish",
    fromCurrency: "Qaysi valyutadan",
    toCurrency: "Qaysi valyutaga",
    converterTitle: "Tez konvertor",
    amount: "Miqdor",
    result: "Natija",
    unpin: "Olib tashlash",
    pin: "Biriktirish",
    loading: "Valyuta kurslari yuklanmoqda...",
    errorTitle: "Valyuta kurslarini yuklab bo'lmadi",
    errorMessage: "Iltimos, internet ulanishini tekshiring va qayta urinib ko'ring.",
    retry: "Qayta urinish",
    allPinned: "Barcha juftliklar biriktirilgan. Ba'zilarini olib tashlang.",
    cannotSelectSame: "Xuddi shu valyutani tanlab bo'lmaydi",
    pairExists: "Juftlik allaqachon mavjud",
  },
} as const;

export const getTranslation = (lang: Language) => translations[lang];

export const getStoredLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem('language') as Language | null;
  return stored && ['en', 'ru', 'uz'].includes(stored) ? stored : 'en';
};

export const setStoredLanguage = (lang: Language): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lang);
  }
};

