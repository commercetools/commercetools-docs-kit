const rootFontSizeNumber = 16;
const pageWidth = '770px';
const pageWidthSmall = '592px';
const navbarWidth = '224px';
const navbarWidthSmall = '200px';

export const pxToRem = px => {
  const pxNumber = px.replace(/([0-9]+)px$/, '$1');
  const remNumber = parseInt(pxNumber, 10) / rootFontSizeNumber;
  return `${remNumber}rem`;
};

const uikitColors = {
  colorInfo: '#078cdf',
  colorInfo85: 'hsl(203.05555555555554, 93.9130434783%, 85%)',
  colorInfo95: 'hsl(203.05555555555554, 93.9130434783%, 95%)',
  colorSurface: '#fff',
  colorNeutral: '#ccc',
  colorNeutral60: 'hsl(0, 0%, 60%)',
  colorNeutral90: 'hsl(0, 0%, 90%)',
  colorNeutral95: 'hsl(0, 0%, 95%)',
  colorAccent: '#213c45',
  colorAccent40: 'hsl(195, 35.2941176471%, 40%)',
  colorAccent95: 'hsl(195, 35.2941176471%, 95%)',
  colorAccent98: 'hsl(195, 35.2941176471%, 98%)',
  colorSolid: '#1a1a1a',
  colorError: '#e60050',
  colorError95: 'hsl(339.1304347826087, 100%, 95%)',
  colorPrimary: '#00b39e',
  colorPrimary25: 'hsl(172.9608938547486, 100%, 25%)',
  colorWarning: '#f16d0e',
  colorWarning95: 'hsl(25.110132158590307, 89.0196078431%, 95%)',
};

export const colors = {
  light: {
    // Used to give the website a unique tone (e.g. page titles, navigation links)
    primary: uikitColors.colorAccent40,
    // Surfaces are used for backgrounds
    surfacePrimary: uikitColors.colorSurface,
    surfaceSecondary1: uikitColors.colorNeutral95,
    surfaceSecondary2: uikitColors.colorNeutral90,
    surfaceSecondary3: uikitColors.colorNeutral60,
    surfaceCode: uikitColors.colorAccent,
    surfaceCodeHighlight: uikitColors.colorAccent40,
    surfaceInfo: uikitColors.colorInfo95,
    surfaceBeta: uikitColors.colorInfo85,
    surfaceQuote: uikitColors.colorAccent98,
    surfaceWarning: uikitColors.colorWarning95,
    surfaceError: uikitColors.colorError95,
    // Different tones of text
    textPrimary: uikitColors.colorSolid,
    textSecondary: '#666666',
    textFaded: uikitColors.colorNeutral60,
    textCode: uikitColors.colorError,
    textInfo: uikitColors.colorInfo,
    textError: uikitColors.colorError,
    textWarning: uikitColors.colorWarning,
    textInverted: uikitColors.colorSurface,
    // Different tones of border colors
    borderPrimary: uikitColors.colorNeutral90,
    borderSecondary: uikitColors.colorNeutral,
    borderHighlight: uikitColors.colorPrimary,
    borderInfo: uikitColors.colorInfo,
    // Links
    link: uikitColors.colorPrimary25,
    linkHover: uikitColors.colorPrimary,
    linkNavigation: uikitColors.colorInfo,
  },
};

export const tokens = {
  borderRadius2: '2px',
  borderRadius4: '4px',
  borderRadius6: '6px',
  shadow1: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  shadow6: ' 0 -1px 2px 0 rgba(0, 0, 0, 0.2)',
  shadow7:
    '0 -1px 1.5px 0 rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.24)',
  shadow8: '0 1px 9.5px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.24)',
  shadow9:
    'inset 0 -1px 3px 0 rgba(0, 0, 0, 0.1), inset 0 1px 1.5px 0 rgba(0, 0, 0, 0.2), inset 0 1px 1.5px 0 rgba(0, 0, 0, 0.25)',
};

export const dimensions = {
  heights: {
    header: '48px',
  },
  widths: {
    pageContent: pageWidth,
    pageContentSmall: pageWidthSmall,
    pageContentWithMargings: `calc(${pageWidth} + 32px * 2)`,
    pageContentSmallWithMargings: `calc(${pageWidthSmall} + 16px * 2)`,
    pageNavigation: navbarWidth,
    pageNavigationSmall: navbarWidthSmall,
    marketingContent: '1168px',
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
    body: pxToRem('23px'),
  },
};
