import { mutations as venueMutations, venuesModuleName } from 'domains/Venue/store/constants';

import { activitiesModuleName, mutations as activityMutations } from './constants';


const { SET_CURRENT_VENUE } = venueMutations;
const { SET_FETCH_META } = activityMutations;

/* eslint import/prefer-default-export: 0 */
export const subscribeToVenueCurrentIdChange = store => {
  store.subscribe(({ type, payload }) => {
    const venueIdMutation = `${venuesModuleName}/${SET_CURRENT_VENUE}`;

    if (type === venueIdMutation) {
      const setMetaMutation = `${activitiesModuleName}/${SET_FETCH_META}`;
      const venuesList = store.state[venuesModuleName].list;

      const currentVenueData = venuesList.find(({ id }) => id === payload) ?? null;

      store.commit(setMetaMutation, {
        total: currentVenueData?.eventsCount,
      });
    }
  });
};
