import rangeParser from 'parse-numeric-range';

const getLinesForRange = value => {
  if (!value) return [];
  return rangeParser.parse(value.trim()).filter(n => n > 0);
};

export default function parseCodeBlockOptions(props = {}) {
  return {
    highlightLines: getLinesForRange(props.highlightLines),
    noPromptLines: getLinesForRange(props.noPromptLines),
  };
}
