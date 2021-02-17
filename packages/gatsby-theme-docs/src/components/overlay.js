import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { designSystem } from '@commercetools-docs/ui-kit';

const backgroundAnimation = keyframes`
  from { background-color: rgba(0, 0, 0, 0); }
  to { background-color: rgba(0, 0, 0, 0.5); }
`;

const Overlay = styled.div`
  animation: ${backgroundAnimation} 0.3s ease-out;
  animation-fill-mode: forwards;
  z-index: ${(props) => props.zIndex || designSystem.dimensions.stacks.overlay};
  position: ${(props) => props.position || 'fixed'};
  top: ${(props) => props.top || '0'};
  left: 0;
  right: 0;
  bottom: 0;
  display: ${(props) => props.display || 'flex'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
`;

export default Overlay;
