class BaseEntity {
  constructor(propsMap, dataSource) {
    const config = propsMap.reduce((result, prop) => {
      const [ srcName, newName ] = prop;

      result[newName] = dataSource[srcName];

      return result;
    }, {});

    return config;
  }
}

export default BaseEntity;
