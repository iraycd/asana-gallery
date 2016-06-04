import React from 'react';
import {
  renderToString,
  renderToStaticMarkup,
} from 'react-dom/server';

import {
  RouterContext
} from 'react-router';

import Routes from './Routes';
import Html from './components/Html';
import WithStylesContext from './components/WithStylesContext';

const DOCTYPE = '<!DOCTYPE html>';

export default function renderApp (props) {
  let styleSheet = '\n';

  const el = (
    <WithStylesContext
      onInsertCss={(styles) => styleSheet += styles._getCss()}>
      <RouterContext {...props} />
    </WithStylesContext>
  );

  const content = renderToString(el);

  return (
    DOCTYPE +
    renderToStaticMarkup(
      <Html
        title={'Mark S'}
        contentId={'main'}
        scriptSrc={'/js/client.js'}
        styleHref={'/css/style.css'}
        styleSheet={styleSheet}
        content={content}
      />
    )
  )
}
