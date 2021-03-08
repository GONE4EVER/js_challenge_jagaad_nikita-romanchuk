import Vue from 'vue';

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
