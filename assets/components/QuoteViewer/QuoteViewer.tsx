import * as React from 'react';
import { getRandomColor, tryPull } from 'components/QuoteViewer/model';
import * as style from './QuoteViewer.scss';
import { connect } from 'react-redux';
import * as Actions from './Reducer';


class QuoteViewer extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      color: getRandomColor(),
      quote: '',
      author: '',
    }
  }

  componentDidMount() {
    this.props.dispatch(Actions.fetch());
  }

  newQuote() {
    this.setState({ color: getRandomColor()});
  }

  updateQuote(letterCount = 0, props = this.props, timeout = 40) {
    let self = this;
    const quote = tryPull(props.data, 'contents', 'quotes', '0', 'quote');
    setTimeout(() => {
      this.setState({
        quote: quote.slice(0, letterCount)
      })
      if (quote && letterCount < quote.length) {
        let timeout = ['.', ','].indexOf(quote[letterCount-1]) > -1 ? 1000 : 40;
        // console.log(timeout);
        this.updateQuote(letterCount+1, props, timeout);
      }
    }, timeout);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      console.log('new Props Received!');
      this.updateQuote(0, nextProps);
    }
  }

  render() {
    const { color, quote} = this.state;
    const { data } = this.props;
    // let quote = tryPull(data, 'contents', 'quotes', '0', 'quote');
    let author = tryPull(data, 'contents', 'quotes', '0', 'author');
    // console.log(quote);
    // console.log(data);
    return (
      <div style={{color: color}} className={style.container}>
        <div className={style.background} />
        <div className={style.quoteContainer} style={{color: color}}>
          
            <h3>{quote}</h3>  
            <h4>{'\u2015'} {author}</h4>
          
          <div className={style.bottomContainer}>
            <div className="icon-twitter"></div>
            
            <button className={style.nextQuote} onClick={this.newQuote.bind(this)}><div>Next Quote</div></button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({...state.quotes}))(QuoteViewer);