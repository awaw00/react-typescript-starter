import * as React from 'react';
import { Router } from 'react-router';
import 'normalize.css';
import './styles/core.less';

interface IProp {
  history: any;
  routes: any;
}

class Root extends React.Component<IProp, any> {
  render () {
    return (
      <Router history={this.props.history} routes={this.props.routes} />
    );
  }
}

export default Root;
