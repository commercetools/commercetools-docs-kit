# Gatsby Theme Add-On for API docs

This theme provides components in MDX to render API info from RAML spec files.

It is a feature add-on to `@commercetools-docs/gatsby-theme-docs` and is not usable standalone.

## Installation

```
npx install-peerdeps --dev @commercetools-docs/gatsby-theme-api-docs
```

## Usage

In your `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: '@commercetools-docs/gatsby-theme-docs',
      options: {
        // options
        themeAddOns: ['@commercetools-docs/gatsby-theme-api-docs'],
      },
    },
    {
      resolve: '@commercetools-docs/gatsby-theme-api-docs',
      options: {
        transformerRaml: {
          includeApis: ['example'],
          movePropertiesToTop: ['id'],
          movePropertiesToBottom: ['custom'],
        },
      },
    },
  ],
};
```

RAML spec files are added in the `./src/api-specs/` folder of the website. That folder is automatically generated when the plugin runs.

The file location determines the `apiKey` through which it can be addressed:

- `src/api-specs/foo.raml` -> apiKey `foo`
- `src/api-specs/bar/api.raml` -> apiKey `bar`
- `src/api-specs/baz/baz.raml` -> apiKey `baz`

## Using UI components in Markdown

The package exposes the following components in the MDX context:

- `<ApiType>`
- `<ApiEndpoint>`
- `<ApiEndpointsForResource>`

Then in your MDX files:

```markdown
<ApiEndpoint
  apiKey="test"
  resource="/{projectKey}/resource/artificially-complex/path/uri-parameter-one={uriParameterOne}/{uriParameterTwo}"
  method="POST"
/>
```
