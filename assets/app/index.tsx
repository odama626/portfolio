
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header/Header';
import Router from './Router';
import Footer from '../components/Footer/Footer';
import { Switch, Route } from 'react-router-dom';

import { loadServiceWorker } from './webworkers';
// import ModalWrapper from './Modals/ModalWrapper';

loadServiceWorker();

import 'es6-promise/auto';

import '../scss/global.scss';

// import MyWorker from './webworkers';

// import * as Cache  from 'worker!./webworkers/cache';
// declare module "worker-loader!*";



export default () => (
  <div>
    <Header />
    {/* <ModalWrapper /> */}
    <Router />
    <Footer />
  </div>
);
