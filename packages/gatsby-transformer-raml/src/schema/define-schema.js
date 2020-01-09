const defineRamlType = require('./define-raml-type');
const defineRamlResource = require('./define-raml-resource');

const defineSchema = ({ schema, createTypes }) => {
  defineRamlType({ schema, createTypes });
  defineRamlResource({ schema, createTypes });
};

module.exports = defineSchema;
