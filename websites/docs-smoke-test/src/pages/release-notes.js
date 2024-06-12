import { ThemeProvider } from '@commercetools-docs/gatsby-theme-docs';

import styled from '@emotion/styled';

import { designSystem } from '@commercetools-docs/ui-kit';

const Container = styled.div`
  width: 100%;
`;

const ContentWrapper = styled.div`
  width: 100%;
  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    width: 80%;
  }
  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    width: 95%;
  }
  max-width: 1140px;
  margin: 0 auto;
`;

const ReleaseNotesSearchContent = () => {
  return (
    <Container>
      <ContentWrapper>
        <h2>Release Notes search page placeholder</h2>
      </ContentWrapper>
    </Container>
  );
};

const PageReleaseNotesSearch = (props) => (
  <ThemeProvider>
    <ReleaseNotesSearchContent {...props} />
  </ThemeProvider>
);

export default PageReleaseNotesSearch;
