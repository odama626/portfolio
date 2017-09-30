import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

import Home from 'pages/Home';


import 'es6-promise/auto';

import 'scss/global.scss';

export default class App extends React.Component<{}, {}> {
  render(): JSX.Element {
    return (
      <Switch>
				<Route exact path='/' component={Home}/>
			</Switch>
    );
  }
}