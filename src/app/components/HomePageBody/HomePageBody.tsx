import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Masonry } from 'masonic';
import { BaseLoading } from '../BaseLoading/BaseLoading';
import { Articles } from '../../interface/articles';
import './HomePageBody.scss';

type Props = {
  selectArticle: (index: number) => void;
  saveArticles: (articles: Articles) => void;
  savePage: (pageNumber: number) => void;
  _articles: Articles;
  _pageNumber: number;
  articleIndex: number;
};

type State = {
  articles: Articles;
  pageNumber: number;
  loading: number;
  shouldRedirect: boolean;
};

class HomePageBody extends React.Component<Props, State> {
  // Set this property to prevent other query requsets are called when there is one running
  inProcess: boolean;
  timerId: any;
  firstLoad: boolean;

  constructor(props) {
    super(props);
    const { _articles, _pageNumber } = this.props;

    this.state = {
      articles: JSON.parse(JSON.stringify(_articles)),
      pageNumber: _pageNumber,
      /** loading has 3 stages:
       * - 0: app is fetching data, so we show general loading icon
       * - 1: app is stable, no loading
       * - 2: app is fetching for more articles, so we show load more icon
       */
      loading: _articles.length ? 1 : 0,
      shouldRedirect: false,
    };

    this.renderArticle = this.renderArticle.bind(this);
    this.onScroll = this.onScroll.bind(this);

    this.inProcess = false;
    this.timerId = setTimeout(() => {});
    this.firstLoad = true;
  }

  onScroll() {
    const { articleIndex } = this.props;
    if (articleIndex > -1) {
      clearTimeout(this.timerId);

      this.timerId = setTimeout(() => {
        this.firstLoad = false;
      }, 1000);

      if (!this.firstLoad) {
        const elm = document.querySelector('.highlight');
        // Remove class 'highlight'
        if (elm) {
          elm.classList.remove('highlight');
        }
      }
    }

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      // Only run query request when there is no running one
      if (!this.inProcess) {
        this.inProcess = true;
        // Load more articles when scrolling to bottom
        this.query();
      }
    }
  }

  componentDidMount() {
    const { _articles, articleIndex } = this.props;
    if (!_articles.length) {
      // Load articles in page 1
      this.query();
    } else {
      // If there is 'articleIndex'; we will highlight corresponding element
      setTimeout(() => {
        const elm = document.querySelector(`[data-index="${articleIndex}"]`);
        if (elm) {
          // Add class 'highlight' to highlight article we just viewed
          elm.classList.add('highlight');
        }
      }, 1000);
    }

    // attach scroll event to window to handle case "load more" when reaching bottom of window
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    // dettach scroll event from window to prevent side effect
    window.removeEventListener('scroll', this.onScroll);
  }

  async query() {
    const { pageNumber, loading, articles } = this.state;
    if (loading) {
      this.setState({ loading: 2 });
    }
    try {
      const data = await axios.post('https://iwa-test.herokuapp.com/graphql', {
        query: `query Articles($pageNumber: Int) {
                    articles(pageNumber: $pageNumber) {
                      content,
                      coverImageUrl,
                      description,
                      subtitle,
                      title,
                      url
                    }
                }`,
        variables: {
          pageNumber: pageNumber,
        },
      });
      // @ts-ignore
      if (data.data.data.articles.length) {
        // @ts-ignore
        const newArticles = [...articles, ...data.data.data.articles];
        this.props.saveArticles(newArticles);
        this.setState({
          articles: newArticles,
          pageNumber: pageNumber + 1,
        });
        this.inProcess = false;
      }
    } catch (err) {
      this.inProcess = false;
      console.log('GraphQL failed!');
      console.error(err);
    } finally {
      const _this = this;
      setTimeout(() => {
        _this.setState({
          loading: 1,
        });
      }, 1000);
    }
  }

  handleOnClickArticle(e, index) {
    if (e.target.nodeName !== 'A') {
      this.props.selectArticle(index);
      this.props.savePage(this.state.pageNumber);
      this.setState({
        shouldRedirect: true,
      });
    }
  }

  checkImgDimesion(e) {
    e.classList.remove('default-height');

    if (e.naturalWidth < 100) {
      // Hide img tag for images whose size are too small
      e.parentNode.parentNode.classList.add('hide-img');
    }
  }

  renderArticle({
    index,
    data: { content, coverImageUrl, title, url, description, subtitle },
  }) {
    let Article = (
      <div
        key={url}
        className="article"
        onClick={e => this.handleOnClickArticle(e, index)}
        data-index={index}
      >
        <div className="article__title">
          <h3>
            <a href={url} target="_blank" rel="noreferrer">
              {decodeURIComponent(escape(title))}
            </a>
          </h3>
          <i>{subtitle}</i>
        </div>
        <div
          className="article__image"
          style={{
            backgroundImage: `url(${
              coverImageUrl === null || coverImageUrl === ''
                ? 'https://i.stack.imgur.com/y9DpT.jpg'
                : coverImageUrl
            })`,
          }}
        >
          <img
            className="default-height" // Give img default height when waiting for src completes loading
            src={
              coverImageUrl === null || coverImageUrl === ''
                ? 'https://i.stack.imgur.com/y9DpT.jpg'
                : coverImageUrl
            }
            alt=""
            onLoad={e => {
              this.checkImgDimesion(e.target);
            }}
          />
        </div>
        <div className="article__description">
          <p>{description}</p>
        </div>
      </div>
    );

    return Article;
  }

  render() {
    const { articles, loading, shouldRedirect } = this.state;

    return shouldRedirect ? (
      <Redirect to={`/article`} />
    ) : (
      <div className="articles">
        <h1>Hacker News</h1>

        {loading && articles.length ? (
          <>
            <Masonry
              // Provides the data for our grid items
              items={articles}
              // Adds 10px of space between the grid cells
              columnGutter={10}
              // Sets the minimum column width to 300px
              columnWidth={300}
              // Pre-renders 5 windows worth of content
              overscanBy={5}
              // This is the grid item component
              render={this.renderArticle}
              // Sets the initial height of the masonry grid
              itemHeightEstimate={window.innerHeight}
              // Scrolls to a given index within the grid
              scrollToIndex={
                this.props.articleIndex < 0
                  ? undefined
                  : this.props.articleIndex
              }
            />
            {loading === 2 && <BaseLoading loadMore={true} />}
          </>
        ) : (
          <BaseLoading loadMore={false} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  _articles: state.article.articles,
  _pageNumber: state.article.pageNumber,
  articleIndex: state.article.articleIndex,
});

const mapDispatchToProps = dispatch => {
  return {
    selectArticle: number =>
      dispatch({ type: 'SELECT_ARTICLE', payload: number }),
    saveArticles: articles =>
      dispatch({ type: 'SAVE_ARTICLES', payload: articles }),
    savePage: pageNumber =>
      dispatch({ type: 'SAVE_PAGE', payload: pageNumber }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageBody);
