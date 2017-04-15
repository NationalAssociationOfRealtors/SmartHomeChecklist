import Papa from 'papaparse';
import './ObjectStorage'
import _ from 'lodash';

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
    let byId = {};
    let byGroup = {};

    data.forEach(row => {
      // Create hash of product ids
      byId[row.hash] = _.omit(row, ['hash'])

      // Create hash of groups
      byGroup[row.device_class] = byGroup[row.device_class] || []
      byGroup[row.device_class].push(row.hash)
    });

    return {
      byId: byId,
      byGroup: byGroup
    };
  }
}

export default ProductUtils;
