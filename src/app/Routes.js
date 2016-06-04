import React from 'react';

import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import Root from './components/Root';
import Index from './components/Index';

export default (
  <Route path='/' component={Root}>
    <IndexRoute component={Index} />
  </Route>
);
