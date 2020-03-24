const jsYaml = require('js-yaml');

function createJsYamlSchema() {
  /**
   * Without definition of custom types, js-yaml throws an error when
   * it hits tags like "!include".
   *
   * See here for more info on how to write custom types for js-yaml
   * https://github.com/nodeca/js-yaml/wiki/Custom-types
   */
  const IncludeYamlType = new jsYaml.Type('!include', {
    kind: 'scalar',
    construct: (data) => {
      return data !== null ? data : '';
    },
  });

  return jsYaml.Schema.create([IncludeYamlType]);
}

module.exports = createJsYamlSchema;
