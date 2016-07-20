import React, {
  Component,
} from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Index.css';

import layoutFrames from '../helpers/layoutFrames';

const PLACEHOLDER_ROOT = 'https://www.placecage.com/gif';
// const PLACEHOLDER_ROOT = 'https://www.fillmurray.com/g';  // sometimes placecage is slow :(

var _frames =
    [{ height: 360, width: 1000 },
     { height: 600, width: 400 },
     { height: 400, width: 600 },
     { height: 400, width: 600 },
     { height: 400, width: 300 },
     { height: 400, width: 300 }];

const spacing = 10;
const frames = layoutFrames(_frames, 800, 360, spacing);

class Index extends Component {
  render () {
    return (
      <div className={s.IndexContainer}>
        <div className={s.IndexContent}>
          <div>
            <h1 className={s.IndexHeader}>{"WHAT UP ASANA"}</h1>
          </div>
          <div>
            {
              frames.map((row, i) => {
                return (
                  <div
                    key={i}
                    style={{marginTop: i ? spacing : 0}}
                  >
                    {
                      row.map(({height, width}, j) => {
                        // randomly scale image requests so we don't get the same image twice
                        const scale = (i * 0.1) + (j * 0.2) + Math.random() + 1;
                        const src = `${PLACEHOLDER_ROOT}/${Math.round(width*scale)}/${Math.round(height*scale)}`;
                        return (
                          <div
                            key={`${i}-${j}`}
                            className={s.IndexItem}
                            style={{
                              marginLeft: j ? spacing : 0,
                            }}>
                            <img
                              className={s.IndexImage}
                              src={src}
                              style={{
                                height,
                                width,
                              }}
                            />
                            <div className={s.IndexCaption}>x</div>
                          </div>
                        );
                      })
                    }
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Index);
