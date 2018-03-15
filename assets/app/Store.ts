import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

import reducer from './Reducer';
import { Format } from 'utils';

// Middlware
import thunk from 'redux-thunk';
import resizeListener from './middleware/resizeListener';
import development from './middleware/development';
import reduxFetch from './middleware/reduxFetch';
import dynamicTitle from './middleware/dynamicTitle';
import scrollToHash from './middleware/scrollToHash';

let mw = [thunk, reduxFetch, scrollToHash, resizeListener, dynamicTitle, ...development];

export default (preloadedState = {}) => {
  const history =
    ENV.BUILD_TARGET === 'client'
      ? createBrowserHistory()
      : createMemoryHistory();
  const middleware = applyMiddleware(...mw, routerMiddleware(history));
  const store = createStore(reducer, preloadedState, middleware);
  return { store, history: history };
};
