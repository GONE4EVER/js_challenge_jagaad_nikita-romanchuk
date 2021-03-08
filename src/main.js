import Vue from 'vue';
import 'normalize.css';

import 'assets/styles/main.scss';

import App from './App.vue';
import router from './router';
import store from './store';

import './registerComponents';
import './utils/customDirectives';


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
