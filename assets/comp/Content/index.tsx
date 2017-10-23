import * as React from 'react';
import * as style from './maincontent.scss';

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
					<p style={{maxWidth: '690px'}}>
						With my deeply embedded lust and enthusiasm for finding elegant solutions for challenging problems, I continue to expand my breadth of knowledge so I am able
						to intimately understand unique and interesting problems.  Inately knowing what technology would best meld with the constraints to appropriately contain the problem.
					</p>
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
						content='Building out native mobile apps, or using React Native and similiar technologies to get that bare metal experience'
						percentage={40}
						color='#0B7C9C'
					/>
					<SkillBlock
						heading='Dev ops'
						content='Setting servers from scratch, building out and maintaining development to production pipelines'
						percentage={70}
						color='#3A3A91'
					/>
				</div>
			</li>
			<li id='experience'><h3>Experience</h3>
				<div>
					<b>Worldwide Group</b>
					<p>
						Design, architect, develop website and restful services with modern technologies all while tracking and managing CI/CD
						in an agile environment.  Technologies include but are not limited to:
					</p>
					<ul>
						<li>Typescript / Javascript</li>
						<li>Isomorphic React web apps</li>
						<li>Django Powered sites</li>
						<li>.Net APIs</li>
					</ul>
					<p><a href='https://wrsrents.com'>Worldwide Rental Services</a> and many others I cannot disclose.</p>
					<b>Personal Client</b>
					<p>
						Proof of concept geofencing social media site for audio and video sharing<br />
						<a href='https://geovoice.elev8ted.com'>Geovoice</a>
					</p>
					<b>The Weston Group</b>
					<p>Designed and developed an embedded, mesh networked solution for temperature minitoring of cryogenic chambers. using a mixture of C and python</p>
				</div>

			</li>
			<li id='portfolio'><h3>Portfolio</h3>

			</li>
			<li><h3>Services</h3>
				<p>
				</p>

			</li>
		</ul>
	</div>
)