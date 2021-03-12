<template>
  <base-storage
    :data="cartItems"
    :title="titleText"
    :placeholder="placeholder"
    @on-remove-item="removeFromCart"
  >
    <div class="cartPrice">
      {{ selectedCurrency }} {{ totalPrice | formatPrice }}
    </div>

    <cart-icon />
  </base-storage>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import BaseStorage from '@/common/components/BaseStorage/BaseStorage.vue';
import formatPrice from '@/common/mixins/formatPrice';
import { cartModule } from '@/store';

import CartIcon from './CartIcon.vue';

const PLACEHOLDER_TEXT = 'Nothing has been added here yet...';
const TITLE_TEXT = 'Your Cart';

export default {
  components: {
    CartIcon,
    BaseStorage,
  },
  mixins: [ formatPrice ],
  data: () => ({
    selectedCurrency: '€',
    placeholder: PLACEHOLDER_TEXT,
    titleText: TITLE_TEXT,
  }),
  computed: {
    ...mapState(cartModule.name, {
      cartItems: state => state.list,
    }),
    ...mapGetters({
      totalPrice: cartModule.gettersList.GET_TOTAL_PRICE,
    }),
  },
  methods: {
    ...mapActions({
      removeFromCart: cartModule.actionsList.REMOVE_FROM_COLLECTION,
    }),
  },
};
</script>

<style lang="scss">
.cart {
  height: 25px;

  cursor: pointer;

  display: flex;
  align-items: flex-end;

  .icon {
    height: auto;
    fill: $buttonColor--secondary;
  }

  .cartPrice {
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

.cart-content__title {
  margin: 0;
  padding: 10px;

  font-weight: normal;
  border-bottom: 1px solid $backgroundColor--dark;
}

.cart-content__placeholder {
  padding: 10px;
  white-space: nowrap;

  line-height: 19px;
  letter-spacing: 0.43px;
  color: $fontColor--secondary;
}

.cartPrice {
  margin-right: 5px;
  font-size: 12px;
  line-height: 12px;
}
</style>
