import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';
import { GRID_ID_GLOBAL_NOTIFICATION } from './layout-design-config';

const LayoutGlobalNotification = styled.div`
  grid-area: ${GRID_ID_GLOBAL_NOTIFICATION};
  padding: 0;
  position: sticky;
  top: 0;
  z-index: ${designSystem.dimensions.stacks.base};
`;

export default LayoutGlobalNotification;
