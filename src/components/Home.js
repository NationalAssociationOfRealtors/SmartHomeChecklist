import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'
import _ from 'lodash';
import PropertyUtils from '../utils/PropertyUtils';
import CreatePropertyForm from './CreatePropertyForm';

class Home extends Component {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
    this.state = {
      propertyName: ''
    };
  }

  handlePropertyNameChange(event) {
    this.setState({propertyName: event.target.value});
  }

  handlePropertyFormSubmit(event) {
    event.preventDefault();

    const property = PropertyUtils.newProperty(this.state.propertyName);

    this.props.methods.createProperty(property, () => {
      browserHistory.push(`/property/${property.id}/productGroups`);
    });
  }

  render() {
    const properties = this.props.properties;

    return (
      <div>
        <div className="container">
          <div className="Home-form-container">
            <CreatePropertyForm
              labelText="Create a new property list"
              helpText="Be mindful – your clients may see this name"
              buttonText="Create"
              propertyName={this.state.propertyName}
              onChange={(e) => this.handlePropertyNameChange(e)}
              onSubmit={(e) => this.handlePropertyFormSubmit(e)}
              />
          </div>
        </div>

        {_.keys(properties).length > 0 &&
          <div className="Home-properties">
            <div className="container">
              {_.keys(properties).reverse().map(id => {
                return (
                  <div key={id} className="property">
                    <Link to={`/property/${id}`}>{properties[id].name}</Link>
                  </div>
                );
              })}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Home;
