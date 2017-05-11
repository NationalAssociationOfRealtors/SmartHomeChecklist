import React, { Component } from 'react';
import { Link } from 'react-router'
import _ from 'lodash';
import moreIcon from '../images/categories/more.svg';

// Map icons to groups in groups.json
const icons = {
  "Thermostats": require('../images/categories/thermostats.svg'),
  "Lighting": require('../images/categories/lighting.svg'),
  "Locks": require('../images/categories/locks.svg'),
  "Appliances": require('../images/categories/appliances.svg'),
  "Cameras": require('../images/categories/cameras.svg')
};

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

    return (
      <div className="PropertyProductGroups-container">
        {groups.map(name => {
          if (icons[name]) {
            return (
              <Link to={`/property/${propertyId}/group/${name}`} className="category-icon" key={name}>
                <img src={icons[name]} width="100%" alt={name} />
                <span>{name}</span>
              </Link>
            );
          }
        })}

        <Link to={`/property/${propertyId}/productGroupsAll`} className="category-icon">
          <img src={moreIcon} width="100%" alt="More" />
          <span>All devices</span>
        </Link>
      </div>
    );
  }
}

export default PropertyProductGroups;
