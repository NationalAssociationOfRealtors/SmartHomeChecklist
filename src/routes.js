import React from 'react';
import { Router, IndexRoute, Route } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import PropertyWrapper from './components/PropertyWrapper';
import PropertyChecklist from './components/PropertyChecklist';
import PropertyProductGroups from './components/PropertyProductGroups';
import PropertyProductGroup from './components/PropertyProductGroup';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/property/:propertyId" component={PropertyWrapper} >
        <IndexRoute component={PropertyChecklist} />
        <Route path="/property/:propertyId/productGroups" component={PropertyProductGroups} />
        <Route path="/property/:propertyId/group/:groupSlug" component={PropertyProductGroup} />
      </Route>
    </Route>
  </Router>
);

export default Routes;
