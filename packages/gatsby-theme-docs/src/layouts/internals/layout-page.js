import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { dimensions } from '../../design-system';

const LayoutPage = props => (
  <div
    role="main"
    className={props.className}
    css={css`
      grid-area: page;
      min-width: 0;
      min-height: calc(100vh - ${dimensions.heights.header});
      overflow-x: hidden;
      overflow-y: auto; /* to show the scrollbar only when necessary */
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

        @media screen and (${dimensions.viewports.tablet}) {
          display: grid;
          grid:
            [row1-start] 'page-header page-header-side' auto [row1-end]
            [row2-start] 'page-content page-navigation' 1fr [row2-end]
            / ${dimensions.widths.pageContentSmallWithMargings} 0;
        }
        @media screen and (${dimensions.viewports.largeTablet}) {
          grid:
            [row1-start] 'page-header page-header-side' auto [row1-end]
            [row2-start] 'page-content page-navigation' 1fr [row2-end]
            / minmax(
              ${dimensions.widths.pageContentSmallWithMargings},
              ${dimensions.widths.pageContentWithMargings}
            )
            ${dimensions.widths.pageNavigation};
        }
        @media screen and (${dimensions.viewports.laptop}) {
          grid:
            [row1-start] 'page-header page-header-side' auto [row1-end]
            [row2-start] 'page-content page-navigation' 1fr [row2-end]
            / minmax(
              ${dimensions.widths.pageContentSmallWithMargings},
              ${dimensions.widths.pageContentWithMargings}
            )
            ${dimensions.widths.pageNavigationSmall};
        }
        @media screen and (${dimensions.viewports.desktop}) {
          grid:
            [row1-start] 'page-header page-header-side' auto [row1-end]
            [row2-start] 'page-content page-navigation' 1fr [row2-end]
            / ${dimensions.widths.pageContentWithMargings}
            ${dimensions.widths.pageNavigation};
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
