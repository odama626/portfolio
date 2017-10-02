import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from 'index';
import { ConnectedRouter } from 'react-router-redux';
import createStore from 'utils/store';
import { Provider } from 'react-redux';
import {polyfill } from 'smoothscroll-polyfill';

polyfill();

declare var module;
declare var window;

const preloadedState = window.__preload_state__;
delete window.__preload_state__;

const {store, history } = createStore(preloadedState);

function rerender() {
  render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history} >
            <App />
        </ConnectedRouter>
      </Provider>
    </AppContainer>
    , document.getElementById('root'));
}

if (module.hot) {
  module.hot.accept('index', rerender)
}

rerender();
