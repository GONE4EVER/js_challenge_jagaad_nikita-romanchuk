<template>
  <div class="cart cart__count">
    <div class="cart__price">
      € {{ totalPrice }}
    </div>

    <cart-icon />
    <span
      v-show="cartItemsCount > 0"
      class="bag__item-counter"
    >
      {{ cartItemsCount }}
    </span>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import { activitiesModuleName, getters } from 'domains/Activity/store/constants';

import CartIcon from './CartIcon.vue';

export default {
  components: { CartIcon },
  computed: {
    ...mapState(activitiesModuleName, {
      cartItemsCount: state => state.cart.list.length,
    }),
    ...mapGetters(activitiesModuleName, {
      totalPrice: getters.GET_CART_TOTAL_PRICE,
    }),
  },
};
</script>

<style lang="scss">
.cart {
  height: 25px;

  display: flex;
  align-items: flex-end;

  .icon {
    height: auto;
    fill: $buttonColor--hover;
  }

  .cart__price {
    margin-right: 5px;
    font-size: 12px;
    line-height: 12px;
  }

  &.cart__count {
    margin-left: 10px;
    position: relative;

    .icon {
      width: 17px;
    }

    .bag__item-counter {
      position: absolute;
      right: -12px;

      width: 13px;
      height: 13px;

      display: flex;
      align-self: flex-start;
      justify-content: center;
      align-items: center;

      font-size: 8px;
      text-align: center;

      border-radius: 50%;
      color: #ffffff;
      background-color: #358ED7;
    }
  }
}
</style>
