import * as express from 'express';
import compression from 'compression';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import * as React from 'react';
import { combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import App from 'index';
import createStore from 'utils/store';

declare var process;

const app = express();
let scripts;
let styles;

if (ENV.DEPLOY_TARGET === ENV.TARGET_PRODUCTION ||
    ENV.DEPLOY_TARGET === ENV.TARGET_STAGING) {
  scripts = `
    <script defer type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react.min.js'></script>
    <script defer type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-dom.min.js'></script>
    <script defer type='text/javascript' src='/res/main.js'></script>
  `
  styles = `
     <meta name="viewport" content="width=device-width, user-scalable=no"/>

    <link href="https://fonts.googleapis.com/css?family=Signika:300,400,700" rel = "stylesheet" >
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link rel='stylesheet' type='text/css' href='/res/main.css'>
  `
} else {
  styles = `
    <meta name="viewport" content="width=device-width, user-scalable=no"/>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Signika:300,400,700" rel = "stylesheet" >
    <link rel="stylesheet" type="text/css" href="http://localhost:3001/main.css">`;
  scripts = '<script src="http://localhost:3001/main.js"></script>'
}

app.use('/res',express.static('assets/res'));
app.use('/res',express.static('bin/'));

app.get('*', (req, res) => {
  console.log(req.url);

  let context = {};
  let {store, history} = createStore();


  let application = renderToString((
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
          <App />
      </StaticRouter>
    </Provider>
  ));
  let preloadState = store.getState();
  let html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>title</title>
        ${styles}
      </head>
      <body>
      <div id='root'>${application}</div>
      <script>
        window.__preload_state__ = ${JSON.stringify(preloadState).replace(/</g, '\u003c')}
      </script>
      ${scripts}
      </body>
    </html>
  `
  res.send(html);
})

export default app;