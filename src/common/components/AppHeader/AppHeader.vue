<template>
  <header class="appHeader">
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

<style lang="scss">
.appHeader {
  background-color: $backgroundColor--light;
  display: flex;

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
