import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { designSystem } from '@commercetools-docs/ui-kit';
import { usePageData } from '../hooks/use-page-data';

/**
 * Allows the first and second child of this container to float side by side in large desktop sizes.
 *
 * NOTE about the `!important` override.
 * The <SideBySide> content is sometimes an entry in the UI Kit stack (e.g. in API docs).
 * The UI kit stack forces the top spacing and uses `!important`.
 * However, given that the SideBySide is responsive, the second item can sometimes be
 * to the right of the first and sometimes under it.
 * Therefore, we need different spacing "logic" here - the UI Kit stacks and inlines are
 * not intended for responsive content. As a consequence, without this override, the right
 * item would not be top aligned with the left item.
 */
const SideBySideContainer = styled.div`
  margin-top: 0 !important;
  > * {
    margin-top: ${designSystem.dimensions.spacings.m};
  }

  @media screen and (${designSystem.dimensions.viewports.largeDesktop}) {
    max-width: 100% !important;
    display: grid;
    grid-template-columns: 1fr ${designSystem.dimensions.widths
        .pageContentSmall};
    grid-template-rows: auto;
    grid-column-gap: ${designSystem.dimensions.spacings.xl};
    grid-row-gap: ${designSystem.dimensions.spacings.xl};
    justify-items: stretch;
    align-items: start;
    > :only-child {
      /* If there aren't two children of a side by side it does not force it into two columns
      even though the right one is empty. Instead, it gives it the regular pageContent max width. */
      grid-column: auto / span 2;
      max-width: ${designSystem.dimensions.widths.pageContent};
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

const FullWidthContainer = ({ children, ...otherProps }) => {
  const pageData = usePageData();
  return (
    <div
      css={pageData.allowWideContentLayout ? fullWidthStyle : null}
      {...otherProps}
    >
      {children}
    </div>
  );
};
FullWidthContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SideBySide, FullWidthContainer };
