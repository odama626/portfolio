export const FETCH = {
  PENDING: 'QUOTEVIEWER_FETCH_PENDING',
  SUCCESS: 'QUOTEVIEWER_FETCH_SUCCESS',
  ERROR: 'QUOTEVIEWER_FETCH_ERROR',
};


export function fetch() {
  const t = FETCH;
  return {
    type: [t.PENDING, t.SUCCESS, t.ERROR],
    url: '/quote/random'
  }
}

const initialState = {
  data: undefined
}

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH.SUCCESS:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
}