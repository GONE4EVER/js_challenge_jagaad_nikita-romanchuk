import Vue from 'vue';
import Vuex from 'vuex';

import venuesModule, { venuesModuleName } from '@/domains/Venue/store';


Vue.use(Vuex);
Vue.config.devtools = true;

const store = new Vuex.Store({
  modules: {
    [venuesModuleName]: venuesModule,
  },
});

store.subscribeAction({
  before: action => {
    console.log(`before action ${action.type}`);
  },
  after: (action, state) => {
    console.log(`after action ${action.type}`);
    console.log({ state });
  },
});

export default store;
