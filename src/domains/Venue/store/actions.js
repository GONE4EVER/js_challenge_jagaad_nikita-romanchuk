import VenuesService from '../services/Venue.service';

import { actions, mutations, internalActions } from './constants';

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

export const FETCH_VENUE = async ({ commit, dispatch }, payload) => {
  try {
    dispatch(internalActions.START_FETCH);
    const data = await VenuesService.getVenueById(payload);

    commit(mutations.SET_ITEMS_LIST, data);
  } catch (err) {
    dispatch(internalActions.HANDLE_ERROR, err);
  } finally {
    dispatch(internalActions.COMPLETE_FETCH);
  }
};

export const SET_ACTIVE_VENUE = async ({ commit, dispatch }, payload) => {
  const { id, shouldFetch } = payload;

  if (shouldFetch) {
    await dispatch(actions.FETCH_VENUE, id);
  }

  commit(mutations.SET_CURRENT_ID, id);
};
