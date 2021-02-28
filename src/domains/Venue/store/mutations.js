export const SET_FETCH_STATUS = (state, payload) => {
  state.meta.fetching = payload;
};

export const SET_ERROR_STATE = (state, payload) => {
  state.meta.error = payload;
};

export const SET_ITEMS_LIST = (state, payload) => {
  const result = Array.isArray(payload) ? payload : [ payload ];

  state.venuesList = result;
};

export const SET_CURRENT_VENUE = (state, payload) => {
  const { id, eventsCount } = payload;

  state.current.id = id;
  state.current.meta.limit = eventsCount;
};
