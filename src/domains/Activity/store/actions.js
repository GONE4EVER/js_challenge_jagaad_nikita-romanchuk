
import ActivityService from '../service/Activity.service';

import { getters, internalActions, mutations } from './constants';

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

export const FETCH_ACTIVITIES = async (store, venueId) => {
  const {
    commit,
    dispatch,
    getters: storeGetters,
    state: { meta },
  } = store;

  const allItemsFetched = storeGetters[getters.GET_ALL_ITEMS_FETCHED_FLAG];

  if (allItemsFetched) {
    return;
  }

  try {
    dispatch(internalActions.START_FETCH);

    const query = {
      limit: meta.limit,
      offset: meta.offset,
      sortBy: meta.sortBy,
    };

    const data = await ActivityService.getVenueActivities(venueId, query);
    const metaUpdate = {
      offset: meta.offset += data.length,
    };

    commit(mutations.SET_ACTIVITIES_LIST, data);
    commit(mutations.SET_FETCH_META, metaUpdate);
  } catch (err) {
    dispatch(internalActions.HANDLE_ERROR, err);
  } finally {
    dispatch(internalActions.COMPLETE_FETCH);
  }
};
