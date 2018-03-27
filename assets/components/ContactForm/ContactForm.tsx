import * as React from 'react';
import * as style from './ContactForm.scss';
// import * as Recaptcha from 'react-recaptcha';
import {ContactForm as STATE} from '../Home/Reducer';

import { connect } from 'react-redux';
import * as Actions from '../Home/Reducer';

interface IState {
  name: string;
  email: string;
  comment: string;
}

class ContactForm extends React.Component<any, IState> {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      comment: ''
    }
  }

  submitForm(event) {
    if (this.props.state === STATE.UNTOUCHED) {
      const { dispatch, state } = this.props;
      const { name, email, comment } = this.state;
      dispatch(Actions.submitContactForm(name, email, comment));
    }
  }
  
  render() {
    const { state } = this.props;
    const { name, email, comment } = this.state;
    return (
      <div className={`${style.animateContainer} ${ state === STATE.PENDING || state === STATE.SUBMITTED ? style.pending : ''} ${state === STATE.SUBMITTED || state === STATE.ERROR ? style.submitted : ''}`}>
        <div className={style.thanks}>{state === STATE.ERROR ? 'Oops, something went wrong.' : 'Message Sent! Thanks!'}</div>
        <form onSubmit={e => e.preventDefault()} className={style.container}>
          <input onChange={e => this.setState({name: e.target.value})} value={name} required type='text' placeholder='Name*' />
          <input onChange={e => this.setState({email: e.target.value})} value={email} required type='text' placeholder='Email*' />
          <textarea onChange={e => this.setState({comment: e.target.value})} value={comment} placeholder="What's on your mind?" />
          <div>
            {/* {ENV.BUILD_TARGET === ENV.BUILD_TARGET_CLIENT
              ? <Recaptcha sitekey={ENV.RECAPTCHA_SITE_KEY} theme="dark" render="explicit" />
              : null
            } */}
            <button disabled={state !== STATE.UNTOUCHED} onClick={this.submitForm.bind(this)} className={style.send}><div>Send</div></button>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(state => ({state: state.home.contact}))(ContactForm);