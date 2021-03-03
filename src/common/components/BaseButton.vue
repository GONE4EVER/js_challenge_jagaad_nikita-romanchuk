<template>
  <button
    class="button"
    :class="classes"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const { icon, primary, round } = this;

    return {
      classes: {
        'button--round': round,
        'button--primary': primary,
        icon,
      },
    };
  },
};
</script>

<style lang="scss">
.icon {
  width: 20px;
  height: 20px;

  transition: .3s fill;

  fill: $buttonColor--primary;
}

.button {
  cursor: pointer;
  transition: .3s border, .3s color, .3s background-color;

  border: 1px solid $buttonColor--primary;
  border-radius: 100px;
  background-color: $backgroundColor--light;
}

.button--round {
  display: block;

  border-radius: 50%;
}

.button--primary {
  padding: 13px;

  letter-spacing: 1.39px;
  text-transform: uppercase;

  font-family: 'Lato-Bold', sans-serif;
  font-size: 13px;

  &:hover {
    color: $backgroundColor--light;
    border: 1px solid $buttonColor--secondary;
    background-color: $buttonColor--secondary;
  }
}


/* TODO: put to wish list */
.button--wishlist:hover {
  border: 1px solid $buttonColor--secondary;
}

.button--wishlist:hover > .icon {
  fill: $buttonColor--secondary;
}

.button--in-cart {
  pointer-events: none;

  background-color: $buttonColor--primary;
}
</style>
