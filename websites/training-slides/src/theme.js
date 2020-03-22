import { Appear, Notes, Image, Split } from 'gatsby-theme-mdx-deck';

import designSystem from './design-system';
import MarkdownComponents from './components/markdown';
import CustomComponents from './components/custom';

// This is a ThemeUI declaration https://theme-ui.com/getting-started but we are not using the features, rather explicitly disabling them.
export default {
  components: {
    ...MarkdownComponents,
    ...CustomComponents,
    Appear,
    Notes,
    Image,
    Split,
  },
  googleFont:
    'https://fonts.googleapis.com/css?family=Roboto+Mono:400,500|Roboto:400,400i,500,700&display=swap&subset=latin-ext',
  fonts: {
    body: 'unset',
    heading: 'unset',
    monospace: 'unset',
  },
  styles: {
    Slide: {
      fontFamily:
        'unset' /* disable mdx-deck's built-in themeUI logic which is breakpoint based and not fluid */,
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
