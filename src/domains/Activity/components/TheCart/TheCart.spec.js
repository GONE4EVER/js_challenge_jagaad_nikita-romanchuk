import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';

import 'utils/customDirectives';


import AppDropdown from 'common/components/AppDropdown.vue';
import BaseButton from 'common/components/BaseButton.vue';
import formatPriceMixin from 'common/mixins/formatPrice';
import Cart from 'domains/Activity/service/Cart.repository';

import TheCart from './TheCart.vue';


const localVue = createLocalVue();
const cartModule = new Cart();

const storeFactory = (override, extraModule) => new Vuex.Store({
  modules: {
    [cartModule.name]: {
      ...cartModule.initializeModule(),
      ...override,
    },
    ...extraModule,
  },
});

const theCartFactory = store => mount(TheCart, {
  mixins: [ formatPriceMixin ],
  store,
  localVue,
});

localVue.use(Vuex);
localVue.component('app-dropdown', AppDropdown);
localVue.component('base-button', BaseButton);


const fakeDataItem = {
  id: 123321,
  bestPrice: 80,
  title: 'fakeItem',
};

describe('TheCart: Base output', () => {
  let cartWrapper;

  let store;

  afterEach(() => {
    cartWrapper.destroy();
    store = null;
  });

  it('Component\'s output matches default values when data is empty', () => {
    store = storeFactory();
    cartWrapper = theCartFactory(store);

    expect(cartWrapper.vm.cartItems.length).toBe(0);

    const totalPriceEl = cartWrapper.find('.cartPrice');

    expect(totalPriceEl.exists()).toBeTruthy();

    const [ selectedCurrency, totalPriceOutput ] = totalPriceEl
      .text()
      .split(' ');

    expect(cartWrapper.vm.$data.selectedCurrency).toBe(selectedCurrency);
    expect(totalPriceOutput).toBe('0.00');
  });

  it('Component\'s output matches default values when data is not empty', () => {
    store = storeFactory({
      state: {
        list: [ fakeDataItem ],
      },
    });
    cartWrapper = theCartFactory(store);

    expect(cartWrapper.vm.cartItems).toEqual([ fakeDataItem ]);

    const totalPriceEl = cartWrapper.find('.cartPrice');

    expect(totalPriceEl.exists()).toBeTruthy();

    const [ selectedCurrency, totalPriceOutput ] = totalPriceEl
      .text()
      .split(' ');

    expect(cartWrapper.vm.$data.selectedCurrency).toBe(selectedCurrency);
    expect(totalPriceOutput).toBe(fakeDataItem.bestPrice.toFixed(2));
  });
});

describe('TheCart: Interaction with store', () => {
  let cartWrapper;

  let store;

  afterEach(() => {
    cartWrapper.destroy();
    store = null;
  });

  it('Cart reacts to adding item to the collection correctly', async () => {
    store = storeFactory(null, {
      activities: {
        namespaced: true,
        state: {
          list: [ fakeDataItem ],
        },
      },
    });
    cartWrapper = theCartFactory(store);

    /**
     * imitate adding item which happens in some other
     * place in the app
     */
    await cartWrapper.vm.$store.dispatch(
      cartModule.actionsList.ADD_TO_COLLECTION,
      fakeDataItem.id,
    );

    expect(cartWrapper.vm.cartItems).toEqual([ fakeDataItem ]);
    expect(cartWrapper.vm.totalPrice).toBe(fakeDataItem.bestPrice);

    const [ , totalPriceOutput ] = cartWrapper.find('.cartPrice')
      .text()
      .split(' ');

    expect(totalPriceOutput).toBe(fakeDataItem.bestPrice.toFixed(2));
  });

  it('Cart reacts to removing item from the collection correctly', async () => {
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
    cartWrapper = theCartFactory(store);

    /**
     * imitate removing item which is emitted
     * from the cart menu list
     */
    await cartWrapper.vm.$store.dispatch(
      cartModule.actionsList.REMOVE_FROM_COLLECTION,
      fakeDataItem.id,
    );

    expect(cartWrapper.vm.cartItems.length).toBe(0);
    expect(cartWrapper.vm.totalPrice).toBe(0);

    const [ , totalPriceOutput ] = cartWrapper.find('.cartPrice')
      .text()
      .split(' ');

    expect(totalPriceOutput).toBe('0.00');
  });
});
