import '@emotion/react';

// https://emotion.sh/docs/typescript#define-a-theme
// Backwards compatible option, allow untyped theming
declare module '@emotion/react' {
  export interface Theme extends Record<string, string> {}
}
