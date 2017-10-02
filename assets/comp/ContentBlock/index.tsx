import * as React from 'react';
import * as style from './style.scss';

export default (props: ContentBlock) => (
	<div className={style.container}>
		{props.image? <img className={style.imageContent} src={props.image} />
			: <div className={style.imageContent} />}
		<div>
			<div className={style.heading}>{props.heading}</div>
			<div className={style.subheading}>{props.subheading}</div>
			{props.children}
		</div>
	</div>
);