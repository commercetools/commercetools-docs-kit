import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${designSystem.dimensions.stacks.overlay};
  position: ${(props) => props.position || 'fixed'};
  top: ${(props) => props.top || '0'};
  left: 0;
  right: 0;
  bottom: 0;
  display: ${(props) => props.display || 'flex'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
`;

export default Overlay;
