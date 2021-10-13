import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  faArrowLeft,
  faArrowRight,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Articles, SingleArticle } from '../../interface/articles';
import './ArticlePageBody.scss';

type Props = {
  articleIndex: number;
  articles: Articles;
  selectArticle: (index: number) => void;
};

type State = {
  shouldGoHome: boolean;
  currentArticle: null | SingleArticle;
};

class ArticlePageBody extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shouldGoHome: false,
      currentArticle: null,
    };
  }

  componentDidMount() {
    const { articleIndex, articles } = this.props;
    if (articleIndex === -1) {
      // If articleIndex === -1, it means we illegally access /article page and thus need to be redirected back to Home page
      this.setState({ shouldGoHome: true });
    } else {
      // Get current selected article in the 'articles' list according to articleIndex
      const currArticle =
        articles && articles.find((item, index) => index === articleIndex);

      this.setState({
        currentArticle: currArticle || null,
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { currentArticle } = state;
    const { articleIndex, articles } = props;
    if (articleIndex > -1) {
      const newArticle = articles.find((item, index) => index === articleIndex);
      if (JSON.stringify(currentArticle) !== JSON.stringify(newArticle)) {
        // Update current selected article according to new articleIndex from Redux store
        return {
          currentArticle: newArticle,
        };
      }
    }

    return null;
  }

  updateCurrentArticle(newIndex) {
    const { selectArticle } = this.props;
    selectArticle(newIndex);
  }

  handleGoBack() {
    this.setState({ shouldGoHome: true });
  }

  render() {
    const { shouldGoHome, currentArticle } = this.state;
    const { articleIndex, articles } = this.props;

    return shouldGoHome ? (
      <Redirect to="/" />
    ) : (
      <div className="art">
        <button
          className="art__btn btn--home"
          data-tip="Go home"
          onClick={() => {
            this.handleGoBack();
          }}
        >
          <FontAwesomeIcon icon={faHome} />
        </button>
        {currentArticle && (
          <div className="art__content item">
            <div className="item__btn-groups">
              <button
                disabled={articleIndex - 1 === -1}
                className="art__btn btn--previous"
                type="button"
                data-tip="Previous article"
                onClick={() => this.updateCurrentArticle(articleIndex - 1)}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button
                disabled={articleIndex + 1 > articles.length}
                className="art__btn btn--next"
                type="button"
                data-tip="Next article"
                onClick={() => this.updateCurrentArticle(articleIndex + 1)}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>

            <h1 className="item__title">
              <a href={currentArticle.url} target="_blank" rel="noreferrer">
                {decodeURIComponent(escape(currentArticle.title))}
              </a>
            </h1>
            <div className="item__info">
              <p>{currentArticle.subtitle}</p>
              <i>{currentArticle.description}</i>
            </div>
            <div className="item__image">
              <img src={currentArticle.coverImageUrl} alt="" />
            </div>
            <div className="item__content">
              <p>{currentArticle.content}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articleIndex: state.article.articleIndex,
  articles: state.article.articles,
});

const mapDispatchToProps = dispatch => {
  return {
    selectArticle: article =>
      dispatch({ type: 'SELECT_ARTICLE', payload: article }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePageBody);
