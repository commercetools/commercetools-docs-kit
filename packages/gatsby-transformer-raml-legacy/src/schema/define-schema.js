const defineRamlGenerics = require('./define-raml-generics');
const defineRamlResource = require('./define-raml-resource');
const defineRamlType = require('./define-raml-type');

const defineSchema = ({ schema, createTypes }) => {
  defineRamlGenerics({ schema, createTypes });
  defineRamlType({ schema, createTypes });
  defineRamlResource({ schema, createTypes });
};

module.exports = defineSchema;
