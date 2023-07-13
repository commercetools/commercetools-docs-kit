import kebabCase from 'lodash.kebabcase';
import { designTokens } from '@commercetools-uikit/design-system';

const rootFontSizeNumber = 16;
// the "width availability contract" with content is that content
// always has between "pageWidthSmall" and "pageWidth" available and
// must float / stretch into the available width
const pageWidth = '770px';
const pageWidthSmall = '592px';
const asideColumnWidth = pageWidthSmall;
const navbarWidth = '224px';
const navbarWidthSmall = '200px';

export const pxToRem = (px: string, suffix = 'rem') => {
  const pxNumber = px.replace(/([0-9]+)px$/, '$1');
  const remNumber = parseInt(pxNumber, 10) / rootFontSizeNumber;
  return `${remNumber}${suffix}`;
};

export type ThemeColorTokens = {
  // Surfaces are used for backgrounds
  surfacePrimary: string;
  surfaceSecondary1: string;
  surfaceSecondary2: string;
  surfaceSecondary3: string;
  surfaceInlineCode: string;
  surfaceCode: string;
  surfaceCodeCopy: string;
  surfaceCodeHighlight: string;
  surfaceInfo: string;
  surfaceBeta: string;
  surfaceQuote: string;
  surfaceWarning: string;
  surfaceError: string;
  surfaceSearchHighlight: string;
  surfaceForSearchInputWhenDisabled: string;
  surfaceForReleaseNoteTypeFix: string;
  // Different tones of text
  textPrimary: string;
  textSecondary: string;
  textFaded: string;
  textCode: string;
  textInfo: string;
  textError: string;
  textWarning: string;
  textInverted: string;
  textSearchHeading: string;
  // Different tones of border colors
  borderPrimary: string;
  borderSecondary: string;
  borderInput: string;
  borderHighlight: string;
  borderInfo: string;
  borderForReleaseNoteTypeFix: string;
  // Links
  link: string;
  linkHover: string;
  linkNavigation: string;
  // Headlines
  headlinePrimary: string;
  // Icons
  iconSecondary: string;
};

export type ThemeCodeBlocksColorTokens = {
  borderForCodeBlock: string;
  surfaceForCodeBlock: string;
  surfaceHeaderForCodeBlock: string;
  surfaceLanguageDropdownForCodeBlock: string;
  surfaceLanguageDropdownHoverForCodeBlock: string;
  textHeaderForCodeBlock: string;
  surfaceCopyIconForCodeBlock: string;
  surfaceCopyIconHoverForCodeBlock: string;
  surfaceCopyTooltipForCodeBlock: string;
  textCopyTooltipForCodeBlock: string;
  surfaceLineHighlightForCodeBlock: string;
  surfacePromptForCodeBlock: string;
};

export type ThemeColors = {
  light: ThemeColorTokens & {
    codeBlocks: {
      primary: ThemeCodeBlocksColorTokens;
      secondary: ThemeCodeBlocksColorTokens;
    };
  };
};

export const colors: ThemeColors = {
  light: {
    // Surfaces are used for backgrounds
    surfacePrimary: designTokens.colorSurface,
    surfaceSecondary1: designTokens.colorNeutral95,
    surfaceSecondary2: designTokens.colorNeutral90,
    surfaceSecondary3: designTokens.colorNeutral60,
    surfaceInlineCode: designTokens.colorNeutral95,
    surfaceCode: designTokens.colorAccent,
    surfaceCodeCopy: designTokens.colorAccent30,
    surfaceCodeHighlight: designTokens.colorAccent40,
    surfaceInfo: designTokens.colorInfo95,
    surfaceBeta: designTokens.colorInfo85,
    surfaceQuote: designTokens.colorAccent98,
    surfaceWarning: designTokens.colorWarning95,
    surfaceError: designTokens.colorError95,
    surfaceSearchHighlight: designTokens.colorAccent95,
    surfaceForSearchInputWhenDisabled: designTokens.colorNeutral90,
    surfaceForReleaseNoteTypeFix: '#e4c5ff',
    // Different tones of text
    textPrimary: designTokens.colorSolid,
    textSecondary: '#666666',
    textFaded: designTokens.colorNeutral60,
    textCode: designTokens.colorError,
    textInfo: designTokens.colorInfo,
    textError: designTokens.colorError,
    textWarning: designTokens.colorWarning,
    textInverted: designTokens.colorSurface,
    textSearchHeading: designTokens.colorPrimary25,
    // Different tones of border colors
    borderPrimary: designTokens.colorNeutral90,
    borderSecondary: designTokens.colorNeutral,
    borderInput: designTokens.colorNeutral60,
    borderHighlight: designTokens.colorPrimary,
    borderInfo: designTokens.colorInfo,
    borderForReleaseNoteTypeFix: '#b866ff',
    // Links
    link: designTokens.colorPrimary25,
    linkHover: designTokens.colorPrimary,
    linkNavigation: designTokens.colorInfo,
    // Headlines
    headlinePrimary: '#003037',
    // Icons
    iconSecondary: '#949494',
    // Code blocks
    // We support 2 theme versions: a primary one and a secondary one.
    // This is not to be confused with a (potential) website theme, hence
    // the 2 versions being grouped together.
    // The code block theme is controlled by a prop `secondaryTheme` to inject
    // the correct CSS variables.
    //
    //   <div style={tokensToCssVars(
    //     colors.light.codeBlocks[props.secondaryTheme ? 'secondary' : 'primary']
    //   )}>
    //
    // Do not use these properties directly, but always through an emotion theme provider.
    codeBlocks: {
      primary: {
        borderForCodeBlock: designTokens.colorAccent40,
        surfaceForCodeBlock: designTokens.colorAccent,
        surfaceHeaderForCodeBlock: designTokens.colorSolid,
        surfaceLanguageDropdownForCodeBlock: designTokens.colorSurface,
        surfaceLanguageDropdownHoverForCodeBlock: designTokens.colorNeutral90,
        textHeaderForCodeBlock: designTokens.colorNeutral60,
        surfaceCopyIconForCodeBlock: designTokens.colorSurface,
        surfaceCopyIconHoverForCodeBlock: designTokens.colorAccent40,
        surfaceCopyTooltipForCodeBlock: designTokens.colorAccent40,
        textCopyTooltipForCodeBlock: designTokens.colorSurface,
        surfaceLineHighlightForCodeBlock: designTokens.colorAccent40,
        surfacePromptForCodeBlock: designTokens.colorNeutral60,
      },
      secondary: {
        borderForCodeBlock: designTokens.colorNeutral90,
        surfaceForCodeBlock: designTokens.colorSurface,
        surfaceHeaderForCodeBlock: designTokens.colorNeutral,
        surfaceLanguageDropdownForCodeBlock: designTokens.colorSolid,
        surfaceLanguageDropdownHoverForCodeBlock: designTokens.colorNeutral60,
        textHeaderForCodeBlock: designTokens.colorSolid,
        surfaceCopyIconForCodeBlock: designTokens.colorSolid,
        surfaceCopyIconHoverForCodeBlock: designTokens.colorAccent40,
        surfaceCopyTooltipForCodeBlock: designTokens.colorAccent40,
        textCopyTooltipForCodeBlock: designTokens.colorSurface,
        surfaceLineHighlightForCodeBlock: designTokens.colorNeutral90,
        surfacePromptForCodeBlock: designTokens.colorNeutral60,
      },
    },
  },
};

export const tokens = {
  borderRadiusForBetaFlag: designTokens.borderRadius4,
  borderRadiusForSearchDialog: designTokens.borderRadius6,
  borderRadiusForSearchInput: designTokens.borderRadius6,
  borderRadiusForCodeBlock: designTokens.borderRadius6,
  borderRadiusForTooltip: designTokens.borderRadius4,
  borderRadiusForContentNotification: designTokens.borderRadius6,
  borderRadiusForImageFrame: designTokens.borderRadius6,
  borderRadiusForBlockquote: designTokens.borderRadius6,
  borderRadiusForCard: designTokens.borderRadius6,
  borderRadiusForChildSectionNav: designTokens.borderRadius6,
  borderRadiusForRssFeedTable: designTokens.borderRadius6,
  shadowForBetaFlag: designTokens.shadow7,
  shadowForSearchDialog: designTokens.shadow2,
  shadowForPageContent: designTokens.shadow11,
  shadowForClickableCard: `1px 1px 4px 0 rgba(0, 0, 0, 0.24),
  -1px 1px 3px 0 rgba(0, 0, 0, 0.12)`,
  shadowForClickableCardOnHover: `0 14px 28px 0 rgba(0, 0, 0, 0.25),
  0 10px 10px 0 rgba(0, 0, 0, 0.23)`,
  shadowForRssFeedTable: designTokens.shadow7,

  // Code blocks
  borderForCodeBlock: 'var(--border-for-code-block)',
  surfaceForCodeBlock: 'var(--surface-for-code-block)',
  surfaceHeaderForCodeBlock: 'var(--surface-header-for-code-block)',
  surfaceLanguageDropdownForCodeBlock:
    'var(--surface-language-dropdown-for-code-block)',
  surfaceLanguageDropdownHoverForCodeBlock:
    'var(--surface-language-dropdown-hover-for-code-block)',
  textHeaderForCodeBlock: 'var(--text-header-for-code-block)',
  surfaceCopyIconForCodeBlock: 'var(--surface-copy-icon-for-code-block)',
  surfaceCopyIconHoverForCodeBlock:
    'var(--surface-copy-icon-hover-for-code-block)',
  surfaceCopyTooltipForCodeBlock: 'var(--surface-copy-tooltip-for-code-block)',
  textCopyTooltipForCodeBlock: 'var(--text-copy-tooltip-for-code-block)',
  surfaceLineHighlightForCodeBlock:
    'var(--surface-line-highlight-for-code-block)',
  surfacePromptForCodeBlock: 'var(--surface-prompt-for-code-block)',

  // Globals
  websitePrimaryColor: 'var(--website-primary-color)',
} as const;

export const dimensions = {
  heights: {
    header: '48px',
    inputSearchPrimary: '32px',
    inputSearchSecondary: '26px',
    childSectionNavLink: '28px',
    pageSearchboxSpace: '58px',
    globalNotificationContent: '36px',
    globalNotificationWithSmallSpacing: 'calc(36px + 8px)',
    megaMenuItemTitle: '38px',
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
    searchBarSmall: '160px',
    selectDropDownArrowWith: '12px',
    sideBySideSecondColumn: asideColumnWidth,
    // The card sizes are manually optimized to make regular cards two-aside on landing pages
    // and narrow cards three-aside in any landing page size.
    // Plus, you can put 2,3,4,6 cards in a grid without whitespace.
    // In content page columns it's not ideal, but the numbers just don't add up if we want the same card
    // to perfectly fit the landing pages.
    cardNarrowMinWidth: '242px',
    cardRegularMinWidth: '328px',
    // the "inContentColumn" variation prevents only one card being in one row in regular content (except mobile)
    cardRegularMinWidthInContentColumn: '288px',
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
  stacks: {
    base: 1,
    sidebar: 2,
    overlay: 20,
    aboveOverlay: 21,
  },
} as const;

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
} as const;

// TODO: expose from uikit?
export const tokensToCssVars = (obj: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [`--${kebabCase(key)}`, value])
  );
