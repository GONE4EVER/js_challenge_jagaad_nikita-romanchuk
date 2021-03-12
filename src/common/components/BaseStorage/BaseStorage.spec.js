import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';

import 'utils/customDirectives';


import AppDropdown from 'common/components/AppDropdown.vue';
import BaseButton from 'common/components/BaseButton.vue';
import MenuList from 'common/components/MenuList.vue';

import BaseStorage from './BaseStorage.vue';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.component('app-dropdown', AppDropdown);
localVue.component('base-button', BaseButton);

const fakeProps = {
  data: [ { id: 'fakeId', title: 'fakeTitle', bestPrice: 20 } ],
  title: 'BaseStorage',
  placeholder: 'fakePlaceholder',
};

const baseStorageFactory = (propsOverride = {}) => mount(BaseStorage, {
  localVue,
  propsData: {
    ...fakeProps,
    ...propsOverride,
  },
});

describe('BaseStorage: Base output', () => {
  let baseStorageWrapper;


  afterEach(() => {
    baseStorageWrapper.destroy();
  });

  it('Component\'s output matches default values when data is empty', () => {
    baseStorageWrapper = baseStorageFactory({ data: [] });

    expect(baseStorageWrapper.vm).toBeTruthy();

    expect(baseStorageWrapper.vm.dataItemsCount).toBe(0);

    expect(baseStorageWrapper.vm.counterVisible).toBeFalsy();
    expect(baseStorageWrapper.find('.baseStorage-counter').exists()).toBeFalsy();

    const appDropdownWrapper = baseStorageWrapper.findComponent(AppDropdown);

    expect(appDropdownWrapper.vm).toBeTruthy();

    const openModalElementWrapper = baseStorageWrapper.findComponent({
      ref: appDropdownWrapper.vm.$data.elementRef,
    });

    expect(openModalElementWrapper.exists()).toBeTruthy();
    expect(baseStorageWrapper
      .find('.baseStorage-content__placeholder')
      .text()).toBe(fakeProps.placeholder);
  });

  it('Component\'s output matches default values when data is not empty', () => {
    baseStorageWrapper = baseStorageFactory();

    expect(baseStorageWrapper.vm).toBeTruthy();
    expect(baseStorageWrapper.vm.dataItemsCount).toBe(fakeProps.data.length);

    expect(baseStorageWrapper.vm.counterVisible).toBeTruthy();
    expect(baseStorageWrapper.find('.baseStorage-counter').exists()).toBeTruthy();
    expect(baseStorageWrapper
      .find('.baseStorage-counter')
      .text()).toBe(fakeProps.data.length.toString());

    const appDropdownWrapper = baseStorageWrapper.findComponent(AppDropdown);

    expect(appDropdownWrapper.vm).toBeTruthy();

    const openModalElementWrapper = baseStorageWrapper.findComponent({
      ref: appDropdownWrapper.vm.$data.elementRef,
    });

    expect(openModalElementWrapper.exists()).toBeTruthy();
    expect(baseStorageWrapper
      .find('.baseStorage-content__placeholder')
      .exists()).toBeFalsy();
  });

  it('Interacts correctly with the app-dropdown component', async () => {
    baseStorageWrapper = baseStorageFactory();

    expect(
      baseStorageWrapper
        .find('.dropdown-wrapper')
        .exists(),
    ).toBeTruthy();

    const appDropdownWrapper = baseStorageWrapper.findComponent(AppDropdown);

    expect(appDropdownWrapper.exists()).toBeTruthy();
    expect(appDropdownWrapper.vm.$data.visible).toBeFalsy();

    const openModalElementWrapper = baseStorageWrapper.findComponent({
      ref: appDropdownWrapper.vm.$data.elementRef,
    });

    expect(openModalElementWrapper.exists()).toBeTruthy();

    // open dropdown
    await openModalElementWrapper.trigger('click');
    expect(appDropdownWrapper.vm.$data.visible).toBeTruthy();

    // close dropdown
    appDropdownWrapper.vm.hide();
    await localVue.nextTick();
    expect(appDropdownWrapper.vm.$data.visible).toBeFalsy();
  });
});

describe('BaseStorage: interaction with data items', () => {
  let baseStorageWrapper;

  afterEach(() => {
    baseStorageWrapper.destroy();
  });

  it('Adding items works correctly', async () => {
    baseStorageWrapper = baseStorageFactory({ data: [] });

    expect(baseStorageWrapper
      .find('.baseStorage-counter')
      .exists()).toBeFalsy();

    // imitate item adding
    await baseStorageWrapper.setProps({ ...fakeProps });

    const counterEl = baseStorageWrapper.find('.baseStorage-counter');

    expect(counterEl.exists()).toBeTruthy();
    expect(counterEl.text()).toBe(fakeProps.data.length.toString());
  });


  it('Removing item emits the desired event with expected item property value', async () => {
    baseStorageWrapper = baseStorageFactory();

    const menuListWrapper = baseStorageWrapper.findComponent(MenuList);

    menuListWrapper
      .find('.menu-item__close-icon')
      .trigger('click');

    await localVue.nextTick();

    const removeEvent = baseStorageWrapper.emitted()['on-remove-item'][0];
    const [ itemToRemoveId ] = removeEvent;

    expect(itemToRemoveId).toBe(fakeProps.data[0].id);
  });

  it('Removing items works correctly', async () => {
    baseStorageWrapper = baseStorageFactory();

    const counterEl = baseStorageWrapper.find('.baseStorage-counter');

    expect(counterEl.exists()).toBeTruthy();
    expect(counterEl.text()).toBe(fakeProps.data.length.toString());

    const fakeId = fakeProps.data[0].id;

    baseStorageWrapper.vm.$emit('on-remove-item', fakeProps.data[0].id);
    await localVue.nextTick();

    const removeEvents = baseStorageWrapper.emitted()['on-remove-item'];

    expect(removeEvents).toBeTruthy();
    expect(removeEvents.length).toBe(1);

    const [ itemToRemoveId ] = removeEvents[0];

    expect(itemToRemoveId).toBe(fakeId);

    // imitate item removing
    await baseStorageWrapper.setProps({
      ...fakeProps,
      data: baseStorageWrapper.vm.data.filter(({ id }) => id !== fakeId),
    });

    expect(baseStorageWrapper.vm.dataItemsCount)
      .toBe(0);
    expect(baseStorageWrapper
      .find('.baseStorage-counter')
      .exists()).toBeFalsy();
  });
});
