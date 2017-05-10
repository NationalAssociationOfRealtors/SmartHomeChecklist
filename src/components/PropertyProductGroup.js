import React, { Component } from 'react';
import { Link } from 'react-router'
import SwipeableViews from 'react-swipeable-views';

class PropertyProductGroup extends Component {
  componentWillMount() {
    this.preloadImages()
  }

  preloadImages() {
    const {products} = this.props;
    const images = [];

    this.productsByGroup().map(id => {
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

    return products.byGroup[groupSlug];
  }

  handleAddProduct(productId) {
    return this.props.methods.addProduct(this.props.propertyId, productId)
  }

  render() {
    const {products, propertyId} = this.props;
    const {groupSlug} = this.props.params;
    const productsByGroup = this.productsByGroup();
    const productsInList = this.productsInList();

    return (
      <div className="PropertyProductGroup-container">
        <div className="breadcrumb">
          <Link to={`/property/${propertyId}/productGroups`}>&laquo; {groupSlug}</Link>
        </div>

        <div className="products">
          <SwipeableViews>
            {productsByGroup.map((id, index) => {
              return (
                <div className="product-view" key={id}>
                  <div className="product-header">
                    <span className="counter">{index+1} of {productsByGroup.length}</span>
                    <span className="product-name">{products.byId[id].device_name}</span>
                  </div>
                  <div className="product-image">
                    <img alt={products.byId[id].device_name} src={products.byId[id].image} width="60%" />
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
    );
  }
}

export default PropertyProductGroup;
