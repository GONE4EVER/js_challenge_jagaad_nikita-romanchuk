<template>
  <button
    class="button"
    :class="classes"
    @click="click"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    click: {
      type: Function,
      required: true,
    },
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
  background-color: $buttonFontColor--primary;
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
    color: $buttonFontColor--primary;
    border: 1px solid $buttonColor--hover;
    background-color: $buttonColor--hover;
  }
}


/* */
.button--wishlist:hover {
  border: 1px solid $buttonColor--hover;
}

.button--wishlist:hover > .icon {
  fill: $buttonColor--hover;
}

.button--in-cart {
  pointer-events: none;

  background-color: $buttonColor--primary;
}
</style>
