import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/HomeView.vue'
import About from '../views/AboutView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/about2',
    name: 'about2',
    component: About
  },
  {
    path: '/ja/',
    name: 'home2',
    component: Home
  },
  {
    path: '/ja/about',
    name: 'about3',
    component: About
  },
  {
    path: '/fr/',
    name: 'home4',
    component: Home
  },
  {
    path: '/fr/about',
    name: 'about4',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
