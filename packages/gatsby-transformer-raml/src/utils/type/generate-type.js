function isUnion(type) {
  return typeof type.type === 'string' && type.type.indexOf('|') >= 0;
}

function generateType(type) {
  if (isUnion(type)) {
    return 'Union';
  }
  switch (type.type) {
    case 'integer':
      return 'Int';
    case 'number':
      return 'Float';
    case 'date-only':
      return 'Date';
    case 'time-only':
      return 'Time';
    case 'datetime-only':
      return 'DateTimeOnly';
    case 'datetime':
      if (type.format) {
        return type.format === 'rfc2616' ? 'DateTimeRfc2616' : 'DateTime';
      }
      return 'DateTime';
    default:
      return type.type;
  }
}

module.exports = generateType;
