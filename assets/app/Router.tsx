import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from '../components/Home/Home';
import FileNotFound from '../components/404';

export default class Main extends React.Component<{}, {}> {
  render(): JSX.Element {
    return (
      <div className="mainContent">
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="*" component={FileNotFound} />
        </Switch>
      </div>
    );
  }
}
