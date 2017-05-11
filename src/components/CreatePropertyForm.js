import React, { Component } from 'react';

class CreatePropertyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false
    };
  }

  onFocus() {
    this.setState({
      focused: true
    });
  }

  onBlur() {
    this.setState({
      focused: false
    });
  }

  render() {
    const containerClass = this.state.focused || this.props.propertyName ? 'focused' : '';

    return (
      <form onSubmit={(e) => this.props.onSubmit(e)}>
        <div className={`CreatePropertyForm-container ${containerClass}`}>
          <input type="text"
            value={this.props.propertyName} 
            onChange={(e) => this.props.onChange(e)}
            onFocus={() => this.onFocus()}
            onBlur={() => this.onBlur()}
            required  
          />

          <span className="label onBlur">Hi.</span>

          <label onClick={() => this.onLabelClick()}>{this.props.labelText}</label>

          <span className="help onFocus">{this.props.helpText}</span>

          <input type="submit" className="onFocus" value={this.props.buttonText} />
        </div>
      </form>
    );
  }
}

export default CreatePropertyForm;
