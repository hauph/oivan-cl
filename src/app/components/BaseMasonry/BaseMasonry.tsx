import React from 'react';
import { useWindowSize } from '@react-hook/window-size';
import { MasonryScroller, useContainerPosition, usePositioner } from 'masonic';
import { Articles } from '../../interface/articles';

type Props = {
  items: Articles;
};

export const BaseMasonry = (props: Props) => {
  const containerRef = React.useRef(null);
  const [windowWidth, windowHeight] = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [
    windowWidth,
    windowHeight,
  ]);
  const positioner = usePositioner({
    width,
    columnGutter: 10,
    columnWidth: 300,
  });

  const checkImgDimesion = e => {
    if (e.naturalWidth < 100) {
      // Hide img tag for images whose size are too small
      e.parentNode.parentNode.classList.add('hide-img');
    }
  };

  const renderArticle = ({ data: { url, coverImageUrl, title, content } }) => {
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
              checkImgDimesion(e.target);
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
  };

  return (
    <MasonryScroller
      positioner={positioner}
      // The distance in px between the top of the document and the top of the
      // masonry grid container
      offset={offset}
      // The height of the virtualization window
      height={windowHeight}
      // Forwards the ref to the masonry container element
      containerRef={containerRef}
      items={props.items}
      //   overscanBy={6}
      render={renderArticle}
    />
  );
};
