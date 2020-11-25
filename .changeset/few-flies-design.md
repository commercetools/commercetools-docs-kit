---
'@commercetools-docs/gatsby-theme-api-docs': minor
'@commercetools-docs/gatsby-theme-code-examples': minor
'@commercetools-docs/gatsby-theme-constants': minor
'@commercetools-docs/gatsby-theme-docs': minor
'@commercetools-docs/ui-kit': minor
'@commercetools-website/api-docs-smoke-test': minor
'@commercetools-website/docs-smoke-test': minor
'@commercetools-website/site-template': minor
---

Migrate to emotion v11. https://emotion.sh/docs/emotion-11

Additionally, some peer dependencies changed:

- The `@commercetools-docs/gatsby-theme-api-docs` does not require the peer dependencies `@emotion/core`, and `@emotion/styled`, as they are now included in the package's dependencies.
- The `@commercetools-docs/gatsby-theme-docs` does not require the peer dependencies `@emotion/core`, and `@emotion/styled`, as they are now included in the package's dependencies.
- The `@commercetools-docs/ui-kit` does not require the peer dependencies `@commercetools-uikit/design-system`, `@commercetools-uikit/icons`, `@commercetools-uikit/spacings-inline`, `@emotion/core`, and `@emotion/styled`, as they are now included in the package's dependencies.
