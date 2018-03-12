import * as React from 'react';
import * as style from './Project.scss';

interface IProps {
  name: string;
  image: string;
  description: any;
  showDetails: boolean;
  selectedIndex: number;
  [key: string]: any;
  index: number;
  itemCount: number;
  link: string;
}

export default class Project extends React.Component<IProps, {}> {
  container;

  getTranslation() {
    const { index, selectedIndex, itemCount} = this.props;
    const offset = 20;
    const angle = 60;
    if (this.container) {
      let me = this.container;
      let parent = this.container.parentNode;
      let translation = 0;
      let rotation = 0;
      let zIndex = 0;
      if (index < selectedIndex) {
        translation = -(me.offsetLeft - offset * index);
        rotation = angle;
        zIndex = index;
      } else if (index > selectedIndex) {
        translation = (parent.offsetWidth - me.offsetWidth - me.offsetLeft) - (offset * (itemCount - index));
        rotation = -angle;
        zIndex = itemCount - index;
      } else {
        translation = parent.offsetWidth / 2 - me.offsetWidth / 2 - me.offsetLeft;
        zIndex = itemCount;
      }
      return {
        transform: `translateX(${translation}px) rotate3d(0,1,0,${rotation}deg)`,
        zIndex
      }
    }
  }
  render() {
    const { name, image, description, showDetails, selectedIndex, index, itemCount, link, ...rest} = this.props;
    let transform = this.getTranslation();
    return (
      <div
        style={transform}
        ref={container => this.container = container}
        className={`${style.container} ${selectedIndex === index? style.selected : ''} ${showDetails? style.details : ''}`}
        {...rest}>
        <div className={style.innerContainer}>
          <div className={style.contentContainer}>
            <img src={image} />
            <div className={style.description}>
              <div className={style.name}>{name}</div>
              <p>{description}</p>
              <a href={link}>Check it out</a>
            </div>
          </div>
          <div className={style.name}>{name}</div>
        </div>
      </div>
    );
  }
}
