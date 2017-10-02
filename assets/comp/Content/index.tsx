import * as React from 'react';
import * as style from './style.scss';

import ContentBlock from 'comp/ContentBlock';
import SkillBlock from 'comp/SkillBlock';

export default () => (
	<div className={style.container}>
		<ul className={style.content}>
			<li id='about'><h3>About</h3>
				<p>With strong analytical skills and the ability to quickly learn and
					interpret information in the most agile of environments I have been speeding
					up workflows of my own and colleages alike.  With ever expanding skillsets I
					am able to hit the ground running and help you get up to speed with the latest
					or design that <b>something special</b> that makes you stick out from the rest.
					<br />Lets make something great together!
				</p>
				<ContentBlock
					image='/res/face-logo-think.svg'
					heading='Hello World, I am Adam Sparks'
					subheading = 'software developer & dev-ops engineer'
				>
					<p>lorem ipsum stuff</p>
				</ContentBlock>
			</li>
			<li id='skills'><h3>Skills</h3>
				<div className={style.skills}>
					<SkillBlock
						heading='Web design'
						content={`progressive web apps, isomorphic react apps, the more dynamic the content the better.`}
						color='#A00C34'
						percentage={80}
					/>
					<SkillBlock
						heading='Backend'
						content={`whether its restful apis or twiddling bits, I like to get my hands dirty`}
						percentage={55}
						color='#965B2E'
					/>
					<SkillBlock
						heading='Mobile'
						content='content'
						percentage={60}
						color='#0B7C9C'
					/>
					<SkillBlock heading='Dev ops' content='content' percentage={70} color='#3A3A91' />
				</div>
			</li>
			<li id='experience'><h3>Experience</h3>

			</li>
			<li id='portfolio'><h3>Portfolio</h3>
				<p>

				</p>

			</li>
			<li><h3>Services</h3>
				<p>
				</p>

			</li>
		</ul>
	</div>
)