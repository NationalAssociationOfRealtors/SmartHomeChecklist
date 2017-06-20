import React, { Component } from 'react';
import { Link } from 'react-router'
import _ from 'lodash';
import PropertyUtils from '../utils/PropertyUtils'
import ProductUtils from '../utils/ProductUtils'
import logo from '../images/checkbox.svg';
import nar_logo from '../images/master-logo.png'
import '../styles/main.css';
import icons from '../icons.js';
//import {Layout, Flex, Fixed} from '.';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: null,
      products: null
    };
  }

  componentWillMount() {
    // Test for localStorage
    try {
      localStorage.setObject('test', true);
    } catch (e) {
      if (e.name == 'QuotaExceededError') {
        alert('Please quit out of Private Browsing mode');
      } else {
        throw e;
      }
    }

    // Get properties from localStorage
    this.setState({properties: PropertyUtils.getFromStorage()});

    // Get products from localStorage
    this.setState({products: ProductUtils.getFromStorage()});

    // Fetch new products from remote csv
    this.fetchProducts();

    // Poll for new products every 5 minutes
    setInterval(() => this.fetchProducts(), 1000*60*5);

    // Preload product group icons
    this.preloadImages();
  }
/*
/*
<header className="App-logo">
  <div className="container">
    <Link to="/"><img src={logo} alt="Smart Home Checklist" width="54" /></Link>
    <div className="logo-text">
      <h1>Smart Home Checklist</h1>
      <span>Transfer ownership of smart devices wisely</span>
    </div>
  </div>
</header><footer className="App-footer">
  <div className="container">
    <div className="footer-text">
      <ul>
        <li><Link to={`/`}>HOME</Link></li>
        <li><a href="https://crtlabs.org/about">ABOUT</a></li>
        <li><a href="mailto:feedback@crtlabs.org?Subject=Smart%20Home%20Checklist%20Feedback">FEEDBACK</a></li>
        <li><Link to={`terms`}>TERMS OF USE</Link></li>
        <li><Link to={`privacy`}>PRIVACY POLICY</Link></li>
      </ul>
      <Link to="/"><img src={nar_logo} alt="National Association of Realtors" width="200" /></Link>
      <br></br>
      <span>Designed and built by CRT Labs, the technology research and development center of the National Association of REALTORS&#174;.</span>
      <br></br><br></br>
      <span>&#169;2017 The National Association of REALTORS&#174;.</span>
    </div>
  </div>
</footer>*/

  preloadImages() {
    const images = [];

    _.values(icons).map(svg => {
      const image = new Image();
      image.src = svg;

      return images.push(image);
    });

    return images;
  }

  fetchProducts() {
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

      return {properties};
    }, callback);
  }

  renameProperty(id, name, callback) {
    this.setState((state, props) => {
      const {properties} = state;

      // Rename property
      let property = properties[id];
      property.name = name;

      properties[id] = property;

      // Save to localStorage
      PropertyUtils.setToStorage(properties);

      return {properties};
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

  addProduct(propertyId, productId, callback) {
    this.setState((state, props) => {
      const {properties} = state;

      // Add product to property checklist
      properties[propertyId].products.push(productId);

      // Save to localStorage
      PropertyUtils.setToStorage(properties);

      return {properties: properties}
    }, callback);
  }

  deleteProduct(propertyId, productId, callback) {
    this.setState((state, props) => {
      const {properties} = state;
      let {products} = properties[propertyId];

      // Delete product
      properties[propertyId].products = _.remove(products, (id) => {
        // TODO - figure out why !== works correctly instead of ==
        // https://lodash.com/docs/4.17.4#remove
        return id !== productId;
      });

      // Save to localStorage
      PropertyUtils.setToStorage(properties);

      return {properties: properties}
    }, callback);
  }

  render() {
    let content;

    if (!_.isNull(this.state.properties)) {
      content = React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {
          products: this.state.products,
          properties: this.state.properties,
          methods: {
            createProperty: this.createProperty.bind(this),
            deleteProperty: this.deleteProperty.bind(this),
            renameProperty: this.renameProperty.bind(this),
            addProduct: this.addProduct.bind(this),
            deleteProduct: this.deleteProduct.bind(this)
          }
        })
      });
    } else {
      content = (
        <div className="App-loading">Loading...</div>
      );
    }
    return (
      <div>
      <header className="App-logo">
        <div className="container">
          <Link to="/"><img src={logo} alt="Smart Home Checklist" width="54" /></Link>
          <div className="logo-text">
            <h1>Smart Home Checklist</h1>
            <span>Transfer ownership of smart devices wisely</span>
          </div>
        </div>
      </header>

      {content}

<div className="footer">
<footer className="App-footer">
  <div className="container">
    <div className="footer-text">
      <ul>
        <li><Link to={`/`}>HOME</Link></li>
        <li><a href="https://crtlabs.org/about">ABOUT</a></li>
        <li><a href="mailto:feedback@crtlabs.org?Subject=Smart%20Home%20Checklist%20Feedback">FEEDBACK</a></li>
        <li><Link to={`terms`}>TERMS OF USE</Link></li>
        <li><Link to={`privacy`}>PRIVACY POLICY</Link></li>
      </ul>
      <Link to="/"><img src={nar_logo} alt="National Association of Realtors" width="200" /></Link>
      <br></br>
      <span>Designed and built by CRT Labs, the technology research and development center of the National Association of REALTORS&#174;.</span>
      <br></br><br></br>
      <span>&#169;2017 The National Association of REALTORS&#174;.</span>
    </div>
  </div>
</footer>
</div>
      </div>
    );
  }
}

export default App;
