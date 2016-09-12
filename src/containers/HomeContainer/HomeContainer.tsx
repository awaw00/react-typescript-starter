import * as React from 'react';
import { Link } from 'react-router';
const style = require('./style.less');

class HomeContainer extends React.Component<any, any> {
  render () {
    return (
      <div>
        <p className={style.tabs}>
          <Link to='/'>Home</Link>
          <Link to='/counter'>Counter</Link>
        </p>
        <div className={style.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default HomeContainer;
