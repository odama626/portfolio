import * as React from 'react';
import * as style from './Button.scss';

declare namespace Core {
  interface Button extends React.HTMLProps<HTMLButtonElement> {
    type?: 'text'|'outlined'|'contained';
    icon?: string;
  }
}

export default ({ children, type = 'text', icon, ...rest }: Core.Button) => (
  <button className={`${style.container} ${style[type]} ${rest.className || ''}`} {...rest}>{children}</button>
)