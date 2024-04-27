import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/movie/:movieId',
      name: 'movie',
      component: () => import('../views/MovieView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
    },
    { path: '/:pathMatch(.*)*', name: 'notfound', component: () => import('../views/404.vue') },
  ],
});

export default router;
