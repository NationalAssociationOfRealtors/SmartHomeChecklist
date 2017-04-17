import React, { Component } from 'react';
import { Link } from 'react-router'
import _ from 'lodash';

class PropertyWrapper extends Component {  
  render() {
    const propertyId = this.props.params.propertyId;
    const property = this.props.properties[propertyId];
    const propsForChildren = {...this.props, propertyId, property};

    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, propsForChildren);
    });
    
    if (!_.isEmpty(this.props.products)) {
      return (
        <div>
          <h3><Link to={`/property/${propertyId}`}>{property.name}</Link></h3>

          {childrenWithProps}
        </div>
      );
    } else {
      return (
        <div>
          Loading... make sure your device is connected to the internet.
        </div>
      );
    }
  }
}

export default PropertyWrapper;
