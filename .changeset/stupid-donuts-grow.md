---
'@commercetools-docs/gatsby-theme-docs': major
---

BREAKING CHANGE: Moves the globalNotification configuration to the siteMetadata.
If the global notification banner is used, the configuration needs to move out from the plugin configurations to the site metadata in the gatsby config file. It also implements `isActive` as a new configuration option which has to be set.
