import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useResizedImagesByPath } from '../hooks/use-resized-images';

const Img = styled.img`
  display: block;
  background-color: #fff;
  margin: auto;
`;

const ReleaseNotesImage = (props) => {
  const image = useResizedImagesByPath(props.src);
  if (!image) {
    return null;
  }
  return (
    <figure className="gatsby-resp-image-figure">
      <a href={image.originalImg} target="_blank" rel="noreferrer">
        <Img
          alt={props.alt}
          title={props.title}
          src={image.src}
          srcSet={image.srcSet}
          width={image.presentationWidth}
          height={image.presentationHeight}
        />
      </a>
      {props.title ? (
        <figcaption className="gatsby-resp-image-figcaption">
          {props.title}
        </figcaption>
      ) : null}
    </figure>
  );
};

ReleaseNotesImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
};

export default ReleaseNotesImage;
