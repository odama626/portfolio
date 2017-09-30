import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import reducer from './rootReducer';

export default (preloadedState = {}) => {
	const history = ENV.BUILD_TARGET === 'client' ? createBrowserHistory() : createMemoryHistory();

	let middleware: any = [
		routerMiddleware(history)
	]

	// Add logging to dev environment
	if (ENV.DEPLOY_TARGET === ENV.TARGET_DEV) {
		const logger = store => next => action => {
			console.log('dispatching', action);
			let result = next(action);
			console.log('next state', store.getState());
			return result;
		}

		const crashReporter = store => next => action => {
			try {
				return next(action)
			} catch(err) {
				console.error('Exception!', err);
				throw err;
			}
		}
		middleware = [...middleware, logger, crashReporter];
	}

  return { store: createStore(reducer, preloadedState, applyMiddleware(...middleware)), history: history};
}