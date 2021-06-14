import parseNumericRange from './parse-numeric-range';

const getLinesForRange = (value) => {
  if (!value || typeof value !== 'string') return [];
  return parseNumericRange(value.trim()).filter((n) => n > 0);
};

const initialOptions = {
  title: undefined,
  highlightLines: [],
  noPromptLines: [],
  secondaryTheme: false,
};

const getOptionName = (name) =>
  // NOTE: parsed attribute names are all lowercase
  Object.keys(initialOptions).find((key) => key.toLowerCase() === name) || name;

// returns one match per attribute-value pair, containing named capture groups
// "attribute" and either one of the "value_*" groups
// Saved here for testing and editing: https://regex101.com/r/DKJjaO/1
const parseOptionsRegex =
  /(?<attribute>\w+)(=["](?<value_doublequote>.*?)["]|=['](?<value_singlequote>.*?)[']|=(?<value_noquote>\S*)|)/g;

const parseOptionsString = (optionsString) => {
  const parsedOptions = {};
  const matches = Array.from(optionsString.matchAll(parseOptionsRegex));
  for (const match of matches) {
    parsedOptions[getOptionName(match.groups.attribute)] =
      match.groups.value_doublequote ||
      match.groups.value_singlequote ||
      match.groups.value_noquote ||
      true;
  }
  return parsedOptions;
};

export default function parseCodeBlockOptions(props = {}) {
  if (!props.metastring) return initialOptions;

  // We need to parse the `metastring` value on our own as the default
  // MDX implementation does not support values with whitespaces.
  // https://github.com/mdx-js/mdx/blob/e95e2c114bead01164a8af068ae052cebf1534c2/packages/mdx/mdx-ast-to-mdx-hast.js#L38-L46
  // We mostly need this for things like `title="This is a title"`.
  const normalizedOptions = {
    ...initialOptions,
    ...parseOptionsString(props.metastring),
  };

  return {
    title: normalizedOptions.title,
    highlightLines: getLinesForRange(normalizedOptions.highlightLines),
    noPromptLines: getLinesForRange(normalizedOptions.noPromptLines),
    secondaryTheme: normalizedOptions.secondaryTheme,
  };
}
