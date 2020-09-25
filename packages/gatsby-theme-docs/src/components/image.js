import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { designSystem } from '@commercetools-docs/ui-kit';
import { useResizedImagesByPath } from '../hooks/use-resized-images';

const MarkdownFragmentImage = (props) => {
  const image = useResizedImagesByPath(props.src);
  if (!image) {
    return null;
  }

  // NOTE: the HTML structure below is taken from the `gatsby-remark-images` plugin,
  // as we want to replicate the same behaviour and structure.
  const ratio = `${(1 / image.aspectRatio) * 100}%`;
  return (
    <figure className="gatsby-resp-image-figure">
      <span
        className="gatsby-resp-image-wrapper"
        css={css`
          position: relative;
          display: block;
          margin-left: auto;
          margin-right: auto;
          max-width: ${designSystem.dimensions.widths.pageContent};
        `}
      >
        <a
          className="gatsby-resp-image-link"
          href={image.originalImg}
          css={css`
            display: block;
          `}
          target="_blank"
          rel="noreferrer noopener"
          data-link-type="image-link"
        >
          <span
            className="gatsby-resp-image-background-image"
            css={css`
              padding-bottom: ${ratio};
              position: relative;
              bottom: 0;
              left: 0;
              background-size: cover;
              display: block;
              transition: opacity 0.5s ease 0.5s;
              opacity: 0;
            `}
          />
          <img
            className="gatsby-resp-image-image"
            alt={props.alt}
            title={props.title}
            src={image.src}
            srcSet={image.srcSet}
            sizes={`(max-width: ${designSystem.dimensions.widths.pageContent}) 100vw, ${designSystem.dimensions.widths.pageContent}`}
            css={css`
              width: 100%;
              height: 100%;
              margin: 0;
              vertical-align: middle;
              position: absolute;
              top: 0;
              left: 0;
              opacity: 1;
              transition: opacity 0.5s ease 0s;
              color: inherit;
              box-shadow: white 0 0 0 400px inset;
            `}
            loading="lazy"
          />
        </a>
      </span>
      {props.title && (
        <figcaption className="gatsby-resp-image-figcaption">
          {props.title}
        </figcaption>
      )}
    </figure>
  );
};

MarkdownFragmentImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
};

export default MarkdownFragmentImage;
