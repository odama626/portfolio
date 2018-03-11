import * as React from 'react';
import * as style from './Skillblock.scss';

import ProgressBar from '../ProgressBar/ProgressBar';

export default ({heading, content, ...rest}) => {
	return (
		<div className={style.container}>
			{heading? <h5 style={{color: rest.color}} className={style.heading}>{heading}</h5>: null}
			{content? <p className={style.content}>{content}</p> : null}
			<ProgressBar {...rest} />
		</div>
	)
}