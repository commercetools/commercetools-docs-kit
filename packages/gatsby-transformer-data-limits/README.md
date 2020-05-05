# Gatsby Transformer Data Limits

This plugin transforms file contents into `DataLimitsYaml` types and makes them available in Gatsby GraphQL schema.

## Installation

`npm install --save @commercetools-docs/gatsby-transformer-data-limits`

## Usage

As a prerequisite configure a source plugin, for example, `gatsby-source-filesystem` to point the directory of the code examples, for example `src/data`. Other source plugins can be used, too.

The `gatsby-transformer-yaml` plugin is also required, in order to parse the yaml file.

In your `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `codeExamples`,
        path: './src/data',
      },
    },
    `gatsby-transformer-yaml`,
    `@commercetools-docs/gatsby-transformer-data-limits`,
  ],
};
```

Where the _source folder_ `./src/data/` contains the `data-limits.yaml` file.

> It's important that the file is named `data-limits.yaml`.

## GraphQl Query Example

```graphql
query GetAllDataLimits {
  allDataLimitsYaml {
    nodes {
      name
      number
      text
    }
  }
}
```

## YAML file example

In your `src/data/data-limits.yaml`:

```yaml
- name: jsonSize
  number: 64
  text: megabytes
- name: slugLength
  number: 256
- name: slugPattern
  text: "[a-zA-Z0-9_\\-]{2,256}"
```

## Using UI components in Markdown

The package exports the following components, which can be injected into the `components` props of the `MDXProvider`.

```jsx
import { DataLimit } from '@commercetools-docs/gatsby-transformer-data-limit';

<MDXProvider components={{ Limit: DataLimit }}>{/*  */}</MDXProvider>;
```

Then in your MDX files:

```markdown
<Limit name="slugLength"/>
```
