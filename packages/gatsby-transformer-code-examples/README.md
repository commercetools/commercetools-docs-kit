# Gatsby Transformer Code Examples

This plugin transforms file contents into `CodeExample` types and makes them available in Gatsby GraphQL schema.

## Installation

`npm install --save @commercetools-docs/gatsby-transformer-code-examples`

## Usage

As a prerequisite configure a source plugin, for example, `gatsby-source-filesystem` to point the directory of the code examples, for example `src/code-examples`. Other source plugins can be used, too.

In your `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `codeExamples`,
        path: './src/code-examples',
      },
    },
    `@commercetools-docs/gatsby-transformer-code-examples`,
  ],
};
```

Where the _source folder_ `./src/code-examples/` contains the files that will be loaded and referenced in the React components.

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

In addition the following are included to cover languages with no explicit mime type (for example C#)

- `application/octet-stream`
- `text/plain`

## Using UI components in Markdown

The package exports the following components, which can be injected into the `components` props of the `MDXProvider`.

```jsx
import {
  CodeExample,
  MultiCodeExample,
} from '@commercetools-docs/gatsby-transformer-code-examples';

<MDXProvider components={{ CodeExample, MultiCodeExample }}>
  {/*  */}
</MDXProvider>;
```

Then in your MDX files:

```markdown
<MultiCodeExample title="Multilanguage Code Samples">
  <CodeExample path="example.js" highlightLines={[3]} />
  <CodeExample path="example.java"/>
  <CodeExample path="example.console" noPromptLines={[3, 4]} />
</MultiCodeExample>

<CodeExample path="example.js" title="JavaScript Code Sample" />
```
