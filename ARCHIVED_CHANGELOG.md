## [3.0.0](https://github.com/commercetools/commercetools-docs-kit/compare/v2.5.0...v3.0.0) (2020-05-08)

This release introduces some **breaking changes**, as documented below.

- Dropping node `v10` support
- The `@commercetools-docs/broken-link-checker` package has been removed. The NPM package is still available but it's marked as **deprecated**. As a replacement, we recommend using the [linkinator](https://www.npmjs.com/package/linkinator) package.
- The `@commercetools-docs/gatsby-theme-api-docs` is now a theme "add-on" (read more about "add-ons" below).
- The `@commercetools-docs/gatsby-transformer-code-examples` is now a theme "add-on" (read more about "add-ons" below) and has been renamed to `@commercetools-docs/gatsby-theme-code-examples`.

### Introducing Gatsby Theme Add-Ons

A theme add-on is a Gatsby Theme that exposes React components to be injected into the MDX provider of the core theme.

Gatsby enables a child theme to use component shadowing (see [Theme overrides](https://github.com/commercetools/commercetools-docs-kit/blob/master/packages/gatsby-theme-docs/src/overrides/README.md)). However, with multiple themes, the shadowed components are _only_ loaded from the last theme in the Gatsby configuration. To solve this problem, a commercetools-docs Gatsby Theme can be used as an add-on, allowing _multiple_ add-ons to provide additional components to be available in MDX without having to manually import them into every page.

When using add-on themes, a proxy export file will be generated in the websites `src/@commercetools-docs/gatsby-theme-docs/overrides` folder to leverage Gatsby's component shadowing (see [Theme overrides](https://github.com/commercetools/commercetools-docs-kit/blob/master/packages/gatsby-theme-docs/src/overrides/README.md)). This file provides all the exported components from the add-on packages. For a component to be exported by an add-on package it has to be exported from `index.js` in the add-on package root.

**To safely configure theme add-ons, use the `configureThemeWithAddOns` function in the websites's `gatsby-config.js`:**

```js
const {
  configureThemeWithAddOns,
} = require('@commercetools-docs/gatsby-theme-docs/configure-theme');

module.exports = {
  plugins: [
    ...configureThemeWithAddOns({
      // Pass the normal theme options
      websiteKey: 'my-website-key',
      // Set up the theme add-ons
      addOns: [
        '@commercetools-docs/gatsby-theme-foo',
        {
          resolve: '@commercetools-docs/gatsby-theme-bar',
          options: {
            // ...
          },
        },
      ],
    }),
  ],
};
```

#### 🐛 Type: Bug

- `gatsby-theme-docs`
  - [#413](https://github.com/commercetools/commercetools-docs-kit/pull/413) fix: element keys should be unique ([@davifantasia](https://github.com/davifantasia))
  - [#407](https://github.com/commercetools/commercetools-docs-kit/pull/407) fix(theme): render proper 404 page as a content page ([@emmenko](https://github.com/emmenko))
  - [#399](https://github.com/commercetools/commercetools-docs-kit/pull/399) fix: inconsistent url and title or index nav ([@davifantasia](https://github.com/davifantasia))
  - [#394](https://github.com/commercetools/commercetools-docs-kit/pull/394) fix(theme): gracefully handle missing heading level in TOC ([@emmenko](https://github.com/emmenko))
  - [#388](https://github.com/commercetools/commercetools-docs-kit/pull/388) fix(theme-docs): Render mdx commonmark compliant ([@nkuehn](https://github.com/nkuehn))
  - [#384](https://github.com/commercetools/commercetools-docs-kit/pull/384) fix(theme): sticky page nav and scrolling container ([@emmenko](https://github.com/emmenko))
  - [#380](https://github.com/commercetools/commercetools-docs-kit/pull/380) fix(theme): rss link to be treated as external link ([@emmenko](https://github.com/emmenko))
- `gatsby-transformer-raml`
  - [#386](https://github.com/commercetools/commercetools-docs-kit/pull/386) fix: stop rendering deprecated properties ([@davifantasia](https://github.com/davifantasia))
- `gatsby-theme-docs`, `ui-kit`
  - [#382](https://github.com/commercetools/commercetools-docs-kit/pull/382) fix(theme): proptype warnings and mapping of some md elements ([@emmenko](https://github.com/emmenko))

#### 💥 Type: Breaking Change

- `broken-link-checker`
  - [#424](https://github.com/commercetools/commercetools-docs-kit/pull/424) feat: use linkinator, drop broken-link-checker ([@emmenko](https://github.com/emmenko))
- `gatsby-theme-docs`
  - [#423](https://github.com/commercetools/commercetools-docs-kit/pull/423) refactor: require node 12 ([@emmenko](https://github.com/emmenko))
- `gatsby-theme-api-docs`, `gatsby-theme-code-examples`, `gatsby-theme-docs`
  - [#422](https://github.com/commercetools/commercetools-docs-kit/pull/422) feat: implement add-ons mechanism to merge markdown components from different add-on themes ([@emmenko](https://github.com/emmenko))
- `gatsby-theme-api-docs`
  - [#412](https://github.com/commercetools/commercetools-docs-kit/pull/412) refactor(api-theme): compose themes in website instead of inheriting ([@nkuehn](https://github.com/nkuehn))

#### 🔮 Type: Chore

- [#383](https://github.com/commercetools/commercetools-docs-kit/pull/383) refactor(ci): to not use cypress github action ([@emmenko](https://github.com/emmenko))

#### 💅 Type: Enhancement

- `writing-style`
  - [#410](https://github.com/commercetools/commercetools-docs-kit/pull/410) WIP writing style: adjustments ([@adinakleine](https://github.com/adinakleine))
- Other
  - [#398](https://github.com/commercetools/commercetools-docs-kit/pull/398) enhancement(workspace): set the window title better find the window ([@nkuehn](https://github.com/nkuehn))

#### 🚀 Type: New Feature

- `gatsby-theme-code-examples`, `gatsby-theme-constants`, `gatsby-theme-docs`
  - [#402](https://github.com/commercetools/commercetools-docs-kit/pull/402) feat: add gatsby theme to work with constant values ([@davifantasia](https://github.com/davifantasia))
- `gatsby-theme-api-docs`, `gatsby-theme-code-examples`, `gatsby-theme-docs`
  - [#422](https://github.com/commercetools/commercetools-docs-kit/pull/422) feat: implement add-ons mechanism to merge markdown components from different add-on themes ([@emmenko](https://github.com/emmenko))
- `gatsby-theme-docs`, `ui-kit`
  - [#411](https://github.com/commercetools/commercetools-docs-kit/pull/411) feat(theme): allow to configure website primary color ([@emmenko](https://github.com/emmenko))
  - [#371](https://github.com/commercetools/commercetools-docs-kit/pull/371) feat: release notes details page ([@davifantasia](https://github.com/davifantasia))
  - [#376](https://github.com/commercetools/commercetools-docs-kit/pull/376) feat(docs-theme): make beta flag available in any content ([@nkuehn](https://github.com/nkuehn))
- `gatsby-theme-docs`
  - [#400](https://github.com/commercetools/commercetools-docs-kit/pull/400) feat(theme): allow to override top-menu links ([@emmenko](https://github.com/emmenko))
  - [#390](https://github.com/commercetools/commercetools-docs-kit/pull/390) Support custom anchors in MD(X) using <Achor name="my-anchor" /> ([@davifantasia](https://github.com/davifantasia))
- `gatsby-theme-api-docs`, `gatsby-theme-docs`
  - [#375](https://github.com/commercetools/commercetools-docs-kit/pull/375) Release Notes: Render excerpt in list with reduced formatting, show read more. ([@nkuehn](https://github.com/nkuehn))

#### ⛑ Type: Refactoring

- `gatsby-theme-code-examples`, `gatsby-theme-docs`, `gatsby-transformer-code-examples`
  - [#419](https://github.com/commercetools/commercetools-docs-kit/pull/419) refactor(code-examples): make it a gatsby theme ([@emmenko](https://github.com/emmenko))
- `gatsby-theme-api-docs`
  - [#412](https://github.com/commercetools/commercetools-docs-kit/pull/412) refactor(api-theme): compose themes in website instead of inheriting ([@nkuehn](https://github.com/nkuehn))
- `gatsby-theme-api-docs`, `gatsby-theme-docs`
  - [#375](https://github.com/commercetools/commercetools-docs-kit/pull/375) Release Notes: Render excerpt in list with reduced formatting, show read more. ([@nkuehn](https://github.com/nkuehn))

#### 🤖 Type: Dependencies

- `gatsby-theme-api-docs`, `gatsby-theme-docs`, `gatsby-transformer-mdx-introspection`, `ramldoc-generator`, `writing-style`
  - [#418](https://github.com/commercetools/commercetools-docs-kit/pull/418) chore(deps): lock file maintenance all dependencies ([@renovate[bot]](https://github.com/apps/renovate))
- Other
  - [#417](https://github.com/commercetools/commercetools-docs-kit/pull/417) chore(deps): update dependency eslint-plugin-react-hooks to v4 ([@renovate[bot]](https://github.com/apps/renovate))
- `gatsby-theme-docs`, `ui-kit`
  - [#378](https://github.com/commercetools/commercetools-docs-kit/pull/378) fix(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
- `broken-link-checker`, `gatsby-theme-api-docs`, `gatsby-theme-docs`, `gatsby-transformer-mdx-introspection`, `ramldoc-generator`
  - [#379](https://github.com/commercetools/commercetools-docs-kit/pull/379) chore(deps): lock file maintenance all dependencies ([@renovate[bot]](https://github.com/apps/renovate))

## [2.5.0](https://github.com/commercetools/commercetools-docs-kit/compare/v2.4.0...v2.5.0) (2020-04-17)

#### 🐛 Type: Bug

- `gatsby-theme-docs`, `gatsby-transformer-code-examples`
  - [#370](https://github.com/commercetools/commercetools-docs-kit/pull/370) fix(theme): to not restrict content page nodes for specific filesystem ([@emmenko](https://github.com/emmenko))
- `writing-style`
  - [#366](https://github.com/commercetools/commercetools-docs-kit/pull/366) Writing Style Linter: Update vale and prevent binary from being published ([@nkuehn](https://github.com/nkuehn))
- `gatsby-theme-docs`
  - [#347](https://github.com/commercetools/commercetools-docs-kit/pull/347) fix(theme): to use height auto for small screens ([@emmenko](https://github.com/emmenko))
  - [#351](https://github.com/commercetools/commercetools-docs-kit/pull/351) fix(theme): remove check for zeit github branch ([@emmenko](https://github.com/emmenko))
  - [#348](https://github.com/commercetools/commercetools-docs-kit/pull/348) fix(theme): dynamically render the cookie consent scripts only on \*.commercetools.com domain ([@nkuehn](https://github.com/nkuehn))
  - [#350](https://github.com/commercetools/commercetools-docs-kit/pull/350) fix: leftovers of release notes layout implementation ([@emmenko](https://github.com/emmenko))

#### 🔮 Type: Chore

- [#353](https://github.com/commercetools/commercetools-docs-kit/pull/353) chore(ci): add workflow to verify PR labels are assigned ([@emmenko](https://github.com/emmenko))

#### 💅 Type: Enhancement

- `gatsby-theme-docs`
  - [#331](https://github.com/commercetools/commercetools-docs-kit/pull/331) Nav Content: Add Integrations marketplace to meta nav ([@nkuehn](https://github.com/nkuehn))
- `writing-style`
  - [#356](https://github.com/commercetools/commercetools-docs-kit/pull/356) Writing Style: match the date formatting style hint to our actual styleguide rule ([@nkuehn](https://github.com/nkuehn))

#### 🚀 Type: New Feature

- `gatsby-theme-docs`
  - [#367](https://github.com/commercetools/commercetools-docs-kit/pull/367) feat: release notes link to rss and product newsletter ([@davifantasia](https://github.com/davifantasia))
  - [#364](https://github.com/commercetools/commercetools-docs-kit/pull/364) feat: generate rss feed ([@davifantasia](https://github.com/davifantasia))
  - [#339](https://github.com/commercetools/commercetools-docs-kit/pull/339) feat(release-notes): create gatsby nodes for release notes frontmatter fields ([@davifantasia](https://github.com/davifantasia))
- `gatsby-theme-docs`, `ui-kit`
  - [#352](https://github.com/commercetools/commercetools-docs-kit/pull/352) Release notes list design implementation ([@davifantasia](https://github.com/davifantasia))
- `gatsby-theme-api-docs`, `gatsby-theme-docs`
  - [#336](https://github.com/commercetools/commercetools-docs-kit/pull/336) feat(theme): implement release notes page layout ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `gatsby-theme-docs`
  - [#369](https://github.com/commercetools/commercetools-docs-kit/pull/369) refactor(theme): to customize Stamp using theme ([@emmenko](https://github.com/emmenko))
  - [#365](https://github.com/commercetools/commercetools-docs-kit/pull/365) refactor: release notes left over ([@davifantasia](https://github.com/davifantasia))
- `gatsby-theme-api-docs`, `gatsby-theme-docs`, `gatsby-transformer-mdx-introspection`, `gatsby-transformer-raml-legacy`, `gatsby-transformer-raml`, `ramldoc-generator`, `ui-kit`
  - [#355](https://github.com/commercetools/commercetools-docs-kit/pull/355) refactor(theme): use uikit Stamp component for release note types ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `writing-style`
  - [#366](https://github.com/commercetools/commercetools-docs-kit/pull/366) Writing Style Linter: Update vale and prevent binary from being published ([@nkuehn](https://github.com/nkuehn))
- `ramldoc-generator`
  - [#343](https://github.com/commercetools/commercetools-docs-kit/pull/343) fix(deps): update dependency chalk to v4 ([@renovate[bot]](https://github.com/apps/renovate))

## [2.4.0](https://github.com/commercetools/commercetools-docs-kit/compare/v2.3.0...v2.4.0) (2020-04-03)

#### 🐛 Type: Bug

- `gatsby-theme-api-docs`
  - [#330](https://github.com/commercetools/commercetools-docs-kit/pull/330) fix: query parameters types that are objects now render as links ([@davifantasia](https://github.com/davifantasia))
- `writing-style`
  - [#333](https://github.com/commercetools/commercetools-docs-kit/pull/333) fix(writing-style): cover the last few cases from the existing docs ([@nkuehn](https://github.com/nkuehn))

#### 🔮 Type: Chore

- `gatsby-theme-docs`
  - [#334](https://github.com/commercetools/commercetools-docs-kit/pull/334) chore: update cookie consent banner script ([@nkuehn](https://github.com/nkuehn))

#### 🚀 Type: New Feature

- `gatsby-theme-docs`

  - [#332](https://github.com/commercetools/commercetools-docs-kit/pull/332) feat(theme): set up release notes template ([@davifantasia](https://github.com/davifantasia))

  > This feature is still under development.

#### 🤖 Type: Dependencies

- `gatsby-theme-api-docs`, `gatsby-theme-docs`
  - [#326](https://github.com/commercetools/commercetools-docs-kit/pull/326) chore(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))

## [2.3.0](https://github.com/commercetools/commercetools-docs-kit/compare/v2.2.0...v2.3.0) (2020-03-30)

#### 🐛 Type: Bug

- `writing-style`
  - [#323](https://github.com/commercetools/commercetools-docs-kit/pull/323) feat(writing-style): upgrade to vale 2.1.0, don't let vale fail when called from the VSCode plugin ([@nkuehn](https://github.com/nkuehn))
- `gatsby-transformer-mdx-introspection`
  - [#324](https://github.com/commercetools/commercetools-docs-kit/pull/324) fix: appropriate async implementation for gatsby ([@davifantasia](https://github.com/davifantasia))

#### 🚀 Type: New Feature

- `gatsby-theme-docs`, `ui-kit`

  - [#325](https://github.com/commercetools/commercetools-docs-kit/pull/325) feat(theme): add support for specifying new languages for Prism ([@emmenko](https://github.com/emmenko))

  You can now pass a new option `availablePrismLanguages` to the theme config, which is a list of strings. This is useful in case you need to include **Prism languages** that are [not included by default by `prism-react-renderer`](https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js).

#### ⛑ Type: Refactoring

- `writing-style`
  - [#323](https://github.com/commercetools/commercetools-docs-kit/pull/323) feat(writing-style): upgrade to vale 2.1.0, don't let vale fail when called from the VSCode plugin ([@nkuehn](https://github.com/nkuehn))

## [2.2.0](https://github.com/commercetools/commercetools-docs-kit/compare/v2.1.0...v2.2.0) (2020-03-25)

#### 🚀 Type: New Feature

- `gatsby-theme-docs`, `ui-kit`
  - [#305](https://github.com/commercetools/commercetools-docs-kit/pull/305) feat(theme): implement <MultiCodeExample> and <MultiCodeBlock> components ([@davifantasia](https://github.com/davifantasia))

Documentation writers can now reference multiple code examples together in the MDX files. The code examples are grouped together and enables users to switch between them via a dropdown. This is useful when there is a need to provide examples that achieve the same thing in different programming languages.

```
<MultiCodeExample title="Multilanguage Code Samples">
  <CodeExample path="example.js" highlightLines={[3]} />
  <CodeExample path="example.java"/>
  <CodeExample path="example.console" noPromptLines={[3, 4]} />
</MultiCodeExample>
```

The code example files are expected to be saved in `src/code-examples`.

## [2.1.0](https://github.com/commercetools/commercetools-docs-kit/compare/v2.0.0...v2.1.0) (2020-03-23)

#### 🔮 Type: Chore

- `gatsby-theme-docs`
  - [#311](https://github.com/commercetools/commercetools-docs-kit/pull/311) fix(theme): remove duplicated source filesystem config ([@emmenko](https://github.com/emmenko))

#### 🚀 Type: New Feature

- `gatsby-theme-docs`, `gatsby-transformer-code-examples`, `ui-kit`, `writing-style`
  - [#304](https://github.com/commercetools/commercetools-docs-kit/pull/304) feat: code examples provided on graphQL by a transformer plugin ([@davifantasia](https://github.com/davifantasia))

#### 🤖 Type: Dependencies

- `broken-link-checker`, `gatsby-theme-api-docs`, `gatsby-theme-docs`, `gatsby-transformer-mdx-introspection`, `gatsby-transformer-raml-legacy`, `gatsby-transformer-raml`, `ramldoc-generator`, `ui-kit`, `writing-style`
  - [#316](https://github.com/commercetools/commercetools-docs-kit/pull/316) chore(deps): update dependency prettier to v2 and babel to v7.9 ([@renovate[bot]](https://github.com/apps/renovate))
- `gatsby-theme-docs`
  - [#307](https://github.com/commercetools/commercetools-docs-kit/pull/307) fix(deps): update dependency rehype-slug to v3 ([@renovate[bot]](https://github.com/apps/renovate))
- Other
  - [#306](https://github.com/commercetools/commercetools-docs-kit/pull/306) chore(deps): bump acorn from 6.4.0 to 6.4.1 ([@dependabot[bot]](https://github.com/apps/dependabot))
  - [#301](https://github.com/commercetools/commercetools-docs-kit/pull/301) chore(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))

## [2.0.0](https://github.com/commercetools/commercetools-docs-kit/compare/v1.8.1...v2.0.0) (2020-03-12)

This release introduces some **breaking changes**, as documented below.

### Changes in `gatsby-transformer-mdx-introspection`

The plugin got an internal re-write and the API changed a bit.

One key area in which it is different is the **casing of JSX attributes/tags**. This is due to dropping the HTML parsing engine, which automatically converted the case. Now, all components/attributes will use the source casing from the compiled MDX, which is usually Pascal/camelCase.

More detailed information can be found in the package README, as well as the list of supported options.

#### 💥 Type: Breaking Change

- `gatsby-theme-api-docs`, `gatsby-transformer-mdx-introspection`
  - [#183](https://github.com/commercetools/commercetools-docs-kit/pull/183) feat(introspection): utilize Babel parser to better parse MDX into component nodes ([@jazevedo620](https://github.com/jazevedo620))

#### 🚀 Type: New Feature

- `gatsby-theme-api-docs`, `ramldoc-generator`
  - [#296](https://github.com/commercetools/commercetools-docs-kit/pull/296) feat: add ramldoc-generator package ([@davifantasia](https://github.com/davifantasia))

The new package `@commercetools-docs/ramldoc-generator` provides an executable to transform any spec-compliant RAML API definition into the (also RAML-compliant) RAML document structure and layout required by the [@commercetools-docs/gatsby-transformer-raml](https://www.npmjs.com/package/@commercetools-docs/gatsby-transformer-raml) plugin.

## [1.8.1](https://github.com/commercetools/commercetools-docs-kit/compare/v1.8.0...v1.8.1) (2020-02-21)

#### 🐛 Type: Bug

- `gatsby-theme-docs`
  - [#293](https://github.com/commercetools/commercetools-docs-kit/pull/293) fix(theme): css overrides for search overlay ([@emmenko](https://github.com/emmenko))

## [1.8.0](https://github.com/commercetools/commercetools-docs-kit/compare/v1.7.7...v1.8.0) (2020-02-19)

#### 🚀 Type: New Feature

- `gatsby-theme-docs`
  - [#175](https://github.com/commercetools/commercetools-docs-kit/pull/175) feat(theme): restore scroll position of main navigation links, when navigating to a new page ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- Other
  - [#282](https://github.com/commercetools/commercetools-docs-kit/pull/282) chore(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
- `gatsby-theme-api-docs`, `gatsby-theme-docs`
  - [#283](https://github.com/commercetools/commercetools-docs-kit/pull/283) chore(deps): lock file maintenance all dependencies ([@renovate[bot]](https://github.com/apps/renovate))

## [1.7.7](https://github.com/commercetools/commercetools-docs-kit/compare/v1.7.6...v1.7.7) (2020-02-17)

#### 🔮 Type: Chore

- [#281](https://github.com/commercetools/commercetools-docs-kit/pull/281) fix(actions): check out with depth 50 to allow proper canary versions on master branch ([@emmenko](https://github.com/emmenko))
- [#280](https://github.com/commercetools/commercetools-docs-kit/pull/280) fix: publish canary only if lerna detects that packages changed ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `gatsby-theme-docs`, `ui-kit`
  - [#288](https://github.com/commercetools/commercetools-docs-kit/pull/288) refactor: rendering of code block for syntax highlighting ([@emmenko](https://github.com/emmenko))

## [1.7.6](https://github.com/commercetools/commercetools-docs-kit/compare/v1.7.5...v1.7.6) (2020-02-07)

#### ⛑ Type: Refactoring

- `gatsby-theme-docs`
  - [#277](https://github.com/commercetools/commercetools-docs-kit/pull/277) refactor: use more semantic HTML elements for the search crawler ([@nkuehn](https://github.com/nkuehn))
- `gatsby-theme-api-docs`, `gatsby-transformer-raml`
  - [#272](https://github.com/commercetools/commercetools-docs-kit/pull/272) refactor: enhanced graphql for resources ([@davifantasia](https://github.com/davifantasia))
  - [#271](https://github.com/commercetools/commercetools-docs-kit/pull/271) refactor: expose gatsby-transformer-raml options ([@davifantasia](https://github.com/davifantasia))

#### 🤖 Type: Dependencies

- Other
  - [#270](https://github.com/commercetools/commercetools-docs-kit/pull/270) chore(deps): lock file maintenance ([@renovate[bot]](https://github.com/apps/renovate))
  - [#269](https://github.com/commercetools/commercetools-docs-kit/pull/269) chore(deps): update dependency eslint-plugin-testing-library to v2 ([@renovate[bot]](https://github.com/apps/renovate))
- `gatsby-theme-api-docs`, `gatsby-theme-docs`, `ui-kit`
  - [#268](https://github.com/commercetools/commercetools-docs-kit/pull/268) chore(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))

## [1.7.5](https://github.com/commercetools/commercetools-docs-kit/compare/v1.7.4...v1.7.5) (2020-02-03)

#### 🐛 Type: Bug

- `gatsby-theme-docs`
  - [c7dd89f](https://github.com/commercetools/commercetools-docs-kit/commit/c7dd89f7b27cfbaf1213c328ae3bf1872209faf0) fix(theme): ensure css overwrites default one for top menu position ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `gatsby-theme-docs`
  - [#273](https://github.com/commercetools/commercetools-docs-kit/pull/273) refactor(theme): sync top menu links ([@emmenko](https://github.com/emmenko))

## [1.7.4](https://github.com/commercetools/commercetools-docs-kit/compare/v1.7.3...v1.7.4) (2020-02-02)

#### 🐛 Type: Bug

- `gatsby-theme-docs`
  - [#266](https://github.com/commercetools/commercetools-docs-kit/pull/266) fix(theme): to use correct selector to exclude style elements ([@emmenko](https://github.com/emmenko))
  - [#265](https://github.com/commercetools/commercetools-docs-kit/pull/265) fix(theme): to patch lobotomized owl selector to ignore style children ([@emmenko](https://github.com/emmenko))
  - [#260](https://github.com/commercetools/commercetools-docs-kit/pull/260) fix(theme): sidebar link border color ([@emmenko](https://github.com/emmenko))
- `gatsby-theme-api-docs`, `gatsby-transformer-raml`
  - [#257](https://github.com/commercetools/commercetools-docs-kit/pull/257) fix: import api bugs ([@davifantasia](https://github.com/davifantasia))
- `gatsby-theme-docs`, `ui-kit`
  - [#261](https://github.com/commercetools/commercetools-docs-kit/pull/261) fix(theme): use data-link-type instead of aria role attribute ([@emmenko](https://github.com/emmenko))

## [1.7.3](https://github.com/commercetools/commercetools-docs-kit/compare/v1.7.2...v1.7.3) (2020-01-31)

#### 🔮 Type: Chore

- `gatsby-theme-docs`
  - [#258](https://github.com/commercetools/commercetools-docs-kit/pull/258) chore(theme): enable custom apps link in top menu ([@emmenko](https://github.com/emmenko))

#### 💅 Type: Enhancement

- `gatsby-theme-docs`, `ui-kit`
  - [#253](https://github.com/commercetools/commercetools-docs-kit/pull/253) refactor(theme): to make the link underline style configurable via a prop ([@emmenko](https://github.com/emmenko))

## [1.7.2](https://github.com/commercetools/commercetools-docs-kit/compare/v1.7.1...v1.7.2) (2020-01-29)

#### 🐛 Type: Bug

- `gatsby-theme-docs`, `writing-style`
  - [#247](https://github.com/commercetools/commercetools-docs-kit/pull/247) fix(writing-style): mapping of custom apps casing ([@emmenko](https://github.com/emmenko))

## [1.7.1](https://github.com/commercetools/commercetools-docs-kit/compare/v1.7.0...v1.7.1) (2020-01-29)

#### 🐛 Type: Bug

- `writing-style`
  - [#244](https://github.com/commercetools/commercetools-docs-kit/pull/244) fix(writing-style): make Custom Applications capitalized ([@emmenko](https://github.com/emmenko))
- `gatsby-theme-api-docs`
  - [#245](https://github.com/commercetools/commercetools-docs-kit/pull/245) fix: union type failed to render since it has examples ([@davifantasia](https://github.com/davifantasia))
- `gatsby-theme-docs`, `ui-kit`
  - [#243](https://github.com/commercetools/commercetools-docs-kit/pull/243) fix(theme): disable search input when website has search index disabled ([@emmenko](https://github.com/emmenko))

#### 🔮 Type: Chore

- [#234](https://github.com/commercetools/commercetools-docs-kit/pull/234) chore: ignore .vscode/settings.json, add recommended.code-workspace ([@emmenko](https://github.com/emmenko))

#### ✍️ Type: Documentation

- `gatsby-theme-docs`, `writing-style`
  - [#233](https://github.com/commercetools/commercetools-docs-kit/pull/233) docs: improve wording and document some missing things ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `gatsby-theme-api-docs`
  - [#239](https://github.com/commercetools/commercetools-docs-kit/pull/239) refactor: move components one level up ([@davifantasia](https://github.com/davifantasia))

#### 🤖 Type: Dependencies

- Other
  - [#238](https://github.com/commercetools/commercetools-docs-kit/pull/238) chore(deps): lock file maintenance ([@renovate[bot]](https://github.com/apps/renovate))
  - [#237](https://github.com/commercetools/commercetools-docs-kit/pull/237) chore(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
- `gatsby-theme-api-docs`, `gatsby-theme-docs`
  - [#236](https://github.com/commercetools/commercetools-docs-kit/pull/236) chore(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))

## [1.7.0](https://github.com/commercetools/commercetools-docs-kit/compare/v1.6.0...v1.7.0) (2020-01-24)

#### 🐛 Type: Bug

- `gatsby-theme-docs`
  - [#232](https://github.com/commercetools/commercetools-docs-kit/pull/232) fix(theme): beta style link ([@emmenko](https://github.com/emmenko))
- `gatsby-theme-api-docs`, `gatsby-transformer-raml`
  - [#220](https://github.com/commercetools/commercetools-docs-kit/pull/220) fix: missing `gatsby-transformer-raml` dependency version ([@davifantasia](https://github.com/davifantasia))
  - [#219](https://github.com/commercetools/commercetools-docs-kit/pull/219) fix: path to RAML spec ([@davifantasia](https://github.com/davifantasia))

> NOTE that the `gatsby-theme-api-docs` had some unexpected breaking changes in `v1.5.0` ([#194](https://github.com/commercetools/commercetools-docs-kit/pull/194)), which are now fixed. We recommend to look at the `websites/api-docs-smoke-test` folder to check and compare the new setup.

#### 🚀 Type: New Feature

- `gatsby-theme-api-docs`
  - [#224](https://github.com/commercetools/commercetools-docs-kit/pull/224) Type design implementation ([@davifantasia](https://github.com/davifantasia))
  - [#222](https://github.com/commercetools/commercetools-docs-kit/pull/222) Method design implementation ([@davifantasia](https://github.com/davifantasia))
- `gatsby-theme-docs`
  - [#223](https://github.com/commercetools/commercetools-docs-kit/pull/223) feat(theme): implement top menu for global links ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `gatsby-theme-docs`, `ui-kit`
  - [#231](https://github.com/commercetools/commercetools-docs-kit/pull/231) refactor(theme): footer improvements ([@emmenko](https://github.com/emmenko))
  - [#227](https://github.com/commercetools/commercetools-docs-kit/pull/227) refactor(theme): footer to contain global links as well ([@emmenko](https://github.com/emmenko))
- `ui-kit`
  - [#225](https://github.com/commercetools/commercetools-docs-kit/pull/225) refactor(theme): adjust spacings of some elements to improve visual grouping ([@emmenko](https://github.com/emmenko))
- `gatsby-theme-api-docs`
  - [#228](https://github.com/commercetools/commercetools-docs-kit/pull/228) Resource design implementation ([@davifantasia](https://github.com/davifantasia))

#### 🤖 Type: Dependencies

- `broken-link-checker`, `gatsby-theme-api-docs`, `gatsby-theme-docs`, `gatsby-transformer-mdx-introspection`, `ui-kit`
  - [#215](https://github.com/commercetools/commercetools-docs-kit/pull/215) chore(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))
- Other
  - [#216](https://github.com/commercetools/commercetools-docs-kit/pull/216) chore(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
  - [#217](https://github.com/commercetools/commercetools-docs-kit/pull/217) chore(deps): lock file maintenance ([@renovate[bot]](https://github.com/apps/renovate))

## [1.6.0](https://github.com/commercetools/commercetools-docs-kit/compare/v1.5.0...v1.6.0) (2020-01-17)

#### 🐛 Type: Bug

- `gatsby-theme-docs`
  - [#213](https://github.com/commercetools/commercetools-docs-kit/pull/213) fix(theme): header layout for small screens ([@emmenko](https://github.com/emmenko))

#### 🚀 Type: New Feature

- `ui-kit`
  - [#212](https://github.com/commercetools/commercetools-docs-kit/pull/212) feat(theme): add missing spacing for large sizes ([@emmenko](https://github.com/emmenko))

## [1.5.0](https://github.com/commercetools/commercetools-docs-kit/compare/v1.4.1...v1.5.0) (2020-01-16)

#### ⛑ Type: Refactoring

- `gatsby-theme-docs`, `ui-kit`
  - [#179](https://github.com/commercetools/commercetools-docs-kit/pull/179) refactor(theme): to render search results in an overlay, aligned with the page content ([@emmenko](https://github.com/emmenko))
  - [#207](https://github.com/commercetools/commercetools-docs-kit/pull/207) refactor(theme): extract logo button component into uikit ([@emmenko](https://github.com/emmenko))
- `gatsby-theme-api-docs`
  - [#206](https://github.com/commercetools/commercetools-docs-kit/pull/206) Parameters design implementation ([@davifantasia](https://github.com/davifantasia))
- `gatsby-theme-api-docs`, `gatsby-transformer-raml`
  - [#202](https://github.com/commercetools/commercetools-docs-kit/pull/202) Rendering resources based on RMF codegen ([@davifantasia](https://github.com/davifantasia))
  - [#194](https://github.com/commercetools/commercetools-docs-kit/pull/194) gatsby-transformer-raml based on Rmf codegen ([@davifantasia](https://github.com/davifantasia))

#### 🤖 Type: Dependencies

- Other
  - [#204](https://github.com/commercetools/commercetools-docs-kit/pull/204) chore(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
  - [#205](https://github.com/commercetools/commercetools-docs-kit/pull/205) chore(deps): lock file maintenance ([@renovate[bot]](https://github.com/apps/renovate))
  - [#193](https://github.com/commercetools/commercetools-docs-kit/pull/193) chore(deps): lock file maintenance ([@renovate[bot]](https://github.com/apps/renovate))
  - [#192](https://github.com/commercetools/commercetools-docs-kit/pull/192) chore(deps): update dependency stylelint-order to v4 ([@renovate[bot]](https://github.com/apps/renovate))
  - [#191](https://github.com/commercetools/commercetools-docs-kit/pull/191) chore(deps): update cypress/base docker tag to v12.14.0 ([@renovate[bot]](https://github.com/apps/renovate))
- `gatsby-theme-api-docs`, `gatsby-theme-docs`
  - [#203](https://github.com/commercetools/commercetools-docs-kit/pull/203) chore(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))
- `gatsby-theme-api-docs`, `gatsby-theme-docs`, `ui-kit`
  - [#190](https://github.com/commercetools/commercetools-docs-kit/pull/190) chore(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))

## [1.4.1](https://github.com/commercetools/commercetools-docs-kit/compare/v1.4.0...v1.4.1) (2020-01-02)

Happy New Year! 🎉

#### 🤖 Type: Dependencies

- `gatsby-theme-docs`
  - [#185](https://github.com/commercetools/commercetools-docs-kit/pull/185) chore(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))
- Other
  - [#186](https://github.com/commercetools/commercetools-docs-kit/pull/186) chore(deps): lock file maintenance ([@renovate[bot]](https://github.com/apps/renovate))

## [1.4.0](https://github.com/commercetools/commercetools-docs-kit/compare/v1.3.2...v1.4.0) (2019-12-27)

#### 🐛 Type: Bug

- `gatsby-theme-docs`, `ui-kit`
  - [#176](https://github.com/commercetools/commercetools-docs-kit/pull/176) fix(theme): small layout responsive issues ([@emmenko](https://github.com/emmenko))

#### ⛑ Type: Refactoring

- `gatsby-theme-docs`
  - [#170](https://github.com/commercetools/commercetools-docs-kit/pull/170) refactor(theme): to change layout to a full (content) page scroll ([@emmenko](https://github.com/emmenko))
  - [#173](https://github.com/commercetools/commercetools-docs-kit/pull/173) refactor(theme): to configure svgr plugin for optimized svg files ([@emmenko](https://github.com/emmenko))
  - [#172](https://github.com/commercetools/commercetools-docs-kit/pull/172) refactor(theme): to render navigation overlays into a portal ([@emmenko](https://github.com/emmenko))

#### 🤖 Type: Dependencies

- `gatsby-theme-docs`
  - [#181](https://github.com/commercetools/commercetools-docs-kit/pull/181) chore(deps): update all dependencies (major) ([@renovate[bot]](https://github.com/apps/renovate))
- `broken-link-checker`, `gatsby-theme-api-docs`, `gatsby-theme-docs`, `gatsby-transformer-mdx-introspection`
  - [#180](https://github.com/commercetools/commercetools-docs-kit/pull/180) chore(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))
- Other
  - [#182](https://github.com/commercetools/commercetools-docs-kit/pull/182) chore(deps): lock file maintenance ([@renovate[bot]](https://github.com/apps/renovate))
  - [#166](https://github.com/commercetools/commercetools-docs-kit/pull/166) chore(deps): update dependency stylelint-config-prettier to v8 ([@renovate[bot]](https://github.com/apps/renovate))
  - [#167](https://github.com/commercetools/commercetools-docs-kit/pull/167) chore(deps): lock file maintenance ([@renovate[bot]](https://github.com/apps/renovate))
- `gatsby-theme-api-docs`, `gatsby-theme-docs`, `ui-kit`
  - [#165](https://github.com/commercetools/commercetools-docs-kit/pull/165) chore(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))

## [1.3.2](https://github.com/commercetools/commercetools-docs-kit/compare/v1.3.1...v1.3.2) (2019-12-13)

#### 🐛 Type: Bug

- `ui-kit`
  - [#162](https://github.com/commercetools/commercetools-docs-kit/pull/162) fix(ui-kit): bundle package using rollup ([@emmenko](https://github.com/emmenko))

## [1.3.1](https://github.com/commercetools/commercetools-docs-kit/compare/v1.3.0...v1.3.1) (2019-12-13)

#### 🐛 Type: Bug

- `gatsby-theme-docs`, `ui-kit`
  - [#160](https://github.com/commercetools/commercetools-docs-kit/pull/160) fix(theme): missing exports, add README to uikit ([@emmenko](https://github.com/emmenko))

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
