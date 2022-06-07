import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const Container = styled.div`
  border: 1px solid ${designSystem.colors.light.borderSecondary};
  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    padding: ${designSystem.dimensions.spacings.s};
  }
  padding: ${designSystem.dimensions.spacings.m}
    ${designSystem.dimensions.spacings.m} ${designSystem.dimensions.spacings.s}
    ${designSystem.dimensions.spacings.m};
  border-radius: ${designSystem.tokens.borderRadiusForChildSectionNav}
    ${designSystem.tokens.borderRadiusForChildSectionNav};
  columns: auto ${designSystem.dimensions.widths.pageNavigationSmall};
  column-gap: ${designSystem.dimensions.spacings.l};
`;

const MultiColumnLayout = (props) => <Container>{props.children}</Container>;

MultiColumnLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default MultiColumnLayout;
