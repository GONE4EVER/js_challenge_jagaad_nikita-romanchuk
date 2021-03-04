export const mutations = {
  SET_FETCH_STATUS: 'SET_FETCH_STATUS',
  SET_ERROR_STATE: 'SET_ERROR_STATE',
  SET_ACTIVITIES_LIST: 'SET_ACTIVITIES_LIST',
  SET_FETCH_META: 'SET_FETCH_META',
};

export const actions = {
  FETCH_ACTIVITIES: 'FETCH_ACTIVITIES',
  UPDATE_OFFSET: 'UPDATE_OFFSET',
};

export const internalActions = {
  START_FETCH: 'START_FETCH',
  COMPLETE_FETCH: 'COMPLETE_FETCH',
  HANDLE_ERROR: 'HANDLE_ERROR',
};

export const getters = {
  GET_ALL_ITEMS_FETCHED_FLAG: 'GET_ALL_ITEMS_FETCHED_FLAG',
};

export const activitiesModuleName = 'activities';

