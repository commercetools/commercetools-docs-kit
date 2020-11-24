import { ConnectedSquareIcon } from '@commercetools-uikit/icons';
import addonComponents from './addon-components';
import {
  // Backwards compatibility with the exports
  CardBannerOssSvgIcon as CardBannerOSSIcon,
  CardBannerMcDevsSvgIcon as CardBannerMcDevsIcon,
  CardBannerMcDocsSvgIcon as CardBannerMcDocsIcon,
  CardBannerPlatformSvgIcon as CardBannerPlatformIcon,
} from '../../../icons';

export default {
  ...addonComponents,
  DummyIcon: ConnectedSquareIcon,
  CardBannerOSSIcon,
  CardBannerMcDevsIcon,
  CardBannerMcDocsIcon,
  CardBannerPlatformIcon,
};
