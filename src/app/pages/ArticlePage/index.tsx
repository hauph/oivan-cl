import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import ReactTooltip from 'react-tooltip';
import ArticlePageBody from '../../components/ArticlePageBody/ArticlePageBody';

export function ArticlePage() {
  return (
    <>
      <Helmet>
        <title>Article Page</title>
        <meta name="description" content="Article Page" />
      </Helmet>
      <ArticlePageBody />
      <ReactTooltip />
    </>
  );
}
