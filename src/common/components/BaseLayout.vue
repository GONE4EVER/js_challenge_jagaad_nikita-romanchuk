<template>
  <div
    class="baseLayout"
    :class="{ container }"
  >
    <app-header class="baseLayout__header">
      <slot name="headerContent" />
    </app-header>

    <main class="baseLayout__main">
      <div class="container">
        <slot name="mainContent" />
      </div>
    </main>

    <app-footer class="baseLayout__footer">
      <template #footerContent>
        <slot name="footerContent" />
      </template>
    </app-footer>

    <slot name="default" />
  </div>
</template>

<script>
import AppFooter from 'common/components/AppFooter/AppFooter.vue';
import AppHeader from 'common/components/AppHeader/AppHeader.vue';


export default {
  components: {
    AppHeader,
    AppFooter,
  },
  props: {
    container: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.baseLayout {
  height: 100%;

  display: flex;
  flex-direction: column
}

.baseLayout__header,
.baseLayout__footer {
  display: flex;
  align-items: center;
  flex-direction: row;

  height: 60px;

  text-transform: uppercase;

  background-color: $backgroundColor--light;
}

.baseLayout__main {
  display: flex;
  flex: 1 0 auto;
  flex-direction: row;

  margin: 30px 0 20px;
}


</style>
