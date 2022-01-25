import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const LayoutGlobalNotification = styled.div`
  grid-area: global-notification;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: ${designSystem.dimensions.stacks.base};
`;

export default LayoutGlobalNotification;
