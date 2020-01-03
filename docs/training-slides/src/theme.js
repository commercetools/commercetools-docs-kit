import { Appear, Notes, Image, Split } from 'mdx-deck';

import designSystem from './design-system';
import Provider from './provider';
import MarkdownComponents from './components/markdown';
import CustomComponents from './components/custom';

// This is a ThemeUI declaration https://theme-ui.com/getting-started but we are not using the features, rather explicitly disabling them.

export default {
  Provider,
  components: {
    ...MarkdownComponents,
    ...CustomComponents,
    Appear,
    Notes,
    Image,
    Split,
  },
  aspectRatio: designSystem.slideLayout.widthToHeight,
  googleFont:
    'https://fonts.googleapis.com/css?family=Roboto+Mono:400,500|Roboto:400,400i,500,700&display=swap&subset=latin-ext',
  fonts: {
    body: 'unset',
    heading: 'unset',
    monospace: 'unset',
  },
  styles: {
    Slide: {
      /* fixing the aspect ratio and size of the slide a reahas to be repeated here
      to override the hardwired flex height of mdx-deck */
      height: designSystem.slideLayout.contentAreaHeight,
      width: designSystem.slideLayout.contentAreaWidth,
      fontFamily:
        'unset' /* disable mdx-deck's built-in themeUI logic with responsive breakpoints etc */,
      fontSize: 'unset',
      lineHeight: 'unset',
      padding: '1rem',
      justifyContent: 'left',
      alignItems: 'left',
      '> * + *': {
        marginTop: `${designSystem.dimensions.spacings.m} !important`,
      },
    },
  },
};
