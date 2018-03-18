import * as React from 'react';
import * as style from './Container.scss';

interface IProps {
  id?: string;
  children?: any;
}

export default ({id= undefined, children }: IProps) => (
  <div className={style.container}>
    <div className={style.contentContainer} id={id}>
      {children}
    </div>
  </div>
)