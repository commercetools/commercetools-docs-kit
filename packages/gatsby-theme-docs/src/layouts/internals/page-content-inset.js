import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const PageContentInset = styled.div`
  max-width: ${(props) =>
    props.maxWidth || designSystem.dimensions.widths.pageContent};
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
