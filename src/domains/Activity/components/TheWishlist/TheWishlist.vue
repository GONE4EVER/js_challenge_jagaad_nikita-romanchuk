<template>
  <div class="wishlist wishlist__count">
    <wishlist-icon />
    <span
      v-if="wishlistItemsCount > 0"
      class="wishlist-counter"
    >{{ wishlistItemsCount }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { wishlistModule } from 'store';

import WishlistIcon from './WishlistIcon.vue';

export default {
  components: { WishlistIcon },
  computed: {
    ...mapState(wishlistModule.name, {
      wishlistItemsCount: state => state.list.length,
    }),
  },
};
</script>

<style lang="scss">
.wishlist {
  height: 25px;

  display: flex;
  align-items: flex-end;

  .icon {
    height: auto;
    fill: $buttonColor--secondary;
  }


  &.wishlist__count {
    margin: 0 10px;
    position: relative;

    .icon {
      width: 17px;
    }

    .wishlist-counter {
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
