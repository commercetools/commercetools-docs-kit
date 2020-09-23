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
