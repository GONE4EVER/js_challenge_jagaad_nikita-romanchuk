import { mutations as venueMutations, venuesModuleName } from 'domains/Venue/store/constants';

import { activitiesModuleName, mutations as activityMutations } from './constants';


const { SET_CURRENT_VENUE } = venueMutations;
const {
  ADD_ITEM_TO_CART,
  SET_FETCH_META,
  REMOVE_ITEM_FROM_WISHLIST,
} = activityMutations;


export const subscribeToVenueCurrentIdChange = store => {
  store.subscribe(({ type, payload }) => {
    const venueIdMutation = `${venuesModuleName}/${SET_CURRENT_VENUE}`;

    if (type === venueIdMutation) {
      const setMetaMutation = `${activitiesModuleName}/${SET_FETCH_META}`;
      const venuesList = store.state[venuesModuleName].list;

      const currentVenueData = venuesList.find(({ id }) => id === payload) ?? null;

      store.commit(setMetaMutation, {
        total: currentVenueData?.eventsCount,
      });
    }
  });
};

export const subscribeToAddingToCart = store => {
  store.subscribe(({ type, payload }) => {
    const addToCartMutation = `${activitiesModuleName}/${ADD_ITEM_TO_CART}`;

    if (type === addToCartMutation) {
      const isItemInWishlist = store.state[activitiesModuleName].wishlist.list
        .some(({ id }) => id === payload);

      if (!isItemInWishlist) {
        return;
      }

      const removeItemFromWishlist = `${activitiesModuleName}/${REMOVE_ITEM_FROM_WISHLIST}`;

      store.commit(removeItemFromWishlist, payload);
    }
  });
};
