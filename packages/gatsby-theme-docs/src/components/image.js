import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useResizedImagesByPath } from '../hooks/use-resized-images';

const Img = styled.img`
  display: block;
  background-color: #fff;
  margin: auto;
`;

const Image = (props) => {
  const resized = useResizedImagesByPath(props.src);
  return resized ? (
    <figure className="gatsby-resp-image-figure">
      <a href={resized.originalImg} target="ct-docs-original-size-image">
        <Img
          alt={props.alt}
          title={props.title}
          src={resized.src}
          srcSet={resized.srcSet}
          width={resized.presentationWidth}
          height={resized.presentationHeight}
        />
      </a>
      {props.title ? (
        <figcaption className="gatsby-resp-image-figcaption">
          {props.title}
        </figcaption>
      ) : null}
    </figure>
  ) : null;
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
};

export default Image;
