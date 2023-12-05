import React from 'react';
import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const PageTitle = styled.h1`
  display: inline-block;
  color: ${designSystem.colors.light.headlinePrimary};
  font-size: ${designSystem.typography.fontSizes.h1};
  font-weight: ${designSystem.typography.fontWeights.regular};
`;

const H2 = styled.h2`
  color: ${designSystem.colors.light.headlinePrimary};
  font-size: ${designSystem.typography.fontSizes.h2};
  padding-bottom: ${designSystem.dimensions.spacings.s};
`;

const H3 = styled.h3`
  color: ${designSystem.colors.light.headlinePrimary};
  font-size: ${designSystem.typography.fontSizes.h3};
  padding-bottom: ${designSystem.dimensions.spacings.s};
`;

export { PageTitle, H2, H3 };
