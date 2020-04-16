import { customProperties } from '@commercetools-uikit/design-system';

const rootFontSizeNumber = 16;
const pageWidth = '770px';
const pageWidthSmall = '592px';
const navbarWidth = '224px';
const navbarWidthSmall = '200px';

export const pxToRem = (px) => {
  const pxNumber = px.replace(/([0-9]+)px$/, '$1');
  const remNumber = parseInt(pxNumber, 10) / rootFontSizeNumber;
  return `${remNumber}rem`;
};

export const colors = {
  light: {
    // Used to give the website a unique tone (e.g. page titles, navigation links)
    primary: customProperties.colorAccent40,
    // Surfaces are used for backgrounds
    surfacePrimary: customProperties.colorSurface,
    surfaceSecondary1: customProperties.colorNeutral95,
    surfaceSecondary2: customProperties.colorNeutral90,
    surfaceSecondary3: customProperties.colorNeutral60,
    surfaceInlineCode: customProperties.colorNeutral90,
    surfaceCode: customProperties.colorAccent,
    surfaceCodeCopy: customProperties.colorAccent30,
    surfaceCodeHighlight: customProperties.colorAccent40,
    surfaceInfo: customProperties.colorInfo95,
    surfaceBeta: customProperties.colorInfo85,
    surfaceQuote: customProperties.colorAccent98,
    surfaceWarning: customProperties.colorWarning95,
    surfaceError: customProperties.colorError95,
    surfaceSearchHighlight: customProperties.colorAccent95,
    surfaceForSearchInputWhenDisabled: customProperties.colorNeutral90,
    surfaceForReleaseNoteTypeFix: '#e4c5ff',
    // Different tones of text
    textPrimary: customProperties.colorSolid,
    textSecondary: '#666666',
    textFaded: customProperties.colorNeutral60,
    textCode: customProperties.colorError,
    textInfo: customProperties.colorInfo,
    textError: customProperties.colorError,
    textWarning: customProperties.colorWarning,
    textInverted: customProperties.colorSurface,
    textSearchHeading: customProperties.colorPrimary25,
    // Different tones of border colors
    borderPrimary: customProperties.colorNeutral90,
    borderSecondary: customProperties.colorNeutral,
    borderInput: customProperties.colorNeutral60,
    borderHighlight: customProperties.colorPrimary,
    borderInfo: customProperties.colorInfo,
    borderForReleaseNoteTypeFix: '#b866ff',
    // Links
    link: customProperties.colorPrimary25,
    linkHover: customProperties.colorPrimary,
    linkNavigation: customProperties.colorInfo,
  },
};

export const tokens = {
  borderRadiusForBetaFlag: customProperties.borderRadius4,
  borderRadiusForSearchDialog: customProperties.borderRadius6,
  borderRadiusForSearchInput: customProperties.borderRadius6,
  borderRadiusForCodeBlock: customProperties.borderRadius6,
  borderRadiusForTooltip: customProperties.borderRadius4,
  borderRadiusForContentNotification: customProperties.borderRadius6,
  borderRadiusForImageFrame: customProperties.borderRadius6,
  borderRadiusForBlockquote: customProperties.borderRadius6,
  shadowForBetaFlag: customProperties.shadow7,
  shadowForSearchDialog: customProperties.shadow2,
  shadowForPageContent: customProperties.shadow11,
};

export const dimensions = {
  heights: {
    header: '48px',
    inputSearch: '32px',
  },
  widths: {
    pageContent: pageWidth,
    pageContentSmall: pageWidthSmall,
    pageContentWithMargings: `calc(${pageWidth} + 32px * 2)`,
    pageContentSmallWithMargings: `calc(${pageWidthSmall} + 16px * 2)`,
    pageNavigation: navbarWidth,
    pageNavigationSmall: navbarWidthSmall,
    marketingContent: '1168px',
    searchBar: '300px',
    searchBarSmall: '150px',
    selectDropDownArrowWith: '12px',
    rssIconWidth: '16px',
  },
  viewports: {
    mobile: `max-width: ${pageWidth}`,
    tablet: `min-width: calc(${pageWidth} - 0.01px)`,
    largeTablet: `min-width: calc(848px - 0.01px)`,
    laptop: `min-width: calc(1024px - 0.01px)`,
    desktop: `min-width: calc(1280px - 0.01px)`,
    largeDesktop: `min-width: calc(1866px - 0.01px)`,
  },
  spacings: {
    xs: pxToRem('4px'),
    s: pxToRem('8px'),
    m: pxToRem('16px'),
    l: pxToRem('24px'),
    xl: pxToRem('32px'),
    xxl: pxToRem('40px'),
    big: pxToRem('48px'),
    large: pxToRem('56px'),
    wide: pxToRem('64px'),
    enormous: pxToRem('72px'),
    huge: pxToRem('80px'),
  },
};

export const typography = {
  fontFamilies: {
    primary: "'Roboto', sans-serif",
    code: "'Roboto Mono', monospace",
  },

  rootFontSize: `${rootFontSizeNumber}px`,

  fontSizes: {
    h1: pxToRem('48px'),
    h2: pxToRem('26px'),
    h3: pxToRem('24px'),
    h4: pxToRem('20px'),
    h5: pxToRem('16px'),
    h6: pxToRem('16px'),
    body: pxToRem('16px'),
    small: pxToRem('14px'),
    // The sizes below are only used in specific case. Do not use them regularly.
    // If necessary, ask the Design team.
    extraSmall: pxToRem('12px'),
    ultraSmall: pxToRem('10px'),
  },

  fontWeights: {
    regular: '400',
    medium: '500',
    bold: '700',
  },

  lineHeights: {
    small: pxToRem('16px'),
    body: pxToRem('23px'),
  },
};

export const uikitTheme = {
  fontFamilyDefault: typography.fontFamilies.primary,
  fontFamilyBody: typography.fontFamilies.primary,
};
