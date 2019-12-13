export { default as LayoutApplication } from './src/layouts/internals/layout-application';
export { default as LayoutHeader } from './src/layouts/internals/layout-header';
export { default as LayoutMain } from './src/layouts/internals/layout-main';
export { default as Footer } from './src/layouts/internals/footer';

export {
  ErrorBoundary,
  Link,
  ExternalSiteLink,
  SEO,
  ThemeProvider,
} from './src/components';

// For backwards compatibility
export * from '@commercetools-docs/ui-kit';
