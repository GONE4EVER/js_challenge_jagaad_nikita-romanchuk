import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';

import activitiesModule from '@/domains/Activity/store';
import { activitiesModuleName } from '@/domains/Activity/store/constants';
import { subscribeToVenueCurrentIdChange } from '@/domains/Activity/store/plugins';
import venuesModule from '@/domains/Venue/store';
import BaseButton from 'common/components/BaseButton.vue';
import Cart from 'domains/Activity/service/Cart.repository';
import Wishlist from 'domains/Activity/service/Wishlist.repository';

import ProductCard from './ProductCard.vue';


const localVue = createLocalVue();
const cartModule = new Cart();
const wishlistModule = new Wishlist();

localVue.use(Vuex);
localVue.component('base-button', BaseButton);

const storeFactory = override => new Vuex.Store({
  plugins: [
    subscribeToVenueCurrentIdChange,
    wishlistModule.registerPlugin(cartModule),
  ],
  modules: {
    [venuesModule.name]: venuesModule,
    [activitiesModuleName]: {
      ...activitiesModule,
      ...override,
    },
    [cartModule.name]: cartModule.initializeModule(),
    [wishlistModule.name]: wishlistModule.initializeModule(),
  },
});

const productCardFactory = (store, props) => mount(ProductCard, {
  store,
  localVue,
  propsData: {
    ...props,
  },
});

const fakeItem = {
  description: 'fake description',
  discount: 20,
  id: 'abcd',
  imageUrl: 'fakeUrl',
  originalRetailPrice: {
    formattedValue: '€ 100',
    value: 100,
  },
  retailPrice: {
    formattedValue: '€ 80',
    value: 80,
  },
  title: 'fake title',
};

describe('ProductCard: Base output', () => {
  // let store;

  let productWrapper;

  afterEach(() => {
    productWrapper.destroy();
    // store = null;
  });

  it('Component\'s buttons are enabled when item is neither in cart nor in wishlist', () => {
    productWrapper = productCardFactory(null, { ...fakeItem });

    expect(productWrapper.vm.inCart).toBeFalsy();
    expect(productWrapper.vm.inWishlist).toBeFalsy();

    // cart button
    expect(productWrapper.vm.buttonText).toBe('add to cart');
    expect(productWrapper
      .find('.product__add-to-cart')
      .classes('button--in-cart')).toBeFalsy();

    // wishlist button
    const wishlistButtonClasses = productWrapper
      .find('.product__wishlist-button.button--wishlist')
      .classes();

    expect(wishlistButtonClasses
      .some(className => className === 'button--disabled' || className === 'button--in-wishlist'))
      .toBeFalsy();
  });

  it('Component\'s buttons states when item presents in wishlist', () => {
    productWrapper = productCardFactory(null, { ...fakeItem, inWishlist: true });

    expect(productWrapper.vm.inCart).toBeFalsy();
    expect(productWrapper.vm.inWishlist).toBeTruthy();

    // cart button
    expect(productWrapper.vm.buttonText).toBe('add to cart');
    expect(productWrapper
      .find('.product__add-to-cart')
      .classes('button--in-cart')).toBeFalsy();

    // wishlist button
    const wishlistButtonClasses = productWrapper
      .find('.product__wishlist-button.button--wishlist')
      .classes();

    expect(wishlistButtonClasses
      .some(className => className === 'button--in-wishlist'))
      .toBeTruthy();
  });

  it('Component\'s buttons states when item presents in cart', () => {
    productWrapper = productCardFactory(null, { ...fakeItem, inCart: true });

    expect(productWrapper.vm.inCart).toBeTruthy();
    expect(productWrapper.vm.inWishlist).toBeFalsy();

    // cart button
    expect(productWrapper.vm.buttonText).toBe('in cart');
    expect(productWrapper
      .find('.product__add-to-cart')
      .classes('button--in-cart')).toBeTruthy();

    // wishlist button
    const wishlistButtonClasses = productWrapper
      .find('.product__wishlist-button.button--wishlist')
      .classes();

    expect(wishlistButtonClasses
      .some(className => className === 'button--disabled'))
      .toBeTruthy();
    expect(wishlistButtonClasses
      .some(className => className === 'button--in-wishlist'))
      .toBeFalsy();
  });

  it('Component\'s prices output is correct with no discount', () => {
    productWrapper = productCardFactory(null, {
      ...fakeItem, discount: 0,
    });

    // discount price
    expect(productWrapper
      .find('product__price--discounted')
      .exists()).toBeFalsy();

    const priceOutputs = productWrapper
      .find('.product__price')
      .findAll('span[itemprop="price"]');

    expect(priceOutputs.length).toBe(1);

    // usual price
    const ordinaryPriceEl = priceOutputs.at(0);

    expect(ordinaryPriceEl.classes('product__price--strike')).toBeFalsy();
    expect(ordinaryPriceEl.text()).toBe(fakeItem.originalRetailPrice.formattedValue);
  });

  it('Component\'s prices output is correct with discount', () => {
    productWrapper = productCardFactory(null, { ...fakeItem });

    const priceOutputs = productWrapper
      .find('.product__price')
      .findAll('span[itemprop="price"]');

    expect(priceOutputs.length).toBe(2);

    // usual price
    const ordinaryPriceEl = priceOutputs.at(0);

    expect(ordinaryPriceEl.classes('product__price--strike')).toBeTruthy();
    expect(ordinaryPriceEl.text()).toBe(fakeItem.originalRetailPrice.formattedValue);


    // discount price
    const discountPriceEl = priceOutputs.at(1);

    expect(discountPriceEl.classes('product__price--discounted')).toBeTruthy();
    expect(discountPriceEl.text()).toBe(fakeItem.retailPrice.formattedValue);
  });
});

describe('Product Card: Interaction with store', () => {
  let store;

  let productWrapper;

  afterEach(() => {
    productWrapper.destroy();
  });

  it('Product is added to the cart correctly', async () => {
    store = storeFactory({
      state: {
        list: [ fakeItem ],
      },
    });

    productWrapper = productCardFactory(store, { ...fakeItem });

    await productWrapper
      .find('.product__add-to-cart')
      .trigger('click');

    expect(productWrapper.vm.$store.state[cartModule.name].list).toEqual([ fakeItem ]);

    // imitate props update after item was added to the collection
    await productWrapper.setProps({ inCart: true });

    expect(
      productWrapper
        .find('.product__add-to-cart')
        .classes('button--in-cart'),
    ).toBeTruthy();
  });

  it('Product is added to the wishlist correctly', async () => {
    store = storeFactory({
      state: {
        list: [ fakeItem ],
      },
    });

    productWrapper = productCardFactory(store, { ...fakeItem });

    await productWrapper
      .find('.product__wishlist-button')
      .trigger('click');

    expect(productWrapper.vm.$store.state[wishlistModule.name].list).toEqual([ fakeItem ]);

    // imitate props update after item was added to the collection
    await productWrapper.setProps({ inWishlist: true });

    expect(
      productWrapper
        .find('.product__wishlist-button')
        .classes('button--in-wishlist'),
    ).toBeTruthy();
  });
});
