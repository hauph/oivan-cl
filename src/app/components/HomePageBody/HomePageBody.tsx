import * as React from 'react';
import axios from 'axios';
import { Masonry } from 'masonic';
import { BaseLoading } from '../BaseLoading/BaseLoading';
import { Articles } from '../../interface/articles';
import './HomePageBody.scss';

type Props = {};

type State = {
  articles: Articles;
  pageNumber: number;
  loading: number;
  counter: number;
};

export default class HomePageBody extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      pageNumber: 0,
      /** loading has 3 stages:
       * - 0: app is fetching data, so we show general loading icon
       * - 1: app is stable, no loading
       * - 2: app is fetching for more articles, so we show load more icon
       */
      loading: 0,
      counter: 0,
    };

    this.renderArticle = this.renderArticle.bind(this);
  }

  componentDidMount() {
    this.query();

    window.addEventListener('scroll', e => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (!this.state.counter) {
          // Load more articles when scrolling to bottom
          this.query();
        }
        this.setState({ counter: 1 });
      } else {
        this.setState({ counter: 0 });
      }
    });
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
          pageNumber: pageNumber + 1,
        },
      });
      // @ts-ignore
      if (data.data.data.articles.length) {
        this.setState({
          // @ts-ignore
          articles: [...articles, ...data.data.data.articles],
          pageNumber: pageNumber + 1,
        });
      }
    } catch (err) {
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

  checkImgDimesion(e) {
    if (e.naturalWidth < 100) {
      // Hide img tag for images whose size are too small
      e.parentNode.parentNode.classList.add('hide-img');
    }
  }

  renderArticle({ data: { url, coverImageUrl, title, content } }) {
    let Article = (
      <div key={url} className="article">
        <div className="article__title">
          <h3>{title}</h3>
        </div>
        <div
          className={`article__image${content === null ? ' no-content' : ''}`}
          style={{
            backgroundImage: `url(${
              coverImageUrl === null
                ? 'https://i.stack.imgur.com/y9DpT.jpg'
                : coverImageUrl
            })`,
          }}
        >
          <img
            src={
              coverImageUrl === null
                ? 'https://i.stack.imgur.com/y9DpT.jpg'
                : coverImageUrl
            }
            alt=""
            onLoad={e => {
              this.checkImgDimesion(e.target);
            }}
          />
        </div>
        {content !== null ? (
          <div className="article__description">
            <i>{content}</i>
          </div>
        ) : null}
      </div>
    );

    return Article;
  }

  render() {
    const { articles, loading } = this.state;

    return (
      <div className="articles">
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
