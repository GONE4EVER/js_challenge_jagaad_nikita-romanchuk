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
export default {
  name: 'NotFoundPage',
};
</script>

<style>
.notFound__title {
  justify-self: center;
}
</style>
