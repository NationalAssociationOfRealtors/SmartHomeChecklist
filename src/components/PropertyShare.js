import React, { Component } from 'react';
import querystring from 'querystring';

class PropertyShare extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      focused: false
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

    return `mailto:${email}?subject=${escape(`Smart Home Checklist for ${property.name}`)}&body=Click on the link below to access an inventory of smart home devices that was prepared for you. Click on each smart device to access reset instructions, FAQs, smart home playbooks and other information. ${escape(this.shareUrl())}`;
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

  isValidEmail(email) {
    var regex = /\S+@\S+\.\S+/;

    return regex.test(email);
  }

  render() {
    const isValidEmail = this.isValidEmail(this.state.email);
    const containerClass = this.state.focused || this.state.email ? 'focused' : '';

    return (
      <div className="container">
        <div className={`PropertyShare-container ${containerClass}`}>
          <input type="email"
            value={this.state.email}
            onChange={(e) => this.handleEmailChange(e)}
            onFocus={() => this.onFocus()}
            onBlur={() => this.onBlur()}
            required
            />

          <label>Recipient's email address</label>

          {isValidEmail ? <a target="_blank" href={this.mailTo()} className="onFocus">Share</a> : <span className="onFocus">Share</span>}
        </div>
      </div>
    );
  }
}

export default PropertyShare;
