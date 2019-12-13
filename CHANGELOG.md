## [1.3.0](https://github.com/commercetools/commercetools-docs-kit/compare/v1.2.1...v1.3.0) (2019-12-13)

We added a new package `@commercetools-docs/ui-kit` that contains the low-level UI components used to build the documentation website.

If you need to use some of these components, you can use do that directly using the package. Previously some of those components were exposed from the `@commercetools-docs/gatsby-theme-docs`. For backwards compatibility, all exports of `@commercetools-docs/ui-kit` are exposed on the `@commercetools-docs/gatsby-theme-docs` package as well.

#### 🐛 Type: Bug

- `gatsby-theme-docs`
  - [#158](https://github.com/commercetools/commercetools-docs-kit/pull/158) fix(theme): overflow shorthand ([@emmenko](https://github.com/emmenko))
  - [#153](https://github.com/commercetools/commercetools-docs-kit/pull/153) fix(theme): list items spacing ([@emmenko](https://github.com/emmenko))

#### 🚀 Type: New Feature

- `gatsby-theme-api-docs`, `gatsby-theme-docs`, `ui-kit`
  - [#150](https://github.com/commercetools/commercetools-docs-kit/pull/150) feat: extract ui components into a uikit package ([@emmenko](https://github.com/emmenko))
- `broken-link-checker`
  - [#156](https://github.com/commercetools/commercetools-docs-kit/pull/156) feat(broken-link-checker): warn on insecure links ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `gatsby-theme-docs`
  - [#154](https://github.com/commercetools/commercetools-docs-kit/pull/154) refactor(theme): do not render search bar when excludeFromSearchIndex is true ([@emmenko](https://github.com/emmenko))
- `gatsby-theme-api-docs`
  - [#155](https://github.com/commercetools/commercetools-docs-kit/pull/155) refactor(theme-api): no hardcoded transformer raml options, instead forward options ([@emmenko](https://github.com/emmenko))

## [1.2.1](https://github.com/commercetools/commercetools-docs-kit/compare/v1.2.0...v1.2.1) (2019-12-12)

#### 🐛 Type: Bug

- `broken-link-checker`
  - [#151](https://github.com/commercetools/commercetools-docs-kit/pull/151) fix(broken-link-checker): merging options ([@emmenko](https://github.com/emmenko))

## [1.2.0](https://github.com/commercetools/commercetools-docs-kit/compare/v1.1.0...v1.2.0) (2019-12-12)

#### 🚀 Type: New Feature

- `gatsby-theme-api-docs`, `gatsby-theme-docs`, `gatsby-transformer-mdx-introspection`
  - [#145](https://github.com/commercetools/commercetools-docs-kit/pull/145) feat: migrate base theme for api docs ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `broken-link-checker`
  - [#147](https://github.com/commercetools/commercetools-docs-kit/pull/147) refactor(broken-link-checker): read checker options from a config file ([@emmenko](https://github.com/emmenko))

## [1.1.0](https://github.com/commercetools/commercetools-docs-kit/compare/v1.0.5...v1.1.0) (2019-12-11)

#### 🐛 Type: Bug

- `gatsby-theme-docs`
  - [#139](https://github.com/commercetools/commercetools-docs-kit/pull/139) fix(theme): match chapter links also for flat page structure ([@emmenko](https://github.com/emmenko))

#### 🚀 Type: New Feature

- `gatsby-theme-docs`
  - [#132](https://github.com/commercetools/commercetools-docs-kit/pull/132) feat(theme): style definition list elements ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `gatsby-theme-docs`
  - [#140](https://github.com/commercetools/commercetools-docs-kit/pull/140) refactor(theme): to expose CodeBlock component with generic props (no mdx specific) ([@emmenko](https://github.com/emmenko))

## [1.0.5](https://github.com/commercetools/commercetools-docs-kit/compare/v1.0.4...v1.0.5) (2019-12-10)

#### 🐛 Type: Bug

- `broken-link-checker`
  - [#137](https://github.com/commercetools/commercetools-docs-kit/pull/137) fix(broken-link-checker): typo ([@emmenko](https://github.com/emmenko))

## [1.0.4](https://github.com/commercetools/commercetools-docs-kit/compare/v1.0.3...v1.0.4) (2019-12-10)

#### ⛑ Type: Refactoring

- `broken-link-checker`
  - [#135](https://github.com/commercetools/commercetools-docs-kit/pull/135) refactor(broken-link-checker): allow to pass excluded-keywords option ([@emmenko](https://github.com/emmenko))

## [1.0.3](https://github.com/commercetools/commercetools-docs-kit/compare/v1.0.2...v1.0.3) (2019-12-10)

#### 🐛 Type: Bug

- `gatsby-theme-docs`
  - [#129](https://github.com/commercetools/commercetools-docs-kit/pull/129) fix(theme): SSR style tags messing with nth selectors ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `gatsby-theme-docs`
  - [#133](https://github.com/commercetools/commercetools-docs-kit/pull/133) refactor(theme): to support absolute imports ([@emmenko](https://github.com/emmenko))
- `writing-style`
  - [#131](https://github.com/commercetools/commercetools-docs-kit/pull/131) refactor(writing-styles): add postinstall script to download vale binary based on OS platform ([@emmenko](https://github.com/emmenko))

## [1.0.2](https://github.com/commercetools/commercetools-docs-kit/compare/v1.0.1...v1.0.2) (2019-12-09)

#### 🔮 Type: Chore

- `writing-style`
  - [#127](https://github.com/commercetools/commercetools-docs-kit/pull/127) chore: update to latest google styles ([@emmenko](https://github.com/emmenko))

## [1.0.1](https://github.com/commercetools/commercetools-docs-kit/compare/v1.0.0...v1.0.1) (2019-12-06)

The following packages had problems being published in the previous version.

- `@commercetools-docs/gatsby-transformer-mdx-introspection`
- `@commercetools-docs/gatsby-transformer-raml-legacy`

# [1.0.0](https://github.com/commercetools/commercetools-docs-kit/tree/v1.0.0) (2019-12-06)

_This is the first "official" release after the initial development. From now we will update the changelog on every new release._

> There isn't an official changelog prior to this version.
