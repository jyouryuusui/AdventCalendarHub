import { createI18n } from 'vue-i18n';


// 現在のURLに基づいてデフォルトの言語を決定
//const defaultLocale = window.location.pathname.startsWith('/ja/') ? 'ja' : 'en';
// 言語オプションとURLプレフィックスのマッピング
const languageToPath = {
  en: '',   // 英語はプレフィックスなし
  ja: '/ja', // 日本語
  fr: '/fr', // フランス語
  es: '/es'  // スペイン語
  // 他の言語を追加
};

// URLから言語を決定する関数
const determineLocale = () => {
  const path = window.location.pathname;

  for (const [code, prefix] of Object.entries(languageToPath)) {
    if (path.startsWith(prefix)) {
      return code;
    }
  }
  return 'en'; // デフォルト言語
};

//const defaultLocale = determineLocale();

const messages = {
  en: {
    message: {
      home: 'Article',
      about: 'About',
      calendar: 'Calendar',
      hello: 'Hello world',
    },
    title: "",
    summary: "Summary",
    date: "Date"
  
  },
  ja: {
    message: {
      home: '記事',
      about: '概要',
      calendar: 'カレンダー',
      hello: '世界',
    },
    title: "",
    summary: "概要",
    date: "日付"

  },
  fr: {
    message: {
      home: 'fr記事',
      about: 'fr概要',
      calendar: 'frカレンダー',
      hello: 'fr世界',
    },
    title: "",
    summary: "Summary",
    date: "Date"
  }
};



const i18n = createI18n({
  legacy: false,
  locale: determineLocale(), // デフォルト言語
  fallbackLocale: 'en',
  messages,
});

export default i18n;
