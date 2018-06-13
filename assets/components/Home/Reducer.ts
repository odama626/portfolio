const FETCH_NEXT_QUOTE = {
  PENDING: 'HOME_FETCH_NEXT_QUOTE_PENDING',
  SUCCESS: 'HOME_FETCH_NEXT_QUOTE_SUCCESS',
  ERROR: 'HOME_FETCH_NEXT_QUOTE_ERROR'
}

const SUBMIT_CONTACT_FORM = {
  PENDING: 'SUBMIT_CONTACT_FORM_PENDING',
  SUCCESS: 'SUBMIT_CONTACT_FORM_SUCCESS',
  ERROR: 'SUBMIT_CONTACT_FORM_ERROR',
}

export function fetchNewQuote() {
  const t = FETCH_NEXT_QUOTE;
  return {
    type: [t.PENDING, t.SUCCESS, t.ERROR],
    url: '/api/quote',
    local: true
  }
}

export function submitContactForm(data) {
  const t = SUBMIT_CONTACT_FORM;
  return {
    type: [t.PENDING, t.SUCCESS, t.ERROR],
    url: '/api/contact',
    method: 'post',
    data,
    local: true
  }
}

export enum ContactForm {
  PENDING,
  ERROR,
  SUBMITTED,
  UNTOUCHED
}

interface IState {
  quoteLoading: boolean;
  quote: string;
  contact: ContactForm
}


const initialState: IState = {
  quoteLoading: true,
  quote: 'With iteration comes perfection',
  contact: ContactForm.UNTOUCHED
}


export default (state=initialState, action) => {
  switch(action.type) {
    case FETCH_NEXT_QUOTE.PENDING:
      return {...state, quoteLoading: true};
    case FETCH_NEXT_QUOTE.SUCCESS:
      return {...state, quote: action.data};
    case SUBMIT_CONTACT_FORM.PENDING:
      return { ...state, contact: ContactForm.PENDING};
    case SUBMIT_CONTACT_FORM.SUCCESS:
      return { ...state, contact: ContactForm.SUBMITTED};
    case SUBMIT_CONTACT_FORM.ERROR:
      return { ...state, contact: ContactForm.ERROR};
    default:
      return state;
  }
}
