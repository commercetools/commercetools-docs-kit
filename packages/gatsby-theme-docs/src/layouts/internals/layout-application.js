import styled from '@emotion/styled';
import { dimensions } from '../../design-system';

const LayoutApplication = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: ${dimensions.heights.header} 1fr;
  grid-template-columns: 1fr;

  @media only percy {
    /* Unset the 100vh to make view scrollable in order to take full page snapshots */
    height: auto;
  }
`;

// eslint-disable-next-line react/display-name
export default LayoutApplication;
