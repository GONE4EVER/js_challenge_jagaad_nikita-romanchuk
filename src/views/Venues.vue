<template>
  <base-layout>
    <template #headerContent>
      <aside class="header-bag">
        <the-cart />
        <the-wishlist />
      </aside>
    </template>

    <template #mainContent>
      <div class="container venues-page-container">
        <app-spinner
          v-if="requestMeta.fetching || isLoadingVenue"
          class="venues-page-container__placeholder"
        />

        <products-list
          v-else
          :products="activitiesList"
        />

        <app-pagination
          v-if="!!requestMeta.limit"
          :length="pagesTotal"
          :current.sync="currentPage"
        />
      </div>
    </template>
  </base-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import AppPagination from 'common/components/AppPagination/AppPagination.vue';
import ProductsList from 'domains/Activity/components/ProductsList/ProductsList.vue';
import TheCart from 'domains/Activity/components/TheCart/TheCart.vue';
import TheWishlist from 'domains/Activity/components/TheWishlist/TheWishlist.vue';
import {
  actions as activityActions,
  activitiesModuleName,
} from 'domains/Activity/store/constants';
import {
  actions as venueActions,
  venuesModuleName,
} from 'domains/Venue/store/constants';


const DEFAULT_VENUE_ID = process.env.VUE_APP_DEFAULT_VENUE_ID;
const DEFAULT_PAGE = 1;

export default {
  name: 'VenuesPage',
  components: {
    AppPagination,
    ProductsList,
    TheCart,
    TheWishlist,
  },
  computed: {
    ...mapState(venuesModuleName, {
      currentVenueId: state => state.currentId,
      isLoadingVenue: state => state.meta.fetching,
      fetchError: state => state.error,
    }),
    ...mapState(activitiesModuleName, {
      activitiesList: state => state.list,
      requestMeta: state => state.meta,
    }),
    currentPage: {
      get() {
        const { offset, limit } = this.requestMeta;

        return offset / limit + 1;
      },
      set(page) {
        if (page === Number(this.$route.query.page)) {
          return;
        }

        this.$router.push({ query: { page } });
      },
    },
    pagesTotal() {
      const { total, limit } = this.requestMeta;

      return Math.ceil(total / limit);
    },
  },
  watch: {
    fetchError(payload) {
      if (payload) {
        this.$router.replace({ name: 'NotFound' });
      }
    },
    '$route.params.id': {
      immediate: true,
      async handler(venueId) {
        if (!venueId) {
          this.$router.replace({ params: { id: DEFAULT_VENUE_ID } });
        } else {
          await this.fetchVenueById(venueId);
          this.setActiveVenue(venueId);
        }
      },
    },
    '$route.query.page': {
      immediate: true,
      handler(value) {
        const { limit } = this.requestMeta;
        const page = Number(value);

        if (!Number.isInteger(page) || page <= 0) {
          this.$router.replace({ query: { page: DEFAULT_PAGE } });
        } else {
          this.setActivityOffset({
            offset: (page - 1) * limit,
            override: true,
          });
        }
      },
    },
    requestMeta({ limit, total }) {
      const navigationPage = Number(this.$route.query.page);
      const pagesTotal = Math.ceil(total / limit);

      if (!navigationPage || !pagesTotal) {
        return;
      }

      if (navigationPage > pagesTotal) {
        this.$router.replace({ name: 'Not found' });

        return;
      }

      this.fetchActivities({ venueId: this.currentVenueId });
    },
  },
  methods: {
    ...mapActions(venuesModuleName, {
      fetchVenueById: venueActions.FETCH_VENUE,
      setActiveVenue: venueActions.SET_ACTIVE_VENUE,
    }),
    ...mapActions(activitiesModuleName, {
      fetchActivities: activityActions.FETCH_ACTIVITIES,
      setActivityOffset: activityActions.UPDATE_OFFSET,
    }),
  },
};
</script>

<style lang="scss">
.header-bag {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

.venues-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .venues-page-container__placeholder {
    margin: auto;
  }
}
</style>
