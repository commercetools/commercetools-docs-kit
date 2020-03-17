# Gatsby theme for API docs

This is the core Gatsby theme for building commercetools documentation websites, specifically for API docs using RAML specs.

## Getting started

To create a new documentation website you need to install this theme and its peer dependencies:

```
npx install-peerdeps --dev @commercetools-docs/gatsby-theme-api-docs
```

### Autogenerating RAML Specs

This theme includes the [commercetools docs kit "RAMLdoc" generator](https://www.npmjs.com/package/@commercetools-docs/ramldoc-generator) and [Gatsby Transformer RAML](https://www.npmjs.com/package/@commercetools-docs/gatsby-transformer-raml) - the former generates RAML docs compatible with the later.

To generate raml docs, simply run

`npx commercetools-ramldoc-generator --name <api-spec-name> --src <api-spec-source-path>`

Docs will be generated in `<root>/src/api-specs/`.

### Exposed Specs Components

The following components are always available in MDX pages without explicitly importing them:

- `<ApiType>` (TODO)
- `<ApiEndpoint>` (TODO explain parameters)
- `<ApiEndpointsForResource>` (TODO explain)

## Example

See [API Docs Smoke Test](https://github.com/commercetools/commercetools-docs-kit/tree/master/websites/api-docs-smoke-test).

Here is the deployed application:

https://commercetools-docs-kit.now.sh/api-docs-smoke-test/
