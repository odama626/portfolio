import * as React from 'react';
import { getRandomColor, tryPull } from 'components/QuoteViewer/model';
import * as style from './QuoteViewer.scss';
import { connect } from 'react-redux';
import * as Actions from './Reducer';

const punctuation = [ '.', ',', '?', '!', ':', ';'];


class QuoteViewer extends React.Component<any, any> {
  timer;
  constructor(props) {
    super(props)
    this.state = {
      color: getRandomColor(),
      quote: '',
      author: '',
    }
    this.timer = null;
  }

  componentDidMount() {
    this.props.dispatch(Actions.fetch());
  }

  newQuote() {
    this.props.dispatch(Actions.fetch());
    this.setState({ color: getRandomColor()});
  }

  postToTwitter(quote, author) {
    window.open(`http://twitter.com/home?status=${encodeURI(`${quote}  \u2015 ${author}`)}`);
  }

  updateQuote(letterCount = 0, props = this.props, timeout = 40) {
    let self = this;
    const quote = tryPull(props.data, 'quote');
    this.timer = setTimeout(() => {
      this.setState({
        quote: quote.slice(0, letterCount)
      })
      if (quote && letterCount < quote.length) {
        let timeout = punctuation.indexOf(quote[letterCount-1]) > -1 ? 1000 : 40;
        this.updateQuote(letterCount+1, props, timeout);
      }
    }, timeout);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      console.log('new Props Received!');
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.updateQuote(0, nextProps);
    }
  }

  render() {
    const { color, quote} = this.state;
    const { data, dispatch } = this.props;
    let author = tryPull(data, 'author');
    let originalQuote = tryPull(data, 'quote');

    // console.log(quote);
    // console.log(data);
    return (
      <div style={{color: color}} className={style.container}>
        <div className={style.background} />
        <div className={style.quoteContainer} style={{color: color}}>
          
            <h3>{quote}</h3>  
            <h4>{'\u2015'} {author}</h4>
          
          <div className={style.bottomContainer}>
            {/* <div> */}
              <div onClick={() => this.postToTwitter(originalQuote, author)} className={`${style.icon} icon-twitter `}></div>
              {/* <div className="icon-at-sign"></div>
              <div className="icon-thumbs-up"></div>
              <div className="icon-thumbs-down"></div>
            </div> */}
            
            <button className={style.nextQuote} onClick={this.newQuote.bind(this)}><div>Next Quote</div></button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({...state.quotes}))(QuoteViewer);