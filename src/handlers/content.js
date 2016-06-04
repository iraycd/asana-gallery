import React from 'react';
import {match} from 'react-router';

import render from '../app/render';
import Routes from '../app/Routes';

const DOCTYPE = '<!DOCTYPE html>';

export default function app (req, res) {
  match({
    routes: Routes,
    location: req.url
  }, (err, redirectLocation, props) => {
    if (err) {
      res.status(500).send();
    } else if (redirectLocation) {
      res.redirect(
        302,
        redirectLocation.pathname +
        redirectLocation.search
      );
    } else if (props) {
      res.status(200).send(render(props));
    } else {
      res.status(404).send('Not found');
    }
  });
}
