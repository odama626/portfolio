import * as React from 'react';
import * as style from './style.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class FullHeader extends React.Component<any, {}> {

	navStyle(to:string, label: string):JSX.Element {
		const { location } = this.props;
		const className = location===to? style.activeNavLink : style.navLink;
		return <Link className={className} to={to}>{label}</Link>
	}

	componentDidMount() {
		const self = document.getElementById('header')!;
		const hero = document.getElementById('headerHero')!;
		const body = document.body;
		const offset = parseInt(window.getComputedStyle(hero).marginBottom || '0');
		const height = hero.getBoundingClientRect().height + offset;
		window.addEventListener('scroll', () => {
			if (window.pageYOffset >= height) {
				self.style.top = `${-height}px`;
				body.style.paddingTop = `${height}px`;
				self.style.position = 'fixed';

			} else {
				self.style.top = `0`;
				body.style.paddingTop = `0`;
				self.style.position = 'static';
			}
		})
	}

	render(): JSX.Element {
		return (
			<div id='header' className={style.container}>
				<div className={style.innerContainer}>
					<div id='headerHero' className={style.heroContainer}>
						<div className={style.hero} />
					</div>
					<img className={style.logo} src='/res/face-logo.svg' />
					{this.navStyle('/', 'Home')}
					{this.navStyle('/#about', 'About')}
					{this.navStyle('/#portfolio', 'Portfolio')}
					{this.navStyle('/#services', 'Services')}
					{this.navStyle('/#blog', 'Blog')}
					{this.navStyle('/#clients', 'Clients')}
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	location: state.routerReducer.location?
		state.routerReducer.location.pathname+state.routerReducer.location.hash
	: '/',
	...state.header
}))(FullHeader)