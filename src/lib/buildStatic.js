import path from 'path';
import {match} from 'react-router';
import pify from 'pify';
import write from './write';

function pmap (xs, fn) {
  return Promise.all(xs.map(fn));
}

const matchP = pify(match, {multiArgs: true});

function handleMatchedRoute (redirectLocation, props) {
  if (redirectLocation) {
    throw new Error(`redirect`);
  } else if (props) {
    return props;
  } else {
    throw new Error(`not found`);
  }
}

function writeStaticHtml (rootPath, location, html) {
  write(path.join(rootPath, `${location}/index.html`), html)
}

// export default function buildStatic (rootPath, render, routes, locations) {
//   return Promise.all(
//     locations.map((location) => {
//       matchP({routes, location})
//         .then(handleMatchedRoute)
//         .then(render)
//         .then((html) => writeStaticHtml(rootPath, location, html))
//     })
//   ).catch(console.error);
// }

export default async function buildStatic (rootPath, render, routes, locations) {
  try {
    await pmap(
      locations,
      async (location) => {
        const [redirectLocation, props] = await matchP({routes, location});
        const renderProps = handleMatchedRoute(redirectLocation, props);
        const htmlStr = render(renderProps);
        await writeStaticHtml(
          rootPath,
          location,
          htmlStr
        )
      }
    )
  } catch (err) { console.error(err); }
}
