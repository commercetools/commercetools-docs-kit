import * as designSystem from './design-system';
import * as Markdown from './components/markdown';

// components
export { designSystem, Markdown };
export { default as mdxComponents } from './components/mdx-components';
export { default as ContentNotifications } from './components/content-notifications';
export { default as ErrorBoundary } from './components/error-boundary';
export { default as Globals } from './components/globals';
export { default as Reset } from './components/reset';
export { default as Subtitle } from './components/subtitle';
export { default as TextSmall } from './components/text-small';

// special exports for components that cannot be accessed through `Markdown` exports
export { default as CodeBlock } from './components/code-block';
export { ExternalSiteLink } from './components/link';

// hooks
export { default as useActiveSection } from './hooks/use-active-section';
export { useSiteData } from './hooks/use-site-data';

// utils
export { default as createStyledIcon } from './utils/create-styled-icon';
export { default as SafeHtmlElement } from './utils/safe-html-element';
