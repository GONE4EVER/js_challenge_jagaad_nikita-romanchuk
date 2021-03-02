<template>
  <base-layout>
    <template #mainContent>
      <h1 class="notFound__title">
        OOPS NOT FOUND
      </h1>
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from 'common/components/BaseLayout.vue';


export default {
  name: 'NotFoundPage',
  components: { BaseLayout },
};
</script>

<style>
.notFound__title {
  justify-self: center;
}
</style>
