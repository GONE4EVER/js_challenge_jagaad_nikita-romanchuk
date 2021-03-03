import Vue from 'vue';
import Vuex from 'vuex';

import activitiesModule from 'domains/Activity/store';
import { activitiesModuleName } from 'domains/Activity/store/constants';
import {
  subscribeToAddingToCart,
  subscribeToVenueCurrentIdChange,
} from 'domains/Activity/store/plugins';
import venuesModule from 'domains/Venue/store';
import { venuesModuleName } from 'domains/Venue/store/constants';

Vue.use(Vuex);
Vue.config.devtools = true;

const store = new Vuex.Store({
  plugins: [ subscribeToVenueCurrentIdChange, subscribeToAddingToCart ],
  modules: {
    [venuesModuleName]: venuesModule,
    [activitiesModuleName]: activitiesModule,
  },
});

store.subscribeAction({
  before: action => {
    console.log(`before action ${action.type}`);
  },
});

export default store;
