<template>
  <app-dropdown>
    <template #default="{elementRef}">
      <div
        :ref="elementRef"
        class="baseStorage baseStorage__count"
      >
        <slot name="default" />

        <span
          v-if="counterVisible"
          class="baseStorage-counter"
        >
          {{ dataItemsCount }}
        </span>
      </div>
    </template>

    <template #dropdownContent>
      <h3 class="baseStorage-content__title">
        {{ title }}
      </h3>

      <menu-list
        v-if="!!dataItemsCount"
        :list="data"
        max="300px"
        @remove="onRemoveItem"
      />

      <slot
        v-else
        name="placeholder"
      >
        <div class="baseStorage-content__placeholder">
          {{ placeholder }}
        </div>
      </slot>
    </template>
  </app-dropdown>
</template>

<script>
import MenuList from '@/common/components/MenuList.vue';

export default {
  components: { MenuList },
  props: {
    title: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      required: true,
    },
    displayCounterWhenEmpty: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dataItemsCount() {
      return this.data.length;
    },
    counterVisible() {
      return this.displayCounterWhenEmpty || !!this.dataItemsCount;
    },
  },
  methods: {
    onRemoveItem($event) {
      this.$emit('on-remove-item', $event);
    },
  },
};
</script>

<style lang="scss">
.baseStorage {
  height: 25px;

  cursor: pointer;

  display: flex;
  align-items: flex-end;

  .icon {
    height: auto;
    fill: $buttonColor--secondary;
  }

  &.baseStorage__count {
    margin: 0 10px;
    position: relative;

    .icon {
      width: 17px;
    }

    .baseStorage-counter {
      position: absolute;
      right: -12px;

      width: 13px;
      height: 13px;

      display: flex;
      align-self: flex-start;
      justify-content: center;
      align-items: center;

      font-size: 8px;
      text-align: center;

      border-radius: 50%;
      color: $fontColor--light;
      background-color: $cartBatchBackground;
    }
  }
}

.baseStorage-content__title {
  margin: 0;
  padding: 10px;

  font-weight: normal;
  border-bottom: 1px solid $backgroundColor--dark;
}

.baseStorage-content__placeholder {
  padding: 10px;
  white-space: nowrap;

  line-height: 19px;
  letter-spacing: 0.43px;
  color: $fontColor--secondary;
}
</style>
