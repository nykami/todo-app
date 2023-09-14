import {
  NavigationGuardNext,
  RouteLocationNormalized,
  createRouter,
  createWebHistory,
} from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import LoginPage from './views/LoginPage.vue';
import SignUpPage from './views/SignUpPage.vue';

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: (
      _to: RouteLocationNormalized,
      _from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      if (!localStorage.getItem('jwtToken')) {
        next({ path: '/login' });
      } else {
        next();
      }
    },
  },
  {
    path: '/login',
    component: LoginPage,
    beforeEnter: (
      _to: RouteLocationNormalized,
      _from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      if (localStorage.getItem('jwtToken')) {
        next({ path: '/dashboard' });
      } else {
        next();
      }
    },
  },
  {
    path: '/register',
    component: SignUpPage,
    beforeEnter: (
      _to: RouteLocationNormalized,
      _from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      if (localStorage.getItem('jwtToken')) {
        next({ path: '/dashboard' });
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
