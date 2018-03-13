import * as React from 'react';
import * as style from './Project.scss';

import { connect } from 'react-redux';

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
  mobile?: boolean;
}

class Project extends React.Component<IProps, {}> {
  container;

  getTransform(element) {
    let transform = element.style['transform'];
    let x = Number.parseInt(transform.substr(transform.indexOf('(')+1)) || 0;
    return x;
  }

  getTranslation() {
    const { index, selectedIndex, itemCount, mobile} = this.props;
    const offset = 20;
    const angle = 60;
    if (this.container) {
      let me = this.container;
      let parent = this.container.parentNode;
      let translation = 0;
      let rotation = 0;
      let zIndex = 0;

      let myOffset = mobile? me.offsetTop : me.offsetLeft;
      let mySize = mobile? me.offsetHeight : me.offsetWidth;
      let parentSize = mobile? parent.offsetHeight : parent.offsetWidth;

      // let transformX = this.getTransform(me);
      if (index < selectedIndex) {
        translation = -(myOffset - offset * index);
        rotation = angle;
        zIndex = index;
      } else if (index > selectedIndex) {
        translation = (parentSize - mySize - myOffset) - (offset * (itemCount - index));
        rotation = -angle;
        zIndex = itemCount - index;
      } else {
        translation = (parentSize / 2) - (mySize / 2) - myOffset;
        zIndex = itemCount;
      }
      return {
        transform: `translate${mobile? 'Y' : 'X'}(${translation}px) rotate3d(${mobile? '1, 0' : '0,1'},0,${mobile? rotation * 2 : rotation}deg)`,
        zIndex
      }
    }
  }


  render() {
    const { name, image, description, showDetails, selectedIndex, index, itemCount, link, mobile, dispatch, ...rest} = this.props;
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


export default connect(state => ({mobile: state.bounds.mobile}))(Project);