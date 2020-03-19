# Gatsby Transformer Code Examples

This plugin transforms file contents into `CodeExample` types and makes them available in Gatsby GraphQL schema.

## Installation

`npm install --save @commercetools-docs/gatsby-transformer-code-examples`

## Usage

As a prerequisite configure a source plugin, for example, `gatsby-source-filesystem` to point the directory of the code examples, for example `src/code-examples`. Other source plugins can be used, too.

Example `gatsby-config.js` content:

```js
// In your gatsby-config.js
const path = require('path');

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `codeExamples`,
        path: path.resolve('./src/code-examples'),
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
      language
      path
      content
    }
  }
}
```

## Supported MIME Types

- `application/javascript` (JavaScript)
- `text/x-java-source` (Java)
- `application/json` (JSON)
- `application/x-httpd-php` (PHP)
- `application/x-sh` (Shell / Bash)
- `video/mp2t` (not actually TypeScript, but gatsbyJS represents .ts files as this mime type)
- `text/yaml` (YAML)
- `text/vnd.curl` (cURL)

In addition the following are included to cover languages with no explicit mime type (e.g. C#)

- `application/octet-stream`
- `text/plain`
