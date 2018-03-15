import * as express from 'express';
import compression from 'compression';
import { discernMobile, discernFile, renderApp, renderHtml } from './Utils';
import createStore from '../assets/app/Store';
import { IMGR } from 'imgr';
import api from './api';

declare var process;

const app = express();

const imgr = new IMGR();

imgr.serve('assets/res')
  .namespace('/res/optimize')
  .using(app);

app.use('/res', express.static('assets/res'));
app.use('/res', express.static('bin/'));
app.use('/api', api);

// match filenames requested at root (primarily for web workers);
app.get(/^\/([\w\.\+\*\'\(\)\,\-\_]+\.js)/, (req, res) => {
  res.set('Content-Type', 'application/javascript');
  console.log('loading root file with regex', req.params);
  res.sendFile(`${__dirname}/${req.params[0]}`);
});

app.use(discernFile);
app.use(discernMobile);

app.get('/*', (req, res) => {
  // Work around to allow sending files
  if (!req.render_page) return res.send('');
  console.log(req.url);

  let initialState: any = { router: { location: { pathname: req.url, hash: '' }}, bounds: { mobile: req.mobile_client}};
  let { store, history } = createStore(initialState);
  let application = renderApp(req.url, store);
  let preloadState = store.getState();

  res.send(renderHtml(application, preloadState));
});
export default app;
