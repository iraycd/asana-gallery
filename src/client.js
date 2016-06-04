if (module.hot) {
  module.hot.accept();
}

import React from 'react';

import {
  render,
} from 'react-dom';

import {
  match,
  Router,
  browserHistory,
} from 'react-router';

import Routes from './app/Routes';

import WithStylesContext from './app/components/WithStylesContext';

match({
  history: browserHistory,
  routes: Routes,
}, (error, redirectLocation, renderProps) => {
  const el = (
    <WithStylesContext onInsertCss={styles => styles._insertCss()}>
      <Router {...renderProps} />
    </WithStylesContext>
  );

  render(
    el,
    document.getElementById('main')
  );
})
