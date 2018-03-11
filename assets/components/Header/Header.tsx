import * as React from 'react';
import * as style from './Header.scss';

import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { Actions } from '../../app/reducers/bounds';

const links = {
  logo: '/#home',
  left: {
    About: '/#about',
    Specialization: '/#specialization',
    Clients: '/#clients',
    'Past Projects': '/#projects',
    Services: '/#services',
  },
  right: {
    "Contact Me": '/#contact'
  }
}

function generateLinks(links, location): JSX.Element[] {
  return Object.keys(links)
    .map((name, key) => (
      <div key={key} className={`${style.link} ${location === links[name]? style.active : ''}`}>
        <Link to={links[name]}>{name}</Link>
      </div>
    ))
}

function renderHamburger(trayOpen, toggleTray) {
  return (
    <div onClick={toggleTray} className={`${style.hamburger}`}>
      <div className={style.bar} />
      <div className={style.bar} />
      <div className={style.bar} />
    </div>
  )
}

export default connect(
  state => ({
    mobile: state.bounds.mobile,
    trayOpen: state.bounds.headerTrayOpen,
    location: state.router.location? state.router.location.pathname+state.router.location.hash : ''
  }),
  (dispatch, props) => ({ toggleTray: () => dispatch(Actions.headerToggle()), dispatch})
)(({mobile, trayOpen, toggleTray, location, dispatch}) => (
  <div className={`${style.container} ${trayOpen? style.trayOpen : ''}`}>
    <div className={style.innerContainer}>
      <div className={style.logo} onClick={() => dispatch(push(links.logo))}/>
      { mobile? renderHamburger(trayOpen, toggleTray) : null}
      <div onClick={() => {if (mobile) toggleTray()}} className={`${style.tray}`}>
        <div className={style.left}>
          {generateLinks(links.left, location)}
        </div>
        <div className={style.right}>
          {generateLinks(links.right, location)}
        </div>
      </div>
    </div>
    <div className={style.spacer} />
  </div>
));