## Asana Gallery

To get started, you'll need node and npm installed.  Clone this repo and run `npm install && npm run prod`, then navigate to http://localhost:8888.
You can switch into dev mode with `npm run dev`.

The actual layout algorithm can be found at [layoutFrames.js](src/app/helpers/layoutFrames.js) and the React view at [Index.js](src/app/components/Index.js).  The algorithm itself has no dependencies but is written in ES6.

The plumbing is handled by my web app quickstart kit [web-init](https://github.com/markshlick/web-init), and leverages the following tech:

- Babel, to let me write JS from the future.
- Node.js as the server runtime.
- Webpack to compile the client *and* server.
- React for the UI. 💖

My approach is documented in [layoutFrames.js](src/app/helpers/layoutFrames.js), but here's a quick run-down:
- Initialize two empty arrays: `grid` and `row`.
- For each image frame object, append it to `row`, then scale every image frame in the row so that their heights are uniform and don't exceed the maximum specified height.
- Every iteration, we need to keep track of the current row.  Once the combined width of every image frame in `row` matches or exceeds the max container width, we stop adding image frames to it and scale every image frame in the row down so they can all fit within the given width constraint.  We then append `row` to `grid`, then reassign `row` to point to a new empty array for the following image frames.
- For the final row, we need to make sure each image frame is of uniform height, but can omit the width-scaling step.
