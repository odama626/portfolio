const FETCH_NEXT_QUOTE = {
  PENDING: 'HOME_FETCH_NEXT_QUOTE_PENDING',
  SUCCESS: 'HOME_FETCH_NEXT_QUOTE_SUCCESS',
  ERROR: 'HOME_FETCH_NEXT_QUOTE_ERROR'
}

export function fetchNewQuote() {
  const t = FETCH_NEXT_QUOTE;
  return {
    type: [t.PENDING, t.SUCCESS, t.ERROR],
    url: '/quote'
  }
}




const initialState = {
  quoteLoading: true,
  quote: 'With iteration comes perfection'
}


export default (state=initialState, action) => {
  switch(action.type) {
    case FETCH_NEXT_QUOTE.PENDING:
      return {...state, quoteLoading: true};
    case FETCH_NEXT_QUOTE.SUCCESS:
      return {...state, quote: action.data};
    default:
      return state;
  }
}
