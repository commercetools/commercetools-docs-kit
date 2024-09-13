import { designSystem } from '@commercetools-docs/ui-kit';
import { contentLayoutConfig } from './layout-design-config';

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
            ${contentLayoutConfig.default.column1Max}
            ${contentLayoutConfig.default.column2Max}
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
            ${contentLayoutConfig.default.column1}
            ${contentLayoutConfig.default.column2Hidden};
    }
    @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
        grid:
            ${gridRows}
            / 
            ${contentLayoutConfig[configPage].column1}
            ${contentLayoutConfig[configPage].column2}
    }
    @media screen and (${designSystem.dimensions.viewports.laptop}) {
        grid:
            ${gridRows}
            /
            ${contentLayoutConfig[configPage].column1}
            ${
              isReleaseNotesPage
                ? contentLayoutConfig.releaseNote.column2FixedReleaseNoteFilters
                : contentLayoutConfig.default.column2Fixed
            }
    }
    @media screen and (${designSystem.dimensions.viewports.desktop}) {
        grid:
            ${gridRows}
            /
            ${contentLayoutConfig[configPage].column1}
            ${contentLayoutConfig[configPage].column2}
    }
    ${allowWideContentLayout && largestMediaQuery}
`;
};
