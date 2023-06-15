import { themes } from 'prism-react-renderer';

const commercetoolsTheme = { ...themes.nightOwl };

// for the defaults see
// https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/themes/nightOwl.js
// current changes:
// - less "neon" variation of the "string", new: rgb(192,228,139)
// - swap "property" and "string"/"url"/"inserted"/"attr-name" to make typical code less "glaring"
//   and to hightlight the property keys in JSON which eases understanding the structure.

// need to recreate this prismic type, it's not exported.
type FontStyle = 'italic' | 'normal' | undefined;
const italicStyle: FontStyle = 'italic';

const additionalStyles = [
  {
    types: ['string', 'url'],
    style: {
      color: 'rgb(128, 203, 196)',
    },
  },
  {
    types: ['inserted', 'attr-name'],
    style: {
      color: 'rgb(128, 203, 196)',
      fontStyle: italicStyle,
    },
  },
  {
    types: ['property'],
    style: {
      color: 'rgb(192,228,139)',
    },
  },
];

commercetoolsTheme.styles = [...themes.nightOwl.styles, ...additionalStyles];

export default commercetoolsTheme;
