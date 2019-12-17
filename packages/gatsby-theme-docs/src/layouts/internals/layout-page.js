import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { designSystem } from '@commercetools-docs/ui-kit';

const LayoutPage = props => (
  <div
    role="main"
    className={props.className}
    css={css`
      grid-area: page;
      min-width: 0;
      -webkit-overflow-scrolling: touch; /* enables "momentum" style scrolling */
      display: flex;
      flex-direction: column;
      position: relative;

      div {
        min-width: unset;
      }
    `}
  >
    <div
      id="anchor-page-top"
      css={css`
        display: block;

        @media screen and (${designSystem.dimensions.viewports.tablet}) {
          display: grid;
          grid:
            [row1-start] 'header header' ${designSystem.dimensions.heights
              .header} [row1-end]
            [row2-start] 'page-header page-header-side' auto [row2-end]
            [row3-start] 'page-content page-navigation' 1fr [row3-end]
            [row4-start] 'footer footer' auto [row4-end]
            / minmax(
              ${designSystem.dimensions.widths.pageContentSmallWithMargings},
              ${designSystem.dimensions.widths.pageContentWithMargings}
            )
            0;
        }
        @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
          grid:
            [row1-start] 'header header' ${designSystem.dimensions.heights
              .header} [row1-end]
            [row2-start] 'page-header page-header-side' auto [row2-end]
            [row3-start] 'page-content page-navigation' 1fr [row3-end]
            [row4-start] 'footer footer' auto [row4-end]
            / minmax(
              ${designSystem.dimensions.widths.pageContentSmallWithMargings},
              ${designSystem.dimensions.widths.pageContentWithMargings}
            )
            ${designSystem.dimensions.widths.pageNavigation};
        }
        @media screen and (${designSystem.dimensions.viewports.laptop}) {
          grid:
            [row1-start] 'header header' ${designSystem.dimensions.heights
              .header} [row1-end]
            [row2-start] 'page-header page-header-side' auto [row2-end]
            [row3-start] 'page-content page-navigation' 1fr [row3-end]
            [row4-start] 'footer footer' auto [row4-end]
            / minmax(
              ${designSystem.dimensions.widths.pageContentSmallWithMargings},
              ${designSystem.dimensions.widths.pageContentWithMargings}
            )
            ${designSystem.dimensions.widths.pageNavigationSmall};
        }
        @media screen and (${designSystem.dimensions.viewports.desktop}) {
          grid:
            [row1-start] 'header header' ${designSystem.dimensions.heights
              .header} [row1-end]
            [row2-start] 'page-header page-header-side' auto [row2-end]
            [row3-start] 'page-content page-navigation' 1fr [row3-end]
            [row4-start] 'footer footer' auto [row4-end]
            / ${designSystem.dimensions.widths.pageContentWithMargings}
            ${designSystem.dimensions.widths.pageNavigation};
        }
      `}
    >
      {props.children}
    </div>
  </div>
);
LayoutPage.displayName = 'LayoutPage';
LayoutPage.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default LayoutPage;
