
import ActivityService from '../service/Activity.service';

import {
  actions, getters, internalActions, mutations,
} from './constants';

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

export const FETCH_ACTIVITIES = async (store, { venueId, updateOffset = false }) => {
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

    commit(mutations.SET_ACTIVITIES_LIST, data);
    if (updateOffset) {
      dispatch(actions.UPDATE_OFFSET, { offset: data.length });
    }
  } catch (err) {
    dispatch(internalActions.HANDLE_ERROR, err);
  } finally {
    dispatch(internalActions.COMPLETE_FETCH);
  }
};

/**
 * Update offset obtained by GET requests for activities
 * @param {Object} store - store object reference obtained from vuex
 * @param {Object} payload - payload object
 * @param {Number} payload.offset - new offset value
 * @param {Boolean} payload.override - flag, responsible for indicating
 */
export const UPDATE_OFFSET = ({ commit, state }, { offset, override = false }) => {
  if (override) {
    commit(mutations.SET_FETCH_META, { offset });

    return;
  }

  const { meta: { offset: stateOffset, total } } = state;

  const newOffsetValue = stateOffset + offset;

  commit(mutations.SET_FETCH_META, {
    offset: newOffsetValue > total ? total : newOffsetValue,
  });
};

// cart
export const ADD_TO_CART = ({ commit }, itemId) => {
  commit(mutations.ADD_ITEM_TO_CART, itemId);
};

export const REMOVE_FROM_CART = ({ commit }, itemId) => {
  commit(mutations.REMOVE_ITEM_FROM_CART, itemId);
};

// wishlist
export const ADD_TO_WISHLIST = ({ commit }, itemId) => {
  console.log(321);
  commit(mutations.ADD_ITEM_TO_WISHLIST, itemId);
};

export const REMOVE_FROM_WISHLIST = ({ commit }, itemId) => {
  commit(mutations.REMOVE_ITEM_FROM_WISHLIST, itemId);
};
