import * as React from 'react';

interface IProps {
  initialDelay?: number;
  primaryClass: string;
  toggleClass: string;
  children?: any;
  delay: {
    add: number;
    remove: number;
  }
  onAdd?: () => any;
  onRemove?: () => any;
}

interface IState {
  toggleOn: boolean;
}

export default class AnimationLoop extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      toggleOn: false
    }
  }

  toggle() {
    const { toggleOn } = this.state;
    const { delay, onAdd = () => {}, onRemove = () => {} } = this.props;
    const next = !toggleOn;
    this.setState({toggleOn: next});
    next? onAdd() : onRemove();
    setTimeout(() => this.toggle(), next? delay.remove : delay.add);
  }

  componentDidMount() {
    const { initialDelay = 0} = this.props;
    setTimeout(() => this.toggle(), initialDelay);
  }

  render() {
    const { primaryClass, toggleClass, children } = this.props;
    const { toggleOn } = this.state;
    return (
      <div className={`${primaryClass} ${toggleOn? toggleClass : ''}`}>
        {children}
      </div>
    )

  }
}

