import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { designSystem, Markdown } from '@commercetools-docs/ui-kit';
import { markdownFragmentToReact } from '@commercetools-docs/gatsby-theme-docs';

const Container = styled.div`
  max-width: ${designSystem.dimensions.widths.pageContent};
`;

const Description = (props) => (
  <Container>
    {typeof props.children === 'string' ? (
      <Markdown.TypographyContainer>
        {markdownFragmentToReact(props.children)}
      </Markdown.TypographyContainer>
    ) : (
      props.children
    )}
  </Container>
);
Description.propTypes = {
  children: PropTypes.node,
};

export default Description;
