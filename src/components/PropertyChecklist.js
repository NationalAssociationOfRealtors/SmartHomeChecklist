import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'

class PropertyChecklist extends Component {  
  componentWillMount() {
    this.preloadImages()
  }

  preloadImages() {
    const {products, property} = this.props;
    const images = [];

    property.products.map(id => {
      const image = new Image();
      image.src = products.byId[id].image;
      
      images.push(image);
    });

    return images;
  }

  handleDeleteProperty() {
    const {methods, propertyId} = this.props;

    // Delete property
    methods.deleteProperty(propertyId)

    // Redirect to home screen
    browserHistory.push('/');
  }

  render() {
    const {products, propertyId, property} = this.props;

    return (
      <div>
        {property.products.map(id => {
          return (
            <div key={id} className="PropertyChecklist-product">
              <Link to={`/property/${propertyId}/product/${id}`}>
                {products.byId[id].device_name}
              </Link>
            </div>
          );
        })}

        <Link to={`/property/${propertyId}/productGroups`}>Add more</Link>
        <br />
        <Link to={`/property/${propertyId}/share`}>Share</Link>
        <br />
        <button onClick={this.handleDeleteProperty.bind(this)}>Delete Property</button>
      </div>
    );
  }
}

export default PropertyChecklist;
