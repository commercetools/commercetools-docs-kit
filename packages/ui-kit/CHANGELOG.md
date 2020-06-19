# @commercetools-docs/ui-kit

## 5.0.3

### Patch Changes

- [`065391d`](https://github.com/commercetools/commercetools-docs-kit/commit/065391dc77e610c3202e9b9f871f16ff5565b681) [#497](https://github.com/commercetools/commercetools-docs-kit/pull/497) Thanks [@davifantasia](https://github.com/davifantasia)! - feat: rss feeds component

## 5.0.2

### Patch Changes

- [`c0b74d5`](https://github.com/commercetools/commercetools-docs-kit/commit/c0b74d5bd16ef6db8a7ab3844b292dc4daff425d) [#494](https://github.com/commercetools/commercetools-docs-kit/pull/494) Thanks [@emmenko](https://github.com/emmenko)! - Use correct `theme.codeBlockColors` for `<CodeBlock>` components

## 5.0.1

### Patch Changes

- [`00abb72`](https://github.com/commercetools/commercetools-docs-kit/commit/00abb725dca4c7d97fa5e6bec7b6edd2bc001594) Thanks [@emmenko](https://github.com/emmenko)! - Update all dependencies

## 5.0.0

### Minor Changes

- [`08e13cd`](https://github.com/commercetools/commercetools-docs-kit/commit/08e13cd4bf505dbc6124077bc794a0777ffa88f3) [#480](https://github.com/commercetools/commercetools-docs-kit/pull/480) Thanks [@emmenko](https://github.com/emmenko)! - Update color presets SVG banners and colors. Additionally add new color presets: `option-{1,2,3}`.

### Patch Changes

- [`3dd84ca`](https://github.com/commercetools/commercetools-docs-kit/commit/3dd84ca932145271cc6dba0e79d5e129a4e5a090) [#467](https://github.com/commercetools/commercetools-docs-kit/pull/467) Thanks [@nkuehn](https://github.com/nkuehn)! - Support for long and deeply nested pages

  - render deep heading levels (> 3) like level 3 (keeps their hierarchy in the nav, but all rendered identically)
  - configure lower index nav depth per page to support long pages with lots of sections
  - component to render a table of contents of a given section inside the main column

* [`e58e26a`](https://github.com/commercetools/commercetools-docs-kit/commit/e58e26a0399afc6a86a49721971a5999b2df25b7) [#478](https://github.com/commercetools/commercetools-docs-kit/pull/478) Thanks [@nkuehn](https://github.com/nkuehn)! - Fix spacing above lists and inside the child section navigator

## 3.1.1

### Patch Changes

- [`2e3ef6b`](https://github.com/commercetools/commercetools-docs-kit/commit/2e3ef6b0e7bc587de3308c94381a38b0c70b86ca) [#465](https://github.com/commercetools/commercetools-docs-kit/pull/465) Thanks [@emmenko](https://github.com/emmenko)! - Update `@commercetools-uikit/*` packages to `10.21.0`.

* [`2e3ef6b`](https://github.com/commercetools/commercetools-docs-kit/commit/2e3ef6b0e7bc587de3308c94381a38b0c70b86ca) [#465](https://github.com/commercetools/commercetools-docs-kit/pull/465) Thanks [@emmenko](https://github.com/emmenko)! - fix: remove custom word spacing

## 3.1.0

### Minor Changes

- [`6206775`](https://github.com/commercetools/commercetools-docs-kit/commit/620677547ea378038309ac508872dd889383c4c8) [#458](https://github.com/commercetools/commercetools-docs-kit/pull/458) Thanks [@renovate](https://github.com/apps/renovate)! - Add the option for code blocks and code examples to pass a `secondaryTheme` prop to render a lighter version of the syntax highlighting theme. See the examples in `components/code-blocks` and `components/code-examples`

* [`6206775`](https://github.com/commercetools/commercetools-docs-kit/commit/620677547ea378038309ac508872dd889383c4c8) [#458](https://github.com/commercetools/commercetools-docs-kit/pull/458) Thanks [@renovate](https://github.com/apps/renovate)! - Markdown UI Kit: refactor content spacing to be able to render markdown inside

## 3.0.2

### Patch Changes

- [`a8ba1b2`](https://github.com/commercetools/commercetools-docs-kit/commit/a8ba1b24913a6857941d4fdd35733086b7e2560f) Thanks [@emmenko](https://github.com/emmenko)! - Update all dependencies

## 3.0.1

### Patch Changes

- [`18976f7`](https://github.com/commercetools/commercetools-docs-kit/commit/18976f7344f0d5a219641da75ee996741e2d7ac2) [#427](https://github.com/commercetools/commercetools-docs-kit/pull/427) Thanks [@emmenko](https://github.com/emmenko)! - Add a new template for the website homepage `index.mdx`. The page header renders a hero background image that can be defined by choosing one of the predefined **color presets**, using the `colorPreset` theme option.

  A color preset is what identifies a website or a group or content-related websites.

  At the moment the available presets are:

  - `base` (default)
  - `merchantCenterDeveloperDocs`
  - `merchantCenterUserDocs`
  - `platformDeveloperDocs`

  **Breaking changes**

  The theme option `websitePrimaryColor` has been removed in favor of the new option `colorPreset`.
