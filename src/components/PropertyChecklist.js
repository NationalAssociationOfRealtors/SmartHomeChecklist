import React, { Component } from 'react';
import { Link } from 'react-router'

class PropertyChecklist extends Component {  

  render() {
    const {products, propertyId, property} = this.props;

    return (
      <div>
        <Link to={`/property/${propertyId}/productGroups`}>Add more</Link>
        <br />
        <Link to={`/property/${propertyId}/share`}>Share</Link>
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
