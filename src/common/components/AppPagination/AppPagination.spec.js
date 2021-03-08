import { createLocalVue, mount } from '@vue/test-utils';

import AppPagination from './AppPagination.vue';

const localVue = createLocalVue();

const paginationFactory = props => mount(AppPagination, {
  propsData: {
    ...props,
  },
  localVue,
});

describe('AppPagination: base output', () => {
  it('Pages count is above max displayed count. Active page is near the boundaries', () => {
    const paginationWrapper = paginationFactory({
      current: 3,
      length: 10,
      placeholderSymbol: '..',
    });

    expect(paginationWrapper.vm).toBeTruthy();

    const navigationElements = paginationWrapper.findAll('.pagination__item');

    expect(navigationElements.length)
      .toBe(8); // [<, 1, 2, *3*, 4, '..', 10 ,>]

    expect(navigationElements.filter(
      elWrapper => elWrapper.text() === '..',
    ).length).toBe(1);
    expect(paginationWrapper.find('.pagination__item--active').text())
      .toBe('3');
  });

  it('Pages count is above max displayed count. Active page isn\'t near the boundaries', () => {
    const paginationWrapper = paginationFactory({
      current: 6,
      length: 10,
      placeholderSymbol: '..',
    });

    expect(paginationWrapper.vm).toBeTruthy();

    const navigationElements = paginationWrapper.findAll('.pagination__item');

    expect(navigationElements.length)
      .toBe(9); // [<, 1, '..', 5, *6*, 7, '..', 10 ,>]

    expect(navigationElements.filter(
      elWrapper => elWrapper.text() === '..',
    ).length).toBe(2);
  });

  it('Pages count is below max displayed count', () => {
    const paginationWrapper = paginationFactory({
      current: 3,
      length: 5,
      placeholderSymbol: '..',
    });

    const navigationElements = paginationWrapper.findAll('.pagination__item');

    // [<, 1, 2, 3, 4, 5, >]
    expect(navigationElements.length).toBe(7);

    expect(navigationElements.filter(
      elWrapper => elWrapper.text() === '..',
    ).length).toBe(0);
  });
});

describe('AppPagination: Navigation', () => {
  it('Navigating via next/prev page controls', async () => {
    const paginationWrapper = paginationFactory({
      current: 2,
      length: 9,
    });

    expect(paginationWrapper.vm).toBeTruthy();

    const navigationElements = paginationWrapper.findAll('.pagination__item');

    navigationElements.at(navigationElements.length - 1).trigger('click');
    /* emulating value update from parent & waiting for nextTick */
    await paginationWrapper.setProps({ current: paginationWrapper.vm.current + 1 });

    const [ nextPage ] = paginationWrapper.emitted()['update:current'][0];

    expect(nextPage).toBe(paginationWrapper.vm.current);

    navigationElements.at(0).trigger('click');
    /* emulating value update from parent & waiting for nextTick */
    await paginationWrapper.setProps({ current: paginationWrapper.vm.current - 1 });

    const [ prevPage ] = paginationWrapper.emitted()['update:current'][1];

    expect(prevPage).toBe(paginationWrapper.vm.current);
  });
});
