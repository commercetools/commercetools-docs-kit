import { Appear, Notes, Image, Split, Horizontal } from 'mdx-deck';

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
    Horizontal,
  },
  aspectRatio: 16 / 9, // this is the "official" way to fix the aspect ratio, but it's JS based and flickers more - here for explaining it and for exploration / testing
  googleFont:
    'https://fonts.googleapis.com/css?family=Roboto+Mono:400,500|Roboto:400,400i,500,700&display=swap&subset=latin-ext',
  fonts: {
    body: 'unset',
    heading: 'unset',
    monospace: 'unset',
  },
  styles: {
    Slide: {
      height:
        '56.25vw' /* fixing the aspect ratio has to be repeated here to override the hardwired flex height of mdx-deck */,
      fontFamily:
        'unset' /* disable mdx-deck's built-in themeUI logic with responsive breakpoints etc */,
      fontSize: 'unset',
      lineHeight: 'unset',
      padding: '1rem',
      justifyContent: 'left',
      alignItems: 'left',
    },
  },
};
