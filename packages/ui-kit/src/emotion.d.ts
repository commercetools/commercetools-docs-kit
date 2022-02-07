import '@emotion/react';
import type { ThemeCodeBlocksColorTokens } from './design-system';

// https://emotion.sh/docs/typescript#define-a-theme
// Backwards compatible option, allow untyped theming
declare module '@emotion/react' {
  export interface Theme {
    // commercetools ui-kit specific theme properties
    fontFamilyDefault?: string;
    fontFamilyBody?: string;
    // Docs-kit specific theme properties
    websitePrimaryColor?: string;
    codeBlockColors?: ThemeCodeBlocksColorTokens;
  }
}
