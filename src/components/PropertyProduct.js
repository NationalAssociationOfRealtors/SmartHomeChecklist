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

  render() {
    const {productId} = this.props.params;
    const {products} = this.props;
    const product = products.byId[productId];

    return (
      <div>
        {product.device_name}
        <button onClick={() => this.handleDeleteProduct()}>Remove</button>
      </div>
    );
  }
}

export default PropertyProduct;
