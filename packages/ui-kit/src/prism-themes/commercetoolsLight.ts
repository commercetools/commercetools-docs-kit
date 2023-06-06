import { themes } from 'prism-react-renderer';

const commercetoolsLightTheme = { ...themes.nightOwlLight };

// Goal: Optimize JSON, leave others alone.
// variations:
// - swap rgb(72, 118, 214)  and rgb(12, 150, 155) to have string literals
//   in green in both light and dark because they occur side by side in API docs.
// - booleans and numbers in a tone that's visually similar to the dark variant.

// need to recreate this prismic type, it's not exported.
type FontStyle = 'italic' | 'normal' | undefined;
const italicStyle: FontStyle = 'italic';

const additionalStyles = [
  {
    types: ['operator', 'keyword', 'property', 'namespace'],
    style: {
      color: 'rgb(72, 118, 214)',
    },
  },
  {
    types: ['inserted', 'attr-name'],
    style: {
      color: 'rgb(12, 150, 155)',
      fontStyle: italicStyle,
    },
  },
  {
    types: ['string', 'builtin', 'char', 'constant', 'url'],
    style: {
      color: 'rgb(12, 150, 155)',
    },
  },
  {
    types: ['boolean'],
    style: {
      color: 'rgb(255, 20, 40)',
    },
  },
  {
    types: ['number'],
    style: {
      color: 'rgb(247, 70, 54)',
    },
  },
];

commercetoolsLightTheme.styles = [
  ...commercetoolsLightTheme.styles,
  ...additionalStyles,
];

export default commercetoolsLightTheme;
