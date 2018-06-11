import * as React from 'react';
import Form from '@core/Form';
import Input from '@core/Form/Input';
import Container from 'components/Container/Container';
import Controller from '@core/Form/Controller';
import Wrapper from '@core/Form/Wrapper';
import * as style from './Playground.scss';

const controller = new Controller();

const telTest = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export default () => (
  <div style={{margin: '100px', border: '1px solid black', padding: '20px'}}>
    <Form controller={controller}>
      <Input name="name" controller={controller} />
      <Input name="email" type="email" controller={controller} validate={value => value.length === 2} />
      <Input name="phone" type="tel" controller={controller} validate={value => telTest.test(value)} />
      <Wrapper  name="text" controller={controller} validate={value => value.length > 5}>
        <textarea className={style.textArea} />
      </Wrapper>
    </Form>
    <button onClick={() => {
      if (controller.validate()) {
        console.log(controller.getValues());
        alert(`success!\n${JSON.stringify(controller.getValues(), null, 2)}`)
      } else {
        console.log('invalid');
      }
    }}
    >Validate</button>
  </div>
)