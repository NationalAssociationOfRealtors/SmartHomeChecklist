import React, { Component } from 'react';
import _ from 'lodash';
import PropertyUtils from '../utils/PropertyUtils'
import ProductUtils from '../utils/ProductUtils'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: null,
      products: null
    };
  }

  componentWillMount() {
    // Get properties from localStorage
    this.setState({properties: PropertyUtils.getFromStorage()});

    // Get products from localStorage
    this.setState({products: ProductUtils.getFromStorage()});
    
    // Fetch new products from remote csv
    this.fetchProperties()

    // Poll for new products every 5 minutes
    setInterval(() => this.fetchProperties(), 1000*60*5)
  }

  fetchProperties() {
    // Fetch new products from remote csv
    ProductUtils.fetch().then(products => {
      ProductUtils.setToStorage(products)

      this.setState({products: products})
    })
  }

  createProperty(property, callback) {
    this.setState((state, props) => {      
      const {properties} = state;

      // Add new property to user's properties
      properties[property.id] = _.omit(property, ['id'])

      // Save to localStorage
      PropertyUtils.setToStorage(properties);

      return {properties: properties};
    }, callback);
  }

  deleteProperty(id) {
    this.setState((state, props) => {      
      let {properties} = state;

      // Remove property
      properties = _.omit(properties, [id])

      // Save to localStorage
      PropertyUtils.setToStorage(properties);

      return {properties: properties};
    });
  }

  addProduct(propertyId, productId) {
    this.setState((state, props) => {
      const {properties} = state;

      // Add product to property checklist
      properties[propertyId].products.push(productId);

      // Save to localStorage
      PropertyUtils.setToStorage(properties);

      return {properties: properties}
    });
  }

  render() {
    if (!_.isNull(this.state.properties)) {
      const childrenWithProps = React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {
          products: this.state.products,
          properties: this.state.properties,
          methods: {
            createProperty: this.createProperty.bind(this),
            deleteProperty: this.deleteProperty.bind(this),
            addProduct: this.addProduct.bind(this)
          }
        })
      });

      return (
        <div>
          {childrenWithProps}
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}

export default App;