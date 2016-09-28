import * as React from 'react'; // tslint:disable-line
import { Link } from 'react-router';
const style = require('./style.less');

function HomeContainer (props) {
  return (
    <div>
      <p className={style.tabs}>
        <Link to='/'>Home</Link>
        <Link to='/counter'>Counter</Link>
      </p>
      <div className={style.content}>
        {props.children}
      </div>
    </div>
  );
}

console.log(HomeContainer, 1);
export default HomeContainer;
