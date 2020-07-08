import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { dimensions } from '@commercetools-docs/ui-kit/src/design-system';
import { usePageData } from '../hooks/use-page-data';

// allows the first and second child of this container to float side by side in large desktop sizes
const SideBySideContainer = styled.div`
  margin-top: 0 !important; /* a stupid "important-war" with the UI kit's stack components */
  > * {
    margin-top: ${dimensions.spacings.m};
  }
  @media screen and (${dimensions.viewports.largeDesktop}) {
    max-width: 100% !important;
    display: grid;
    grid-template-columns: 1fr ${dimensions.widths.pageContentSmall};
    grid-template-rows: auto;
    grid-column-gap: ${dimensions.spacings.xl};
    grid-row-gap: ${dimensions.spacings.xl};
    justify-items: stretch;
    align-items: start;
    > :only-child {
      /* if there aren't actually two, let the first take the space: */
      grid-column: auto / span 2;
      max-width: ${dimensions.widths.pageContent};
    }
  }
`;

const SideBySide = (props) => {
  const pageData = usePageData();
  if (pageData.allowWideContentLayout)
    return <SideBySideContainer>{props.children}</SideBySideContainer>;
  return <>{props.children}</>;
};
SideBySide.propTypes = {
  children: PropTypes.node.isRequired,
};

const fullWidthStyle = css`
  max-width: unset !important;
`;

const FullWidthContainer = (props) => {
  const pageData = usePageData();
  return (
    <div css={pageData.allowWideContentLayout ? fullWidthStyle : null}>
      {props.children}
    </div>
  );
};
FullWidthContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SideBySide, FullWidthContainer };
