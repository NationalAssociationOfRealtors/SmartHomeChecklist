import guid from './guid'
import './ObjectStorage'

const PropertyUtils = {
  getFromStorage() {
    if (localStorage.hasOwnProperty('properties')) {
      return localStorage.getObject('properties');
    }

    return {};
  },

  setToStorage(properties) {
    localStorage.setObject('properties', properties);
  },
  
  newProperty(name, products = []) {
    const id = guid();

    const property = {
      id,
      name,
      products
    };

    return property;
  }
}

export default PropertyUtils;