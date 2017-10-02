const scrollSpeed = 800;

const hashScroller = store => next => action => {
	if (ENV.BUILD_TARGET === 'client') {
		if (action.type==="@@router/LOCATION_CHANGE" && action.payload.hash && action.payload.hash.length > 0) {
			const state = store.getState().routerReducer;
			console.log(action, state);
			if (state.location && action.payload.pathname === state.location.pathname) {
				console.log(`scrolling to ${action.payload.hash}`);
				let target = document.getElementById(action.payload.hash.slice(1));
				if (target) {
					target.scrollIntoView();
				}
			} else {
				console.log('href without store');
				location.href=action.payload.hash;
			}
			// location.href=action.payload.hash;
			// const body = document.getElementById('root')!;
			// const target = document.querySelector(action.payload.hash);
			// const offset = target.getBoundingClientRect();
			// const scroll = body.offsetTop;
			// console.log('scrolling');

			// body.style.top = `${offset.top}px`;
			// setTimeout(() => {
			// 	body.style.transition = 'none';
			// 	body.style.top = '0';
			// 	window.scrollTo(0, offset.top+scroll)
			// 	body.style.transition = 'top .8s cubic-bezier(0.77, 0, 0.175, 1)';
			// }, scrollSpeed)
		}
	}
	return next(action);
}



export default [ hashScroller ];