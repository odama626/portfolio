import { Format } from 'utils';

export default store => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    let title = action.payload.pathname.replace(/[^a-zA-Z0-9 |:-]/g, ' ');
    document.title = Format.capitalize(title.trim());
  }
  next(action);
};