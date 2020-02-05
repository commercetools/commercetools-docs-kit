import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { designSystem } from '@commercetools-docs/ui-kit';

const Container = styled.div`
  grid-area: main;
  min-width: 0;
  position: relative;
  display: grid;
  grid:
    [row1-start] 'header' ${designSystem.dimensions.heights.header} [row1-end]
    [row2-start] 'page' 1fr [row2-end]
    [row3-start] 'footer' auto [row3-end]
    / 1fr;

  ${props =>
    // Prevents scroll when top menu is open
    props.isTopMenuOpen &&
    css`
      height: 100vh;
      overflow-y: hidden;
    `}
`;

const LayoutMain = props => <Container {...props} />;

export default LayoutMain;
