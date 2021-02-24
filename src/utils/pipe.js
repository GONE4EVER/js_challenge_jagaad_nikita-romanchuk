/**
 * Takes functions sequence and calls them in specified order.
 * Each further function is being called with result of the previous one.
 * Providing params for the first function in sequence is performed by calling
 * the returned value with required params: pipe(functions_iterable_object)(your_params)
 * @param {Function[]} funcs
 */

const pipe = (...funcs) => funcs
  .map(item => {
    const isFunction = item instanceof Function;

    if (!isFunction) {
      throw new Error('Provided item is not a function');
    }

    return item;
  })
  .reduce(
    (prev, next) => (...args) => next(prev(...args)),
  );


export default pipe;
