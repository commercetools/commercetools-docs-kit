import { colors } from '../design-system';

// This is a custom theme for Prism and it implements a minimal color palette
// with commercetools colors.
// The theme is inspired by "theme-ui" Prism preset: https://theme-ui.com/packages/prism#theme-ui-colors
// NOTE: this theme is currently not used and is just here for reference in case we want
// to experiment with it at some point.
export default {
  plain: {
    color: colors.light.textPrimary,
    backgroundColor: colors.light.surfacePrimary,
  },
  styles: [
    {
      types: [
        'comment',
        'prolog',
        'doctype',
        'cdata',
        'punctuation',
        'operator',
        'entity',
        'url',
      ],
      style: {
        color: colors.light.syntaxHighlightNeutral,
      },
    },
    {
      types: ['comment'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: [
        'property',
        'tag',
        'boolean',
        'number',
        'constant',
        'symbol',
        'deleted',
        'function',
        'class-name',
        'regex',
        'important',
        'variable',
      ],
      style: {
        color: colors.light.syntaxHighlightAccent,
      },
    },
    {
      types: ['atrule', 'attr-value', 'keyword'],
      style: {
        color: colors.light.syntaxHighlightPrimary,
      },
    },
    {
      types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'],
      style: {
        color: colors.light.syntaxHighlightSecondary,
      },
    },
  ],
};
