import * as React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import 'normalize.css';
import './styles/core.less';

interface IProp {
  history: any;
  routes: any;
  store: any;
}

class Root extends React.Component<IProp, any> {
  render () {
    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history} routes={this.props.routes} />
      </Provider>
    );
  }
}

export default Root;
