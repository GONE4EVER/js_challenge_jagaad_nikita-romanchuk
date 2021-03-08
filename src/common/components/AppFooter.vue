<template>
  <footer class="appFooter">
    <section class="appFooter__content container">
      <slot name="footerTitle">
        <p class="appFooter__title">
          {{ title }}
        </p>
      </slot>

      <slot name="footerContent" />
    </section>
  </footer>
</template>

<script>
const DEFAULT_TITLE = 'footer';

export default {
  props: {
    title: {
      type: String,
      default: DEFAULT_TITLE,
    },
  },
};
</script>

<style lang="scss">
.appFooter__title {
  text-transform: uppercase;
  letter-spacing: 1.37px;
}
</style>
