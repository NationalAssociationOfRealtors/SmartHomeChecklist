import React, { Component } from 'react';
import { Link } from 'react-router'
import _ from 'lodash';

class PropertyWrapper extends Component {  
  render() {
    const propertyId = this.props.params.propertyId;
    const property = this.props.properties[propertyId];
    const propsForChildren = {...this.props, propertyId, property};
    
    if (!_.isEmpty(this.props.products)) {
      const childrenWithProps = React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, propsForChildren);
      });

      return (
        <div>
          <div className="PropertyWrapper-header">
            <div className="container">
              <div className="inner">
                <Link to={`/property/${propertyId}`}>{property.name}</Link>
              </div>
            </div>
          </div>

          {childrenWithProps}
        </div>
      );
    } else {
      return (
        <div className="App-connection-error">
          No internet connection detected. 
          <br />
          <a href="/">Refresh page</a>
        </div>
      );
    }
  }
}

export default PropertyWrapper;
