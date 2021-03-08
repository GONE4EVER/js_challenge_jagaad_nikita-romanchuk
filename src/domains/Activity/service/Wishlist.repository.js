import ProductsCollection from '@/common/providers/ProductsCollection.repository';


const WISHLIST_MODULE_NAME = 'wishlist';

const getTypeError = moduleName => `Master module provided to 
  ${moduleName} is not of ProductsCollection type`;

class Wishlist extends ProductsCollection {
  constructor() {
    super(WISHLIST_MODULE_NAME);
  }

  /**
   * Subscribes to master module actions.
   * If the action dispatched to store matches "ADD_TO_COLLECTION"
   * then removes the item with same key from wishlist.
   *
   * Author motivation: wishlist is supposed to be a list of items
   * that are not available for purchasing, so if the user puts product
   * into cart, that means it's available, which aslo means it's no longer needed in wishlist
   *
   * @param {Object} masterModule of ProductsCollection type
   * @returns {Function} vuex plugin function
   */
  registerPlugin = masterModule => {
    const isValidType = masterModule instanceof ProductsCollection;

    if (!isValidType) {
      throw new Error(getTypeError(this.name));
    }

    const wishlistModuleName = this.name;
    const { key: wishlistKeyExtractor } = this.extractors;

    return store => {
      const { ADD_TO_COLLECTION: ADD_ITEM_TO_CART } = masterModule.actionsList;
      const { REMOVE_FROM_COLLECTION: REMOVE_FROM_WISHLIST } = this.actionsList;

      store.subscribeAction({
        after: ({ type, payload: itemKey }, rootState) => {
          if (type === ADD_ITEM_TO_CART) {
            const isItemInWishlist = rootState[wishlistModuleName].list
              .some(product => wishlistKeyExtractor(product) === itemKey);

            if (!isItemInWishlist) {
              return;
            }

            store.dispatch(REMOVE_FROM_WISHLIST, itemKey);
          }
        },
      });
    };
  }
}

export default Wishlist;
