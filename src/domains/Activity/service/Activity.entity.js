const propsMap = [
  [ 'uuid', 'id' ],
  [ 'description', 'description' ],
  [ 'discount', 'discount' ],
  [ 'title', 'title' ],
  [ 'cover_image_url', 'imageUrl' ],
  [ 'retail_price', 'retailPrice' ],
  [ 'original_retail_price', 'originalRetailPrice' ],
];

export default class Activity {
  constructor(data) {
    const config = propsMap.reduce((result, prop) => {
      const [ srcName, newName ] = prop;

      result[newName] = data[srcName];

      return result;
    }, {});


    return {
      ...config,
      retailPrice: {
        formattedValue: config.retailPrice.formatted_value,
      },
      originalRetailPrice: {
        formattedValue: config.retailPrice.formatted_value,
      },
    };
  }
}
