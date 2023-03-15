import jsYaml  from "js-yaml";

/**
 * Without definition of custom types, js-yaml throws an error when
 * it hits tags like "!include".
 *
 * See here for more info on how to write custom types for js-yaml
 * https://github.com/nodeca/js-yaml/blob/master/examples/custom_types.js
 */

const IncludeYamlType = new jsYaml.Type('!include', {
  kind: 'scalar',
  construct: (data) => {
    return data !== null ? data : '';
  },
});

const jsYamlSchema = jsYaml.DEFAULT_SCHEMA.extend([IncludeYamlType]);

export default jsYamlSchema;
