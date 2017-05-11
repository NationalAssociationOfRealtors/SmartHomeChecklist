import React, { Component } from 'react';
import { Link } from 'react-router'
import querystring from 'querystring';

class PropertyChecklist extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      hideAlert: false
    };
  }
  
  componentWillMount() {
    this.preloadImages()
  }

  // When a product is added to a list, user is redirected with query string ?saved=1
  shouldDisplayAlert() {
    const {saved} = querystring.parse(window.location.search.substr(1));

    return !!saved && !this.state.hideAlert;
  }

  hideAlert() {
    this.setState({
      hideAlert: true
    });
  }

  preloadImages() {
    const {products, property} = this.props;
    const images = [];

    property.products.map(id => {
      const image = new Image();
      image.src = products.byId[id].image;
      
      return images.push(image);
    });

    return images;
  }

  render() {
    const {products, propertyId, property} = this.props;

    return (
      <div className="PropertyChecklist-container">
        {this.shouldDisplayAlert() &&
          <div className="alert">
            <button onClick={() => this.hideAlert()}>hide</button>
            Device successfully added
          </div>
        }

        {property.products.length > 0 &&
          <div>
            <div className="PropertyChecklist-products">
              {property.products.map(id => {
                return (
                  <div key={id}>
                    <Link className="product" to={`/property/${propertyId}/product/${id}`}>
                      {products.byId[id].device_name}
                    </Link>
                  </div>
                );
              })}

              <Link className="add-more" to={`/property/${propertyId}/productGroups`}>Add more</Link>
            </div>

            <div className="actions">
              <Link to={`/property/${propertyId}/share`}>Share</Link>
              <Link to={`/property/${propertyId}/edit`}>Edit</Link>
            </div>
          </div>
        }

        {property.products.length === 0 &&
          <div>
            <div className="actions blank-state">
              <Link className="add-more" to={`/property/${propertyId}/productGroups`}>Add products to list</Link>
              <Link to={`/property/${propertyId}/edit`}>Edit</Link>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default PropertyChecklist;
