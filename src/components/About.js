import React, { Component } from 'react';
import { Link } from 'react-router'

class About extends Component {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
  }

  render() {
    var pStyle = { height: '100vh' };
    return (
      <div>
      <div className="container-text-body">
      <div className="container">
      <p style={pStyle}><b>ABOUT THE SMART HOME CHECKLIST</b>
      <br></br><br></br>
      The Smart Home Checklist is a free service designed and developed by CRT Labs, the research and development group operated by the National Association of REALTORS’® Center for REALTOR® Technology.
      <br></br><br></br>
      The Smart Home Checklist makes it easy to create an inventory of smart home devices, and it provides resources (provided by our content partner Smart Home DB (smarthomedb.com) to help you manage those devices.
      <br></br><br></br>
      Read our <Link to={`privacy`}>privacy policy</Link> and <Link to={`terms`}>terms of use</Link>.
      <br></br><br></br>
      Send us <a href="mailto:feedback@crtlabs.org?Subject=Smart%20Home%20Checklist%20Feedback">feedback</a>.
      </p>
      </div>
      </div>
      </div>
    );
  }
}

export default About;
