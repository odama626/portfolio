import * as React from 'react';
import * as defaultStyle from './ProgressBar.scss';

const defaultProps: ProgressBar = {
	percentage: 0,
	showPercentage: true,
	color: 'white'
}

export default (userProps: ProgressBar) => {
	const props: ProgressBar = {...defaultProps, ...userProps};
	const style = {
		width: `${props.percentage}%`,
		backgroundColor: props.color,
	}
	const outStyle = {
		// border: `1px solid ${props.color}`
	}
	return (
	<div className={defaultStyle.container} style={outStyle}>
		<div className={defaultStyle.bar} style={style} />
		{props.showPercentage? <div className={defaultStyle.text}>{props.percentage}%</div> : null}
	</div>
	)
}