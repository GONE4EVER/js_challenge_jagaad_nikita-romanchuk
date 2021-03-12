import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';

import 'utils/customDirectives';


import AppDropdown from 'common/components/AppDropdown.vue';
import BaseButton from 'common/components/BaseButton.vue';
import formatPriceMixin from 'common/mixins/formatPrice';
import Wishlist from 'domains/Activity/service/Wishlist.repository';

import TheWishlist from './TheWishlist.vue';


const localVue = createLocalVue();
const wishlistModule = new Wishlist();

const storeFactory = (override, extraModule) => new Vuex.Store({
  modules: {
    [wishlistModule.name]: {
      ...wishlistModule.initializeModule(),
      ...override,
    },
    ...extraModule,
  },
});

const theCartFactory = store => mount(TheWishlist, {
  mixins: [ formatPriceMixin ],
  store,
  localVue,
});

localVue.use(Vuex);
localVue.component('app-dropdown', AppDropdown);
localVue.component('base-button', BaseButton);


const fakeDataItem = {
  id: 'abcdefghijklmnopqrstuvwxyz',
  bestPrice: 120,
  title: 'fakeItem',
};

describe('TheWishlist: Base output', () => {
  let wishlistWrapper;

  let store;

  afterEach(() => {
    wishlistWrapper.destroy();
    store = null;
  });

  it('Component\'s output matches default values when data is empty', () => {
    store = storeFactory();
    wishlistWrapper = theCartFactory(store);

    expect(wishlistWrapper.vm.wishlistItems.length).toBe(0);
  });

  it('Component\'s output matches default values when data is not empty', () => {
    store = storeFactory({
      state: {
        list: [ fakeDataItem ],
      },
    });
    wishlistWrapper = theCartFactory(store);

    expect(wishlistWrapper.vm.wishlistItems).toEqual([ fakeDataItem ]);
  });
});

describe('TheWishlist: Interaction with store', () => {
  let wishlistWrapper;

  let store;

  afterEach(() => {
    wishlistWrapper.destroy();
    store = null;
  });

  it('Wishlist reacts to adding item to the collection correctly', async () => {
    store = storeFactory(null, {
      activities: {
        namespaced: true,
        state: {
          list: [ fakeDataItem ],
        },
      },
    });

    wishlistWrapper = theCartFactory(store);

    /**
     * imitate adding item which happens in some other
     * place in the app
     */
    await wishlistWrapper.vm.$store.dispatch(
      wishlistModule.actionsList.ADD_TO_COLLECTION,
      fakeDataItem.id,
    );

    expect(wishlistWrapper.vm.wishlistItems).toEqual([ fakeDataItem ]);
  });

  it('Wishlist reacts to removing item from the collection correctly', async () => {
    store = storeFactory(
      {
        state: {
          list: [ fakeDataItem ],
        },
      }, {
        activities: {
          namespaced: true,
          state: {
            list: [ fakeDataItem ],
          },
        },
      },
    );

    wishlistWrapper = theCartFactory(store);

    /**
     * imitate removing item which is emitted
     * from the wishlist menu list
     */
    await wishlistWrapper.vm.$store.dispatch(
      wishlistModule.actionsList.REMOVE_FROM_COLLECTION,
      fakeDataItem.id,
    );

    expect(wishlistWrapper.vm.wishlistItems.length).toBe(0);
  });
});
