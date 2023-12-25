import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue';
import Calendar from '../components/Calendar.vue';

const baseRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
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

const supportedLanguages = ['ja']; // ここにサポートする言語コードを追加

//const supportedLanguages = ['ja', 'fr']; // ここにサポートする言語コードを追加

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
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
