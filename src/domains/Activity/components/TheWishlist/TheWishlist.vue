<template>
  <base-storage
    :data="wishlistItems"
    :placeholder="placeholder"
    :title="titleText"
    @on-remove-item="removeFromWishlist"
  >
    <wishlist-icon />
  </base-storage>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import BaseStorage from '@/common/components/BaseStorage/BaseStorage.vue';
import { wishlistModule } from '@/store';

import WishlistIcon from './WishlistIcon.vue';

const PLACEHOLDER_TEXT = 'Nothing has been added here yet...';
const TITLE_TEXT = 'Your Wishlist';

export default {
  components: {
    WishlistIcon,
    BaseStorage,
  },
  data: () => ({
    placeholder: PLACEHOLDER_TEXT,
    titleText: TITLE_TEXT,
  }),
  computed: {
    ...mapState(wishlistModule.name, {
      wishlistItems: state => state.list,
    }),
  },
  methods: {
    ...mapActions({
      removeFromWishlist: wishlistModule.actionsList.REMOVE_FROM_COLLECTION,
    }),
  },
};
</script>

<style lang="scss">
.wishlist {
  height: 25px;

  cursor: pointer;

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

.wishlist-content__title {
  margin: 0;
  padding: 10px;

  font-weight: normal;
  border-bottom: 1px solid $backgroundColor--dark;
}

.wishlist-content__placeholder {
  padding: 10px;
  white-space: nowrap;

  line-height: 19px;
  letter-spacing: 0.43px;
  color: $fontColor--secondary;
}
</style>
