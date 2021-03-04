const defaultExtractors = {
  key: item => item.id,
};

/**
 * Represents a collection of items, that must be stored in VueX.
 * @name ProductsCollection
 *
 * TODO:
 * 1) inject product entities;
 * 2) state normalization.
 */
class ProductsCollection {
  /**
   *
   * @param {string} collectionName (required) VueX module name.
   * @param {object} dataExtractors item properties extractor functions
   * @param {function} dataExtractors.[exractorKey] (item) => item[key_name]
   */
  constructor(collectionName, dataExtractors = defaultExtractors) {
    /**
     * @readonly
     */
    this.name = collectionName;
    /**
     * @readonly
     */
    this.extractors = dataExtractors;

    this.state = {
      list: [],
    };

    /**
     * @readonly
     */
    this.actions = {
      ADD_TO_COLLECTION: this.addToCollection,
      REMOVE_FROM_COLLECTION: this.removeFromCollection,
    };
    /**
     * @readonly
     */
    this.getters = {
      IS_ITEM_IN_COLLECTION: this.isItemInCollection,
    };
    /**
     * @readonly
     */
    this.mutations = {
      ADD_ITEM: this.addItem,
      REMOVE_ITEM: this.removeItem,
    };
  }

  /**
   * @method ProductsCollection.initializeModule
   * @returns {object} vuex namespaced module object
   */
  initializeModule() {
    return {
      namespaced: true,
      actions: this.actions,
      getters: this.getters,
      mutations: this.mutations,
      state: this.state,
    };
  }

  /**
   *
   * @param {object} functionsDictionary set of registered
   * @param {boolean} namespaced defines whether to add module prefix or not
   * @returns {object} function result keys
   */
  getDictionary(dictionaryName, namespaced = false) {
    const namespace = this.name;
    const dictionary = this[dictionaryName];

    if (namespaced && !dictionary) {
      throw new Error(`Dictionary not found for ${this.constructor.name}`);
    }

    return Object.keys(dictionary)
      .reduce((result, key) => {
        const resultKey = namespaced
          ? `${namespace}/${key}`
          : key;

        result[key] = resultKey;

        return result;
      }, {});
  }

  /**
   * @returns {object} set of namespaced actions keys
   */
  get actionsList() {
    return this.getDictionary('actions', true);
  }

  /**
   * @returns {object} set of namespaced getters keys
   */
  get gettersList() {
    return this.getDictionary('getters', true);
  }

  /**
   * @returns {object} set of namespaced mutations keys
   */
  get mutationsList() {
    return this.getDictionary('mutations', true);
  }

  /**
   * Check if items belongs to the collection
   * @method VueX Getter
   * @param {(string|number)} searchedKey key of an item to search
   * @returns {boolean} true if item found, false if not
   */
  isItemInCollection = ({ list }) => searchedKey => {
    const { key } = this.extractors;

    return list.some(product => key(product) === searchedKey);
  }

  /**
   * Runs mutation to add item with specified identifier to the collection
   * @method VueX Action
   * @param {(string|number)} itemKey key of an item to search
   */
  addToCollection = ({ commit, rootState }, itemKey) => {
    const { key } = this.extractors;
    const { ADD_ITEM } = this.getDictionary('mutations');

    const addedItem = rootState.activities.list
      .find(activity => key(activity) === itemKey);

    commit(ADD_ITEM, addedItem);
  }

  /**
   * Runs mutation to remove item from the collection
   * @method VueX Action
   * @param {(string|number)} itemKey key of an item to search
   */
  removeFromCollection = ({ commit }, itemKey) => {
    const { REMOVE_ITEM } = this.getDictionary('mutations');

    commit(REMOVE_ITEM, itemKey);
  }

  /**
   * Adds item to the end of the collection's list
   * @method VueX Mutation
   * @param {object} item item to add to the collection's list
   */
  addItem = (state, item) => {
    state.list = [
      ...state.list,
      item,
    ];
  }

  /**
   * Removes item from the collection's list
   * @method VueX Mutation
   * @param {(number|string)} itemKey identifier of the item to
   * remove from the collection's list
   */
  removeItem = (state, itemKey) => {
    const { key } = this.extractors;

    state.list = state.list
      .filter(product => key(product) !== itemKey);
  }
}

export default ProductsCollection;
