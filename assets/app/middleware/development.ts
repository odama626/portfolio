import { Middleware } from 'redux';

let middleware: Middleware[] = [];

if (ENV.DEPLOY_TARGET === ENV.TARGET_DEV) {
  const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
  };

  const crashReporter = store => next => action => {
    try {
      return next(action);
    } catch (err) {
      console.error('Exception!', err);
      throw err;
    }
  };
  middleware = [ logger, crashReporter];
}

export default middleware;