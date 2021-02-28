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
    name: 'Not found',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
