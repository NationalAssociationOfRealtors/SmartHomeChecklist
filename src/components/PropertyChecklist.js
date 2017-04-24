import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'

class PropertyChecklist extends Component {  
  handleDeleteProperty(e) {
    e.preventDefault();

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
        <Link to={`/property/${propertyId}/productGroups`}>Add more</Link>
        <br />
        <Link to={`/property/${propertyId}/share`}>Share</Link>
        <br />
        <a href onClick={this.handleDeleteProperty.bind(this)}>Delete</a>

        {property.products.map(id => {
          return (
            <div key={id}>
              {products.byId[id].device_name}
            </div>
          );
        })}
      </div>
    );
  }
}

export default PropertyChecklist;
