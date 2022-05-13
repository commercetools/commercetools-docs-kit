---
'@commercetools-docs/gatsby-theme-docs': major
---

Breaking Change: The plugin options `excludeFromSearchIndex` and `beta` have now moved to the site metadata and the plugin option `allowWideContentLayout` has been removed completely. The frontmatter `wideLayout` sets the wide layout now independently. This fixes a problem with differently configured pages leaking between preview builds and production builds due to gatsby's data node caching.
