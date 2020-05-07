# Gatsby Theme for Constants

This theme exposes components in MDX to render constant values defined in data files.

## Installation

```
npx install-peerdeps --dev @commercetools-docs/gatsby-theme-constants
```

## Usage

In your `gatsby-config.js`:

```js
const {
  configureThemeWithAddOns,
} = require('@commercetools-docs/gatsby-theme-docs/configure-theme');

module.exports = {
  // ... other site config
  plugins: [
    ...configureThemeWithAddOns({
      // ... other theme config
      addOns: ['@commercetools-docs/gatsby-theme-constants'],
    }),
  ],
};
```

Example files should be added in the `./src/constants` folder of the website.

## YAML file example

In your `src/constants/limits.yaml`:

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

- `<Constant>`

Then in your MDX files:

```markdown
<Constant type="limits" name="slugLength"/>
```
