import { designSystem } from '@commercetools-docs/ui-kit';

/**
 * Layout definition for Page content
 * This layout is contained within contentLayoutConfig. This layout excludes
 * left navigation.
 *
 * Layouts can we one or 2 columns with various rows.
 * |----A----------------|--1--|
 * |----B----------------|--2--|
 * |----C----------------|--3--|
 *
 * |---COLUMN_ONE--------|--COLUMN_TWO--|
 * |---COLUMN_ONE--------|--COLUMN_TWO--|
 *
 * |---COLUMN_ONE--------|--COLUMN_TWO--|
 * |---COLUMN_ONE-----------------------|
 *
 * |---COLUMN_ONE-----------------------|
 * |---COLUMN_ONE-----------------------|
 *
 * Note: Release notes page has a different varient on column two's width to account for search filters
 */
export const contentLayoutConfig = {
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
