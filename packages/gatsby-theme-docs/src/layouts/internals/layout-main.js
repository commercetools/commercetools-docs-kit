import React from 'react';
import styled from '@emotion/styled';

const Container = styled.main`
  grid-area: main;
  min-width: 0;
  position: relative;
  display: grid;
  grid:
    [row1-start] 'page' 1fr [row1-end]
    [row2-start] 'footer' auto [row2-end]
    / 1fr;
`;

const LayoutMain = props => (
  <Container role="main" aria-label="Page content" {...props} />
);

export default LayoutMain;
