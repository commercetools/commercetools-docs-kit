import { parseFragment } from 'parse5';
import parseNumericRange from './parse-numeric-range';

const getLinesForRange = (value) => {
  if (!value) return [];
  return parseNumericRange(value.trim()).filter((n) => n > 0);
};

const intialOptions = {
  title: undefined,
  highlightLines: [],
  noPromptLines: [],
};

const getOptionName = (name) =>
  // NOTE: parsed attribute names are all lowercase
  Object.keys(intialOptions).find((key) => key.toLowerCase() === name) || name;

export default function parseCodeBlockOptions(props = {}) {
  if (!props.metastring) return intialOptions;

  // We need to parse the `metastring` value on our own as the default
  // implementation does not support values with whitespaces.
  // https://github.com/mdx-js/mdx/blob/e95e2c114bead01164a8af068ae052cebf1534c2/packages/mdx/mdx-ast-to-mdx-hast.js#L38-L46
  // We mostly need this for things like `title="This is a title"`.
  const parsedOptions = parseFragment(`<x ${props.metastring} >`);
  if (!parsedOptions || parsedOptions.childNodes === 0) return intialOptions;

  const normalizedOptions = parsedOptions.childNodes[0].attrs.reduce(
    (normalizedAttributes, attribute) => ({
      ...normalizedAttributes,
      [getOptionName(attribute.name)]: attribute.value,
    }),
    {}
  );
  return {
    title: normalizedOptions.title,
    highlightLines: getLinesForRange(normalizedOptions.highlightLines),
    noPromptLines: getLinesForRange(normalizedOptions.noPromptLines),
  };
}
