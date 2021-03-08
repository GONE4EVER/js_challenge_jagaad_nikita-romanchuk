import BaseDataEntity from '@/common/entities/Data.base.entity';

/**
 * explicit declaration of the set of prop that will be used across the application
 *
 * defines property names that will be used in application
 */
const propsMap = [
  [ 'uuid', 'id' ],
  [ 'description', 'description' ],
  [ 'discount', 'discount' ],
  [ 'title', 'title' ],
  [ 'cover_image_url', 'imageUrl' ],
  [ 'retail_price', 'retailPrice' ],
  [ 'original_retail_price', 'originalRetailPrice' ],
];

/**
 * Represents set of data that will be used across the application
 * in order to keep store and actual data objects clean & tidy
 */
export default class Activity extends BaseDataEntity {
  constructor(data) {
    const config = super(propsMap, data);

    const retailPrice = {
      formattedValue: config.retailPrice.formatted_value,
      value: config.retailPrice.value,
    };

    const originalRetailPrice = {
      formattedValue: config.originalRetailPrice.formatted_value,
      value: config.retailPrice.value,
    };

    const bestPrice = this.discount > 0
      ? retailPrice.value
      : originalRetailPrice.value;

    return {
      ...config,
      retailPrice,
      originalRetailPrice,
      bestPrice,
    };
  }
}
