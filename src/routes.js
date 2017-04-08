import React from 'react';
import { Router, IndexRoute, Route } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import Page from './components/Page';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="page" component={Page} />
    </Route>
  </Router>
);

export default Routes;
