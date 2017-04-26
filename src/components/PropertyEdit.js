import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import PropertyForm from './shared/PropertyForm';

class PropertyEdit extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      propertyName: props.property.name
    };
  }
 
  handleDeleteProperty() {
    const {methods, propertyId} = this.props;

    // Delete property
    methods.deleteProperty(propertyId)

    // Redirect to home screen
    browserHistory.push('/');
  }

  handlePropertyNameChange(event) {
    this.setState({propertyName: event.target.value});
  }

  handlePropertyFormSubmit(event) {
    event.preventDefault();

    const {methods, propertyId} = this.props;
    const {propertyName} = this.state;

    methods.renameProperty(propertyId, propertyName, () => {
      browserHistory.push(`/property/${propertyId}`);
    });
  }

  render() {
    return (
      <div>
        <div className="PropertyEdit-form">
          <PropertyForm 
            labelText="Rename property"
            buttonText="Update"
            propertyName={this.state.propertyName}
            onChange={(e) => this.handlePropertyNameChange(e)}
            onSubmit={(e) => this.handlePropertyFormSubmit(e)}
            />
        </div>

        <div className="PropertyEdit-actions">
          <button onClick={this.handleDeleteProperty.bind(this)}>Delete Property</button>
        </div>
      </div>
    );
  }
}

export default PropertyEdit;
