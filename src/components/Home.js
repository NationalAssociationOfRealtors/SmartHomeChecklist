import React, { Component } from 'react';
import { Link } from 'react-router'
import _ from 'lodash';
import PropertyUtils from '../utils/PropertyUtils'

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
      <div>
        {_.keys(properties).map(id => {
          return (
            <div key={id}>
              <Link to={`/property/${id}`}>{properties[id].name}</Link>
            </div>
          );
        })}

        <form onSubmit={(e) => this.handlePropertyFormSubmit(e)}>
          <input type="text"
            value={this.state.propertyName} 
            placeholder="Property Name"
            onChange={(e) => this.handlePropertyNameChange(e)}
            required  
          />

          <input type="submit" value="Create Property" />
        </form>
      </div>
    );
  }
}

export default Home;
