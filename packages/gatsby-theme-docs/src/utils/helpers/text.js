const stringObjectDisplayText = ({ originalType, constant }) => {
  if (constant) {
    return constant;
  }

  if (originalType === 'string') {
    return 'string';
  }

  return 'Any JSON';
};

export const capitalizeFirstCharacter = str => {
  const firstChar = str.charAt(0).toUpperCase();
  const lastChars = str.substr(1, str.length);
  return `${firstChar}${lastChars}`;
};

const arrayDisplayText = items => {
  let text = 'array of ';

  if (items.originalType) {
    text = `${text}${capitalizeFirstCharacter(items.originalType)}`;
  } else if (items.type) {
    text += items.type === 'object' ? 'any JSON' : items.type;
  } else {
    text = 'array';
  }

  return text;
};

export const originalTypeDisplayText = property => {
  const { originalType, constant, items } = property;

  let text;

  switch (originalType) {
    case 'string':
    case 'object':
      text = stringObjectDisplayText({ originalType, constant });
      break;
    case 'array':
      text = arrayDisplayText(items);
      break;
    case 'any':
      text = 'Any JSON';
      break;
    default:
      text = originalType;
  }

  return capitalizeFirstCharacter(text);
};
