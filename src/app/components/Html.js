import React from 'react';

export default function Html (props) {
  return (
    <html>
      <head>
        <title>{props.title}</title>
        <link rel='stylesheet' href={props.styleHref} />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{__html: props.styleSheet}}
        />
      </head>
      <body>
        <div
          id={props.contentId}
          dangerouslySetInnerHTML={{__html: props.content}}
        />
        <script src={props.scriptSrc} />
      </body>
    </html>
  );
}
