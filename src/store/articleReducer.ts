import { preloadedState } from './preloadedState';

const article = (state = preloadedState.article, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'SELECT_ARTICLE':
      return {
        ...state,
        articleIndex: payload,
      };
    case 'SAVE_ARTICLES':
      return {
        ...state,
        articles: payload,
      };
    case 'SAVE_PAGE':
      return {
        ...state,
        pageNumber: payload,
      };
    default:
      return state;
  }
};

export default article;
