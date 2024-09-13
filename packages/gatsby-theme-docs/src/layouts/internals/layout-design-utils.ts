import { designSystem } from '@commercetools-docs/ui-kit';
import { contentLayoutConfigV2 } from './layout-design-config';

/**
 * getPageLayoutGridStyles utility is a helper function
 * to share layout styles across multiple components
 *
 * @param gridRows string of locally defined grid rows
 * @param isReleaseNotesPage boolean to determine if the page is a release notes page
 * @param allowWideContentLayout boolean to determine if the page should allow wide content layout
 * @returns
 */
export const getPageLayoutGridStyles = (
  gridRows: string,
  isReleaseNotesPage: boolean,
  allowWideContentLayout: boolean
) => {
  const configPage = isReleaseNotesPage ? 'releaseNote' : 'default';
  const largestMediaQuery = `
        @media screen and (${designSystem.dimensions.viewports.largeDesktop}) {
            grid:
            ${gridRows}
            / 
            ${contentLayoutConfigV2.default.column1Max}
            ${contentLayoutConfigV2.default.column2Max}
        }
    `;

  return `
    grid:
        ${gridRows}
        / 
        1fr;

    @media screen and (${designSystem.dimensions.viewports.tablet}) {
        max-width: unset;
        display: grid;
        grid:
            ${gridRows}
            /
            ${contentLayoutConfigV2.default.column1}
            ${contentLayoutConfigV2.default.column2Hidden};
    }
    @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
        grid:
            ${gridRows}
            / 
            ${contentLayoutConfigV2[configPage].column1}
            ${contentLayoutConfigV2[configPage].column2Fixed}
    }
    @media screen and (${designSystem.dimensions.viewports.laptop}) {
        grid:
            ${gridRows}
            /
            ${contentLayoutConfigV2[configPage].column1}
            ${
              isReleaseNotesPage
                ? contentLayoutConfigV2.releaseNote
                    .column2FixedReleaseNoteFilters
                : contentLayoutConfigV2.default.column2Fixed
            }
    }
    @media screen and (${designSystem.dimensions.viewports.desktop}) {
        grid:
            ${gridRows}
            /
            ${contentLayoutConfigV2[configPage].column1}
            ${contentLayoutConfigV2[configPage].column2}
    }
    ${allowWideContentLayout && largestMediaQuery}
`;
};
