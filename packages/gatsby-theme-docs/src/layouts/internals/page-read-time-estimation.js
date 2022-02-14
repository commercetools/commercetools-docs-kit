import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const Container = styled.p`
  color: ${designSystem.colors.light.borderInput};
  font-size: ${designSystem.typography.fontSizes.extraSmall};
`;

const PageReadTime = (props) => {
  return <Container>{props.timeToRead} min read</Container>;
};

PageReadTime.propTypes = {
  timeToRead: PropTypes.number.isRequired,
};

export default PageReadTime;
