# Gatsby Theme for Constants

This theme exposes components in MDX to render constant values centrally defined in data files. Use cases include centrally managing limits and defaults of the documented product.

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

The YAML data files containing the constant data points must be added to the `./src/constants` folder of the website. This folder is automatically generated when the plugin runs.

## YAML file format

For example, to centrally manage limits of your product, add a file `src/constants/limits.yaml` with content in the following format:

```yaml
- name: jsonSize
  number: 64
  text: megabytes
- name: slugLength
  number: 256
- name: slugPattern
  text: "[a-zA-Z0-9_\\-]{2,256}"
```

The filename without extension becomes the "type" of the constant when addressing it. Multiple files are supported.

## Using the UI component in content

The package exposes the following components in the MDX context:

- `<Constant>`

Then in your MDX files include the constant value in arbitrary places:

```markdown
<Constant type="limits" name="slugLength"/>
```

If both a text and a number value are provided, the text is rendered after the number, separated by a non-breaking space to allow using the text as a unit of measure for the number.
