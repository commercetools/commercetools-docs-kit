import { css } from '@emotion/core';
import { dimensions } from '../design-system';

const sideBySideContainerStyle = css`
  margin-top: 0;
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
  }
`;

export default sideBySideContainerStyle;
