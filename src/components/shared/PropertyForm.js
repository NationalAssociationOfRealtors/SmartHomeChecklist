import React, { Component } from 'react';

class PropertyForm extends Component {

  render() {
    return (
      <div className="PropertyForm">
        <form onSubmit={(e) => this.props.onSubmit(e)}>
          <label>{this.props.labelText}</label>
          <input type="text"
            value={this.props.propertyName} 
            placeholder="Property Name"
            onChange={(e) => this.props.onChange(e)}
            required  
            autoFocus
          />

          <span>(be mindful; your clients may see this name)</span>

          <input type="submit" value={this.props.buttonText} />
        </form>
      </div>
    );
  }
}

export default PropertyForm;
