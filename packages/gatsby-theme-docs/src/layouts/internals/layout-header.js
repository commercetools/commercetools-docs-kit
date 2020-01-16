import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { designSystem, LogoButton } from '@commercetools-docs/ui-kit';
import { SearchBar } from '../../components';

const Container = styled.header`
  display: block;
  grid-area: header;
  height: ${designSystem.dimensions.heights.header};
  width: 100%;
  border-bottom: 1px solid ${designSystem.colors.light.borderPrimary};
  z-index: 10;
`;
const Constraint = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: ${props =>
      props.constraintWidth ||
      `calc(
        ${designSystem.dimensions.widths.pageContentWithMargings} +
        ${designSystem.dimensions.widths.pageNavigation})
      `};
  }
`;
const Inline = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
const LogoContainer = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  justify-content: flex-end;

  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    display: none;
  }
`;
const DocumentationSwitcherContainer = styled.div`
  border-left: 1px solid ${designSystem.colors.light.borderPrimary};
  color: ${designSystem.colors.light.textSecondary};
  font-size: ${designSystem.typography.fontSizes.body};
  padding: 0 0 0 1rem;
  margin: 0;
  height: calc(100% - ${designSystem.dimensions.spacings.m});
  display: flex;
  align-items: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const SearchContainer = styled.div`
  padding: 0 ${designSystem.dimensions.spacings.m};
  display: ${props => (props.excludeFromSearchIndex ? 'none' : 'block')};

  @media only percy {
    display: block !important;
  }
`;

const LayoutHeader = props => (
  <Container>
    <Constraint constraintWidth={props.constraintWidth}>
      <Inline alignItems="center">
        <LogoContainer>
          <div
            id="sidebar-menu-toggle"
            css={css`
              display: flex;
              @media screen and (${designSystem.dimensions.viewports.laptop}) {
                display: none;
              }
            `}
          />
          <LogoButton />
        </LogoContainer>
        <DocumentationSwitcherContainer>
          {props.siteTitle}
        </DocumentationSwitcherContainer>
      </Inline>
      <SearchContainer excludeFromSearchIndex={props.excludeFromSearchIndex}>
        <SearchBar />
      </SearchContainer>
    </Constraint>
  </Container>
);
LayoutHeader.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  excludeFromSearchIndex: PropTypes.bool.isRequired,
  constraintWidth: PropTypes.string,
};

export default LayoutHeader;
