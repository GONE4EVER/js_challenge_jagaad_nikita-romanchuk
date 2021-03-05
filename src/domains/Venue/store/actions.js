import VenuesService from '../service/Venue.service';

import { mutations, internalActions } from './constants';

export const START_FETCH = ({ commit }) => {
  commit(mutations.SET_ERROR_STATE, null);
  commit(mutations.SET_FETCH_STATUS, true);
};

export const COMPLETE_FETCH = ({ commit }) => {
  commit(mutations.SET_FETCH_STATUS, false);
};

export const HANDLE_ERROR = ({ commit }, errorPayload) => {
  commit(mutations.SET_ERROR_STATE, errorPayload);
};

export const FETCH_VENUE = async ({ commit, dispatch }, venueId) => {
  try {
    dispatch(internalActions.START_FETCH);
    const data = await VenuesService.getVenueById(venueId);

    if (data.error) {
      throw new Error(data.payload);
    }

    commit(mutations.SET_VENUES_LIST, data);
  } catch ({ message }) {
    dispatch(internalActions.HANDLE_ERROR, message);
  } finally {
    dispatch(internalActions.COMPLETE_FETCH);
  }
};

export const SET_ACTIVE_VENUE = async ({ commit }, venueId) => {
  commit(mutations.SET_CURRENT_VENUE, Number(venueId));
};

