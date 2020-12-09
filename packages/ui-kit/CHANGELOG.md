# @commercetools-docs/ui-kit

## 12.0.0

### Patch Changes

- [`bc0d76f`](https://github.com/commercetools/commercetools-docs-kit/commit/bc0d76f8a23d1a281afd4674c2c429ab27529275) [#756](https://github.com/commercetools/commercetools-docs-kit/pull/756) Thanks [@TimonRey](https://github.com/TimonRey)! - The RssFeed is now one single table which shows the newest release notes of all feeds

## 11.0.2

### Patch Changes

- [`deac3ac`](https://github.com/commercetools/commercetools-docs-kit/commit/deac3ac8372187a5eb3e96a8561eca190373f2cc) [#759](https://github.com/commercetools/commercetools-docs-kit/pull/759) Thanks [@emmenko](https://github.com/emmenko)! - Compile and bundle packages using [preconstruct](https://preconstruct.tools)

* [`e99bf1a`](https://github.com/commercetools/commercetools-docs-kit/commit/e99bf1a6678960ae6a466d387f13f279f2e973c4) [#758](https://github.com/commercetools/commercetools-docs-kit/pull/758) Thanks [@emmenko](https://github.com/emmenko)! - Generate SVG icon components using `@svgr/cli`, to avoid importing SVG files via Babel/Rollup/Webpack.

## 11.0.1

### Patch Changes

- [`b3a3911`](https://github.com/commercetools/commercetools-docs-kit/commit/b3a39119987baf7d9bd58c464ed198c9710cc8bb) [#764](https://github.com/commercetools/commercetools-docs-kit/pull/764) Thanks [@emmenko](https://github.com/emmenko)! - Fix `dist` bundles path

## 11.0.0

### Minor Changes

- [`b868afb`](https://github.com/commercetools/commercetools-docs-kit/commit/b868afb18542efbae1741ce7f34ac0b6cace2041) [#752](https://github.com/commercetools/commercetools-docs-kit/pull/752) Thanks [@renovate](https://github.com/apps/renovate)! - Migrate to emotion v11. https://emotion.sh/docs/emotion-11

  Additionally, some peer dependencies changed:

  - The `@commercetools-docs/gatsby-theme-api-docs` does not require the peer dependencies `@emotion/core`, and `@emotion/styled`, as they are now included in the package's dependencies.
  - The `@commercetools-docs/gatsby-theme-docs` does not require the peer dependencies `@emotion/core`, and `@emotion/styled`, as they are now included in the package's dependencies.
  - The `@commercetools-docs/ui-kit` does not require the peer dependencies `@commercetools-uikit/design-system`, `@commercetools-uikit/icons`, `@commercetools-uikit/spacings-inline`, `@emotion/core`, and `@emotion/styled`, as they are now included in the package's dependencies.

### Patch Changes

- [`791d3dc`](https://github.com/commercetools/commercetools-docs-kit/commit/791d3dcecbc5ed4984bf4cef7daa5bee92ad0514) [#743](https://github.com/commercetools/commercetools-docs-kit/pull/743) Thanks [@TimonRey](https://github.com/TimonRey)! - The RssFeed is now one single table which shows the newest release notes of all feeds

* [`b6530d9`](https://github.com/commercetools/commercetools-docs-kit/commit/b6530d9471ffe48f447d643b158afe4e72a0888f) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies https://github.com/commercetools/commercetools-docs-kit/pull/751

## 10.0.2

### Patch Changes

- [`24caa5f`](https://github.com/commercetools/commercetools-docs-kit/commit/24caa5ff2121cfe3a980ef5af74675155965ff2e) [#739](https://github.com/commercetools/commercetools-docs-kit/pull/739) Thanks [@renovate](https://github.com/apps/renovate)! - chore: update dependencies

* [`d292d22`](https://github.com/commercetools/commercetools-docs-kit/commit/d292d22275fd6cf9b316073cfcddb98b7ae055d8) [#748](https://github.com/commercetools/commercetools-docs-kit/pull/748) Thanks [@emmenko](https://github.com/emmenko)! - Use babel transform runtime with corejs v3

## 10.0.1

### Patch Changes

- [`b1190b5`](https://github.com/commercetools/commercetools-docs-kit/commit/b1190b593ce63b2eb3ac4d62f36d7717d35525bf) [#745](https://github.com/commercetools/commercetools-docs-kit/pull/745) Thanks [@emmenko](https://github.com/emmenko)! - It appeared that under some unknown circumstances the `props.theme` accessed from within a styled component results in an empty object when building the website in production mode. To fix that, we explicitly pass wherever possible the `theme` object after reading it from the context with `useTheme`.

## 10.0.0

### Minor Changes

- [`c88565b`](https://github.com/commercetools/commercetools-docs-kit/commit/c88565bb932a872b60614f999d711b82faf718ac) [#727](https://github.com/commercetools/commercetools-docs-kit/pull/727) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update react monorepo to v17 (major)

### Patch Changes

- [`a4df2b7`](https://github.com/commercetools/commercetools-docs-kit/commit/a4df2b7e286cdedd8383321273ed1e6fe184bee2) [#729](https://github.com/commercetools/commercetools-docs-kit/pull/729) Thanks [@TimonRey](https://github.com/TimonRey)! - All tables in the body column are now taking the full width

* [`71dfbe4`](https://github.com/commercetools/commercetools-docs-kit/commit/71dfbe4edf48225efeebe350bee0da4684bf60e1) [#724](https://github.com/commercetools/commercetools-docs-kit/pull/724) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 9.0.0

### Patch Changes

- [`af0d313`](https://github.com/commercetools/commercetools-docs-kit/commit/af0d313567d94f32b1b397b48df514893e04c1cb) [#692](https://github.com/commercetools/commercetools-docs-kit/pull/692) Thanks [@davifantasia](https://github.com/davifantasia)! - Endpoint design implementation.

## 8.0.0

### Patch Changes

- [`849af3c`](https://github.com/commercetools/commercetools-docs-kit/commit/849af3cba129641d1799a5081b2ba6a4141cbc7e) [#665](https://github.com/commercetools/commercetools-docs-kit/pull/665) Thanks [@TimonRey](https://github.com/TimonRey)! - Set fixed width for the date column in the RSS Feed widget

* [`12470b9`](https://github.com/commercetools/commercetools-docs-kit/commit/12470b97de700bc0fa4ea47d6ccdbc69a20941c9) [#654](https://github.com/commercetools/commercetools-docs-kit/pull/654) Thanks [@TimonRey](https://github.com/TimonRey)! - Fix spacing in code examples title bar

## 7.0.5

### Patch Changes

- [`288ac41`](https://github.com/commercetools/commercetools-docs-kit/commit/288ac4121e17d69a8dcbb361043686908273f64f) [#624](https://github.com/commercetools/commercetools-docs-kit/pull/624) Thanks [@renovate](https://github.com/apps/renovate)! - chore: update dependencies

## 7.0.4

### Patch Changes

- [`551c9bb`](https://github.com/commercetools/commercetools-docs-kit/commit/551c9bb0436215ca332c91e1a569471c878a3a8f) [#616](https://github.com/commercetools/commercetools-docs-kit/pull/616) Thanks [@emmenko](https://github.com/emmenko)! - Update UI Kit dependencies

## 7.0.3

### Patch Changes

- [`fed7a9b`](https://github.com/commercetools/commercetools-docs-kit/commit/fed7a9b6e375f53750df78b1989ea8c67482516c) [#597](https://github.com/commercetools/commercetools-docs-kit/pull/597) Thanks [@emmenko](https://github.com/emmenko)! - chore: update prism-renderer to 1.1.1

## 7.0.2

### Patch Changes

- [`aa9e848`](https://github.com/commercetools/commercetools-docs-kit/commit/aa9e8485454a2e18024772192c37979756af9167) [#592](https://github.com/commercetools/commercetools-docs-kit/pull/592) Thanks [@renovate](https://github.com/apps/renovate)! - chore: update dependencies

## 7.0.1

### Patch Changes

- [`50ce1d6`](https://github.com/commercetools/commercetools-docs-kit/commit/50ce1d67c560a8b42e47e9894d562077ca0f92b5) [#590](https://github.com/commercetools/commercetools-docs-kit/pull/590) Thanks [@nkuehn](https://github.com/nkuehn)! - Don't wrap the date in RSS feed component

## 7.0.0

### Minor Changes

- [`8b44418`](https://github.com/commercetools/commercetools-docs-kit/commit/8b444189da90b5def5c71cc975818b730baaeca7) [#574](https://github.com/commercetools/commercetools-docs-kit/pull/574) Thanks [@nkuehn](https://github.com/nkuehn)! - Optimize JSON syntax highlighting, tone down one color

### Patch Changes

- [`ff1246e`](https://github.com/commercetools/commercetools-docs-kit/commit/ff1246e5e204181c21b6767239fa3cb788a4c0ee) [#578](https://github.com/commercetools/commercetools-docs-kit/pull/578) Thanks [@nkuehn](https://github.com/nkuehn)! - Tighter spacing between some content blocks (headings, lists, code blocks)

## 6.0.0

### Patch Changes

- [`411d6e6`](https://github.com/commercetools/commercetools-docs-kit/commit/411d6e62eff4a6a3804b040c17a39116333b435b) [#529](https://github.com/commercetools/commercetools-docs-kit/pull/529) Thanks [@nkuehn](https://github.com/nkuehn)! - Optional two-column content layout with side-by-side components

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

* [`2703f63`](https://github.com/commercetools/commercetools-docs-kit/commit/2703f63ec320ea6c79bdc5608bcd240d59d7c2b3) [#522](https://github.com/commercetools/commercetools-docs-kit/pull/522) Thanks [@davifantasia](https://github.com/davifantasia)! - Add custom title capability to rss feeds

- [`76db6f7`](https://github.com/commercetools/commercetools-docs-kit/commit/76db6f7d3dc67c06895259a0e01fd1d7a70f8fac) [#521](https://github.com/commercetools/commercetools-docs-kit/pull/521) Thanks [@nkuehn](https://github.com/nkuehn)! - Define list styling when enclosed in containers

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
