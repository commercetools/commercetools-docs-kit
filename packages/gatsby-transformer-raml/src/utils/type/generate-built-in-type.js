function generateBuiltinType(property) {
  switch (property.builtinType) {
    case 'date-only':
    case 'time-only':
    case 'datetime-only':
    case 'datetime':
      return 'string';
    default:
      return property.builtinType;
  }
}

module.exports = generateBuiltinType;
