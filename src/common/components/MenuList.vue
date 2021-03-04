<template>
  <ul
    class="menu-list"
    :style="{ maxHeight: max }"
  >
    <li
      v-for="{ id, title, bestPrice } in list"
      :key="id"
      class="menu-item"
    >
      <section class="menu-item__text-container">
        <span class="menu-item__title menu-item__text">
          {{ title }}
        </span>

        <span class="menu-item__text">
          {{ selectedCurrency }} {{ bestPrice | formatPrice }}
        </span>
      </section>

      <base-button
        class="menu-item__close-icon"
        primary
        round
        @click="removeItem(id, $event)"
      >
        <i class="fas fa-times icon" />
      </base-button>
    </li>
  </ul>
</template>

<script>
import formatPrice from 'common/mixins/formatPrice';


export default {
  name: 'MenuList',
  mixins: [ formatPrice ],
  props: {
    list: {
      type: Array,
      required: true,
    },
    max: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    selectedCurrency: '€',
  }),
  methods: {
    removeItem(itemKey, event) {
      this.$emit('remove', itemKey);
      event.stopPropagation();
    },
  },
};
</script>

<style lang="scss">
.menu-list {
  background-color: $backgroundColor--light;

  padding: 0 10px;
  overflow: hidden auto;

  .menu-item {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 350px;
    padding: 10px 0;

    &:not(:last-child):after {
      content: "";

      display: block;
      position: absolute;
      bottom: 0;
      height: 1px;

      width: 100%;

      background-color: $backgroundColor--dark;
    }

    .menu-item__text-container {
      display: flex;
      flex-direction: column;

      margin-right: spacing(4);

      .menu-item__text:not(:last-child) {
        margin-bottom: spacing(2);
      }
    }

    .menu-item__title {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;

      white-space: normal;
      overflow: hidden;

      text-transform: initial;
      font-size: 14px;
      word-break: break-word;
    }

    .menu-item__close-icon {
      padding: 6px;

      border: none;

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;

        letter-spacing: 0;

        font-size: 14px;

        width: 14px;
        height: 14px;
      }
    }
  }
}
</style>
