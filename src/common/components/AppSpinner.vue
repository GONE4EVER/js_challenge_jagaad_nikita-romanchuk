<template>
  <div class="appSpinner appSpinner--fade" />
</template> />

<script>
export default {};
</script>

<style lang="scss">
.appSpinner, .appSpinner:before, .appSpinner:after {
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.appSpinner {
  margin: 0 auto 1.5em auto;
  position: relative;
  width: 3em;
  height: 3em;

  &.appSpinner--fade {
    &:before {
      animation-name: fadeA;
    }
    &:after {
      animation-name: fadeB;
    }
  }
}

.appSpinner:before, .appSpinner:after {
  background: currentColor;
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  transform-origin: 50% 100%;
  clip-path: polygon(0 0,100% 0,50% 100%);
  -webkit-clip-path: polygon(0 0,100% 0,50% 100%);
}

@keyframes fadeA {
  from, to { opacity: 1; transform: rotate(0deg) }
  25%, 75.1% { opacity: 0; transform: rotate(0deg) }
  25.1%, 75% { opacity: 0; transform: rotate(180deg) }
  50% { opacity: 1; transform: rotate(180deg) }
}
@keyframes fadeB {
  from, 50% { opacity: 0; transform: rotate(90deg) }
  25% { opacity: 1; transform: rotate(90deg) }
  50.1%, to { opacity: 0; transform: rotate(270deg) }
  75% { opacity: 1; transform: rotate(270deg) }
}

</style>
