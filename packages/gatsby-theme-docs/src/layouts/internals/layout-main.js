import styled from '@emotion/styled';
import { dimensions } from '../../design-system';

/* NOTE: `overflow` shorthand is only supported is Chrome and FF */
const LayoutMain = styled.div`
  display: grid;
  grid:
    [row1-start] 'page' 1fr [row1-end]
    / 1fr;
  overflow-x: hidden;
  overflow-y: auto;

  @media screen and (${dimensions.viewports.laptop}) {
    grid:
      [row1-start] 'sidebar page' 1fr [row1-end]
      / auto 1fr;
  }
  @media screen and (${dimensions.viewports.desktop}) {
    width: calc(
      ${dimensions.widths.pageContentWithMargings} +
        ${dimensions.widths.pageNavigation} * 2
    );
  }
`;

export default LayoutMain;
