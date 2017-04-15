import React, { Component } from 'react';
import { Link } from 'react-router'
import _ from 'lodash';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      propertyName: ''
    };

    this.handlePropertyNameChange = this.handlePropertyNameChange.bind(this);
    this.handlePropertyFormSubmit = this.handlePropertyFormSubmit.bind(this);
  }

  handlePropertyNameChange(event) {
    this.setState({propertyName: event.target.value});
  }

  handlePropertyFormSubmit(event) {
    event.preventDefault();
    this.props.methods.handleCreateProperty({name: this.state.propertyName})
  }

  render() {    
    const properties = this.props.properties;

    return (
      <div>
        Welcome! <Link to={`/page`}>Go to page</Link>

        {_.keys(properties).map(id => {
            return (
              <div key={id}>
                {properties[id].name}
              </div>
            );
        })}

        <form onSubmit={this.handlePropertyFormSubmit}>
          <input type="text"
            value={this.state.propertyName} 
            placeholder="Property Name"
            onChange={this.handlePropertyNameChange}
            required  
          />

          <input type="submit" value="Create Property" />
        </form>
      </div>
    );
  }
}

export default Home;
