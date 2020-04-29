# Gatsby theme for API docs

This is the core Gatsby theme for building commercetools documentation websites, specifically for API docs using RAML specs.

## Getting started

To create a new documentation website you need to install this theme, the base docs theme and its peer dependencies:

```sh
npx install-peerdeps --dev @commercetools-docs/gatsby-theme-docs @commercetools-docs/gatsby-theme-api-docs
```

Then configure both in `gatsby-config.js` with the api docs theme coming after the base docs theme.

```js
module.exports = {
  // ... more
  plugins: [
    {
      resolve: '@commercetools-docs/gatsby-theme-docs',
      options: {
        websiteKey: 'api-docs-example',
      },
    },
    {
      resolve: '@commercetools-docs/gatsby-theme-api-docs',
      options: {
        transformerRaml: {
          includeApis: ['example'],
          movePropertiesToTop: [
            'id',
          ],
          movePropertiesToBottom: ['custom'],
        },
      },
    },
  ],
};
```

Read more about GatsbyJS theme composition [here](https://www.gatsbyjs.org/docs/theme-api/#theme-composition).

### API spec theme

Besides the normal folder structure of the `@commercetools-docs/gatsby-theme-docs`, the API spec theme contains additional folders:

- `src/api-specs` for your RAML API specifications. Individual files work, files in folders work, includes are also hot-reloaded. Do not include from locations outside the `api-specs` folder. The file location determines the `apiKey` through which it can be addressed:
  - `src/api-specs/foo.raml` -> apiKey `foo`
  - `src/api-specs/bar/api.raml` -> apiKey `bar`
  - `src/api-specs/baz/baz.raml` -> apiKey `baz`

The following components are always available in MDX pages without explicitly importing them:

- `<ApiType>` (TODO explain parameters)
- `<ApiEndpoint>` (TODO explain parameters)
- `<ApiEndpointsForResource>` (TODO explain)
