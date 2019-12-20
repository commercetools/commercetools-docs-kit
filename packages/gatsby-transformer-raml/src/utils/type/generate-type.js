function generateType(property) {
  switch (property.type) {
    case 'date-only':
      return 'Date';
    case 'time-only':
      return 'Time';
    case 'datetime-only':
      return 'DateTimeOnly';
    case 'datetime':
      if (property.format) {
        return property.format === 'rfc2616' ? 'DateTimeRfc2616' : 'DateTime';
      }
      return 'DateTime';
    default:
      return property.type;
  }
}

module.exports = generateType;
