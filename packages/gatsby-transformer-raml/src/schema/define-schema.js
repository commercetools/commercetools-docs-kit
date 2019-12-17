const defineRamlType = require('./define-raml-type');

const defineSchema = ({ schema, createTypes }) => {
  defineRamlType({ schema, createTypes });
};

module.exports = defineSchema;
