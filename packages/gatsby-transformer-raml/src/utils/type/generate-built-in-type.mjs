function generateBuiltinType(property) {
  switch (property.builtinType) {
    case 'integer':
      return 'number';
    case 'date-only':
    case 'time-only':
    case 'datetime-only':
    case 'datetime':
      return 'string';
    default:
      return property.builtinType;
  }
}

export default generateBuiltinType;
