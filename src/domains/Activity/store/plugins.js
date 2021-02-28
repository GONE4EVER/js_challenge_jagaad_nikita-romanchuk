import { mutations as venueMutations, venuesModuleName } from 'domains/Venue/store/constants';

import { activitiesModuleName, mutations } from './constants';

/* eslint import/prefer-default-export: 0 */
export const subscribeToVenueCurrentIdChange = store => {
  store.subscribe(({ type, payload }) => {
    const currentVenueIdMutation = `${venuesModuleName}/${venueMutations.SET_CURRENT_VENUE}`;

    if (type === currentVenueIdMutation) {
      const setMetaMutation = `${activitiesModuleName}/${mutations.SET_FETCH_META}`;
      const venuesList = store.state[venuesModuleName].list;

      const currentVenueData = venuesList.find(({ id }) => id === payload) ?? null;

      store.commit(setMetaMutation, {
        total: currentVenueData?.eventsCount,
      });
    }
  });
};
