<template>
  <base-layout>
    <template #mainContent>
      <div class="container">
        <h1 class="notFound__title">
          OOPS NOT FOUND
        </h1>
        <div v-if="venueError || activityError">
          {{ venueError || activityError }}
        </div>
      </div>
    </template>
  </base-layout>
</template>

<script>
import { mapState } from 'vuex';

import { activitiesModuleName } from 'domains/Activity/store/constants';
import { venuesModuleName } from 'domains/Venue/store/constants';

export default {
  name: 'NotFoundPage',
  computed: {
    ...mapState(venuesModuleName, {
      venueError: state => state.error,
    }),
    ...mapState(activitiesModuleName, {
      activityError: state => state.error,
    }),
  },
};
</script>

<style>
.notFound__title {
  justify-self: center;
}
</style>
