# GatsbyJS WebApi transformer

The Plugin exposes Web API specfications defined in .raml files on graphQL as a node that contains the fully parsed, validated and resolved RAML string for further processing by more specific plugins that e.g. provide the RAML spec as more granular and queryable data nodes.

It is based on the AMF-based [raml.org webapi-parser](https://github.com/raml-org/webapi-parser).
OpenAPI (swagger) support should be easy to add, feel invited to contribute.

The GraphQL nodes it provides are of type `ResolvedWebapiRaml`.
The RAML string is in `internal.content` and the nodes provide the `apiKey` field.

Providing this minimalistic feature set allows to exchange this parsing step with other parser implementations independently of further processing.

## Usage

As a prerequisite configure one or many `gatsby-source-filesystem` plugins to e.g. point at `src/api-specs` and place your RAML files there.
The APIs `key` on GraphQL is derived from the file name or, if the name is `api.raml`, from the folder name.

The APIs to be loaded have to be explicitly configured by that key.

Example `gatsby-config.js` fragment:

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `apis`,
        path: `${__dirname}/src/webapi-specs`,
      },
    },
    {
      resolve: `@commercetools-docs/gatsby-transformer-webapi`,
      options: {
        validate: true,
        includeApis: ['foo', 'bar'],
      },
    },
  ],
};
```

### Configuration Opions

The Web API transformer accepts the following configuration options:

- `validate` (boolean, default `true`): Validate the RAML and warn if it is not conformant to the RAML spec.
- `includeApis` (string array, default empty): Whitelist API keys (derived from file and folder names)

## Example GraphQL query

Example for reading all the APIs provided:

```graphql
{
  allResolvedWebapiRaml {
    nodes {
      apiKey
      parent {
        ... on File {
          absolutePath
        }
      }
      internal {
        content
      }
    }
  }
}
```

## Developing

See [docs/developing.md](docs/developing.md) for some helpful information and a reading list.
