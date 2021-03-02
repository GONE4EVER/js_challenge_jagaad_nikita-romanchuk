const propsMap = [
  [ 'id', 'id' ],
  [ 'events_count', 'eventsCount' ],
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
