import React, { Component } from 'react';
import { Link } from 'react-router'
import _ from 'lodash';
import ProductUtils from '../utils/ProductUtils';

class PropertyProductGroupsAll extends Component {
  render() {
    const {propertyId, products} = this.props;
    const groups = _.keys(products.byGroup);
    const groupSlugs = ProductUtils.groupSlugMapping(_.keys(this.props.products.byGroup));

    return (
      <div className="PropertyProductGroups-container">
        <div className="container">
          <div className="all">
            <h3>All Smart Device Types</h3>
            {_.sortBy(groups, [function(i) { return i; }]).map(name => {
              return (
                <div key={name}>
                  <Link to={`/property/${propertyId}/group/${groupSlugs[name]}`} key={name}>
                    {name}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default PropertyProductGroupsAll;
