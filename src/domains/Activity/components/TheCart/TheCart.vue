<template>
  <app-dropdown>
    <template #default="{elementRef}">
      <div
        :ref="elementRef"
        class="cart cart__count"
      >
        <div class="cart__price">
          {{ selectedCurrency }} {{ totalPrice | formatPrice }}
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

    <template #dropdownContent>
      <h3 class="cart-content__title">
        {{ titleText }}
      </h3>

      <menu-list
        v-if="!!cartItemsCount"
        :list="cartItems"
        max="320px"
        @remove="removeFromCart"
      />

      <div
        v-else
        class="cart-content__placeholder"
      >
        {{ placeholder }}
      </div>
    </template>
  </app-dropdown>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import MenuList from '@/common/components/MenuList.vue';
import formatPrice from '@/common/mixins/formatPrice';
import { cartModule } from '@/store';

import CartIcon from './CartIcon.vue';

const PLACEHOLDER_TEXT = 'Nothing has been added here yet...';
const TITLE_TEXT = 'Your Cart';

export default {
  components: {
    CartIcon,
    MenuList,
  },
  mixins: [ formatPrice ],
  data: () => ({
    selectedCurrency: '€',
    placeholder: PLACEHOLDER_TEXT,
    titleText: TITLE_TEXT,
  }),
  computed: {
    ...mapState(cartModule.name, {
      cartItemsCount: state => state.list.length,
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
</style>
