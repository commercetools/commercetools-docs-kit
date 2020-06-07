# @commercetools-docs/gatsby-theme-docs

## 5.0.0

### Minor Changes

- [`3dd84ca`](https://github.com/commercetools/commercetools-docs-kit/commit/3dd84ca932145271cc6dba0e79d5e129a4e5a090) [#467](https://github.com/commercetools/commercetools-docs-kit/pull/467) Thanks [@nkuehn](https://github.com/nkuehn)! - Support for long and deeply nested pages

  - render deep heading levels (> 3) like level 3 (keeps their hierarchy in the nav, but all rendered identically)
  - configure lower index nav depth per page to support long pages with lots of sections
  - component to render a table of contents of a given section inside the main column

* [`08e13cd`](https://github.com/commercetools/commercetools-docs-kit/commit/08e13cd4bf505dbc6124077bc794a0777ffa88f3) [#480](https://github.com/commercetools/commercetools-docs-kit/pull/480) Thanks [@emmenko](https://github.com/emmenko)! - Update color presets SVG banners and colors. Additionally add new color presets: `option-{1,2,3}`.

### Patch Changes

- [`4e69047`](https://github.com/commercetools/commercetools-docs-kit/commit/4e690472d48135461ab3b1fa5b6fcdfc789e19a2) [#482](https://github.com/commercetools/commercetools-docs-kit/pull/482) Thanks [@emmenko](https://github.com/emmenko)! - Fix back to docs link when in release notes pages

* [`6b19dbc`](https://github.com/commercetools/commercetools-docs-kit/commit/6b19dbc32d60954e0c741757045e1805b32cb001) [#479](https://github.com/commercetools/commercetools-docs-kit/pull/479) Thanks [@nkuehn](https://github.com/nkuehn)! - Scrollable index navigation for robustness with larger pages

- [`8c1a43e`](https://github.com/commercetools/commercetools-docs-kit/commit/8c1a43e61e1050db0fe4aa61cbcda3bf2d978a46) Thanks [@emmenko](https://github.com/emmenko)! - Fix sort order of release notes

* [`e58e26a`](https://github.com/commercetools/commercetools-docs-kit/commit/e58e26a0399afc6a86a49721971a5999b2df25b7) [#478](https://github.com/commercetools/commercetools-docs-kit/pull/478) Thanks [@nkuehn](https://github.com/nkuehn)! - Fix spacing above lists and inside the child section navigator

* Updated dependencies [[`3dd84ca`](https://github.com/commercetools/commercetools-docs-kit/commit/3dd84ca932145271cc6dba0e79d5e129a4e5a090), [`08e13cd`](https://github.com/commercetools/commercetools-docs-kit/commit/08e13cd4bf505dbc6124077bc794a0777ffa88f3), [`e58e26a`](https://github.com/commercetools/commercetools-docs-kit/commit/e58e26a0399afc6a86a49721971a5999b2df25b7)]:
  - @commercetools-docs/ui-kit@5.0.0

## 4.1.1

### Patch Changes

- [`2e3ef6b`](https://github.com/commercetools/commercetools-docs-kit/commit/2e3ef6b0e7bc587de3308c94381a38b0c70b86ca) [#465](https://github.com/commercetools/commercetools-docs-kit/pull/465) Thanks [@emmenko](https://github.com/emmenko)! - Update `@commercetools-uikit/*` packages to `10.21.0`.

* [`2e3ef6b`](https://github.com/commercetools/commercetools-docs-kit/commit/2e3ef6b0e7bc587de3308c94381a38b0c70b86ca) [#465](https://github.com/commercetools/commercetools-docs-kit/pull/465) Thanks [@emmenko](https://github.com/emmenko)! - fix: removes rss related warning of missing title when building

* Updated dependencies [[`2e3ef6b`](https://github.com/commercetools/commercetools-docs-kit/commit/2e3ef6b0e7bc587de3308c94381a38b0c70b86ca), [`2e3ef6b`](https://github.com/commercetools/commercetools-docs-kit/commit/2e3ef6b0e7bc587de3308c94381a38b0c70b86ca)]:
  - @commercetools-docs/ui-kit@3.1.1

## 4.1.0

### Minor Changes

- [`6206775`](https://github.com/commercetools/commercetools-docs-kit/commit/620677547ea378038309ac508872dd889383c4c8) [#458](https://github.com/commercetools/commercetools-docs-kit/pull/458) Thanks [@renovate](https://github.com/apps/renovate)! - This change ensures non string contents of cards are rendered with appropriate styles.

* [`6206775`](https://github.com/commercetools/commercetools-docs-kit/commit/620677547ea378038309ac508872dd889383c4c8) [#458](https://github.com/commercetools/commercetools-docs-kit/pull/458) Thanks [@renovate](https://github.com/apps/renovate)! - Implement Card components to be used in MDX files.

  This change includes 2 new components available in the MDX provider:

  - `<Cards>`: is a wrapper component that dictates how cards are rendered within a grid layout.
  - `<Card>`: a single card component to be rendered within the `<Cards>` wrapper component. A `<Card>` component contains card specific information, for example title, link, etc.

  You can find usage examples here: https://commercetools-docs-kit.now.sh/docs-smoke-test/components/cards

- [`6206775`](https://github.com/commercetools/commercetools-docs-kit/commit/620677547ea378038309ac508872dd889383c4c8) [#458](https://github.com/commercetools/commercetools-docs-kit/pull/458) Thanks [@renovate](https://github.com/apps/renovate)! - Announcement type in release notes

  The list of types allowed to be defined for a release not now includes "announcement."

### Patch Changes

- Updated dependencies [[`6206775`](https://github.com/commercetools/commercetools-docs-kit/commit/620677547ea378038309ac508872dd889383c4c8), [`6206775`](https://github.com/commercetools/commercetools-docs-kit/commit/620677547ea378038309ac508872dd889383c4c8)]:
  - @commercetools-docs/ui-kit@3.1.0

## 4.0.2

### Patch Changes

- [`a8ba1b2`](https://github.com/commercetools/commercetools-docs-kit/commit/a8ba1b24913a6857941d4fdd35733086b7e2560f) Thanks [@emmenko](https://github.com/emmenko)! - Update all dependencies

* [`a8ba1b2`](https://github.com/commercetools/commercetools-docs-kit/commit/a8ba1b24913a6857941d4fdd35733086b7e2560f) Thanks [@emmenko](https://github.com/emmenko)! - chore(deps): update all dependencies

* Updated dependencies [[`a8ba1b2`](https://github.com/commercetools/commercetools-docs-kit/commit/a8ba1b24913a6857941d4fdd35733086b7e2560f)]:
  - @commercetools-docs/ui-kit@3.0.2

## 4.0.1

### Patch Changes

- [`c18f1fa`](https://github.com/commercetools/commercetools-docs-kit/commit/c18f1fa7c31244912145fe4b8c8f5352fe1fd0ed) [#442](https://github.com/commercetools/commercetools-docs-kit/pull/442) Thanks [@emmenko](https://github.com/emmenko)! - Let Gastby group the release notes topics

* [`c18f1fa`](https://github.com/commercetools/commercetools-docs-kit/commit/c18f1fa7c31244912145fe4b8c8f5352fe1fd0ed) [#442](https://github.com/commercetools/commercetools-docs-kit/pull/442) Thanks [@emmenko](https://github.com/emmenko)! - Render release notes filters in overlay for small screens

## 4.0.0

### Major Changes

- [`18976f7`](https://github.com/commercetools/commercetools-docs-kit/commit/18976f7344f0d5a219641da75ee996741e2d7ac2) [#427](https://github.com/commercetools/commercetools-docs-kit/pull/427) Thanks [@emmenko](https://github.com/emmenko)! - Add a new template for the website homepage `index.mdx`. The page header renders a hero background image that can be defined by choosing one of the predefined **color presets**, using the `colorPreset` theme option.

  A color preset is what identifies a website or a group or content-related websites.

  At the moment the available presets are:

  - `base` (default)
  - `merchantCenterDeveloperDocs`
  - `merchantCenterUserDocs`
  - `platformDeveloperDocs`

  **Breaking changes**

  The theme option `websitePrimaryColor` has been removed in favor of the new option `colorPreset`.

### Minor Changes

- [`f8d349b`](https://github.com/commercetools/commercetools-docs-kit/commit/f8d349b6a4f9d552fb66cdf96241b7f259c862d4) [#420](https://github.com/commercetools/commercetools-docs-kit/pull/420) Thanks [@davifantasia](https://github.com/davifantasia)! - Implement release notes dates and topics filters

### Patch Changes

- Updated dependencies [[`18976f7`](https://github.com/commercetools/commercetools-docs-kit/commit/18976f7344f0d5a219641da75ee996741e2d7ac2)]:
  - @commercetools-docs/ui-kit@3.0.1
