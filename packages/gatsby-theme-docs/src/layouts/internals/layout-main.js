import React from 'react';
import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const Container = styled.main`
  grid-area: main;
  min-width: 0;
  position: relative;
  display: grid;
  grid:
    [row1-start] 'header' ${designSystem.dimensions.heights.header} [row1-end]
    [row2-start] 'page' 1fr [row2-end]
    [row3-start] 'footer' auto [row3-end]
    / 1fr;
`;

const LayoutMain = props => (
  <Container role="main" aria-label="Page content" {...props} />
);

export default LayoutMain;
