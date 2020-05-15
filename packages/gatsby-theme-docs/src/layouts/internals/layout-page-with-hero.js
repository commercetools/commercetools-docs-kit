import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import { designSystem, Markdown } from '@commercetools-docs/ui-kit';

// The container is used to render a background image with for the full page width.
const Container = styled.div`
  grid-area: page-header;
  position: relative;
  background-attachment: fixed;
  background-size: cover;
  background-color: ${(props) => props.theme.colors.light.primary};

  /* stylelint-disable-next-line function-whitespace-after */
  background-image: ${(props) => `url('${props.heroBackgroundURL}')`};

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    background-size: auto;
  }
  @media screen and (${designSystem.dimensions.viewports.largeDesktop}) {
    background-size: cover;
  }

  /* License with attribution of the background by SVGBackgrounds.com */
`;
// Constraint the heading to the "page content" width.
const Title = styled(Markdown.H1)`
  padding: ${designSystem.dimensions.spacings.m}
    ${designSystem.dimensions.spacings.m};
  width: calc(100% - ${designSystem.dimensions.spacings.m} * 2);
  max-width: ${designSystem.dimensions.widths.pageContent};

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    width: calc(100% - ${designSystem.dimensions.spacings.large} * 2);
    padding: ${designSystem.dimensions.spacings.xl}
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
      [row1-start] 'page-content' 1fr [row1-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargings},
        ${designSystem.dimensions.widths.pageContentWithMargings}
      );
  }
  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    grid:
      [row1-start] 'page-content' 1fr [row1-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargings},
        ${designSystem.dimensions.widths
          .pageContentWithMargingsAndPageNavigation}
      );
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    padding: 0;
    grid:
      [row1-start] 'page-content' 1fr [row1-end]
      / ${designSystem
        .dimensions.widths.pageContentWithMargingsAndPageNavigation};
  }
`;

const LayoutPageWithHero = (props) => (
  <>
    <Container heroBackgroundURL={props.heroBackgroundURL}>
      <ThemeProvider
        theme={{
          colors: {
            light: {
              primary: designSystem.colors.light.textInverted,
            },
          },
        }}
      >
        <Title>{props.title}</Title>
      </ThemeProvider>
    </Container>
    <ContentWrapper>{props.children}</ContentWrapper>
  </>
);
LayoutPageWithHero.propTypes = {
  title: PropTypes.string.isRequired,
  heroBackgroundURL: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default LayoutPageWithHero;
