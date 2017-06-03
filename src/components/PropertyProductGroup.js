import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'
import SwipeableViews from 'react-swipeable-views';
import _ from 'lodash';
import ProductUtils from '../utils/ProductUtils';

class PropertyProductGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slideIndex: 0
    };
  }

  componentWillMount() {
    this.preloadImages()
  }

  // Preloads next image in list
  preloadImages(index = 0) {
    const {products} = this.props;
    const images = [];

    this.productsByGroup().slice(index+1, index+2).map(id => {
      const image = new Image();
      image.src = products.byId[id].image;

      return images.push(image);
    });

    return images;
  }

  productsInList() {
    const {property} = this.props;
    const products = {};

    property.products.map((id) => {
      products[id] = true;
    });

    return products;
  }

  productsByGroup() {
    const {products} = this.props;
    const {groupSlug} = this.props.params;

    const slugToNameMappings = ProductUtils.groupSlugMapping(_.keys(this.props.products.byGroup));

    return products.byGroup[slugToNameMappings[groupSlug]];
  }

  handleAddProduct(productId) {
    const {propertyId} = this.props;

    return this.props.methods.addProduct(propertyId, productId, () => {
      // Indicate that product was saved in query string
      browserHistory.push(`/property/${propertyId}?saved=1`);
    });
  }

  setSlideIndex(index) {
    if (_.isInteger(index)) { // Only handle fully-swiped views
      this.setState({
        slideIndex: index
      }, () => {
        return this.preloadImages(index)
      });
    }
  }

  render() {
    const {products, propertyId} = this.props;
    const {groupSlug} = this.props.params;
    const productsByGroup = this.productsByGroup();
    const productsInList = this.productsInList();

    return (
      <div className="PropertyProductGroup-container">
        <div className="container">
          <div className="breadcrumb">
            <Link onClick={browserHistory.goBack}>&laquo; Back</Link>
          </div>
        </div>

        <div className="products">
           <div className="container">
            <SwipeableViews index={this.state.slideIndex} onSwitching={(index) => this.setSlideIndex(index)}>
              {productsByGroup.map((id, index) => {
                return (
                  <div className="product-view" key={id}>
                    <div className="product-header">
                      <span className="counter">
                        {index > 0 &&
                          <button className="arrow" onClick={() => this.setSlideIndex(index-1)}>&laquo;</button>}

                        {index+1} of {productsByGroup.length}

                        {(index+1) < productsByGroup.length &&
                          <button className="arrow" onClick={() => this.setSlideIndex(index+1)}>&raquo;</button>}
                      </span>
                      <span className="product-name">{products.byId[id].device_name}</span>
                    </div>
                    <div className="product-image">
                      {index == this.state.slideIndex &&
                        <img alt={products.byId[id].device_name} src={products.byId[id].image} width="60%" />}
                      {index !== this.state.slideIndex &&
                        <img alt={products.byId[id].device_name} width="60%" />}                        
                    </div>
                    <div className="actions">
                      {!productsInList[id] && <button className="button" onClick={() => this.handleAddProduct(id)}>Add to list</button>}
                      {productsInList[id] && <span className="button">Add to list</span>}
                    </div>
                  </div>
                );
              })}
            </SwipeableViews>
          </div>
        </div>
      </div>
    );
  }
}

export default PropertyProductGroup;
