import React, {
  Component,
} from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Index.css';

class Index extends Component {
  render () {
    return (<div className={s.Index}>Hello, world!</div>);
  }
}

export default withStyles(s)(Index);
