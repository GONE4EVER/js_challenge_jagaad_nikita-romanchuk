<template>
  <header
    class="appHeader"
    :class="{ 'appHeader--sticky': sticky }"
  >
    <section class="appHeader__content container">
      <router-link to="/">
        <h1 class="appHeader__title">
          brand
        </h1>
      </router-link>

      <slot />
    </section>
  </header>
</template>

<script>
export default {
  props: {
    sticky: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss">
.appHeader {
  background-color: $backgroundColor--light;
  display: flex;

  &.appHeader--sticky {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .appHeader__title {
    font-size: 20px;
  }

  .appHeader__content {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    height: 60px;

    text-transform: uppercase;
  }
}


</style>
