import styled from '@emotion/styled';
import { designSystem, Markdown } from '@commercetools-docs/ui-kit';

/**
 * NOTE about the `section` selectors.
 *
 * The actual body content of an MDX page is in direct descendants of the page's sections.
 * By default it is limited to the pageContent width, only specific elements
 * are allowed to take the full width, which only applies in the "wideDesktop"
 * breakpoint. Therefore, the max-width needs to be adjusted.
 *
 * For the main section heading, we unset the max-width in order for the underline
 * to span across the page.
 */
const PageContentInset = styled.div`
  max-width: ${(props) =>
    props.maxWidth || designSystem.dimensions.widths.pageContentWide};
  section {
    overflow: clip;
  }
  section > * {
    max-width: ${(props) =>
      props.maxWidth || designSystem.dimensions.widths.pageContent};
  }
  section > ${Markdown.H2} {
    max-width: unset;
  }
  margin-top: ${designSystem.dimensions.heights.pageSearchboxSpace};
  border-right: ${(props) =>
    props.showRightBorder
      ? `1px solid ${designSystem.colors.light.borderPrimary}`
      : `none`};

  padding: 0 ${designSystem.dimensions.spacings.m}
    ${designSystem.dimensions.spacings.xl};

  > * + * {
    margin: ${designSystem.dimensions.spacings.xl} 0 0;
  }

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    padding: 0 ${designSystem.dimensions.spacings.xl}
      ${designSystem.dimensions.spacings.xl};
  }
`;

export default PageContentInset;
