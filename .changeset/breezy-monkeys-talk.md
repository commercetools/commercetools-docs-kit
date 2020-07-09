---
'@commercetools-docs/gatsby-theme-api-docs': minor
'@commercetools-docs/gatsby-theme-docs': minor
'@commercetools-docs/ui-kit': patch
---

Optional two-column content layout with side-by-side components

- `<SideBySide>` component for manual pages
- Side-by-side layout for API types and their examples
- Theme option and frontmatter to allow wide layouts

To enable this for all pages, configure the global theme option `allowWideContentLayout`.
Single pages can also be enabled/disabled by specifying the `wideLayout` frontmatter option.

Then, in the MDX files, wrap the containers/elements that should go side-by-side with the
`<SideBySide>` component:

```jsx
<SideBySide>
  This is the block on the left, or on top if the screen is not wide enough.
  <div>
    This goes to the right when the screen is wide enough. I can write
    **normal** MDX content here.
  </div>
</SideBySide>
```
