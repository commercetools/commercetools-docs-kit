import nightOwl from 'prism-react-renderer/themes/nightOwl';

const commercetoolsTheme = { ...nightOwl };

// for the defaults see
// https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/themes/nightOwl.js
// current changes:
// - less "neon" variation of the "string", new: rgb(192,228,139)
// - swap "property" and "string"/"url"/"inserted"/"attr-name" to make typical code less "glaring"
//   and to hightlight the property keys in JSON which eases understanding the structure.
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
      fontStyle: 'italic',
    },
  },
  {
    types: ['property'],
    style: {
      color: 'rgb(192,228,139)',
    },
  },
];

commercetoolsTheme.styles = [...nightOwl.styles, ...additionalStyles];

export default commercetoolsTheme;
