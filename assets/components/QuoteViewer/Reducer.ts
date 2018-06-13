export const FETCH = {
  PENDING: 'QUOTEVIEWER_FETCH_PENDING',
  SUCCESS: 'QUOTEVIEWER_FETCH_SUCCESS',
  ERROR: 'QUOTEVIEWER_FETCH_ERROR',
};


export function fetch() {
  const t = FETCH;
  return {
    type: [t.PENDING, t.SUCCESS, t.ERROR],
    // url: 'http://quotes.rest/qod.json',
    // contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    url: 'http://adamsparks.me:1337/quote/random'
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