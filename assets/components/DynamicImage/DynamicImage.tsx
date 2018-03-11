import * as React from 'react';
import { container as ContainerClass } from './DynamicImage.scss';

interface IDimension {
  width?: string;
  height?: string;
}

interface IProps {
  path?: string;
  src: string;
  initial?: IDimension;
  final?: IDimension;
  className?: string;
  children?: any;
  auto?: boolean;
  [key: string]: any;
}

interface IState {
  loaded: boolean;
  final?: IDimension;
}

export default class DynamicImage extends React.Component<IProps, IState> {
  container;

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      final: props.final
    }
  }

  componentDidMount() {
    if (ENV.BUILD_TARGET === ENV.BUILD_TARGET_CLIENT) {
      const { auto = false } = this.props;
      let { final } = this.state;
      if (auto) {
        final = this.auto();
      }
      this.loadImage(this.buildUrl(final))
        .then(() => this.setState({final, loaded: true}));
    }
  }

  auto() {
    let style = window.getComputedStyle(this.container);
    let width = Number.parseInt(style.getPropertyValue('width'));
    let height = Number.parseInt(style.getPropertyValue('height'));
    console.log(width, height);
    if (width >= height) {
      return { width: `${width}`};
    } else {
      return { height: `${height}`}
    }
  }

  loadImage(url) {
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.onload = e => resolve();
      image.src = url;
    })
  }
  
  buildUrl(dimensions: IDimension = {}) {
    const { path = '/res/optimize', src} = this.props;
    let size = '';
    if ( dimensions.width || dimensions.height) {
      size = '/';
      if (dimensions.width) size += dimensions.width;
      size += 'x';
      if (dimensions.height) size += dimensions.height;
    }
    return `${path}${size}/${src}`;
  }

  render() {
    const { initial = { height: '100px'}, final: finalProp, auto, src, className='', children, ...rest } = this.props;
    const { final } = this.state;
    const { loaded } = this.state;
    let style = { backgroundImage: `url("${this.buildUrl(loaded? final : initial)}")`}
    return (
      <div ref={ref => this.container = ref} style={style} className={`${ContainerClass} ${className}`} {...rest}>
        {children}
      </div>
    )
  }
}