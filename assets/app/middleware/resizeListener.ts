import { Actions } from '../reducers/bounds';

var listener;
var timer;

function screenResize(width, height) {
  return {
    type: Actions.SCREEN_RESIZE,
    width,
    height
  };
}

export default store => next => action => {
  if (!listener) {
    listener = window.addEventListener('resize', e => {
      // assuming a large number of components will be using screen size
      // only dispatch the action after the resize has finished
      clearTimeout(timer);
      timer = setTimeout(() => {
        store.dispatch(screenResize(window.innerWidth, window.innerHeight));
      }, 250);
    });
  }
  return next(action);
}