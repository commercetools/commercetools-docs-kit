import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { designSystem, Markdown } from '@commercetools-docs/ui-kit';
import Description from '../description';

const Container = styled.div`
  max-width: ${designSystem.dimensions.widths.pageContent};
`;

const Enum = ({ description, values }) => {
  if (!description && !values) {
    throw new Error('Must pass description or values props to Enum component.');
  }

  return (
    <Container>
      {description ? <Description>${description}</Description> : null}

      {values ? (
        <Markdown.Dl>
          {values.map((value, index) => (
            <Markdown.Dt key={index}>{value}</Markdown.Dt>
          ))}
        </Markdown.Dl>
      ) : null}
    </Container>
  );
};

Enum.propTypes = {
  description: PropTypes.string,
  values: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
};

export default Enum;
