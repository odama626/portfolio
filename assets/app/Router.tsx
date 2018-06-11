import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from '../components/Home/Home';
// import Playground from '../'
import FileNotFound from '../components/404';
import Playground from 'components/Playground/Playground';
import QuoteViewer from 'components/QuoteViewer/QuoteViewer';

export default class Main extends React.Component<{}, {}> {
  render(): JSX.Element {
    return (
      <div className="mainContent">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/misc/playground' component={Playground} />
          <Route path='/portfolio/quotes' component={QuoteViewer} />
          <Route path="*" component={FileNotFound} />
        </Switch>
      </div>
    );
  }
}
