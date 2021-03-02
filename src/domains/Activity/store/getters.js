export const GET_ALL_ITEMS_FETCHED_FLAG = ({ meta }) => meta.total === meta.offset;

export const GET_ITEMS_PRESENCE_IN_CART = (
  { cart: { list } },
) => searchedId => list.some(({ id }) => id === searchedId);

export const GET_CART_TOTAL_PRICE = state => state.cart.list.reduce((result, item) => {
  const { discount, retailPrice, originalRetailPrice } = item;

  const price = discount > 0
    ? retailPrice.value
    : originalRetailPrice.value;

  return result + price;
}, 0);
