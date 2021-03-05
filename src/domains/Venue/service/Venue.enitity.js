import BaseDataEntity from 'common/entities/Data.base.entity';

/**
 * explicit declaration of the set of prop that will be used across the application
 *
 * defines property names that will be used in application
 */
const propsMap = [
  [ 'id', 'id' ],
  [ 'events_count', 'eventsCount' ],
];

/**
 * Represents set of data that will be used across the application
 * in order to keep store and actual data objects clean & tidy
 */
export default class Vanue extends BaseDataEntity {
  constructor(data) {
    super(propsMap, data);
  }
}
