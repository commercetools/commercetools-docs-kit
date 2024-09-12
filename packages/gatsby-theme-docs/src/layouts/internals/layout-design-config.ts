import { designSystem } from '@commercetools-docs/ui-kit';

/**
 * Layout for Page content
 * excludes left navigation
 * Typically there is 2 vertical columns with veried rows depending on usage
 * All Layout components share same layout
 * |----TOP--------------|--1--|
 * |----TITLE------------|--2--|
 * |----CONTENT----------|--3--|
 *
 * |---COLUMN_ONE--------|--COLUMN_TWO--|
 * |---COLUMN_ONE--------|--COLUMN_TWO--|
 *
 * Note: Release notes page has a different layout to accound for search filters
 */
export const contentLayoutConfigV2 = {
  default: {
    column1: `minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargins},
        ${designSystem.dimensions.widths.pageContentWithMargins}
      )`,
    column1Fixed: designSystem.dimensions.widths.pageContentWithMargins,
    column1Max: `minmax(
        ${designSystem.dimensions.widths.pageContentWideWithMargins},
        ${designSystem.dimensions.widths.pageContentWideWithMarginsMax}
      )`,
    column2Fixed: designSystem.dimensions.widths.pageNavigation,
    column2Hidden: `0`,
    column2: `minmax(
        ${designSystem.dimensions.widths.pageNavigationSmall},
        ${designSystem.dimensions.widths.pageNavigationSmall} // TODO why min max of same value?
      )`,
    column2Max: `minmax(${designSystem.dimensions.widths.pageNavigationSmall}, ${designSystem.dimensions.widths.pageNavigation})`,
  },
  releaseNote: {
    column1: `minmax(
        ${designSystem.dimensions.widths.pageContentSmallReleaseNotesWithMargins}, 
        ${designSystem.dimensions.widths.pageContentReleaseNotesWithMargins}
        )`,
    column1Fixed:
      designSystem.dimensions.widths.pageContentReleaseNotesWithMargins,
    column2Fixed:
      designSystem.dimensions.widths.pageContentReleaseNotesWithMargins,
    column2FixedReleaseNoteFilters:
      designSystem.dimensions.widths.releaseNoteFilters,
    column2: `minmax(
          ${designSystem.dimensions.widths.pageNavigationSmall},
          ${designSystem.dimensions.widths.releaseNoteFilters}
        )`,
  },
};

// Namespace declarations for all app layout grid ids
export const GRID_ID_ROW_ONE = {
  start: 'row1-start',
  end: 'row1-end',
};

export const GRID_ID_ROW_TWO = {
  start: 'row2-start',
  end: 'row2-end',
};

export const GRID_ID_ROW_THREE = {
  start: 'row3-start',
  end: 'row3-end',
};
export const GRID_ID_GLOBAL_NOTIFICATION = 'global-notification';
export const GRID_ID_EMPTY = 'empty';
export const GRID_ID_PAGE_HEADER = 'page-header';
export const GRID_ID_PAGE_HEADER_SIDE = 'page-header-side';
export const GRID_ID_PAGE_CONTENT = 'page-content';
export const GRID_ID_PAGE_NAVIGATION = 'page-navigation';
export const GRID_ID_HEADER_TOP_MENU = 'header-top-menu';
export const GRID_ID_HEADER_SEARCHBOX = 'header-searchbox';
