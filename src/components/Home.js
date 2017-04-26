import React, { Component } from 'react';
import { Link } from 'react-router'
import _ from 'lodash';
import PropertyUtils from '../utils/PropertyUtils';
import PropertyForm from './shared/PropertyForm';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      propertyName: '',
      showForm: false
    };
  }

  showForm() {
    this.setState({showForm: true})
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
      <div>
        <div className="Home-form-container">

          {!this.state.showForm && 
            <div className="toggle-property-form">
              <span>Hi</span>
              <button onClick={this.showForm.bind(this)}>Create a new property list</button>
            </div>
          }

          {this.state.showForm && 
            <PropertyForm 
              labelText="Create a new property list"
              buttonText="Create"
              propertyName={this.state.propertyName}
              onChange={(e) => this.handlePropertyNameChange(e)}
              onSubmit={(e) => this.handlePropertyFormSubmit(e)}
              />
          }
        </div>

        <div className="Home-properties">
          {_.keys(properties).map(id => {
            return (
              <div key={id} className="property">
                <Link to={`/property/${id}`}>{properties[id].name}</Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
