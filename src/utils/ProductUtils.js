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
    const self = this;

    return new Promise((resolve, reject) => {
      Papa.parse('https://raw.githubusercontent.com/NationalAssociationOfRealtors/SmartHomeChecklist/master/sample-products.csv', {
        download: true,
        header: true,
        complete: (results, file) => {
          resolve(self.transform(results.data));
        },
        error: (error, file) => {
          reject(Error(error))
        }
      });
    });
  },

  transform(data) {
    let products = {};
    
    // Create hash of products by id ('hash' property)
    data.forEach(row => {
      products[row.hash] = _.omit(row, ['hash'])
    });

    return products;
  }
}

export default ProductUtils;