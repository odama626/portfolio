import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import Modals from './Modals/Reducer';
import bounds from './reducers/bounds';
import pathHistory from './reducers/pathHistory';

// resizeListener reducer

const reducer = combineReducers({
  pathHistory,
  bounds,
  // Modals,
  router: routerReducer
});

export default reducer;
