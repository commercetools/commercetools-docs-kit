import styled from '@emotion/styled';
import { designSystem, Markdown } from '@commercetools-docs/ui-kit';

const PageContentInset = styled.div`
  max-width: ${(props) =>
    props.maxWidth || designSystem.dimensions.widths.pageContentWide};
  /* The actual body content of an MDX page is in direct descendants of the page's sections.
     By default it is limited to the pageContent width, only specific elements are allowed
     to take the full width, which only applies in the "wideDesktop" breakpoint. These
     override this default.  */
  section > * {
    max-width: ${(props) =>
      props.maxWidth || designSystem.dimensions.widths.pageContent};
  }
  /* overide that gives main section headings full width to have their underline go across the page */
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
