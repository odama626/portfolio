
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from 'components/Header/Header';
import Router from './Router';
import Footer from 'components/Footer/Footer';
import { Switch, Route } from 'react-router-dom';

import { loadServiceWorker } from './webworkers';
// import ModalWrapper from './Modals/ModalWrapper';

loadServiceWorker();

import 'es6-promise/auto';

import '../scss/global.scss';

export default () => (
  <>
    <Header />
    {/* <ModalWrapper /> */}
    <Router />
    <Footer />
  </>
);
