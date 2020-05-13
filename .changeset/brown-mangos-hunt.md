---
'@commercetools-docs/gatsby-theme-docs': major
'@commercetools-docs/ui-kit': patch
---

Add a new template for the website homepage `index.mdx`. The page header renders a hero background image that can be defined by choosing one of the predefined **color presets**, using the `colorPreset` theme option.

A color preset is what identifies a website or a group or content-related websites.

At the moment the available presets are:

- `base` (default)

**Breaking changes**

The theme option `websitePrimaryColor` has been removed in favor of the new option `colorPreset`.
