import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import PropertyUtils from '../utils/PropertyUtils'
import querystring from 'querystring';

class ReceiveProperty extends Component {
  constructor(props) {
    super(props);

    this.state = {
      propertySaved: false
    };
  }

  componentWillMount() {
    // Get params from query string
    const {name, products} = querystring.parse(window.location.search.substr(1));

    // Create property object
    const property = PropertyUtils.newProperty(name, products);

    // Save property
    this.props.methods.createProperty(property, () => {
      // Redirect user to property
      browserHistory.push(`/property/${property.id}`);
    });
  }

  render() {
    return (
      <div className="App-loading">
        Loading...
      </div>
    );
  }
}

export default ReceiveProperty;
