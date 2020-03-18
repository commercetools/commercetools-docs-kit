# Gatsby Transformer Code Examples

This plugin transforms file contents into CodeExample types in available in graphql.

## Installation

`npm install --save @commercetools-docs/gatsby-transformer-code-examples`

## Usage

As a prerequisite configure a source plugin, e.g. `gatsby-source-filesystem` to point the directory of the code examples, for example `src/code-examples`.  Other source plugins can be used, too. 

Example `gatsby-config.js` content:

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `code-examples`,
        path: `${__dirname}/src/code-examples`,
      },
    },
    `@commercetools-docs/gatsby-transformer-code-examples`,
  ],
};
```

## GraphQl Query Example

```graphql
query GetCodeExamplesQuery {
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

## Supported File Formats

- cs
- graphql
- java
- js
- json
- php
- sh
- ts
- yaml
