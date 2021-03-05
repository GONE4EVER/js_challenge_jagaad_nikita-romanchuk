import Vue from 'vue';
import VueRouter from 'vue-router';

import NotFound from 'views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/venues',
  },
  {
    path: '/venues/:id?',
    name: 'Venues',
    component: () => import(/* webpackChunkName: "venues" */ 'views/Venues.vue'),
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,

  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
