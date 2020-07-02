import styled from '@emotion/styled';
import { designSystem, Markdown } from '@commercetools-docs/ui-kit';

const PageContentInset = styled.div`
  max-width: ${(props) =>
    props.maxWidth || designSystem.dimensions.widths.pageContentWide};
  section > * {
    max-width: ${(props) =>
      props.maxWidth || designSystem.dimensions.widths.pageContent};
  }
  section > ${Markdown.H2} {
    max-width: unset;
  }
  padding: ${designSystem.dimensions.spacings.m}
    ${designSystem.dimensions.spacings.m} ${designSystem.dimensions.spacings.xl};

  > * + * {
    margin: ${designSystem.dimensions.spacings.xl} 0 0;
  }

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    padding: ${designSystem.dimensions.spacings.m}
      ${designSystem.dimensions.spacings.xl}
      ${designSystem.dimensions.spacings.xl};
  }
`;

export default PageContentInset;
