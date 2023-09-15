import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import RoomView from '../views/RoomView.vue';
import LoginView from '../views/LoginView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/room/:id',
    name: 'room',
    component: RoomView,
    meta: {
      requiresAuth: true
    }
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

router.beforeEach((to: any, from: any, next: any) => {
  const loggedIn = localStorage.getItem('sessionId');
  const roomid = localStorage.getItem('roomId');
  const routeRoomId = to.params.id;

  if (to.matched.some((record: RouteRecordRaw) => record.meta?.requiresAuth)) {
    if (!loggedIn || routeRoomId !== roomid) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
