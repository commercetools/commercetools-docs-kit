import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import { designSystem, Markdown } from '@commercetools-docs/ui-kit';

// TODO: for now we assume that the website provides a file `homepage-hero.svg`
// in the `static` folder.
const homepageHeroSvgUri = '/homepage-hero.svg';

// The container is used to render a background image with for the full page width.
const Container = styled.div`
  grid-area: page-header;
  position: relative;
  background-color: ${(props) => props.theme.colors.light.primary};
  background-image: url('${homepageHeroSvgUri}');
  background-attachment: fixed;
  background-size: cover;

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    background-size: auto;
  }
  @media screen and (${designSystem.dimensions.viewports.largeDesktop}) {
    background-size: cover;
  }

  /* License with attribution of the background by SVGBackgrounds.com */
`;
// This wrapper element increases the padding for the "normal" content page.
const ContentWrapper = styled.div`
  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    padding: 0 ${designSystem.dimensions.spacings.m};
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
    padding: ${designSystem.dimensions.spacings.xl}
      ${designSystem.dimensions.spacings.xl};
  }
`;

const LayoutPageWithHero = (props) => (
  <>
    <Container>
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
  children: PropTypes.node.isRequired,
};

export default LayoutPageWithHero;
