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
   
  createProperty(properties, newProperty) {
    const property = {
      name: newProperty.name,
      products: newProperty.products || []
    };

    // Create id for property
    properties[guid()] = property;

    return properties;
  }
}

export default PropertyUtils;