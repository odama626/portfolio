export const PATH_TRACKING = '@@router/LOCATION_CHANGE';

export default function pathHistory(state = [], action) {
  if (action.type === PATH_TRACKING) {
    let path = action.payload.pathname+action.payload.hash;
    let lastPath = state[0];
    return lastPath === path ? state : [path, ...state];
  }
  return state;
}