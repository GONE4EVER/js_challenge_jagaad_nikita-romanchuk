<template>
  <ul class="product-list">
    <li
      v-for="product in products"
      :key="product.id"
      class="product-list__item"
    >
      <product-card v-bind="product" />
    </li>
  </ul>
</template>

<script>
import ProductCard from './ProductCard.vue';


export default {
  name: 'ProductsList',
  components: {
    ProductCard,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.product-list {
  display: flex;
  flex: 0 1 auto;
  flex-flow: row wrap;
  margin: 0 -10px;
}

.product-list__item {
  padding: 10px;

  flex: 1 0 100%;
  max-width: 100%;

  @media screen and (min-width: $desktopViewport) {
    flex: 1 0 33.3333%;
    max-width: 33.3333%;
  }
  @media screen and (min-width: $tabletViewport) and (max-width: $desktopViewport - 1px){
    flex: 1 0 50%;
    max-width: 50%;
  }
}
</style>
