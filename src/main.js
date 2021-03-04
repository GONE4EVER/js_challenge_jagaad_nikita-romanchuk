import Vue from 'vue';
import 'normalize.css';

import 'assets/styles/main.scss';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerComponents';

/**
 * taken from
 * https://stackoverflow.com/questions/36170425/detect-click-outside-element
 */
Vue.directive('click-outside', {
  bind(el, binding, vnode) {
    /* eslint no-param-reassign: 0 */
    el.clickOutsideEvent = event => {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unbind(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
