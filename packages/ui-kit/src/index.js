import * as designSystem from './design-system';
import * as Markdown from './components/markdown';

// components
export { designSystem, Markdown };
export { ContentNotification } from './components/content-notifications';
export { default as ContentNotifications } from './components/content-notifications';
export { default as Globals } from './components/globals';
export { default as Link } from './components/link';
export { default as Reset } from './components/reset';
export { default as Subtitle } from './components/subtitle';
export { default as TextSmall } from './components/text-small';

// special exports for components that cannot be accessed through `Markdown` exports
export { default as CodeBlock } from './components/code-block';

// utils
export { default as createStyledIcon } from './utils/create-styled-icon';
export { default as SafeHTMLElement } from './utils/safe-html-element';
