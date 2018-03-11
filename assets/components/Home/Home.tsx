import * as React from 'react';
import * as style from './Home.scss';

import ContentBlock from '../ContentBlock/ContentBlock';
import SkillBlock from '../Skillblock/Skillblock';
import DynamicImage from '../DynamicImage/DynamicImage';
import AnimationLoop from '../AnimationLoop/AnimationLoop';
import Portfolio from '../Portfolio/Portfolio';
import Bullet from '../SVG/Bullet';

export default () => (
  <div  className={style.outerContainer}>
		<DynamicImage id='home' className={style.hero} src="galaxy.jpg" initial={{ height: "100" }}>
      <AnimationLoop primaryClass={style.heroContent} toggleClass={style.animate} delay={{add: 350, remove: 20000}}>
        {/* 2b || !2b */}
        {/* <p>"When you do the common things in life in an uncommon way, you will command the attention of the world."</p> */}
          {/* <p>-George Washington Carver</p> */}
          With iteration comes perfection.
      </AnimationLoop>
    </DynamicImage>
    <div className={style.container} id='about'>
      <ContentBlock
        image="/res/face-logo-think.svg"
        heading="Hello World, I am Adam Sparks"
        subheading="software developer & dev-ops engineer"
      >
        <p style={{ maxWidth: '690px' }}>
          With my deeply embedded lust and enthusiasm for finding elegant solutions for challenging
          problems, I continue to expand my breadth of knowledge so I am able to intimately
          understand unique and interesting problems. Inately knowing what technology would best
          meld with the constraints to appropriately contain the problem.
        </p>
      </ContentBlock>
      <p>
        With strong analytical skills and the ability to quickly learn and interpret information in
        the most agile of environments I have been speeding up workflows of my own and colleages
        alike. With ever expanding skillsets I am able to hit the ground running and help you get up
        to speed with the latest or design that <b>something special</b> that makes you stick out
        from the rest.
        <br />Lets make something great together!
      </p>
    </div>
    <DynamicImage className={style.hero2} src="galaxy.jpg" initial={{ height: "100" }} />
    <div className={style.container}>
      <div className={style.skills} id='specialization'>
        <SkillBlock
          heading="Web design"
          content={`progressive web apps, isomorphic react apps, the more dynamic the content the better.`}
          color="#8e61b0"
          percentage={80}
        />
        <SkillBlock
          heading="Backend"
          content={`whether its restful apis or twiddling bits, I like to get my hands dirty`}
          percentage={55}
          color="#a44e90"
        />
        <SkillBlock
          heading="Mobile"
          content="Building out native mobile apps, or using React Native and similiar technologies to get that bare metal experience"
          percentage={40}
          color="#8e61b0"
        />
        <SkillBlock
          heading="Dev ops"
          content="Setting servers from scratch, building out and maintaining development to production pipelines"
          percentage={70}
          color="#a44e90"
        />
      </div>
      </div>
      <DynamicImage className={style.hero2} src="galaxy.jpg" initial={{ height: "100" }} />
      {/* <DynamicImage className={style.bulletGraphic} src="galaxy.jpg" initial={{ height: "100" }} />   */}
      <div className={style.container} id='clients'>
      <div>
        <DynamicImage className={style.bullet} src="galaxy.jpg" initial={{ height: "100" }} />  
        <b>Worldwide Group</b>
        <p>
          Design, architect, develop website and restful services with modern technologies all while
          tracking and managing CI/CD in an agile environment. Technologies include but are not
          limited to:
        </p>
        <ul>
          <li>Typescript / Javascript</li>
          <li>Isomorphic React web apps</li>
          <li>Django Powered sites</li>
          <li>.Net APIs</li>
        </ul>
        <p>
          <a href="https://wrsrents.com">Worldwide Rental Services</a> and many others I cannot
          disclose.
        </p>
        <DynamicImage className={style.bullet} src="galaxy.jpg" initial={{ height: "100" }} />  
        <b>Personal Client</b>
        <p>
          Proof of concept geofencing social media site for audio and video sharing<br />
          <a href="https://geovoice.elev8ted.com">Geovoice</a>
        </p>
        <DynamicImage className={style.bullet} src="galaxy.jpg" initial={{ height: "100" }} />  
        <b>The Weston Group</b>
        <p>
          Designed and developed an embedded, mesh networked solution for temperature minitoring of
          cryogenic chambers. using a mixture of C and python
        </p>
      </div>
      </div>
      <DynamicImage className={style.hero2} src="galaxy.jpg" initial={{ height: "100" }} />
      <div className={style.container}>
      <h3>Portfolio</h3>
    </div>
      <DynamicImage id='projects' className={style.portfolioContainer} src="galaxy.jpg" initial={{ height: "100" }}>
        <Portfolio animationDelay={3000} />
      </DynamicImage>
    <div className={style.container}>
      <h3 id='services'>Services</h3>
      <p />
      <h3 id='contact'>Contact</h3>
    </div>
    
    {/* <Bullet />     */}
  </div>
);
