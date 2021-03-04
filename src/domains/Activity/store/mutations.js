export const SET_FETCH_STATUS = (state, payload) => {
  state.meta.fetching = payload;
};

export const SET_ERROR_STATE = (state, payload) => {
  state.error = payload;
};

export const SET_ACTIVITIES_LIST = (state, payload) => {
  const result = Array.isArray(payload) ? payload : [ payload ];

  state.list = result;
};

export const SET_FETCH_META = (state, payload) => {
  state.meta = {
    ...state.meta,
    ...payload,
  };
};

