import ProductsCollection from '@/common/providers/ProductsCollection.repository';


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

    return list.reduce((result, { bestPrice }) => result + bestPrice, 0);
  }
}

export default Cart;
