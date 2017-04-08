import React, { Component } from 'react';
import { Link } from 'react-router'

class Home extends Component {

  render() {
 
    return (
      <div>
        Welcome! <Link to={`/page`}>Go to page</Link>
      </div>
    );
  }
}

export default Home;
