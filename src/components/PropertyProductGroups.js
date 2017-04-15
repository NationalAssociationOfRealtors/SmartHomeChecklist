import React, { Component } from 'react';
import { Link } from 'react-router'
import _ from 'lodash';

class PropertyProductGroups extends Component {
  render() {
    const {propertyId, products} = this.props;
    const groups = _.keys(products.byGroup);

    return (
      <div>
        {groups.map(slug => {
          return (
            <div key={slug}>
              <Link to={`/property/${propertyId}/group/${slug}`}>{slug}</Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default PropertyProductGroups;
