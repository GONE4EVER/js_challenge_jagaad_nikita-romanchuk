import Vue from 'vue';
import 'normalize.css';

import 'assets/styles/main.scss';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
console.log(process.env);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
