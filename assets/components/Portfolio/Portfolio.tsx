import * as React from 'react';
import * as style from './Portfolio.scss';

import Project from './Project';

const projects = [
  {
    name: 'Calculator',
    image: '/res/optimize/400x225/preview_calc.png',
    description: 'A basic calculator',
    link: 'https://exceptionallyrecursive.com/portfolio/calculator'
  },
  {
    name: 'Pomodoro',
    image: '/res/optimize/400x225/preview_pomo.png',
    description: 'A basic pomodoro clock',
    link: 'https://exceptionallyrecursive.com/portfolio/pomodoro_clock'
  },
  {
    name: 'Quotes',
    image: '/res/optimize/400x225/preview_quote.png',
    description: 'View and share random famous quotes',
    link: 'https://exceptionallyrecursive.com/portfolio/quote-viewer'
  },
  {
    name: 'Visualizer',
    image: '/res/optimize/400x225/preview_vis.png',
    description: 'Media player with visualizer',
    link: 'https://exceptionallyrecursive.com/visualizer'
  }, {
    name: 'Local weather',
    image: '/res/optimize/400x225/preview_weather.png',
    description: 'Displays your local weather using your gps location and the Weather Underground api.',
    link: 'https://exceptionallyrecursive.com/portfolio/weather/'
  }
];

interface IState {
  selected: number;
  mouseOver: boolean;
  ascending: boolean;
  showDetails: number;
  height: number;
}

export default class Portfolio extends React.Component<{ animationDelay: number }, IState> {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      mouseOver: false,
      ascending: true,
      showDetails: -1,
      height: 0
    };
  }

  animate() {
    let { mouseOver, ascending, selected } = this.state;
    const { animationDelay } = this.props;
    if (!mouseOver) {
      ascending = (ascending && selected < projects.length - 1) || selected === 0;
      selected = ascending ? selected + 1 : selected - 1;
      this.setState({ ascending, selected, showDetails: -1 });
    }
    setTimeout(() => this.animate(), animationDelay);
  }

  componentDidMount() {
    this.forceUpdate();
    setTimeout(() => this.animate(), this.props.animationDelay);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.selected !== nextState.selected || this.state.showDetails !== nextState.showDetails;
  // }

  render() {
    const { selected, showDetails, height } = this.state;
    return (
      <div ref={ref => {if (ref && ref.offsetHeight > height) this.setState({height: ref.offsetHeight})}}
        onMouseEnter={() => this.setState({ mouseOver: true })}
        onMouseLeave={() => this.setState({ mouseOver: false })}
        className={style.container}
        style={height > 0? {height: height+'px'} : {}}
      >
        {projects.map((project, key) => (
          <Project
            key={key}
            {...project}
            index={key}
            itemCount={projects.length}
            showDetails={showDetails === key}
            selectedIndex={selected}
            onClick={() => key === selected? this.setState({showDetails: showDetails === key? -1 : key}) : this.setState({ showDetails: -1, selected: key })}
          />
        ))}
      </div>
    );
  }
}
