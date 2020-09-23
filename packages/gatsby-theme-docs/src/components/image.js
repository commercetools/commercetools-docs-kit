import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useImagesByRelativePath } from '../hooks/use-images';

const Container = styled.span`
  display: flex;
  justify-content: center;
`;

const Image = (props) => {
  const imageSharp = useImagesByRelativePath(props.src);

  if (!imageSharp || !imageSharp.publicURL) {
    return null;
  }

  return (
    <Container>
      <img {...props} src={imageSharp.publicURL} />
    </Container>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Image;
