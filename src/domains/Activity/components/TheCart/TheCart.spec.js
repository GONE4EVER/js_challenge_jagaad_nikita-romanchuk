import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';

import 'utils/customDirectives';


import AppDropdown from 'common/components/AppDropdown.vue';
import BaseButton from 'common/components/BaseButton.vue';
import formatPriceMixin from 'common/mixins/formatPrice';
import Cart from 'domains/Activity/service/Cart.repository';

import TheCart from './TheCart.vue';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.component('base-button', BaseButton);

const cartModule = new Cart();

describe('ProductCard default state', () => {
  let cartWrapper;

  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        [cartModule.name]: cartModule.initializeModule(),
      },
    });

    cartWrapper = mount(TheCart, {
      data() {
        return {
          selectedCurrency: '€',
        };
      },
      mixins: [ formatPriceMixin ],
      store,
      localVue,
    });
  });

  afterEach(() => {
    cartWrapper.destroy();
  });

  it('Component\'s output matches default values', () => {
    expect(cartWrapper.vm).toBeTruthy();
    expect(cartWrapper.find('.cart-counter').exists()).toBeFalsy();

    const priceContainer = cartWrapper.find('.cart__price');

    expect(priceContainer.exists()).toBeTruthy();

    const [ selectedCurrency, totalPriceOutput ] = priceContainer
      .text()
      .split(' ');

    expect(cartWrapper.vm.$data.selectedCurrency).toEqual(selectedCurrency);
    expect(totalPriceOutput).toBe('0.00');
  });

  it('Interacts correctly with the app-dropdown component', async () => {
    expect(cartWrapper.find('.dropdown-wrapper').exists()).toBeTruthy();

    const appDropdownWrapper = cartWrapper.findComponent(AppDropdown);

    expect(appDropdownWrapper.exists()).toBeTruthy();
    expect(appDropdownWrapper.vm.$data.visible).toBeFalsy();

    const openModalElementWrapper = cartWrapper.findComponent({
      ref: appDropdownWrapper.vm.$data.elementRef,
    });

    expect(openModalElementWrapper.exists()).toBeTruthy();

    await openModalElementWrapper.trigger('click');
    expect(appDropdownWrapper.vm.$data.visible).toBeTruthy();

    await appDropdownWrapper.trigger('click');
    expect(appDropdownWrapper.vm.$data.visible).toBeTruthy();
  });
});

describe('Adding items to cart', () => {
  const sampleItemData = {
    id: 123321,
    discount: 20,
    retailPrice: {
      formattedValue: '€ 80',
      value: 80,
    },
    originalRetailPrice: {
      formattedValue: '€ 100',
      value: 100,
    },
  };

  let store;

  let cartWrapper;

  beforeEach(async () => {
    store = new Vuex.Store({
      modules: {
        [cartModule.name]: cartModule.initializeModule(),
        activities: {
          namespaced: true,
          state: {
            list: [ sampleItemData ],
          },
        },
      },
    });

    cartWrapper = mount(TheCart, {
      data() {
        return {
          selectedCurrency: '€',
        };
      },
      mixins: [ formatPriceMixin ],
      store,
      localVue,
    });

    await cartWrapper.vm.$store.dispatch(
      cartModule.actionsList.ADD_TO_COLLECTION,
      sampleItemData.id,
    );
  });

  it('Cart total price changes when adding/removing items', async () => {
    expect(cartWrapper.vm.totalPrice).toBe(0);
    expect(cartWrapper.vm.totalPrice).toBe(sampleItemData.retailPrice.value);

    const priceContainer = cartWrapper.find('.cart__price');
    const [ , totalPriceOutput ] = priceContainer
      .text()
      .split(' ');

    expect(cartWrapper.vm.totalPrice).toBe(sampleItemData.retailPrice.value);
    expect(totalPriceOutput).toBe(sampleItemData.retailPrice.value.toFixed(2));

    await cartWrapper.vm.$store.dispatch(
      cartModule.actionsList.REMOVE_FROM_COLLECTION,
      sampleItemData.id,
    );

    expect(cartWrapper.vm.totalPrice).toBe(0);
  });
});

