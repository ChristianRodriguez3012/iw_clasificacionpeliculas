import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import NewMovie from '../components/NewMovie.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/new-movie', component: NewMovie }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
