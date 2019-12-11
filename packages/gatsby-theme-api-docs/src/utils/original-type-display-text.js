import capitalizeFirst from './capitalize-first';

const stringObjectDisplayText = ({ originalType, constant }) => {
  if (constant) {
    return constant;
  }
  if (originalType === 'string') {
    return 'string';
  }
  return 'Any JSON';
};

const arrayDisplayText = items => {
  let text = 'array of ';

  if (items.originalType) {
    text = `${text}${capitalizeFirst(items.originalType)}`;
  } else if (items.type) {
    text += items.type === 'object' ? 'any JSON' : items.type;
  } else {
    text = 'array';
  }

  return text;
};

const originalTypeDisplayText = property => {
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

  return capitalizeFirst(text);
};

export default originalTypeDisplayText;
