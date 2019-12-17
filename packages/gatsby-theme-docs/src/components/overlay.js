import styled from '@emotion/styled';

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: ${props => props.justifyContent || 'flex-start'};
`;

export default Overlay;
