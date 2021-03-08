<template>
  <footer class="footer">
    <section class="footer__content container">
      <slot name="footerTitle">
        <p class="footer__title">
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
.footer__title {
  text-transform: uppercase;
  letter-spacing: 1.37px;
}
</style>
