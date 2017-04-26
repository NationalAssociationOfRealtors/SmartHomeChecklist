import React, { Component } from 'react';

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

  productsByGroup() {
    const {products} = this.props;
    const {groupSlug} = this.props.params;

    return products.byGroup[groupSlug];
  }

  handleAddProduct(productId) {
    return this.props.methods.addProduct(this.props.propertyId, productId)
  }

  render() {
    const {products} = this.props;

    return (
      <div>
        {this.productsByGroup().map(id => {
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
