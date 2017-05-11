import React, { Component } from 'react';
import querystring from 'querystring';

class PropertyShare extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  shareUrl() {
    const {name, products} = this.props.property;

    const qs = querystring.stringify({name, products});

    return `${process.env.REACT_APP_BASE_URL}/receive?${qs}`;
  }

  mailTo() {
    const {property} = this.props;
    const email = this.state.email;

    return `mailto:${email}?subject=${escape(`Smart Home Checklist for ${property.name}`)}&body=${escape(this.shareUrl())}`;
  }

  isValidEmail(email) {
    var regex = /\S+@\S+\.\S+/;

    return regex.test(email);
  }

  render() {
    const isValidEmail = this.isValidEmail(this.state.email);

    return (
      <div className="container">
        <div className="PropertyShare-container">
          <input type="text"
            value={this.state.email} 
            placeholder="Email Address"
            onChange={(e) => this.handleEmailChange(e)}
            required  
            />
          
          {isValidEmail ? <a target="_blank" href={this.mailTo()}>Share</a> : <span>Share</span>}
        </div>
      </div>
    );
  }
}

export default PropertyShare;
