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
      home: 'Search',
      about: 'About',
      calendar: 'Calendar',
      hometxt: 'This site is..',
      hello: 'Hello world',
    },
    search: "Search",
    title: "",
    summary: "Summary",
    author: ""
  
  },
  ja: {
    message: {
      home: '記事検索',
      about: '概要',
      calendar: 'カレンダー',
      hello: '世界',
      hometxt: 'このサイトは..',
    },
    search: "検索",
    title: "",
    summary: "概要",
    author: ""

  }/*,
  fr: {
    message: {
      home: 'fr検索',
      about: 'fr概要',
      calendar: 'frカレンダー',
      hello: 'fr世界',
      hometxt: 'This site is..',
    },
    search: "Search",
    title: "",
    summary: "Summary",
    author: "Date"
  }*/
};



const i18n = createI18n({
  legacy: false,
  locale: determineLocale(), // デフォルト言語
  fallbackLocale: 'en',
  messages,
});

export default i18n;
