import * as React from 'react';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from '../assets/app';
import { ConnectedRouter } from 'react-router-redux';
import createStore from '../assets/app/Store';
import { Provider } from 'react-redux';

declare var module;
declare var window;

const preloadedState = window.__preload_state__;
delete window.__preload_state__;

const { store, history } = createStore(preloadedState);

function rerender() {
  hydrate(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
}

if (module.hot) {
  module.hot.accept('../assets/app/index', rerender);
}

rerender();
