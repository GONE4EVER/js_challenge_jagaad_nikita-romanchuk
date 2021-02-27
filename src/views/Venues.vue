<template>
  <base-layout>
    <template #mainContent>
      {{ currentItemDetails }}
    </template>
  </base-layout>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

import BaseLayout from '@/common/components/BaseLayout.vue';
import { venuesModuleName } from '@/domains/Venue/store';
import { actions as venueActions, getters as venueGetters } from '@/domains/Venue/store/constants';

const { mapActions, mapGetters } = createNamespacedHelpers(venuesModuleName);

const defautVenueId = process.env.VUE_APP_DEFAULT_VENUE_ID;

export default {
  components: { BaseLayout },
  computed: {
    ...mapGetters({
      currentItemDetails: venueGetters.GET_CURRENT_VENUE,
    }),
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(id) {
        if (!id) {
          this.$router.push({ params: { id: defautVenueId } });
        } else {
          this.setActiveVenue({ id: +id, shouldFetch: true });
        }
      },
    },
  },
  methods: {
    ...mapActions({
      fetchVenueById: venueActions.FETCH_VENUE,
      setActiveVenue: venueActions.SET_ACTIVE_VENUE,
    }),
  },
};
</script>

<style lang="scss"></style>
