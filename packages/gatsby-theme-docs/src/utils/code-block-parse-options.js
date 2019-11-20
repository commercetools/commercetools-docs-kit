import rangeParser from 'parse-numeric-range';

const regexInfoStringGroups = /(\w+=(['"][\w\s-]+['"]))+/g;

const getLinesForRange = value => {
  if (!value) return [];
  return rangeParser.parse(value.trim()).filter(n => n > 0);
};

const intialOptions = {
  title: undefined,
  highlightLines: [],
  noPromptLines: [],
};

export default function parseCodeBlockOptions(props = {}) {
  if (!props.metastring) return intialOptions;

  const matchedOptions = props.metastring.match(regexInfoStringGroups);
  if (!matchedOptions) return intialOptions;

  // We need to parse the `metastring` value on our own as the default
  // implementation does not support values with whitespaces.
  // https://github.com/mdx-js/mdx/blob/e95e2c114bead01164a8af068ae052cebf1534c2/packages/mdx/mdx-ast-to-mdx-hast.js#L38-L46
  // We mostly need this for things like `title="This is a title"`.
  const normalizedOptions = matchedOptions.reduce(
    (normalizedGroup, stringGroup) => {
      const [key, value] = stringGroup.split('=');
      return {
        ...normalizedGroup,
        // Strip quotes wrapping the text value
        [key]: value.replace(/(['"](.*)['"])/g, '$2'),
      };
    },
    {}
  );
  return {
    title: normalizedOptions.title,
    highlightLines: getLinesForRange(normalizedOptions.highlightLines),
    noPromptLines: getLinesForRange(normalizedOptions.noPromptLines),
  };
}
