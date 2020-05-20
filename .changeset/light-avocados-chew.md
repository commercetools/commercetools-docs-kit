---
'@commercetools-docs/gatsby-theme-docs': minor
'@commercetools-website/docs-smoke-test': patch
---

Implement Card components to be used in MDX files.

This change includes 2 new components available in the MDX provider:

- `<Cards>`: is a wrapper component that dictates how cards are rendered within a grid layout.
- `<Card>`: a single card component to be rendered within the `<Cards>` wrapper component. A `<Card>` component contains card specific information, for example title, link, etc.

You can find usage examples here: https://commercetools-docs-kit.now.sh/docs-smoke-test/components/cards
