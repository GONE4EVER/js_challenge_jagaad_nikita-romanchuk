<template>
  <svg
    :height="height"
    :width="width"
    :viewBox="viewBox"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <!-- Generator: Sketch 42 (36781) - http://www.bohemiancoding.com/sketch -->
    <desc>Created with Sketch.</desc>
    <defs />
    <polygon
      id="Left-Iocn"
      stroke="none"
      :fill="fillColor"
      fill-rule="evenodd"
      :points="points"
    />
  </svg>
</template>

<script>
const DEFAULT_COLOR = '#444A59';

const DEFAULT_HEIGHT = '10px';
const DEFAULT_VIEWBOX = '19 18 7 10';
const DEFAULT_WIDTH = '7px';

export default {
  name: 'ArrowRightIcon',
  props: {
    fillColor: {
      type: String,
      default: DEFAULT_COLOR,
    },
    height: {
      type: String,
      default: DEFAULT_HEIGHT,
    },
    viewBox: {
      type: String,
      default: DEFAULT_VIEWBOX,
    },
    width: {
      type: String,
      default: DEFAULT_WIDTH,
    },
  },
  data: () => ({
    points: `22.9427745 22.9999999 19 26.9458774 20.0541226
     28 25.0541226 23 20.0541226 18 19 19.0541226`,
  }),
};
</script>

<style>

</style>
