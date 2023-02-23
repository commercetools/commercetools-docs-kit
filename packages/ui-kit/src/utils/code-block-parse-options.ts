import parseNumericRange from './parse-numeric-range';

type RawCodeBlockOptions = {
  [key: string]: string | boolean;
};
export type CodeBlockOptions = {
  title: string;
  highlightLines: number[];
  noPromptLines: number[];
  secondaryTheme: boolean;
};
const defaultOptions: CodeBlockOptions = {
  title: '',
  highlightLines: [],
  noPromptLines: [],
  secondaryTheme: false,
};

const getLinesForRange = (value: string | boolean) => {
  return value && typeof value === 'string'
    ? parseNumericRange(value.trim()).filter((n) => n > 0)
    : [];
};

// We need to parse the `metastring` value on our own as the default
// MDX implementation does not support values with whitespaces.
// https://github.com/mdx-js/mdx/blob/e95e2c114bead01164a8af068ae052cebf1534c2/packages/mdx/mdx-ast-to-mdx-hast.js#L38-L46
// We mostly need this for things like `title="This is a title"`.

// returns one match per attribute-value pair, containing named capture groups
// "attribute" and either one of the "value_*" groups
// Saved here for testing and editing: https://regex101.com/r/DKJjaO/1
const parseOptionsRegex =
  /(?<attribute>\w+)(=["](?<value_doublequote>.*?)["]|=['](?<value_singlequote>.*?)[']|=(?<value_noquote>\S*)|)/g;
const parseOptionsString = (optionsString: string) => {
  const parsedOptions: RawCodeBlockOptions = {};
  const matches = Array.from(optionsString.matchAll(parseOptionsRegex));
  for (const match of matches) {
    if (match?.groups?.attribute) {
      parsedOptions[match.groups.attribute] =
        match?.groups?.value_doublequote ||
        match?.groups?.value_singlequote ||
        match?.groups?.value_noquote ||
        true;
    }
  }
  return parsedOptions;
};

type CodeBlockOptionsProps = {
  metastring: string;
};

export default function parseCodeBlockOptions(
  props: CodeBlockOptionsProps = { metastring: '' }
): CodeBlockOptions {
  if (!props.metastring) return defaultOptions;

  const rawOptions: RawCodeBlockOptions = parseOptionsString(props.metastring);
  if (rawOptions.secondaryTheme === 'false') rawOptions.secondaryTheme = false; // Boolean("false") = true
  return {
    ...defaultOptions,
    title: rawOptions.title?.toString(),
    highlightLines: getLinesForRange(rawOptions.highlightLines),
    noPromptLines: getLinesForRange(rawOptions.noPromptLines),
    secondaryTheme: Boolean(rawOptions.secondaryTheme),
  };
}
