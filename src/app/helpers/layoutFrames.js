function max (x) {
  return Math.max.apply(null, x);
}

function mapKey (xs, key) {
  return xs.map((x) => x[key]);
}

function sumBy (xs, key) {
  return mapKey(xs, key).reduce((acc, x) => acc + x);
}

function fitRowWidth (row, containerWidth) {
  const totalWidth = sumBy(row, 'width');
  const widthRatio = containerWidth/totalWidth;
  const fitWidthRow = row.map(({width, height}) => ({
    width: Math.round(width * widthRatio),
    height: Math.round(height * widthRatio),
  }));

  return fitWidthRow;
}

function scaleUniformHeights (row, containerWidth, maxRowHeight) {
  const maxHeight = Math.min(
    max(mapKey(row, 'height')),
    maxRowHeight
  );

  const evenHeightRow = row.map(({width, height}) => ({
    height: maxHeight,
    width: Math.round(width * maxHeight/height)
  }));
  return evenHeightRow;
}

/**
* @param {Array<Object>} array of frame objects with height/width properties
* @param {number} width of the containing element, in pixels
* @param {number} maximum height of each row of images, in pixels
* @param {number} spacing between images in a row, in pixels
* @returns {Array<Array<Object>>} array of rows of resized frames
*/
function layoutFrames (images, containerWidth, maxRowHeight, spacing) {
  // Initialize an empty grid that will be populated with arrays
  // corresponding to rows of images.
  let grid = [];

  // Initialize our first row,
  // we'll be appending images to it.
  let row = [];

  for (let image of images) {
    const {height, width} = image;
    row.push(image);

    // Since there is a gutter between images,
    // our available working width is reduced.
    const adjustedContainerWidth = containerWidth - (spacing * (row.length - 1));

    // After appending the current image to the current row,
    // scale all images in the current row to an equal height.
    const uniformHeightRow = scaleUniformHeights(
      row,
      adjustedContainerWidth,
      maxRowHeight
    );

    // Once we exceed the container's width,
    // we need to scale down the row to fit.
    const totalWidth = sumBy(uniformHeightRow, 'width');
    if (totalWidth > containerWidth) {
      const scaledRow = fitRowWidth(
        uniformHeightRow,
        adjustedContainerWidth
      );

      // Append the current row to the grid and create a new, empty row.
      grid.push(scaledRow);
      row = [];
    }
  }

  // Don't forget to append the last row to the grid.
  // This time we scale heights but don't fit widths.
  const adjustedContainerWidth = containerWidth - (spacing * (row.length - 1));
  const uniformHeightRow = scaleUniformHeights(
    row,
    adjustedContainerWidth,
    maxRowHeight
  );
  grid.push(uniformHeightRow);

  return grid;
}

export default layoutFrames;
