# Gatsby Transformer Code Examples

This plugin transforms file contents into `CodeExample` types and makes them available in Gatsby GraphQL schema.

## Installation

`npm install --save @commercetools-docs/gatsby-transformer-code-examples`

## Usage

As a prerequisite configure a source plugin, e.g. `gatsby-source-filesystem` to point the directory of the code examples, for example `src/code-examples`. Other source plugins can be used, too.

Example `gatsby-config.js` content:

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `codeExamples`,
        path: `${__dirname}/src/code-examples`,
      },
    },
    `@commercetools-docs/gatsby-transformer-code-examples`,
  ],
};
```

## GraphQl Query Example

```graphql
query GetAllCodeExamplesQuery {
  allCodeExample {
    nodes {
      name
      extension
      absolutePath
      content
    }
  }
}
```

## Supported MIME Types

- application/javascript
- text/x-java-source
- application/octet-stream
- application/json
- application/x-httpd-php
- application/x-sh
- video/mp2t
- text/yaml
- text/vnd.curl
