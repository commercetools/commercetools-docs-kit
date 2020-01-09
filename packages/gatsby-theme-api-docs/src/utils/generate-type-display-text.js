import capitalizeFirst from './capitalize-first';

function generateTypeDisplayText(property) {
  const { type, constant, items } = property;

  let text;

  switch (type) {
    case 'string':
    case 'object':
      text = stringObjectDisplayText({ type, constant });
      break;
    case 'array':
      text = arrayDisplayText(items);
      break;
    case 'any':
      text = 'Any JSON';
      break;
    default:
      text = type;
  }

  return capitalizeFirst(text);
}

function stringObjectDisplayText({ type, constant }) {
  if (constant) {
    return constant;
  }

  if (type === 'string') {
    return 'string';
  }

  return 'Any JSON';
}

function arrayDisplayText(items) {
  let text = 'array of ';

  if (items.type) {
    text += items.type === 'object' ? 'any JSON' : items.type;
  } else {
    text = 'array';
  }

  return text;
}

export default generateTypeDisplayText;
