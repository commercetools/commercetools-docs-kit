---
'@commercetools-docs/gatsby-theme-docs': minor
---

LOW_MEM=true flag also activates experimental webpack lazy compilation in development server.
This makes the development server throw errors that require reloading it but the effect on startup time and memory is extremely high.
Purpose is to allow testing MDX v2 plugin based work.
