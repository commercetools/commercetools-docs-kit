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
      {' '}
      {props.data.timeToRead > 0
        ? props.data.timeToRead
        : props.data.estimatedTimeToRead}{' '}
      min read
    </Container>
  );
};

PageReadTime.propTypes = {
  data: PropTypes.shape({
    timeToRead: PropTypes.number.isRequired,
    estimatedTimeToRead: PropTypes.number.isRequired,
  }),
};

export default PageReadTime;
