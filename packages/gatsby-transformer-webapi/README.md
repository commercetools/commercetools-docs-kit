# GatsbyJS WebApi (RAML and OpenAPI / Swagger) transformer

The Plugin exposes Web API specfications defined in .raml or .oas files on the GraphQL API as the canonical,
effective API surface. It's internally using the XXX NEW PARSER

It is XXX NOT YET XXX fully hot-reloading when editing the API specs, also when making changes on file inclusions inside the API spec files.

It provides

- The API itself: `webApi`
- The Types: `webApiType`
- Resource Endpoints: XXX TODO

## Usage

As a prerequisite configure one or many `gatsby-source-filesystem` plugins to e.g. point at `src/webapi-specs` and place your RAML files there. The APIs `key` on GraphQL is derived from the file name or, if the name is `api.raml` / `api.oas` from the folder name.

Example `gatsby-config.js` content:

```
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `apis`,
        path: `${__dirname}/src/webapi-specs`
      },
    },
    {
      resolve: `@commercetools-docs/gatsby-transformer-webapi`,
      options: {
        validate: true
      },
    },
  ],
}
```

### Configuration Opions

The Web API transformer accepts the following configuration options:

- `validate` (boolean, default `false`): Passed through to the respective RAML parser option.
- `includeApis` (string array, default empty): Whitelist API keys (derived from file and folder names)
- `excludeApis` (sring array): Blacklist API keys (derived from file and folder names)
- `annotateConstantLikeEnums` (boolean, default `false`): Adds an additional `const` attribute with the de-facto constant value of a type whenever it detects `enum` value arrays that have exactly one entry only.
- `annotateUnionLikeInheritance` = false,
- `customNumberScalars` = false,
- `flattenLibraryNamespaces` = false,
- `movePropertiesToTop` = [],
- `movePropertiesToBottom` = []

## A typical GraphQL query

Example for reading all types:

```
{
  allWebApiType {
    nodes {
      fooBar
    }
  }
}
```

## Developing

See [docs/developing.md](docs/developing.md) for some helpful information and a reading list.
