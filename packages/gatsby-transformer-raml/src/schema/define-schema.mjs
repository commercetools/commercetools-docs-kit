import defineRamlGeneric  from "./define-raml-generic.mjs";
import defineRamlType  from "./define-raml-type.mjs";
import defineRamlResource  from "./define-raml-resource.mjs";
import defineRamlApi  from "./define-raml-api.mjs";




const defineSchema = ({ schema, createTypes }) => {
  defineRamlGeneric({ schema, createTypes });
  defineRamlType({ schema, createTypes });
  defineRamlResource({ schema, createTypes });
  defineRamlApi({ schema, createTypes });
};

export default defineSchema;
