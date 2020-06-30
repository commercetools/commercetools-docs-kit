import styled from '@emotion/styled';
import { dimensions } from '../design-system';

// allows the first and second child of this container to float side by side in large desktop sizes
const SideBySide = styled.div`
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

export default SideBySide;
