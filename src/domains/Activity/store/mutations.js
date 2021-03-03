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

// cart
export const ADD_ITEM_TO_CART = (state, itemId) => {
  const item = state.list.find(({ id }) => id === itemId);

  state.cart.list = [
    ...state.cart.list,
    item,
  ];
};

export const REMOVE_ITEM_FROM_CART = (state, itemId) => {
  state.cart.list = state.cart.list
    .filter(product => product.id !== itemId);
};

// wishlist
export const ADD_ITEM_TO_WISHLIST = (state, itemId) => {
  const item = state.list.find(({ id }) => id === itemId);

  state.wishlist.list = [
    ...state.wishlist.list,
    item,
  ];
};

export const REMOVE_ITEM_FROM_WISHLIST = (state, itemId) => {
  state.wishlist.list = state.wishlist.list
    .filter(product => product.id !== itemId);
};
