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
 *
 * overflow setting is needed because of this PR: https://github.com/commercetools/commercetools-docs-kit/pull/1420/files
 * Reason behind clip value:
 * CSS position: sticky works only when there's no overflow restrictions applied at any level in the ancestors.
 * see https://www.terluinwebdesign.nl/en/css/position-sticky-not-working-try-overflow-clip-not-overflow-hidden/
 * As possible solution clip is a sort of middle ground that seems to be working solving both the issues
 * (active section and sticky content)
 */
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
