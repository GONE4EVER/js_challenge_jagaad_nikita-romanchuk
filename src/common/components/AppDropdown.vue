<template>
  <div
    v-click-outside="hide"
    class="dropdown-wrapper"
  >
    <slot :elementRef="elementRef" />

    <div
      v-show="visible"
      class="dropdown"
      :class="positionClass"
    >
      <slot name="dropdownContent" />
    </div>
  </div>
</template>

<script>
const ACCEPTED_POSITIONS = [
  'top',
  'left',
  'bottom',
  'right',
];

export default {
  name: 'AppDropdown',
  props: {
    position: {
      type: String,
      default: 'bottom',
      validator(value) {
        return ACCEPTED_POSITIONS.includes(value);
      },
    },
  },
  data() {
    return {
      elementRef: 'elementRef',
      visible: false,
    };
  },
  computed: {
    positionClass() {
      return `dropdown--position-${this.position}`;
    },
  },
  mounted() {
    const { elementRef } = this;
    const [ { context = null } ] = this.$scopedSlots.default();

    const targetElement = context?.$refs?.[elementRef];

    if (!context || !targetElement) {
      return;
    }

    targetElement.addEventListener('click', this.toggleVisibility);

    this.$once('hook:beforeDestroy', () => {
      targetElement.removeEventListener('click', this.toggleVisibility);
    });
  },
  methods: {
    toggleVisibility() {
      this.visible = !this.visible;
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss">
.dropdown-wrapper {
  position: relative;
}

.dropdown {
  position: absolute;

  background-color: $backgroundColor--light;
  color: $fontColor--primary;

  box-shadow: 3px 3px 10px 1px rgba(19,17,17,0.3);

  &:before {
    content: '';
    display: block;
    position: absolute;

    width: 13px;
    height: 13px;

    transform: translate(-50%, -50%) rotate(45deg);

    z-index: -1;
  }

  &.dropdown--position-bottom {
    // should not be static value, but...
    top: calc(100% + 30px);

    // should not be static value, but...
    transform: translateX(30px);
    right: 0;

    &:before {
      background-color: inherit;
      top: 0;
      // should not be static value, but...
      right: 36px;
    }
  }
}
</style>
