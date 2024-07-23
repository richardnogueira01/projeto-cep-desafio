import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import Search from '@/views/SearchView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
