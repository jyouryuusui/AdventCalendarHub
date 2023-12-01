import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/HomeView.vue'
import About from '../views/AboutView.vue';
import Calendar from '../views/CalendarView.vue';

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
  }/*,
  {
    path: '/about2',
    component: About
  },
  {
    path: '/ja/',
    component: Home
  },
  {
    path: '/ja/about',
    component: About
  },
  {
    path: '/fr/',
    component: Home
  },
  {
    path: '/fr/about',
    component: About
  }*/
]

const supportedLanguages = ['ja', 'fr']; // ここにサポートする言語コードを追加

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
