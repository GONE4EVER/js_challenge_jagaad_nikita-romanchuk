import Vue from 'vue';
import Vuex from 'vuex';

import Cart from '@/domains/Activity/service/Cart.repository';
import Wishlist from '@/domains/Activity/service/Wishlist.repository';
import activitiesModule from '@/domains/Activity/store';
import { activitiesModuleName } from '@/domains/Activity/store/constants';
import { subscribeToVenueCurrentIdChange } from '@/domains/Activity/store/plugins';
import venuesModule from '@/domains/Venue/store';
import { venuesModuleName } from '@/domains/Venue/store/constants';

Vue.use(Vuex);
Vue.config.devtools = true;

const cartModule = new Cart();
const wishlistModule = new Wishlist();

const store = new Vuex.Store({
  plugins: [
    subscribeToVenueCurrentIdChange,
    wishlistModule.registerPlugin(cartModule),
  ],
  modules: {
    [venuesModuleName]: venuesModule,
    [activitiesModuleName]: activitiesModule,
    [cartModule.name]: cartModule.initializeModule(),
    [wishlistModule.name]: wishlistModule.initializeModule(),
  },
});


export { cartModule, wishlistModule };
export default store;
