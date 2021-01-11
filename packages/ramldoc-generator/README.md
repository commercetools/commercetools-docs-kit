# commercetools Docs Kit "RAMLdoc" Generator

> **DEPRECATED** in favor of the new **@commercetools-docs/rmf-codegen** package which provides the complete functionality of rmf-codegen without a restrictive wrapper CLI.

## Migration

For installing the new dependency, please refer to the `rmf-codegen` README. Remove this package from your `package.json`

In scripts that automate the generation of the canonical RAML, for example the following previous command:

`npx commercetools-ramldoc-generator --name <api-spec-name> --src <api-spec-source-path> --dest <api-spec-destination-path>`

Would equal the following new command:

`npx rmf-codegen <api-spec-source-path>/api.raml -o <api-spec-destination-path> -t RAML_DOC`
