import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import i18n from './i18n';

loadFonts()

const app = createApp(App)

type LanguageCode = 'en' | 'ja' | 'fr' ; // 利用可能な言語コードを列挙

// 言語オプションとURLプレフィックスのマッピング
const languageToPath: Record<LanguageCode, string> = {
  en: '',
  ja: '/ja',
  fr: '/fr'
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


app
  .use(router)
  .use(store)
  .use(vuetify)
  .use(i18n)
  .mount('#app')


