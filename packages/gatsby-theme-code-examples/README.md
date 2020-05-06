# Gatsby Theme for Code Examples

This theme provides components in MDX to render code examples from files, optionally in multiple programming languages.

It is a feature add-on to `@commercetools-docs/gatsby-theme-docs` and is not usable standalone.

## Installation

```
npx install-peerdeps --dev @commercetools-docs/gatsby-theme-code-examples
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
      },
    },
    '@commercetools-docs/gatsby-theme-code-examples',
  ],
};
```

Example files must be added in the `./src/code-examples/` folder of the website. That folder is automatically generated when the plugin runs.

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

The package exposes the following components in the MDX context:

- `<CodeExample>`
- `<MultiCodeExample>`

Then in your MDX files:

```markdown
<MultiCodeExample title="Multilanguage Code Samples">
  <CodeExample path="example.js" highlightLines={[3]} />
  <CodeExample path="example.java"/>
  <CodeExample path="example.console" noPromptLines={[3, 4]} />
</MultiCodeExample>

<CodeExample path="example.js" title="JavaScript Code Sample" />
```

In addition to `path`, the `<CodeExample>` component supports all custom parameters that can be passed to fenced code blocks in the [base theme](../gatsby-theme-docs)
