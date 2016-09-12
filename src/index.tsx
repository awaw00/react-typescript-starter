import * as React from 'react'; // tslint:disable-line
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';
import routes from './routes';

const bootstrap = (routes) => {
  let App = <Root history={browserHistory} routes={routes} />;
  if (__DEV__) {
    App = <AppContainer>{App}</AppContainer>;
  }
  render(App, document.getElementById('app'));
};

if (module.hot) {
  /**
   * Warning from React Router, caused by react-hot-loader.
   * The warning can be safely ignored, so filter it from the console.
   * Otherwise you'll see it every time something changes.
   * See https://github.com/gaearon/react-hot-loader/issues/298
   */
  const originConsoleError = console.error;
  console.error = (...args) => {
    if (args && args.length === 1 && typeof args[0] === 'string') {
      if (args[0].match(/\<Router routes\>/i)) {
        return;
      }
    }
    originConsoleError.apply(null, args);
  };

  // rerender
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes').default;
    bootstrap(newRoutes);
  });
}

bootstrap(routes);
