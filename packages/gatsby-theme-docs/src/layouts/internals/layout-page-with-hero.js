import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { designSystem, Markdown } from '@commercetools-docs/ui-kit';
import { GlobalNotification } from '../../components';
import LayoutGlobalNotification from './layout-global-notification';
import {
  GRID_ID_PAGE_HEADER,
  GRID_ID_PAGE_CONTENT,
} from './layout-design-config';

const bannerHeight = '200px';

const Container = styled.div`
  grid-area: ${GRID_ID_PAGE_HEADER};
  position: relative;
`;
// The hero is used to render a background image with for the full page width.
const Hero = styled.div`
  min-height: ${bannerHeight};
  max-height: ${bannerHeight};
  background-color: ${(props) => props.heroBackgroundColor};
  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    background-size: cover;
    max-height: unset;
  }
`;
// Constraint the heading to the "page content" width.
const Title = styled(Markdown.H1)`
  padding: ${designSystem.dimensions.spacings.m}
    ${designSystem.dimensions.spacings.m};
  width: calc(100% - ${designSystem.dimensions.spacings.m} * 2);
  max-width: ${designSystem.dimensions.widths.pageContent};

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    width: calc(100% - ${designSystem.dimensions.spacings.large} * 2);
    padding: ${designSystem.dimensions.spacings.m}
      ${designSystem.dimensions.spacings.xl};
  }
`;
// This wrapper element increases the padding for the "normal" content page
// and uses a single column layout.
const ContentWrapper = styled.div`
  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    padding: 0 ${designSystem.dimensions.spacings.m};
    max-width: unset;
    display: grid;
    grid:
      [row1-start] '${GRID_ID_PAGE_CONTENT}' 1fr [row1-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargins},
        ${designSystem.dimensions.widths.pageContentWithMargins}
      );
  }
  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    grid:
      [row1-start] '${GRID_ID_PAGE_CONTENT}' 1fr [row1-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargins},
        ${designSystem.dimensions.widths
          .pageContentWithMarginsAndPageNavigation}
      );
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    padding: 0;
    grid:
      [row1-start] '${GRID_ID_PAGE_CONTENT}' 1fr [row1-end]
      / ${designSystem
        .dimensions.widths.pageContentWithMarginsAndPageNavigation};
  }
`;

const LayoutPageWithHero = (props) => (
  <Container>
    <LayoutGlobalNotification>
      {props.globalNotification.active && (
        <GlobalNotification type={props.globalNotification.notificationType}>
          {props.globalNotification.content}
        </GlobalNotification>
      )}
    </LayoutGlobalNotification>
    <Hero heroBackgroundColor="#F7F2EA">
      <Title
        style={designSystem.tokensToCssVars({
          websitePrimaryColor: designSystem.colors.light.headlinePrimary,
        })}
      >
        {props.title}
      </Title>
    </Hero>
    <ContentWrapper>{props.children}</ContentWrapper>
  </Container>
);
LayoutPageWithHero.propTypes = {
  title: PropTypes.string.isRequired,
  globalNotification: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    notificationType: PropTypes.oneOf(['info', 'warning']).isRequired,
    content: PropTypes.string.isRequired,
  }),
  children: PropTypes.node.isRequired,
};

export default LayoutPageWithHero;
