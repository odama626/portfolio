import * as React from 'react';
import * as style from './ContactForm.scss';
// import * as Recaptcha from 'react-recaptcha';
import {ContactForm as STATE} from '../Home/Reducer';
import FormController from '@core/Form/Controller';
import Form from '@core/Form';
import Wrapper from '@core/Form/Wrapper';
import Validate from '@core/Form/Validate';

import { connect } from 'react-redux';
import * as Actions from '../Home/Reducer';

interface IState {
  name: string;
  email: string;
  comment: string;
}

class ContactForm extends React.Component<any> {
  controller;
  constructor(props) {
    super(props);
    this.controller = new FormController();
  }

  submitForm() {
    const { state } = this.props;
    if (this.controller.validate() && state !== STATE.PENDING && state !== STATE.SUBMITTED) {
      const { dispatch } = this.props;
      dispatch(Actions.submitContactForm(this.controller.getValues()));
    }
  }
  
  render() {
    const { state } = this.props;
    return (
      <div className={`${style.animateContainer} ${ state === STATE.PENDING || state === STATE.SUBMITTED ? style.pending : ''} ${state === STATE.SUBMITTED || state === STATE.ERROR ? style.submitted : ''}`}>
        <div className={style.thanks}>{state === STATE.ERROR ? 'Oops, something went wrong.' : 'Message Sent! Thanks!'}</div>
          <Form className={style.container} controller={this.controller}>
            <Wrapper controller={this.controller} name="name" validate={Validate.NotEmpty}>
              <input type='text' placeholder='Name*' />
            </Wrapper>
            <Wrapper controller={this.controller} name="email" validate={Validate.EmailAddress}>
              <input type='text' placeholder='Email*' />
            </Wrapper>
            <Wrapper controller={this.controller} name="comment" validate={Validate.NotEmpty}>
              <textarea placeholder="What's on your mind?" />
            </Wrapper>
            <div>
            <button  className={style.send} onClick={this.submitForm.bind(this)}><div>Send</div></button>
            </div>
          </Form>
      </div>
    )
  }
}

export default connect(state => ({state: state.home.contact}))(ContactForm);