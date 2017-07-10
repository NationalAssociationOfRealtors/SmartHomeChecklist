import React, { Component } from 'react';
import { browserHistory } from 'react-router'

class PropertyProduct extends Component {
  handleDeleteProduct() {
    const {methods, propertyId} = this.props;
    const {productId} = this.props.params;

    methods.deleteProduct(propertyId, productId, () => {
      browserHistory.push(`/property/${propertyId}`);
    });
  }

  checkValidLink(input) {
    if ((input === null) || (input === "http://") || (input === "")) {
      return null;
    }
    return input;
  }

  render() {
    const {productId} = this.props.params;
    const {products} = this.props;
    const product = products.byId[productId];
    console.log(product);
    return (
      <div className="PropertyProduct-container">
        <div className="product">
          <div className="container">
            <div className="product-view">
              <div className="product-header">
                <span className="product-name">{product.device_name}</span>
              </div>
              <div className="product-image">
                <img alt={product.device_name} src={product.image} width="60%" />
              </div>
              <div className="product-info">
                {this.checkValidLink(product.shdb_url) && <a href={product.shdb_url} target="_blank">View on SmartHomeDB &raquo;</a>}
                {this.checkValidLink(product.website) && <a href={product.website} target="_blank">Device Website &raquo;</a>}
                {this.checkValidLink(product.support) && <a href={product.support} target="_blank">Device Support &raquo;</a>}
              </div>
              <div className="actions">
                <button className="button" onClick={() => this.handleDeleteProduct()}>Remove from list</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PropertyProduct;
