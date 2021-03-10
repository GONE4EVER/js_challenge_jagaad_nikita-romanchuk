<template>
  <picture>
    <source
      v-for="src in alternativeSources"
      :key="src.key"
      :media="src.media"
      :srcset="src.value"
    >
    <img
      v-bind="$attrs"
      :src="defaultImage"
      alt="Product"
      class="product__image"
      itemprop="image"
    >
  </picture>
</template>

<script>
export default {
  name: 'AdaptivePicture',
  inheritAttrs: false,
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      sources: [
        { key: 'desktop', media: '(min-width: 961px)', value: 'w=840&h=560' },
        { key: 'tablet', media: '(min-width: 701px)', value: 'w=510&h=340' },
      ],
      defaultSource: {
        value: 'w=320&h=200',
      },
    };
  },
  computed: {
    alternativeSources() {
      return this.sources.map(({ media, value }) => ({
        media,
        value: this.appendQueryString(this.imageUrl, value),
      }));
    },
    defaultImage() {
      return this.appendQueryString(this.imageUrl, this.defaultSource.value);
    },
  },
  methods: {
    appendQueryString(imageSrc, query) {
      return `${imageSrc}?q=60&fit=crop&${query}`;
    },
  },
};
</script>

