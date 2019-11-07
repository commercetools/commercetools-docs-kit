import unified from 'unified';
import markdown from 'remark-parse';
import remark2react from 'remark-react';

export const markdown2React = markdownString => {
  const result = unified()
    .use(markdown, { commonmark: true })
    .use(remark2react)
    .processSync(markdownString).contents;

  return result;
};

export const computeType = value => {
  const regex = /^\[object (\S+?)\]$/;
  const matches = Object.prototype.toString.call(value).match(regex) || [];

  return (matches[1] || 'undefined').toLowerCase();
};

export const generateAnchorString = str => {
  if (str) {
    return (
      str
        .toLowerCase()
        // removed all non alphanumeric
        .replace(/[^a-zA-Z0-9 ]+/g, '')
        // replace all spaces with hyphen
        .replace(/\s+/g, '-')
    );
  }

  return '';
};

export const capitalizeFirstCharacter = str => {
  return str.replace(/^\w/, char => char.toUpperCase());
};
