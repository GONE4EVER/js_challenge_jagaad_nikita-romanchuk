<template>
  <div class="cart cart__count">
    <div class="cart__price">
      {{ selectedCurrency }} {{ totalPrice }}
    </div>

    <cart-icon />
    <span
      v-if="cartItemsCount > 0"
      class="cart-counter"
    >
      {{ cartItemsCount }}
    </span>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import { cartModule } from 'store';

import CartIcon from './CartIcon.vue';

export default {
  components: { CartIcon },
  data: () => ({
    selectedCurrency: '€',
  }),
  computed: {
    ...mapState(cartModule.name, {
      cartItemsCount: state => state.list.length,
    }),
    ...mapGetters({
      totalPrice: cartModule.gettersList.GET_TOTAL_PRICE,
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
    fill: $buttonColor--secondary;
  }

  .cart__price {
    margin-right: 5px;
    font-size: 12px;
    line-height: 12px;
  }

  &.cart__count {
    margin: 0 10px;
    position: relative;

    .icon {
      width: 17px;
    }

    .cart-counter {
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
      color: $fontColor--light;
      background-color: $cartBatchBackground;
    }
  }
}
</style>
