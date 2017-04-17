import React, { Component } from 'react';

class PropertyProductGroup extends Component {
  handleAddProduct(productId) {
    this.props.methods.addProduct(this.props.propertyId, productId)
  }

  render() {
    const {products} = this.props;
    const {groupSlug} = this.props.params;
    const groupProducts = products.byGroup[groupSlug]

    return (
      <div>
        {groupProducts.map(id => {
          return (
            <div key={id}>
              {products.byId[id].device_name}
              <button onClick={() => this.handleAddProduct(id)}>Add</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default PropertyProductGroup;
