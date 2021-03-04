import * as designSystem from './design-system';
import * as Markdown from './components/markdown';

// components
export { designSystem, Markdown };
export { default as ContentNotifications } from './components/content-notifications';
export { default as RssFeeds } from './components/rss-feeds';
export { default as Globals } from './components/globals';
export { default as Link } from './components/link';
export { default as LogoButton } from './components/logo-button';
export { default as MediaQuery } from './components/media-query';
export { default as MultiCodeBlock } from './components/multi-code-block';
export { default as Reset } from './components/reset';
export { default as Subtitle } from './components/subtitle';
export { default as TextSmall } from './components/text-small';

// icons
export {
  CustomApplicationSvgIcon,
  CustomApplicationSmallSvgIcon,
  HttpApiSvgIcon,
  HttpApiSmallSvgIcon,
  MerchantCenterSvgIcon,
  MerchantCenterSmallSvgIcon,
  OpenSourceSvgIcon,
  OpenSourceSmallSvgIcon,
  TutorialsSvgIcon,
  TutorialsSmallSvgIcon,
} from './icons';

// special exports for components that cannot be accessed through `Markdown` exports
export { default as CodeBlock } from './components/code-block';

// utils
export { default as createStyledIcon } from './utils/create-styled-icon';
export { default as SafeHTMLElement } from './utils/safe-html-element';
export { default as formatNumber } from './utils/iso-number-format';
