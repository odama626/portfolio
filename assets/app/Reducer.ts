import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import Modals from './Modals/Reducer';
import bounds from './reducers/bounds';
import pathHistory from './reducers/pathHistory';

import home from '../components/Home/Reducer';

// resizeListener reducer

const reducer = combineReducers({
  pathHistory,
  bounds,
  home,
  router: routerReducer
});

export default reducer;
