import React from 'react';
import { Router, IndexRoute, Route } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import PropertyWrapper from './components/PropertyWrapper';
import PropertyChecklist from './components/PropertyChecklist';
import PropertyEdit from './components/PropertyEdit';
import PropertyProductGroups from './components/PropertyProductGroups';
import PropertyProductGroupsAll from './components/PropertyProductGroupsAll';
import PropertyProductGroup from './components/PropertyProductGroup';
import PropertyShare from './components/PropertyShare';
import PropertyProduct from './components/PropertyProduct';
import ReceiveProperty from './components/ReceiveProperty';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/property/:propertyId" component={PropertyWrapper} >
        <IndexRoute component={PropertyChecklist} />
        <Route path="/property/:propertyId/edit" component={PropertyEdit} />
        <Route path="/property/:propertyId/productGroups" component={PropertyProductGroups} />
        <Route path="/property/:propertyId/productGroupsAll" component={PropertyProductGroupsAll} />
        <Route path="/property/:propertyId/group/:groupSlug" component={PropertyProductGroup} />
        <Route path="/property/:propertyId/share" component={PropertyShare} />
        <Route path="/property/:propertyId/product/:productId" component={PropertyProduct} />
      </Route>
      <Route path="/receive" component={ReceiveProperty} />
    </Route>
  </Router>
);

export default Routes;
