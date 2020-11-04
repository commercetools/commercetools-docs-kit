---
'@commercetools-docs/gatsby-theme-docs': patch
'@commercetools-docs/ui-kit': patch
---

It appeared that under some unknown circumstances the `props.theme` accessed from within a styled component results in an empty object when building the website in production mode. To fix that, we explicitly pass wherever possible the `theme` object after reading it from the context with `useTheme`.
