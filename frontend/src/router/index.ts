import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import RoomView from '../views/RoomView.vue';
import LoginView from '../views/LoginView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/room/:id',
    name: 'room',
    component: RoomView
  },
  {
    path: '/',
    name: 'home',
    component: LoginView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
