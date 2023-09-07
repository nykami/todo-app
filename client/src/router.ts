import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import LoginPage from './views/LoginPage.vue';
import SignUpPage from './views/SignUpPage.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/todos/:userId', component: Dashboard },
  { path: '/todos/delete/:todoId', component: Dashboard },
  { path: '/login', component: LoginPage },
  { path: '/register', component: SignUpPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
