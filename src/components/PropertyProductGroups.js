import React, { Component } from 'react';
import { Link } from 'react-router'
import _ from 'lodash';
import icons from '../icons.js';
import ProductUtils from '../utils/ProductUtils';

class PropertyProductGroups extends Component {
  componentWillMount() {
    this.preloadImages()
  }

  // Preloads first image in each group
  preloadImages() {
    const {products} = this.props;
    const groups = _.keys(products.byGroup);
    const images = [];

    groups.map(name => {
      const productId = products.byGroup[name][0]
      const image = new Image();

      image.src = products.byId[productId].image;        
      return images.push(image);
    });

    return images;
  }

  render() {
    const {propertyId, products} = this.props;
    const groups = _.keys(products.byGroup);
    const groupSlugs = ProductUtils.groupSlugMapping(_.keys(this.props.products.byGroup));

    return (
      <div className="PropertyProductGroups-container">
        <div className="container">
          <h3>Add some smart devices</h3>

          {groups.map(name => {
            if (icons[name]) {
              return (
                <Link to={`/property/${propertyId}/group/${groupSlugs[name]}`} className="category-icon" key={name}>
                  <img src={icons[name]} width="100%" alt={name} />
                  <span>{name}</span>
                </Link>
              );
            }
          })}

          <Link to={`/property/${propertyId}/productGroupsAll`} className="category-icon">
            <img src={icons["All Devices"]} width="100%" alt="More" />
            <span>All devices</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default PropertyProductGroups;
