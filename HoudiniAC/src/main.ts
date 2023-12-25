import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import i18n from './i18n';

import VCalendar from 'v-calendar';


import {initializeApp} from 'firebase/app';
//import {getAnalytics} from "firebase/analytics";

import firebaseConfig from './firebaseConfig';

loadFonts()

const app = createApp(App)

type LanguageCode = 'en' | 'ja' ; // 利用可能な言語コードを列挙

// 言語オプションとURLプレフィックスのマッピング
const languageToPath: Record<LanguageCode, string> = {
  en: '',
  ja: '/ja'
  // 他の言語を追加
};

router.beforeEach((to, from, next) => {
  let language: LanguageCode = 'en'; // デフォルト言語を 'en' とする
  Object.entries(languageToPath).forEach(([code, path]) => {
    if (to.path.startsWith(path)) {
      language = code as LanguageCode;
    }
  });

  i18n.global.locale.value = language;
  next();
});

const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(firebaseApp);

app
  .use(store)
  .use(vuetify)
  .use(router)
  .use(i18n)
  .use(VCalendar) 
  .mount('#app')


