<template>
  <article class="product">
    <figure class="product__image-wrapper">
      <img
        :src="`${imageUrl}`"
        class="product__image"
        alt="Product"
        itemprop="image"
      >
      <slot name="imageContent" />
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
        primary
      >
        {{ buttonText }}
      </base-button>
    </div>
  </article>
</template>

<script>
import BaseButton from 'common/components/BaseButton.vue';

const DESCRIPTION_PLACEHOLDER = 'description missing';

export default {
  components: {
    BaseButton,
  },
  props: {
    alreadyInCart: {
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
      return this.alreadyInCart
        ? 'in cart'
        : 'add to cart';
    },
    descriptionOutput() {
      return this.description || DESCRIPTION_PLACEHOLDER;
    },
  },
  created() {
    console.log({
      originalRetailPrice: this.originalRetailPrice,
      retailPrice: this.retailPrice,
    });
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
  position: relative;
  text-align: center;
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

  color: #808080;
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

.button--in-cart {
  pointer-events: none;

  background-color: $buttonColor--primary;
}

</style>
