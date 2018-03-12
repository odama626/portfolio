import * as React from 'react';
import * as style from './Footer.scss';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const links = {
  left: {
    // Home: '/',
    // "Another Link": '/'
  },
  right: {
    // 'Link on the right': '/'
  }
}

function generateLinks(links): JSX.Element[] {
  return Object.keys(links)
    .map((name, key) => <Link key={key} to={links[name]}>{name}</Link>);
}

export default connect(
  state => ({ mobile: state.bounds.mobile})
)(({mobile}) => (
  <div className={style.container}>
    <div className={style.tray}>
      <div className={style.left}>
        {generateLinks(links.left)}
      </div>
      <div className={style.right}>
        {generateLinks(links.right)}
      </div>
    </div>
  </div>
));