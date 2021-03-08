<template>
  <nav class="pagination">
    <ul class="pagination__list">
      <li
        class="pagination__item"
        @click="setPage(current - 1)"
      >
        <a class="pagination__link">
          <arrow-left-icon />
        </a>
      </li>

      <li
        v-for="page in pages"
        :key="page.key || page"
        class="pagination__item"
        :class="{'pagination__item--active': page === current}"
        @click="setPage(page)"
      >
        <a class="pagination__link">
          {{ page.placeholder || page }}
        </a>
      </li>

      <li
        class="pagination__item"
        @click="setPage(current + 1)"
      >
        <a class="pagination__link">
          <arrow-right-icon />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import ArrowLeftIcon from './ArrowLeftIcon.vue';
import ArrowRightIcon from './ArrowRightIcon.vue';

const DEFAULT_PLACEHOLDER = '...';

export default {
  name: 'AppPagination',
  components: {
    ArrowLeftIcon,
    ArrowRightIcon,
  },
  props: {
    current: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    placeholderSymbol: {
      type: String,
      default: DEFAULT_PLACEHOLDER,
    },
  },
  /**
   * declaring min constant just to avoid
   * the usage of "magic numbers" in code
   */
  data: () => ({
    min: 1,
  }),
  computed: {
    pages() {
      const { current, length: max, min } = this;

      const pages = Array(max - min + 1).fill()
        .map((_, index) => min + index);

      /**
       * declaring items that must be displayed
       * that will always be first page, last page
       * and two adjacent to the current page
       * (one before and one after the current one)
       */
      const mandatoryOutput = [ ...new Set([
        min,
        current - 1,
        current,
        current + 1,
        max,
      ]) ].filter(i => i <= max && i >= min);

      /**
       * filling output with placeholder items
       * that represent collapsed pages
       */
      const prettyOutput = pages.reduce((result, page) => {
        if (mandatoryOutput.includes(page)) {
          result.push(page);
        } else {
          const lastItem = result[result.length - 1];

          if (Number.isInteger(lastItem)) {
            result.push(this.generatePlaceholderItem(page));
          }
        }

        return result;
      }, []);


      return prettyOutput;
    },
  },
  methods: {
    generatePlaceholderItem(neighbor) {
      return {
        key: `${this.placeholderSymbol}_${neighbor}`,
        placeholder: this.placeholderSymbol,
      };
    },
    setPage(value) {
      if (!Number(value) || value < this.min || value > this.length) {
        return;
      }

      this.$emit('update:current', value);
    },
  },
};
</script>

<style lang="scss">
.pagination {
  height: 45px;
  margin: 30px auto;
  text-align: center;

  .pagination__list {
    height: 100%;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
  }

  .pagination__item {
    cursor: pointer;

    height: 100%;
    width: 45px;
    font-family: 'Lato-Bold', sans-serif;
    font-size: 13px;
    letter-spacing: 1.39px;
    text-align: center;

    &.pagination__item--active {
      text-decoration: underline;
    }
  }

  .pagination__link {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $fontColor--primary;

    &:hover {
      text-decoration: underline;
    }

    & .icon {
      width: 8px;
      fill: $fontColor--primary;
    }
  }
}


</style>
