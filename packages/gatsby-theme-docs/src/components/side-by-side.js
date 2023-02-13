import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { designSystem } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { usePageData } from '../hooks/use-page-data';
import { useSiteData } from '../hooks/use-site-data';

/**
 * Allows the first and second child of this container to float side by side in large desktop sizes.
 */
const SideBySideContainer = styled.div`
  display: grid;
  grid-column-gap: ${designSystem.dimensions.spacings.xl};
  row-gap: ${designSystem.dimensions.spacings.l};
  grid-template-rows: auto;
  align-items: start;
  justify-items: stretch;

  @media screen and (${designSystem.dimensions.viewports.largeDesktop}) {
    max-width: 100% !important;
    grid-template-columns: 1fr ${designSystem.dimensions.widths
        .sideBySideSecondColumn};
    > [data-is-wide-sticky='true'] {
      position: sticky;
      top: ${(props) => props.stickyMargin || 0};
    }
    > :only-child {
      /* Robustness for data driven situations like generated API docs:
      If there aren't two children of a side by side it does not force it into two columns
      even though the right one is empty. Instead, it gives it the regular pageContent max width. */
      grid-column: auto / span 2;
      max-width: ${designSystem.dimensions.widths.pageContent};
    }
  }
`;

const SideBySide = (props) => {
  const pageData = usePageData();
  const siteData = useSiteData();

  if (pageData.allowWideContentLayout)
    return (
      <SideBySideContainer
        stickyMargin={
          siteData.siteMetadata.globalNotification.active
            ? `calc(${designSystem.dimensions.heights.globalNotificationWithSmallSpacing} + 1rem)`
            : '1rem'
        }
      >
        {props.children}
      </SideBySideContainer>
    );
  return <SpacingsStack scale="l">{props.children}</SpacingsStack>;
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
    <div
      css={pageData.allowWideContentLayout ? fullWidthStyle : null}
      {...props}
    />
  );
};
FullWidthContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SideBySide, FullWidthContainer };
