---
'@commercetools-docs/gatsby-theme-docs': major
'@commercetools-docs/ui-kit': patch
---

Applies design changes accourding to the new ct branding. It also removes support for color presets since we will only use one color preset from now on.

Migration steps:

- Go to the gatsby-config.mjs file of every microsite and remove the `colorPreset` config from the local theme configuration.
