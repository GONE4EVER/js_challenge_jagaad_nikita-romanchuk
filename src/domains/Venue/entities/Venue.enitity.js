const propsMap = [
  [ 'meta_title', 'metaTitle' ],
  [ 'events_count', 'eventsCount' ],
  [ 'id', 'id' ],
  [ 'description', 'description' ],
  [ 'address', 'address' ],
  [ 'status', 'status' ],
];

export default class Vanue {
  constructor(data) {
    const config = propsMap.reduce((result, prop) => {
      const [ srcName, newName ] = prop;

      result[newName] = data[srcName];

      return result;
    }, {});

    const coordinates = {
      latitude: data.latitude,
      longitude: data.longitude,
    };

    return {
      ...config,
      coordinates,
    };
  }
}
