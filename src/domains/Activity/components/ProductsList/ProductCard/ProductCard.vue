<template>
  <article class="product">
    <figure class="product__image-wrapper">
      <img
        :src="imageUrl"
        class="product__image"
        alt="Product"
        itemprop="image"
      >
      <base-button
        class="product__wishlist-button button--wishlist"
        :class="wishlistButtonDisabled"
        round
        @click="addToWishlist(id)"
      >
        <add-to-wishlist-icon />
      </base-button>
    </figure>

    <div class="product__details">
      <h1
        class="product__title"
        itemprop="brand"
      >
        {{ title }}
      </h1>

      <p
        class="product__subtitle"
        itemprop="description"
      >
        {{ descriptionOutput }}
      </p>

      <div
        class="product__price"
        itemscope
        itemtype="http://schema.org/Offer"
      >
        <span :class="{'product__price--strike': discount > 0}">
          {{ originalRetailPrice.formattedValue }}
        </span>

        <span
          v-if="discount > 0"
          class="product__price--discounted"
          itemprop="price"
        >
          {{ retailPrice.formattedValue }}
        </span>
      </div>

      <base-button
        class="product__add-to-cart"
        :class="{'button--in-cart':inCart}"
        primary
        @click="addToCart(id)"
      >
        {{ buttonText }}
      </base-button>
    </div>
  </article>
</template>

<script>
import { mapActions } from 'vuex';

import { cartModule, wishlistModule } from 'store';

import AddToWishlistIcon from './AddToWishlistIcon.vue';

const DESCRIPTION_PLACEHOLDER = 'description missing';


export default {
  components: {
    AddToWishlistIcon,
  },
  props: {
    inCart: {
      type: Boolean,
      default: false,
    },
    inWishlist: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    retailPrice: {
      type: Object,
      required: true,
    },
    originalRetailPrice: {
      type: Object,
      required: true,
    },
  },
  computed: {
    buttonText() {
      return this.inCart
        ? 'in cart'
        : 'add to cart';
    },
    wishlistButtonDisabled() {
      const { inCart, inWishlist } = this;

      return {
        'button--disabled': inCart || inWishlist,
        'button--in-wishlist': inWishlist,
      };
    },
    descriptionOutput() {
      return this.description || DESCRIPTION_PLACEHOLDER;
    },
  },
  methods: {
    ...mapActions({
      addToCart: cartModule.actionsList.ADD_TO_COLLECTION,
      addToWishlist: wishlistModule.actionsList.ADD_TO_COLLECTION,
    }),
  },
};
</script>

<style lang="scss">
.product {
  display: flex;
  flex-direction: column;
  height: 100%;

  background-color: $backgroundColor--light;
}


/* image */
.product__image-wrapper {
  padding: 20px;
  text-align: center;
  position: relative;
}

.product__image {
  max-width: 100%;
  height: auto;
}

/* details */
.product__details {
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  padding: 10px 20px 20px;
  text-align: center;
}

/* titles */
.product__title {
  padding-bottom: 10px;

  font-family: 'Lato-Bold', sans-serif;
  font-size: 14px;
  letter-spacing: 1.37px;
  text-transform: uppercase;
}

.product__subtitle {
  padding-bottom: 10px;

  font-size: 12px;
  line-height: 19px;
  letter-spacing: 0.43px;

  color: $fontColor--secondary
}


/* prices */
.product__price {
  padding-bottom: 20px;

  font-family: 'Lato-Bold', sans-serif;
  font-size: 14px;
  letter-spacing: 2.33px;
}

.product__price--strike {
  margin-right: 10px;
  text-decoration: line-through;
}

.product__price--discounted {
  color: #F54B5E;
}

.product__add-to-cart {
  width: 100%;
  margin-top: 10px;
  margin-top: auto;
}

/* controls */
.button--disabled {
  pointer-events: none;
}

.button--in-cart {
  pointer-events: none;

  background-color: $buttonColor--primary;
}

.button--in-wishlist {
  & > .icon {
    fill: $buttonColor--secondary;
  }
}

.button--wishlist:hover {
  border: 1px solid $buttonColor--secondary;

  & > .icon {
    fill: $buttonColor--secondary;
  }
}

.product__wishlist-button {
  width: 35px;
  height: 35px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 10px;
  right: 10px;
}

</style>
