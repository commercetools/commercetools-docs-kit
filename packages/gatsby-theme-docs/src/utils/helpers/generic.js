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

export const reorderFields = (obj, fields) => {
  const returnedObject = { ...obj };

  fields.forEach(field => {
    const fieldToOrder = returnedObject[field];
    if (fieldToOrder) {
      delete returnedObject[field];
      returnedObject[field] = fieldToOrder;
    }
  });

  return returnedObject;
};

export const extractAdditionalInfo = property => {
  let additionalInfo = JSON.parse(JSON.stringify(property));
  const mainInfo = [
    'name',
    'key',
    'description',
    'type',
    'originalType',
    'enum',
    'constant',
    'items',
    'library',
  ];

  mainInfo.forEach(field => {
    delete additionalInfo[field];
  });

  Object.keys(additionalInfo).forEach(key => {
    if (
      (!additionalInfo[key] &&
        typeof additionalInfo[key] !== 'number' &&
        typeof additionalInfo[key] !== 'boolean') ||
      typeof additionalInfo[key] === 'object'
    )
      delete additionalInfo[key];
  });

  additionalInfo = reorderFields(additionalInfo, ['default', 'required']);

  return additionalInfo;
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

export const pixelsToRems = pixels => {
  if (computeType(pixels) !== 'number') {
    throw new Error(`"${pixels}" must be of type number.`);
  }

  // Assume base is 16px (which is default for most browsers)
  const base = 16;

  return pixels / base;
};
