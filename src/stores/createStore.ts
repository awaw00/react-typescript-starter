import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { routerMiddleware, routerReducer as router } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export default (initialState = {}, history) => {

  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk, routerMiddleware(history)];

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    combineReducers(
      Object.assign({}, reducers, router)
    ),
    initialState,
    compose(
      applyMiddleware(...middleware)
    )
  );

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers);
    });
  }

  return store;
};
