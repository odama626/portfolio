import * as React from 'react';
import * as defaultStyle from './ProgressBar.scss';

interface IProgressBar {
	percentage?: number;
	showPercentage?: boolean;
	color?: string;
}

const defaultProps: IProgressBar = {
	percentage: 0,
	showPercentage: true,
	color: 'white'
}

export default (userProps: IProgressBar) => {
	const props: IProgressBar = {...defaultProps, ...userProps};
	const style = {
		width: `${props.percentage}%`,
		backgroundColor: props.color,
	}
	const outStyle = {
		borderColor: props.color
	}
	return (
	<div className={defaultStyle.container} style={outStyle}>
		<div className={defaultStyle.bar} style={style} />
		{props.showPercentage? <div className={defaultStyle.text}>{props.percentage}%</div> : null}
	</div>
	)
}