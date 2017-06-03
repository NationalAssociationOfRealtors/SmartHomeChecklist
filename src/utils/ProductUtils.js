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
    console.log("writing products");
    console.log(products);
    localStorage.setObject('products', products);
  },

  fetch() {
    return new Promise((resolve, reject) => {
      fetch("/products.json").then((response) => {
        return response.json();
      }).then((products) => {
        fetch("/manufacturer_ranking.json").then((response) => {
          return response.json()
        }).then((manufacturers) => {
          resolve(this.transform(products, manufacturers))
        })
      });
    });
  },

  transform(products, manufacturers) {
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

    products.forEach(row => {
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
    //Sort products by manufacturer
    for(var g in byGroup){
      byGroup[g].sort(function(a, b){
        return Math.sign(manufacturers.indexOf(byId[a].manufacturer) - manufacturers.indexOf(byId[b].manufacturer));
      });
    }
    return {
      byId: byId,
      byGroup: byGroup
    };
  },

  groupSlugMapping(groupNames) {
    const mappings = {};

    groupNames.forEach(name => {
      // Map name to slug
      mappings[name] =  name.toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-');
    });

    // Reverse mappings
    _.keys(mappings).forEach(name => {
      mappings[mappings[name]] = name;
    });

    return mappings;
  }
}

export default ProductUtils;
