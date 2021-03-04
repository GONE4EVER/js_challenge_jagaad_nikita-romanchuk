import ProductsCollection from 'common/providers/ProductsCollection.repository';


const CART_MODULE_NAME = 'cart';

/**
 * @class extends ProductsCollection
 */
class Cart extends ProductsCollection {
  constructor() {
    super(CART_MODULE_NAME);

    this.getters = {
      ...this.getters,
      GET_TOTAL_PRICE: this.getTotalPrice,
    };
  }

  getTotalPrice = state => {
    const { list } = state;

    return list.reduce((result, item) => {
      const { discount, retailPrice, originalRetailPrice } = item;

      const price = discount > 0
        ? retailPrice.value
        : originalRetailPrice.value;

      return result + price;
    }, 0);
  }
}

export default Cart;
