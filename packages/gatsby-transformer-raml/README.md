# GatsbyJS RAML API transformer

## Notice

This plugin is based of the [raml-1-parser](https://github.com/raml-org/raml-js-parser-2) which is deprecated. So the plugin currently serves as a placeholder until it is replaced.

## Overview

The Plugin exposes RAML APIs defined in .raml files on the GraphQL API as the canonical,
effective API surface. It's internally using the [raml-1-parser](https://github.com/raml-org/raml-js-parser-2) and [raml2obj](https://github.com/raml2html/raml2obj) - currently in a fork with necessary extensions - to generate the representation and adds small structure changes to make the output GraphQL-compatible.

It is fully hot-reloading when editing the RAML specs, also when making changes on file inclusions inside the RAML format.

It provides

- The API itself: `ramlApi`
- The Types: `ramlType`

## Usage

As a prerequisite configure one or many `gatsby-source-filesystem` plugins to e.g. point at `src/api-specs` and place your RAML files there. The APIs `key` on GraphQL is derived from the file name or, if the name is `api.raml` from the folder name.

Example `gatsby-config.js` content:

```
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `apis`,
        path: `${__dirname}/src/api-specs`
      },
    },
    {
      resolve: `@commercetools-docs/gatsby-transformer-raml`,
      options: {
        validate: true
      },
    },
  ],
}
```

### Configuration Opions

The RAML transformer accepts the following configuration options:

- `validate` (boolean): Passed through to the respective RAML parser option.
- `canonicalTypeImpl` (string): Passed through to the respective `raml2obj` option.
- `includeApis` (string array): Whitelist API keys (derived from file and folder names)
- `excludeApis` (sring array): Blacklist API keys (derived from file and folder names)
- `annotateConstantLikeEnums` (boolean): Adds an additional `const` attribute with the de-facto constant value of a type whenever it detects `enum` value arrays that have exactly one entry only.

## A typical GraphQL query

Example for reading all types:

```
{
  allRamlType {
    nodes {
      apiKey
      name
      key
      type
      originalType
      description
      additionalProperties
      properties {
        name
        type
        originalType
        anyOf{
          type
          name
        }
        items{
          type
          name
        }
        description
        required
        format
        enum
        minimum
        maximum
        pattern
        annotations{
          beta
        }
      }
      examples {
        name
        displayName
        description
        value
      }
    }
  }
}
```

## Developing

See [docs/developing.md](docs/developing.md) for some helpful information and a reading list.
