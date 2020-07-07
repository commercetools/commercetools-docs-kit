import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { designSystem, Markdown } from '@commercetools-docs/ui-kit';
import { markdownFragmentToReact } from '@commercetools-docs/gatsby-theme-docs';

const DescriptionContainer = styled.div`
  max-width: ${designSystem.dimensions.widths.pageContent};
`;

const Description = (props) => (
  <DescriptionContainer>
    {typeof props.children === 'string' ? (
      <Markdown.TypographyContainer>
        {markdownFragmentToReact(props.children)}
      </Markdown.TypographyContainer>
    ) : (
      props.children
    )}
  </DescriptionContainer>
);
Description.propTypes = {
  children: PropTypes.node,
};

export default Description;
