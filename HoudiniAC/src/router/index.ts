import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue';
import Calendar from '../components/Calendar.vue';
import store from '../store';  // Vuex ストアをインポート

const baseRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'  // リダイレクトを追加
  },
  {
    path: '/home',  // ホームコンポーネントのパスを変更
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/calendar',
    component: Calendar
  }
]

// 以下の部分はそのままでOK
const supportedLanguages = ['ja'];
const localizedRoutes = supportedLanguages.flatMap(lang => {
  return baseRoutes.map(route => ({
    ...route,
    path: `/${lang}${route.path !== '/' ? route.path : ''}`
  }));
});

const routes: Array<RouteRecordRaw> = [
  ...baseRoutes,
  ...localizedRoutes
];

const router = createRouter({
  //history: createWebHistory(process.env.BASE_URL), // GitHub PagesのベースURLを設定
  history: createWebHistory('/AdventCalendarHub/'),
  routes
})

router.beforeEach((to, from, next) => {
  const redirectPath = sessionStorage.redirect;
  delete sessionStorage.redirect;

  const languageCode = to.path.split('/')[1];
  if (supportedLanguages.includes(languageCode)) {
    store.commit('setLanguage', languageCode);
  } else {
    store.commit('setLanguage', 'en');
  }

  if (redirectPath && to.fullPath !== redirectPath) {
    next(redirectPath);
  } else {
    next();
  }
});






export default router;
