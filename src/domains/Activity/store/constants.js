export const mutations = {
  SET_FETCH_STATUS: 'SET_FETCH_STATUS',
  SET_ERROR_STATE: 'SET_ERROR_STATE',
  SET_ACTIVITIES_LIST: 'SET_ACTIVITIES_LIST',
  SET_FETCH_META: 'SET_FETCH_META',

  // cart
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
};

export const actions = {
  FETCH_ACTIVITIES: 'FETCH_ACTIVITIES',
  UPDATE_OFFSET: 'UPDATE_OFFSET',

  // cart
  ADD_TO_CART: 'ADD_TO_CART',
};

export const internalActions = {
  START_FETCH: 'START_FETCH',
  COMPLETE_FETCH: 'COMPLETE_FETCH',
  HANDLE_ERROR: 'HANDLE_ERROR',
};

export const getters = {
  GET_ALL_ITEMS_FETCHED_FLAG: 'GET_ALL_ITEMS_FETCHED_FLAG',

  // cart
  GET_ITEMS_PRESENCE_IN_CART: 'GET_ITEMS_PRESENCE_IN_CART',
  GET_CART_TOTAL_PRICE: 'GET_CART_TOTAL_PRICE',
};

export const activitiesModuleName = 'activities';

