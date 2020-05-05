# Gatsby Theme for Data limits

This theme exposes components in MDX to render values (limits) defined in a data file.

## Installation

```
npx install-peerdeps --dev @commercetools-docs/gatsby-theme-data-limits
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
    '@commercetools-docs/gatsby-theme-data-limits',
  ],
};
```

Example files should be added in the `./src/data/data-limits.yaml` folder of the website.

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

The package exposes the following components in the MDX context:

- `<Limit>`

Then in your MDX files:

```markdown
<Limit name="slugLength"/>
```
