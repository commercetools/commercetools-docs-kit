import styled from '@emotion/styled';
import { dimensions } from '../../design-system';

const LayoutApplication = styled.div`
  height: 100vh;
  display: grid;
  grid:
    [row1-start] 'header' ${dimensions.heights.header} [row1-end]
    [row1-start] 'main' 1fr [row1-end]
    / 1fr;

  @media only percy {
    /* Unset the 100vh to make view scrollable in order to take full page snapshots */
    height: auto;
  }
`;

// eslint-disable-next-line react/display-name
export default LayoutApplication;
