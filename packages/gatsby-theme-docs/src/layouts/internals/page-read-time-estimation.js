import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const Container = styled.p`
  color: ${designSystem.colors.light.borderInput};
  font-size: ${designSystem.typography.fontSizes.extraSmall};
`;

const PageReadTime = (props) => {
  return (
    <Container>
      {props.data.setTimeToRead
        ? props.data.setTimeToRead
        : props.data.timeToRead}{' '}
      min read
    </Container>
  );
};

PageReadTime.propTypes = {
  data: PropTypes.shape({
    timeToRead: PropTypes.number.isRequired,
    setTimeToRead: PropTypes.number.isRequired,
  }),
};

export default PageReadTime;
