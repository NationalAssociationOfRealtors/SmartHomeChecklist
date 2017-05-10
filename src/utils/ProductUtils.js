import Papa from 'papaparse';
import './ObjectStorage'
import _ from 'lodash';
import ProductGroups from '../groups.json';

const ProductUtils = {
  getFromStorage() {
    if (localStorage.hasOwnProperty('products')) {
      return localStorage.getObject('products');
    }

    return {};
  },

  setToStorage(products) {
    localStorage.setObject('products', products);
  },

  fetch() {
    return new Promise((resolve, reject) => {
      Papa.parse('https://raw.githubusercontent.com/NationalAssociationOfRealtors/SmartHomeChecklist/master/sample-products.csv', {
        download: true,
        header: true,
        complete: (results, file) => {
          resolve(this.transform(results.data));
        },
        error: (error, file) => {
          reject(Error(error))
        }
      });
    });
  },

  transform(data) {
    const deviceClassGroups = {};
    const byId = {};
    const byGroup = {};
    
    _.keys(ProductGroups).forEach(group => {
      // Create hash of device classes to groups
      ProductGroups[group].forEach(device_class => {
        deviceClassGroups[device_class] = group;
      });

      // Initialize byGroup keys
      byGroup[group] = [];
    });

    data.forEach(row => {
      // Create hash of product ids
      byId[row.hash] = _.omit(row, ['hash'])

      // Create hash of groups
      let group = deviceClassGroups[row.device_class]

      if (group) {
        byGroup[group].push(row.hash)
      } else {
        console.log(`Warning: ${row.device_class} not assigned to a group`)
      }
    });

    return {
      byId: byId,
      byGroup: byGroup
    };
  }
}

export default ProductUtils;
