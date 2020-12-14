import { customProperties } from '@commercetools-uikit/design-system';

const rootFontSizeNumber = 16;
const pageWidth = '770px';
const pageWidthSmall = '592px';
const asideColumnWidth = pageWidthSmall;
const navbarWidth = '224px';
const navbarWidthSmall = '200px';

export const pxToRem = (px, suffix = 'rem') => {
  const pxNumber = px.replace(/([0-9]+)px$/, '$1');
  const remNumber = parseInt(pxNumber, 10) / rootFontSizeNumber;
  return `${remNumber}${suffix}`;
};

export const colors = {
  light: {
    // Surfaces are used for backgrounds
    surfacePrimary: customProperties.colorSurface,
    surfaceSecondary1: customProperties.colorNeutral95,
    surfaceSecondary2: customProperties.colorNeutral90,
    surfaceSecondary3: customProperties.colorNeutral60,
    surfaceInlineCode: customProperties.colorNeutral95,
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
    // Code blocks
    // We support 2 theme versions: a primary one and a secondary one.
    // This is not to be confused with a (potential) website theme, hence
    // the 2 versions being grouped together.
    // The code block theme is controlled by a prop, which will use the
    // emotion theming provider to inject the correct version of a theme.
    //
    //   <ThemeProvider
    //     theme={{
    //       codeBlockColors: colors.light.codeBlocks[props.secondaryTheme ? 'secondary' : 'primary'],
    //     }}
    //   >
    //
    // Do not use these properties directly, but always throw an emotion theme provider.
    codeBlocks: {
      primary: {
        border: customProperties.colorAccent40,
        surface: customProperties.colorAccent,
        surfaceHeader: customProperties.colorSolid,
        surfaceLanguageDropdown: customProperties.colorSurface,
        surfaceLanguageDropdownHover: customProperties.colorNeutral90,
        textHeader: customProperties.colorNeutral60,
        surfaceCopyIcon: customProperties.colorSurface,
        surfaceCopyIconHover: customProperties.colorAccent40,
        surfaceCopyTooltip: customProperties.colorAccent40,
        textCopyTooltip: customProperties.colorSurface,
        surfaceLineHighlight: customProperties.colorAccent40,
        surfacePrompt: customProperties.colorNeutral60,
      },
      secondary: {
        border: customProperties.colorNeutral90,
        surface: customProperties.colorSurface,
        surfaceHeader: customProperties.colorNeutral,
        surfaceLanguageDropdown: customProperties.colorSolid,
        surfaceLanguageDropdownHover: customProperties.colorNeutral60,
        textHeader: customProperties.colorSolid,
        surfaceCopyIcon: customProperties.colorSolid,
        surfaceCopyIconHover: customProperties.colorAccent40,
        surfaceCopyTooltip: customProperties.colorAccent40,
        textCopyTooltip: customProperties.colorSurface,
        surfaceLineHighlight: customProperties.colorNeutral90,
        surfacePrompt: customProperties.colorNeutral60,
      },
    },
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
  borderRadiusForCard: customProperties.borderRadius6,
  borderRadiusForChildSectionNav: customProperties.borderRadius6,
  borderRadiusForRssFeedTable: customProperties.borderRadius6,
  shadowForBetaFlag: customProperties.shadow7,
  shadowForSearchDialog: customProperties.shadow2,
  shadowForPageContent: customProperties.shadow11,
  shadowForClickableCard: `1px 1px 4px 0 rgba(0, 0, 0, 0.24),
  -1px 1px 3px 0 rgba(0, 0, 0, 0.12)`,
  shadowForClickableCardOnHover: `0 14px 28px 0 rgba(0, 0, 0, 0.25),
  0 10px 10px 0 rgba(0, 0, 0, 0.23)`,
  shadowForRssFeedTable: customProperties.shadow7,
};

export const dimensions = {
  heights: {
    header: '48px',
    inputSearch: '32px',
    childSectionNavLink: '28px',
  },
  widths: {
    pageContent: pageWidth,
    pageContentSmall: pageWidthSmall,
    pageContentWide: `calc(${pageWidth} + ${asideColumnWidth} + 32px)`,
    pageContentWithMargins: `calc(${pageWidth} + 32px * 2)`,
    pageContentSmallWithMargins: `calc(${pageWidthSmall} + 16px * 2)`,
    pageContentWideWithMargins: `calc(${pageWidthSmall} + ${asideColumnWidth} + 32px * 3)`,
    pageContentWideWithMarginsMax: `calc(${pageWidth} + ${asideColumnWidth} + 32px * 3)`,
    pageContentWithMarginsAndPageNavigation: `calc(${pageWidth} + 32px * 2 + ${navbarWidth})`,
    pageNavigation: navbarWidth,
    pageNavigationSmall: navbarWidthSmall,
    marketingContent: '1168px',
    searchBar: '300px',
    searchBarSmall: '150px',
    selectDropDownArrowWith: '12px',
    sideBySideSecondColumn: '560px',
  },
  viewports: {
    mobile: `max-width: calc(768px - 0.02px)`,
    tablet: `min-width: calc(768px - 0.01px)`,
    largeTablet: `min-width: calc(848px - 0.01px)`,
    laptop: `min-width: calc(1024px - 0.01px)`,
    desktop: `min-width: calc(1280px - 0.01px)`,
    largeDesktop: `min-width: calc(1706px - 0.01px)`,
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

  relativeFontSizes: {
    ultraSmall: pxToRem('10px', 'em'),
  },

  fontWeights: {
    regular: '400',
    medium: '500',
    bold: '700',
  },

  lineHeights: {
    small: pxToRem('16px'),
    body: pxToRem('23px'),
    releaseNoteHeader: pxToRem('28px'),
    cardNormalTitle: pxToRem('32px'),
    cardSmallTitle: pxToRem('26px'),
  },
};

export const uikitTheme = {
  fontFamilyDefault: typography.fontFamilies.primary,
  fontFamilyBody: typography.fontFamilies.primary,
};
