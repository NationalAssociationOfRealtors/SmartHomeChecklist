import React, { Component } from 'react';
import { Link } from 'react-router'
import _ from 'lodash';
import PropertyUtils from '../utils/PropertyUtils';
import PropertyForm from './shared/PropertyForm';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      propertyName: ''
    };
  }

  handlePropertyNameChange(event) {
    this.setState({propertyName: event.target.value});
  }

  handlePropertyFormSubmit(event) {
    event.preventDefault(); 
    
    this.props.methods.createProperty(PropertyUtils.newProperty(this.state.propertyName))
  }

  render() {    
    const properties = this.props.properties;

    return (
      <div className="Home-properties">
        <PropertyForm 
          labelText="Create a new property list"
          buttonText="Create"
          propertyName={this.state.propertyName}
          onChange={(e) => this.handlePropertyNameChange(e)}
          onSubmit={(e) => this.handlePropertyFormSubmit(e)}
          />

        {_.keys(properties).map(id => {
          return (
            <div key={id} className="property">
              <Link to={`/property/${id}`}>{properties[id].name}</Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Home;
