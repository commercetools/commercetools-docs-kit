# @commercetools-docs/gatsby-theme-docs

## 19.8.1

### Patch Changes

- [#1431](https://github.com/commercetools/commercetools-docs-kit/pull/1431) [`ffc1e943`](https://github.com/commercetools/commercetools-docs-kit/commit/ffc1e94363188f1e9954a239cb8b9a270eca6ab6) Thanks [@timonrey](https://github.com/timonrey)! - Fix a layout bug in the top-right corner on release note pages. The top-right corner on release note pages can now not be overwritten.

## 19.8.0

### Minor Changes

- [#1400](https://github.com/commercetools/commercetools-docs-kit/pull/1400) [`0b529c91`](https://github.com/commercetools/commercetools-docs-kit/commit/0b529c914503c131ab02fbf82923b69e1dd2bcd2) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - Add Video component

### Patch Changes

- [#1414](https://github.com/commercetools/commercetools-docs-kit/pull/1414) [`d92768a0`](https://github.com/commercetools/commercetools-docs-kit/commit/d92768a05e19aeee496126999e24b42f274ad719) Thanks [@timonrey](https://github.com/timonrey)! - Provide the possibility to override the whole page-header-side area in the top-right corner.

## 19.7.0

### Minor Changes

- [#1395](https://github.com/commercetools/commercetools-docs-kit/pull/1395) [`b20ca8b5`](https://github.com/commercetools/commercetools-docs-kit/commit/b20ca8b5594277977438f3d3715d352bd9465fa2) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - Add additional information to the site title in the topbar indicating if the website relates to Composable Commerce or Composable Frontend

- [#1407](https://github.com/commercetools/commercetools-docs-kit/pull/1407) [`5a4b378d`](https://github.com/commercetools/commercetools-docs-kit/commit/5a4b378d79f70fb3dfd1dca425dee13aac8544fe) Thanks [@timonrey](https://github.com/timonrey)! - Add support for email links. They are now being rendered as external links.

### Patch Changes

- [#1388](https://github.com/commercetools/commercetools-docs-kit/pull/1388) [`e873a23a`](https://github.com/commercetools/commercetools-docs-kit/commit/e873a23a6ea9647bb09d9e43d9c535880d616d48) Thanks [@emmenko](https://github.com/emmenko)! - Keep using `react-intl` version 5

- Updated dependencies [[`e873a23a`](https://github.com/commercetools/commercetools-docs-kit/commit/e873a23a6ea9647bb09d9e43d9c535880d616d48)]:
  - @commercetools-docs/ui-kit@19.7.0

## 19.6.1

### Patch Changes

- Updated dependencies [[`a4adfb57`](https://github.com/commercetools/commercetools-docs-kit/commit/a4adfb5757e426bc652869d4c81e808962015b71)]:
  - @commercetools-docs/ui-kit@19.6.1

## 19.6.0

### Minor Changes

- [#1376](https://github.com/commercetools/commercetools-docs-kit/pull/1376) [`c5998ed7`](https://github.com/commercetools/commercetools-docs-kit/commit/c5998ed73228437b955e1e131897872510a9ff0c) Thanks [@nkuehn](https://github.com/nkuehn)! - - Enable multi language code blocks directly from markdown syntax using the `<MultiCodeBlock>` wrapper component
  - Provide a nonfunctional `<Glossary>term</Glossary>` component for retaining existing glossary tagging in content until the feature is available in the docs-kit.
  - Rework code blocks and code examples documentation
  - Fixed styling of Cards outside Cards Wrapper (used for blocking content with a border)

### Patch Changes

- [#1377](https://github.com/commercetools/commercetools-docs-kit/pull/1377) [`de6a79cb`](https://github.com/commercetools/commercetools-docs-kit/commit/de6a79cb7848165dc0eb70a86173df7360b11aa8) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies

- [#1372](https://github.com/commercetools/commercetools-docs-kit/pull/1372) [`3a86de1f`](https://github.com/commercetools/commercetools-docs-kit/commit/3a86de1ffd92ccc2d8a017fbe7dd2fd5393abe69) Thanks [@emmenko](https://github.com/emmenko)! - Migrate to new UIKit design tokens

- Updated dependencies [[`c5998ed7`](https://github.com/commercetools/commercetools-docs-kit/commit/c5998ed73228437b955e1e131897872510a9ff0c), [`de6a79cb`](https://github.com/commercetools/commercetools-docs-kit/commit/de6a79cb7848165dc0eb70a86173df7360b11aa8), [`3a86de1f`](https://github.com/commercetools/commercetools-docs-kit/commit/3a86de1ffd92ccc2d8a017fbe7dd2fd5393abe69)]:
  - @commercetools-docs/ui-kit@19.6.0

## 19.4.0

### Minor Changes

- [#1334](https://github.com/commercetools/commercetools-docs-kit/pull/1334) [`917c5eb4`](https://github.com/commercetools/commercetools-docs-kit/commit/917c5eb48422e6f3d26f491418c6fb330cf09329) Thanks [@timonrey](https://github.com/timonrey)! - Adds support for component shadowing for the avatar component. Now it can be overritten and displayed in the top bar next to the top menu button.

## 19.3.0

### Minor Changes

- [#1314](https://github.com/commercetools/commercetools-docs-kit/pull/1314) [`db91f3a4`](https://github.com/commercetools/commercetools-docs-kit/commit/db91f3a4e8d8c79bda250f1d81ce0f80d33e6adc) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - The change is about the functionality of the "ribbon" icon displayed along with each section header.

  When hoverying over the icon a "Copy to clipboard" tooltip appears and, once clicked, the href pointing to that specific section is copied to the clipboard.

### Patch Changes

- [#1308](https://github.com/commercetools/commercetools-docs-kit/pull/1308) [`a0c67021`](https://github.com/commercetools/commercetools-docs-kit/commit/a0c670214a231869fe999a8684c0a6c6c4508863) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependency react-intl to v6

- Updated dependencies [[`db91f3a4`](https://github.com/commercetools/commercetools-docs-kit/commit/db91f3a4e8d8c79bda250f1d81ce0f80d33e6adc), [`a0c67021`](https://github.com/commercetools/commercetools-docs-kit/commit/a0c670214a231869fe999a8684c0a6c6c4508863)]:
  - @commercetools-docs/ui-kit@19.3.0

## 19.1.0

### Patch Changes

- [#1288](https://github.com/commercetools/commercetools-docs-kit/pull/1288) [`40184fc4`](https://github.com/commercetools/commercetools-docs-kit/commit/40184fc48cdfe44de1df2c568e025a8ae55d1f85) Thanks [@renovate](https://github.com/apps/renovate)! - Update all ui-kit packages to v15

* [#1301](https://github.com/commercetools/commercetools-docs-kit/pull/1301) [`7700ed78`](https://github.com/commercetools/commercetools-docs-kit/commit/7700ed783416d1ba262d5cd633fca8a6b2ad53e4) Thanks [@nkuehn](https://github.com/nkuehn)! - More robust MDX syntax error handling. Still requires restart but the humane error page is back.

* Updated dependencies [[`40184fc4`](https://github.com/commercetools/commercetools-docs-kit/commit/40184fc48cdfe44de1df2c568e025a8ae55d1f85)]:
  - @commercetools-docs/ui-kit@19.1.0

## 19.0.1

### Patch Changes

- [#1298](https://github.com/commercetools/commercetools-docs-kit/pull/1298) [`c583b93b`](https://github.com/commercetools/commercetools-docs-kit/commit/c583b93be8608cefd98357b1df836d6c3241e75a) Thanks [@timonrey](https://github.com/timonrey)! - Sets the default of the siteMetadata option `excludeFromSearchIndex` to false.

## 19.0.0

### Major Changes

- [#1297](https://github.com/commercetools/commercetools-docs-kit/pull/1297) [`d4aeae78`](https://github.com/commercetools/commercetools-docs-kit/commit/d4aeae789b9205d0770878a3592ccc8c864eebc2) Thanks [@timonrey](https://github.com/timonrey)! - Breaking Change: The plugin options `excludeFromSearchIndex` and `beta` have now moved to the site metadata and the plugin option `allowWideContentLayout` has been removed completely. The frontmatter `wideLayout` sets the wide layout now independently. This fixes a problem with differently configured pages leaking between preview builds and production builds due to gatsby's data node caching.

* [#1285](https://github.com/commercetools/commercetools-docs-kit/pull/1285) [`643bb03f`](https://github.com/commercetools/commercetools-docs-kit/commit/643bb03f8c2cf804cc87b62845c7e8ed2b8550b3) Thanks [@timonrey](https://github.com/timonrey)! - BREAKING CHANGE: Moves the globalNotification configuration to the siteMetadata.
  If the global notification banner is used, the configuration needs to move out from the plugin configurations to the site metadata in the gatsby config file. It also implements `active` as a new configuration option which has to be set.

### Minor Changes

- [#1296](https://github.com/commercetools/commercetools-docs-kit/pull/1296) [`f4056b97`](https://github.com/commercetools/commercetools-docs-kit/commit/f4056b97c73e846644e9572a749183dd3410ade2) Thanks [@timonrey](https://github.com/timonrey)! - Improves Cards with external links. The external link icon will now be rendered only for text links and not for the card itself.

### Patch Changes

- [#1292](https://github.com/commercetools/commercetools-docs-kit/pull/1292) [`0e3955c2`](https://github.com/commercetools/commercetools-docs-kit/commit/0e3955c277ea010d9fd6c6903a7bfd8db029952f) Thanks [@timonrey](https://github.com/timonrey)! - The global notifications no longer use the Gatsby link component. This results in correct rendering of links within the global notification banner.

* [#1293](https://github.com/commercetools/commercetools-docs-kit/pull/1293) [`8ff60721`](https://github.com/commercetools/commercetools-docs-kit/commit/8ff60721e180b806b6ccbd80ea302dd37a01992b) Thanks [@timonrey](https://github.com/timonrey)! - Update all gatsby dependencies.

* Updated dependencies [[`5b54ea00`](https://github.com/commercetools/commercetools-docs-kit/commit/5b54ea00aa618be2248a0640a683d493fdf8add0), [`8ff60721`](https://github.com/commercetools/commercetools-docs-kit/commit/8ff60721e180b806b6ccbd80ea302dd37a01992b)]:
  - @commercetools-docs/ui-kit@19.0.0

## 18.6.0

### Minor Changes

- [#1269](https://github.com/commercetools/commercetools-docs-kit/pull/1269) [`302e94af`](https://github.com/commercetools/commercetools-docs-kit/commit/302e94af4c01d78ac782f3acf363604c679ce8b6) Thanks [@timonrey](https://github.com/timonrey)! - Provides new icons and banners for the websites.

* [#1253](https://github.com/commercetools/commercetools-docs-kit/pull/1253) [`a362fa4e`](https://github.com/commercetools/commercetools-docs-kit/commit/a362fa4e614aecc7037845f6b4b52de6fd5b7813) Thanks [@nkuehn](https://github.com/nkuehn)! - Adds support for mermaid diagrams in MDX content.

### Patch Changes

- [#1275](https://github.com/commercetools/commercetools-docs-kit/pull/1275) [`6ad663b7`](https://github.com/commercetools/commercetools-docs-kit/commit/6ad663b76bbc4d2414ebd52eb12fea5ef28efd70) Thanks [@timonrey](https://github.com/timonrey)! - Implements new headline color for the page hero title.

* [#1276](https://github.com/commercetools/commercetools-docs-kit/pull/1276) [`a4cd66c1`](https://github.com/commercetools/commercetools-docs-kit/commit/a4cd66c10a346aacb03cc1e019d2aba009168c14) Thanks [@emmenko](https://github.com/emmenko)! - Generate SVGR components using unique IDs (prefix)

* Updated dependencies [[`6ad663b7`](https://github.com/commercetools/commercetools-docs-kit/commit/6ad663b76bbc4d2414ebd52eb12fea5ef28efd70), [`302e94af`](https://github.com/commercetools/commercetools-docs-kit/commit/302e94af4c01d78ac782f3acf363604c679ce8b6), [`a362fa4e`](https://github.com/commercetools/commercetools-docs-kit/commit/a362fa4e614aecc7037845f6b4b52de6fd5b7813), [`a4cd66c1`](https://github.com/commercetools/commercetools-docs-kit/commit/a4cd66c10a346aacb03cc1e019d2aba009168c14)]:
  - @commercetools-docs/ui-kit@18.6.0

## 18.5.0

### Minor Changes

- [#1258](https://github.com/commercetools/commercetools-docs-kit/pull/1258) [`4f0c3984`](https://github.com/commercetools/commercetools-docs-kit/commit/4f0c3984d173fe4d77cced2c835825ffcad59487) Thanks [@renovate](https://github.com/apps/renovate)! - Update uikit dependencies

### Patch Changes

- [#1248](https://github.com/commercetools/commercetools-docs-kit/pull/1248) [`bfd1a7d3`](https://github.com/commercetools/commercetools-docs-kit/commit/bfd1a7d3375c7cf11839441dda10da243d2b2890) Thanks [@timonrey](https://github.com/timonrey)! - Release note filter headings are now consistently lowercase

- Updated dependencies [[`4f0c3984`](https://github.com/commercetools/commercetools-docs-kit/commit/4f0c3984d173fe4d77cced2c835825ffcad59487)]:
  - @commercetools-docs/ui-kit@18.5.0

## 18.4.0

### Minor Changes

- [#1238](https://github.com/commercetools/commercetools-docs-kit/pull/1238) [`ceea3620`](https://github.com/commercetools/commercetools-docs-kit/commit/ceea3620bd5c87a0dbc7079d45452242d9005af7) Thanks [@timonrey](https://github.com/timonrey)! - Implements two new frontmatters called `showTimeToRead` and `timeToRead` for showing and setting the estimated reading time for pages.

### Patch Changes

- [#1234](https://github.com/commercetools/commercetools-docs-kit/pull/1234) [`666d2b8b`](https://github.com/commercetools/commercetools-docs-kit/commit/666d2b8bd5cee0e739248e47f6723616ce147431) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

* [#1243](https://github.com/commercetools/commercetools-docs-kit/pull/1243) [`7c12b041`](https://github.com/commercetools/commercetools-docs-kit/commit/7c12b0415c33655059bc8229f8e40c14c8f43f8f) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

* Updated dependencies [[`666d2b8b`](https://github.com/commercetools/commercetools-docs-kit/commit/666d2b8bd5cee0e739248e47f6723616ce147431), [`7c12b041`](https://github.com/commercetools/commercetools-docs-kit/commit/7c12b0415c33655059bc8229f8e40c14c8f43f8f)]:
  - @commercetools-docs/ui-kit@18.4.0

## 18.3.0

### Minor Changes

- [#1228](https://github.com/commercetools/commercetools-docs-kit/pull/1228) [`26c3a2fc`](https://github.com/commercetools/commercetools-docs-kit/commit/26c3a2fc4648b96328783efcecda0e606d449a18) Thanks [@timonrey](https://github.com/timonrey)! - Subsections are now supported by the child section navigator

### Patch Changes

- [#1221](https://github.com/commercetools/commercetools-docs-kit/pull/1221) [`b7626e50`](https://github.com/commercetools/commercetools-docs-kit/commit/b7626e50deb9679c1a164a944000b72a41ff1977) Thanks [@nkuehn](https://github.com/nkuehn)! - Handle MDX crashes (usually syntax errors).
  At least a little - users still need to restart the dev server.

* [#1213](https://github.com/commercetools/commercetools-docs-kit/pull/1213) [`419db6d5`](https://github.com/commercetools/commercetools-docs-kit/commit/419db6d5021c4742c3f5dd0259e15b41eee93440) Thanks [@timonrey](https://github.com/timonrey)! - Scrolling through the release note topics is fixed.

* Updated dependencies [[`2e69493b`](https://github.com/commercetools/commercetools-docs-kit/commit/2e69493bc8091d07266ba3ae3d261973b9058699)]:
  - @commercetools-docs/ui-kit@18.3.0

## 18.2.3

### Patch Changes

- [#1211](https://github.com/commercetools/commercetools-docs-kit/pull/1211) [`0f0d5075`](https://github.com/commercetools/commercetools-docs-kit/commit/0f0d50759c205511cdfb86efb9745a64b4d1f25d) Thanks [@emmenko](https://github.com/emmenko)! - Keep flexible height for global notification for small viewports (as component is not sticky).

## 18.2.2

### Patch Changes

- [#1209](https://github.com/commercetools/commercetools-docs-kit/pull/1209) [`3610dc6f`](https://github.com/commercetools/commercetools-docs-kit/commit/3610dc6f692d281f1a1ad37653aed2134b40175e) Thanks [@emmenko](https://github.com/emmenko)! - Improve layout of global notification, especially the relation with scroll top anchor positions to not overlap with notification.

- Updated dependencies [[`3610dc6f`](https://github.com/commercetools/commercetools-docs-kit/commit/3610dc6f692d281f1a1ad37653aed2134b40175e)]:
  - @commercetools-docs/ui-kit@18.2.2

## 18.2.1

### Patch Changes

- [#1206](https://github.com/commercetools/commercetools-docs-kit/pull/1206) [`1a5b9aae`](https://github.com/commercetools/commercetools-docs-kit/commit/1a5b9aae72652d0faef1ecb99f1642bc9ce9a4fa) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies range versions

* [#1207](https://github.com/commercetools/commercetools-docs-kit/pull/1207) [`52420756`](https://github.com/commercetools/commercetools-docs-kit/commit/5242075631a584c7af67444035d8f41ac2d878de) Thanks [@emmenko](https://github.com/emmenko)! - Missing `globalNotification` query field for homepage

* Updated dependencies [[`1a5b9aae`](https://github.com/commercetools/commercetools-docs-kit/commit/1a5b9aae72652d0faef1ecb99f1642bc9ce9a4fa)]:
  - @commercetools-docs/ui-kit@18.2.1

## 18.2.0

### Minor Changes

- [#1202](https://github.com/commercetools/commercetools-docs-kit/pull/1202) [`41393fc0`](https://github.com/commercetools/commercetools-docs-kit/commit/41393fc01d6b1b8862185427ba02c89ae0f0ac6e) Thanks [@emmenko](https://github.com/emmenko)! - Allow to render a global notification to all pages of the website. Configure it via the `globalNotification` option of the Gatsby theme.

### Patch Changes

- [#1203](https://github.com/commercetools/commercetools-docs-kit/pull/1203) [`554d26d7`](https://github.com/commercetools/commercetools-docs-kit/commit/554d26d7784d520e6377fc1cd7137dfc729a2a66) Thanks [@emmenko](https://github.com/emmenko)! - Point READMEs to new documentation website.

* [#1198](https://github.com/commercetools/commercetools-docs-kit/pull/1198) [`fdc249d5`](https://github.com/commercetools/commercetools-docs-kit/commit/fdc249d5df2198dacea00bf26573bdbf684519f3) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* Updated dependencies [[`554d26d7`](https://github.com/commercetools/commercetools-docs-kit/commit/554d26d7784d520e6377fc1cd7137dfc729a2a66)]:
  - @commercetools-docs/ui-kit@18.2.0

## 18.1.0

### Patch Changes

- [#1182](https://github.com/commercetools/commercetools-docs-kit/pull/1182) [`a540653f`](https://github.com/commercetools/commercetools-docs-kit/commit/a540653f85e3b396a1b5a937997bd54aaa8fb772) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

* [#1178](https://github.com/commercetools/commercetools-docs-kit/pull/1178) [`c3e43bb4`](https://github.com/commercetools/commercetools-docs-kit/commit/c3e43bb46941ebc4805e0a70f5043a34346b7053) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

* Updated dependencies [[`a540653f`](https://github.com/commercetools/commercetools-docs-kit/commit/a540653f85e3b396a1b5a937997bd54aaa8fb772)]:
  - @commercetools-docs/ui-kit@18.1.0

## 18.0.1

### Patch Changes

- [#1165](https://github.com/commercetools/commercetools-docs-kit/pull/1165) [`45f78836`](https://github.com/commercetools/commercetools-docs-kit/commit/45f788361de5ba8cf2d67794ecc1b726ff5e56aa) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all svgr packages to v6 (major)

* [#1160](https://github.com/commercetools/commercetools-docs-kit/pull/1160) [`fb3acae6`](https://github.com/commercetools/commercetools-docs-kit/commit/fb3acae66a72ebc8d1fc5cbff83dbe498d96540f) Thanks [@nkuehn](https://github.com/nkuehn)! - Update and Improve Algolia Docsearch Setup

* Updated dependencies [[`45f78836`](https://github.com/commercetools/commercetools-docs-kit/commit/45f788361de5ba8cf2d67794ecc1b726ff5e56aa)]:
  - @commercetools-docs/ui-kit@18.0.1

## 18.0.0

### Major Changes

- [#1139](https://github.com/commercetools/commercetools-docs-kit/pull/1139) [`001e85a`](https://github.com/commercetools/commercetools-docs-kit/commit/001e85aa36d6d6d5bc0ecc0cac822ccd6d1ea38b) Thanks [@renovate](https://github.com/apps/renovate)! - Migrate to Gatsby v4 (see [official release notes](https://v4.gatsbyjs.com/docs/reference/release-notes/migrating-from-v3-to-v4) for more info).

  Running Gatsby now requires a minimal Node.js version of `4.15.0`.

### Patch Changes

- [#1136](https://github.com/commercetools/commercetools-docs-kit/pull/1136) [`ae4051a`](https://github.com/commercetools/commercetools-docs-kit/commit/ae4051a8edccae26a4d907903c743fc496cf4eba) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency stylelint to v14

* [#1145](https://github.com/commercetools/commercetools-docs-kit/pull/1145) [`424806a`](https://github.com/commercetools/commercetools-docs-kit/commit/424806a8fedeacc33b2fa9ce68a353049ef0c42a) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- [#1116](https://github.com/commercetools/commercetools-docs-kit/pull/1116) [`b25c4e1`](https://github.com/commercetools/commercetools-docs-kit/commit/b25c4e16dd4cfea81c517cacda19a1b9cbbcf6e6) Thanks [@renovate](https://github.com/apps/renovate)! - update dependencies

* [#1152](https://github.com/commercetools/commercetools-docs-kit/pull/1152) [`795b5cc`](https://github.com/commercetools/commercetools-docs-kit/commit/795b5ccd3141220031c4aa3dca2f42b7b2e9d572) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade to Yarn v3

* Updated dependencies [[`ae4051a`](https://github.com/commercetools/commercetools-docs-kit/commit/ae4051a8edccae26a4d907903c743fc496cf4eba), [`b25c4e1`](https://github.com/commercetools/commercetools-docs-kit/commit/b25c4e16dd4cfea81c517cacda19a1b9cbbcf6e6), [`795b5cc`](https://github.com/commercetools/commercetools-docs-kit/commit/795b5ccd3141220031c4aa3dca2f42b7b2e9d572), [`795b5cc`](https://github.com/commercetools/commercetools-docs-kit/commit/795b5ccd3141220031c4aa3dca2f42b7b2e9d572)]:
  - @commercetools-docs/ui-kit@18.0.0

## 17.0.9

### Patch Changes

- [#1120](https://github.com/commercetools/commercetools-docs-kit/pull/1120) [`5b929e0`](https://github.com/commercetools/commercetools-docs-kit/commit/5b929e00be55a1144074bf500f41fec97c88d3f3) Thanks [@timonrey](https://github.com/timonrey)! - Use new link for product newsletter page

## 17.0.8

### Patch Changes

- [#1082](https://github.com/commercetools/commercetools-docs-kit/pull/1082) [`42a7393`](https://github.com/commercetools/commercetools-docs-kit/commit/42a7393ed3b3dad44a36196c5ba7d03bcaee7629) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies.

* [#1106](https://github.com/commercetools/commercetools-docs-kit/pull/1106) [`95aa497`](https://github.com/commercetools/commercetools-docs-kit/commit/95aa497eb3ec192af81fef3ea1215b60b1ebbe51) Thanks [@davifantasia](https://github.com/davifantasia)! - fix(deps): replace remark-react with rehype-react

* Updated dependencies [[`42a7393`](https://github.com/commercetools/commercetools-docs-kit/commit/42a7393ed3b3dad44a36196c5ba7d03bcaee7629)]:
  - @commercetools-docs/ui-kit@17.0.8

## 17.0.7

### Patch Changes

- [#1076](https://github.com/commercetools/commercetools-docs-kit/pull/1076) [`c247638`](https://github.com/commercetools/commercetools-docs-kit/commit/c247638a770b6e4780692757761c2d192bde7f47) Thanks [@timonrey](https://github.com/timonrey)! - Firefox fix: Avoid very long type names from wrapping over to the next column in the child section navigator.

## 17.0.6

### Patch Changes

- [#1077](https://github.com/commercetools/commercetools-docs-kit/pull/1077) [`1ca025e`](https://github.com/commercetools/commercetools-docs-kit/commit/1ca025e61928033fc8716268afa76d3e4167cc38) Thanks [@timonrey](https://github.com/timonrey)! - Add assert dependency.

## 17.0.5

### Patch Changes

- [#1068](https://github.com/commercetools/commercetools-docs-kit/pull/1068) [`5010b56`](https://github.com/commercetools/commercetools-docs-kit/commit/5010b56faaa213b713d6d95f1774b29efc65d22c) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [#1067](https://github.com/commercetools/commercetools-docs-kit/pull/1067) [`0de0856`](https://github.com/commercetools/commercetools-docs-kit/commit/0de085609ebbd455291930300a156fb0f490182f) Thanks [@davifantasia](https://github.com/davifantasia)! - chore: update unified to v10

- [#1056](https://github.com/commercetools/commercetools-docs-kit/pull/1056) [`80bed81`](https://github.com/commercetools/commercetools-docs-kit/commit/80bed81184c7d20b07e5c848adbef4735f777d41) Thanks [@emmenko](https://github.com/emmenko)! - Clean up SVG markup (remove unnecessary metadata, ids, etc.)

* [#1072](https://github.com/commercetools/commercetools-docs-kit/pull/1072) [`2dce059`](https://github.com/commercetools/commercetools-docs-kit/commit/2dce05940eb2d0b5153afb2eb663434659b59d2c) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency unist-util-filter to v4

- [#1074](https://github.com/commercetools/commercetools-docs-kit/pull/1074) [`e8dfa87`](https://github.com/commercetools/commercetools-docs-kit/commit/e8dfa87ec45596cb21aaa3217bfc73ca2c7a39c5) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [#1071](https://github.com/commercetools/commercetools-docs-kit/pull/1071) [`f6a8247`](https://github.com/commercetools/commercetools-docs-kit/commit/f6a8247ab74c20d8c2ce45520157c135bec0ea8d) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency remark-parse to v10

- [#1057](https://github.com/commercetools/commercetools-docs-kit/pull/1057) [`f115d98`](https://github.com/commercetools/commercetools-docs-kit/commit/f115d98af1e98aff06765b404848c7cbcf7f6350) Thanks [@emmenko](https://github.com/emmenko)! - Fixes issue with `tabIndex` for keyboard navigation. Now when the page loads, the user can user the keyboard to navigate up/down.

* [#1064](https://github.com/commercetools/commercetools-docs-kit/pull/1064) [`b5b19a6`](https://github.com/commercetools/commercetools-docs-kit/commit/b5b19a6d130e956c36344b27d612aa2b205df978) Thanks [@timonrey](https://github.com/timonrey)! - Use another element to select the site-title for algolia search. This should fix the issue with having wrong content in the search results.

* Updated dependencies [[`5010b56`](https://github.com/commercetools/commercetools-docs-kit/commit/5010b56faaa213b713d6d95f1774b29efc65d22c), [`80bed81`](https://github.com/commercetools/commercetools-docs-kit/commit/80bed81184c7d20b07e5c848adbef4735f777d41)]:
  - @commercetools-docs/ui-kit@17.0.5

## 17.0.3

### Patch Changes

- [#1007](https://github.com/commercetools/commercetools-docs-kit/pull/1007) [`aa4b6da`](https://github.com/commercetools/commercetools-docs-kit/commit/aa4b6da6433acc32b37a9ceae9b5e38a460d867b) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency prismjs to v1.24.0 [security]

* [#1035](https://github.com/commercetools/commercetools-docs-kit/pull/1035) [`27e1f49`](https://github.com/commercetools/commercetools-docs-kit/commit/27e1f4995983aa947d03d913c585e6eaae86ce40) Thanks [@davifantasia](https://github.com/davifantasia)! - fix: duplicate searchInput id

## 17.0.2

### Patch Changes

- [#1030](https://github.com/commercetools/commercetools-docs-kit/pull/1030) [`f8d04a9`](https://github.com/commercetools/commercetools-docs-kit/commit/f8d04a930f5d3c029dfb3fed0b7b1582ee64ba89) Thanks [@emmenko](https://github.com/emmenko)! - Update uikit packages to `12.2.1`

- Updated dependencies [[`f8d04a9`](https://github.com/commercetools/commercetools-docs-kit/commit/f8d04a930f5d3c029dfb3fed0b7b1582ee64ba89)]:
  - @commercetools-docs/ui-kit@17.0.2

## 17.0.1

### Patch Changes

- [#1027](https://github.com/commercetools/commercetools-docs-kit/pull/1027) [`6fa3bbc`](https://github.com/commercetools/commercetools-docs-kit/commit/6fa3bbc41dfdca9644ab9cff9b71d952f430afcc) Thanks [@nkuehn](https://github.com/nkuehn)! - - upgrade rmf-codegen to 0.18
  - bug fix

## 17.0.0

### Major Changes

- [#997](https://github.com/commercetools/commercetools-docs-kit/pull/997) [`18f44a9`](https://github.com/commercetools/commercetools-docs-kit/commit/18f44a9cb27c4e0a782cb910cdeabff136cdfab2) Thanks [@nkuehn](https://github.com/nkuehn)! - Refactored the provisioning of theme extensions' components into MDX to support components that have to be imported explicitly in MDX. Auto-provided components now have to be exported via `./shortcodes` by theme add-ons.

  The API documentation is not automatically injecting its components into MDX any more to allow sites with large APIs to optimize the site performance (time to interactive).

  To migrate, all MDX pages have to explicitly import the `ApiType` and `ApiEndpoint` components. It's recommended that sites create an intermediate `/shortcodes.js` file so that the MDX import lines only read

  ```
  import { ApiType, ApiEndpoint } from "./shortcodes"
  ```

### Patch Changes

- [#1018](https://github.com/commercetools/commercetools-docs-kit/pull/1018) [`853f891`](https://github.com/commercetools/commercetools-docs-kit/commit/853f8915072f8153fd1efa266b06b66f0360717a) Thanks [@nkuehn](https://github.com/nkuehn)! - Resolve URN style links in RAML descriptions

## 16.3.1

### Patch Changes

- [#978](https://github.com/commercetools/commercetools-docs-kit/pull/978) [`78bc6b0`](https://github.com/commercetools/commercetools-docs-kit/commit/78bc6b0a4c0c678fb941121b2e410bbf329065b0) Thanks [@renovate](https://github.com/apps/renovate)! - update all dependencies

* [#988](https://github.com/commercetools/commercetools-docs-kit/pull/988) [`49d2059`](https://github.com/commercetools/commercetools-docs-kit/commit/49d20592a9808efb942649840dc62fde68c22c5a) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* Updated dependencies [[`49d2059`](https://github.com/commercetools/commercetools-docs-kit/commit/49d20592a9808efb942649840dc62fde68c22c5a)]:
  - @commercetools-docs/ui-kit@16.3.1

## 16.3.0

### Patch Changes

- [#975](https://github.com/commercetools/commercetools-docs-kit/pull/975) [`fe6c1ec`](https://github.com/commercetools/commercetools-docs-kit/commit/fe6c1ecbf75dccc046371d55d6f7041dbd08fc72) Thanks [@timonrey](https://github.com/timonrey)! - Disable search input field when page is still loading

* [#951](https://github.com/commercetools/commercetools-docs-kit/pull/951) [`fcd26ee`](https://github.com/commercetools/commercetools-docs-kit/commit/fcd26ee5d61ab1559339ce86d9c20194fdd94d9f) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- [#946](https://github.com/commercetools/commercetools-docs-kit/pull/946) [`e15757c`](https://github.com/commercetools/commercetools-docs-kit/commit/e15757c2b9ac19399ac8dd086385121cbc2e45ef) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency unist-util-filter to v3

* [#960](https://github.com/commercetools/commercetools-docs-kit/pull/960) [`0cdb397`](https://github.com/commercetools/commercetools-docs-kit/commit/0cdb397f4cc96b5178b69fb106e8a3d3c7dc7001) Thanks [@timonrey](https://github.com/timonrey)! - Use same animation transition for all animations

- [#962](https://github.com/commercetools/commercetools-docs-kit/pull/962) [`5601240`](https://github.com/commercetools/commercetools-docs-kit/commit/560124031bde209cf8a78141300c6e6e2284e891) Thanks [@timonrey](https://github.com/timonrey)! - Animate search dialog window

* [#942](https://github.com/commercetools/commercetools-docs-kit/pull/942) [`01346bf`](https://github.com/commercetools/commercetools-docs-kit/commit/01346bf4cbbbf31d5ef5f16b407bdb5390463b47) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update gatsby monorepo (major)

- [#972](https://github.com/commercetools/commercetools-docs-kit/pull/972) [`dac6330`](https://github.com/commercetools/commercetools-docs-kit/commit/dac63303c353994afcb66728309cfb254ea66da8) Thanks [@renovate](https://github.com/apps/renovate)! - update all dependencies

* [#968](https://github.com/commercetools/commercetools-docs-kit/pull/968) [`9c4290f`](https://github.com/commercetools/commercetools-docs-kit/commit/9c4290ff0f0c968c7fc708dc674202fdad38eea9) Thanks [@timonrey](https://github.com/timonrey)! - Give unique IDs to search-inputs

* Updated dependencies [[`fcd26ee`](https://github.com/commercetools/commercetools-docs-kit/commit/fcd26ee5d61ab1559339ce86d9c20194fdd94d9f), [`dac6330`](https://github.com/commercetools/commercetools-docs-kit/commit/dac63303c353994afcb66728309cfb254ea66da8)]:
  - @commercetools-docs/ui-kit@16.3.0

## 16.2.0

### Minor Changes

- [#925](https://github.com/commercetools/commercetools-docs-kit/pull/925) [`bbd73a7`](https://github.com/commercetools/commercetools-docs-kit/commit/bbd73a78b2492a9f56761937eb29ab915a7afc46) Thanks [@TimonRey](https://github.com/TimonRey)! - Show searchbox in right hand column if header is not visible

### Patch Changes

- [#937](https://github.com/commercetools/commercetools-docs-kit/pull/937) [`263cdf0`](https://github.com/commercetools/commercetools-docs-kit/commit/263cdf0bccbe67d62c3b78489de86067ea6d6922) Thanks [@TimonRey](https://github.com/TimonRey)! - Use design system to define the searchbox height

* [#939](https://github.com/commercetools/commercetools-docs-kit/pull/939) [`6b70c61`](https://github.com/commercetools/commercetools-docs-kit/commit/6b70c61799fb612ed8bc03b4e28a81c7ffd52924) Thanks [@renovate](https://github.com/apps/renovate)! - update dependencies

- [#945](https://github.com/commercetools/commercetools-docs-kit/pull/945) [`a37b748`](https://github.com/commercetools/commercetools-docs-kit/commit/a37b7486e56ba7373b9d86d51c5e97d04ae2cb49) Thanks [@renovate](https://github.com/apps/renovate)! - update dependencies

* [#952](https://github.com/commercetools/commercetools-docs-kit/pull/952) [`8d47a15`](https://github.com/commercetools/commercetools-docs-kit/commit/8d47a15bbf61c4190c3e5b877f5be3f41ca83450) Thanks [@TimonRey](https://github.com/TimonRey)! - Change height of searchbox field to 58px

* Updated dependencies [[`bbd73a7`](https://github.com/commercetools/commercetools-docs-kit/commit/bbd73a78b2492a9f56761937eb29ab915a7afc46), [`a37b748`](https://github.com/commercetools/commercetools-docs-kit/commit/a37b7486e56ba7373b9d86d51c5e97d04ae2cb49), [`8d47a15`](https://github.com/commercetools/commercetools-docs-kit/commit/8d47a15bbf61c4190c3e5b877f5be3f41ca83450)]:
  - @commercetools-docs/ui-kit@16.2.0

## 16.1.0

### Minor Changes

- [#933](https://github.com/commercetools/commercetools-docs-kit/pull/933) [`9aa2f00`](https://github.com/commercetools/commercetools-docs-kit/commit/9aa2f0048cc79f222cdf32ce96701d4138113331) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade uikit packages to v12

### Patch Changes

- [`9c58dd9`](https://github.com/commercetools/commercetools-docs-kit/commit/9c58dd9d509f2d3abd0ef5bf1738cd67e6dd2c02) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies (ref [#927](https://github.com/commercetools/commercetools-docs-kit/pull/927), [#932](https://github.com/commercetools/commercetools-docs-kit/pull/932)).

- Updated dependencies [[`9c58dd9`](https://github.com/commercetools/commercetools-docs-kit/commit/9c58dd9d509f2d3abd0ef5bf1738cd67e6dd2c02), [`9aa2f00`](https://github.com/commercetools/commercetools-docs-kit/commit/9aa2f0048cc79f222cdf32ce96701d4138113331)]:
  - @commercetools-docs/ui-kit@16.1.0

## 16.0.0

### Minor Changes

- [#907](https://github.com/commercetools/commercetools-docs-kit/pull/907) [`c47e680`](https://github.com/commercetools/commercetools-docs-kit/commit/c47e680c69ff45d59bee33fde380f12d467dccf2) Thanks [@TimonRey](https://github.com/TimonRey)! - Fix an issue with release note generator CLI.

  If you want to configure a topic list for a microsite, create a file called `docs-release-notes-config.yml` in the microsite folder. Then you can configure topics in the following format:

  ```yml
  topics:
    Carts:
      name: Carts
    Limits:
      name: Limits
    Orders:
      name: Orders
      description: Describe the topic here
  ```

  The description is optional.

### Patch Changes

- [#923](https://github.com/commercetools/commercetools-docs-kit/pull/923) [`529c35b`](https://github.com/commercetools/commercetools-docs-kit/commit/529c35bd8da4fbcb91d1125cd42f903376cc0627) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`529c35b`](https://github.com/commercetools/commercetools-docs-kit/commit/529c35bd8da4fbcb91d1125cd42f903376cc0627)]:
  - @commercetools-docs/ui-kit@16.0.0

## 15.0.2

### Patch Changes

- [#878](https://github.com/commercetools/commercetools-docs-kit/pull/878) [`f10c62d`](https://github.com/commercetools/commercetools-docs-kit/commit/f10c62d56bcaa99efaa6e9bf753caf76bd9e78e7) Thanks [@TimonRey](https://github.com/TimonRey)! - The searchbox was moved over the index navigation.

* [#908](https://github.com/commercetools/commercetools-docs-kit/pull/908) [`714fa0c`](https://github.com/commercetools/commercetools-docs-kit/commit/714fa0c0f13364aed4479fc61de3adde1d2b068d) Thanks [@TimonRey](https://github.com/TimonRey)! - The text in the user research banner was updated.

- [#915](https://github.com/commercetools/commercetools-docs-kit/pull/915) [`e730e88`](https://github.com/commercetools/commercetools-docs-kit/commit/e730e884428a688919563e912301825eab81acd3) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [#913](https://github.com/commercetools/commercetools-docs-kit/pull/913) [`8eb6fb3`](https://github.com/commercetools/commercetools-docs-kit/commit/8eb6fb3eb60b5bd1e110baaed7b46b1febddfa7b) Thanks [@emmenko](https://github.com/emmenko)! - Update uikit dependencies to `11.2.0`

- [#911](https://github.com/commercetools/commercetools-docs-kit/pull/911) [`379c4ba`](https://github.com/commercetools/commercetools-docs-kit/commit/379c4baaa540df17384db7f553acfe2fd713c2be) Thanks [@TimonRey](https://github.com/TimonRey)! - Fix overflowing issue with long words in `<ChildSectionNav>`

- Updated dependencies [[`f10c62d`](https://github.com/commercetools/commercetools-docs-kit/commit/f10c62d56bcaa99efaa6e9bf753caf76bd9e78e7), [`e730e88`](https://github.com/commercetools/commercetools-docs-kit/commit/e730e884428a688919563e912301825eab81acd3), [`8eb6fb3`](https://github.com/commercetools/commercetools-docs-kit/commit/8eb6fb3eb60b5bd1e110baaed7b46b1febddfa7b)]:
  - @commercetools-docs/ui-kit@15.0.2

## 15.0.1

### Patch Changes

- [#905](https://github.com/commercetools/commercetools-docs-kit/pull/905) [`df6061e`](https://github.com/commercetools/commercetools-docs-kit/commit/df6061e3812d912e38aa07b9190dd78301e448a6) Thanks [@emmenko](https://github.com/emmenko)! - Add missing `raw-loader` dependency

## 15.0.0

### Major Changes

- [#884](https://github.com/commercetools/commercetools-docs-kit/pull/884) [`ab2b717`](https://github.com/commercetools/commercetools-docs-kit/commit/ab2b717c48791df5543a66ff1cb5dde8ed31fc2e) Thanks [@renovate](https://github.com/apps/renovate)! - Migrate packages to Gatsby `v3`. Please refer to the official release notes: https://www.gatsbyjs.com/docs/reference/release-notes/v3.0/

  Note that in the docs-kit packages there are no breaking changes, except for requiring React `>=17` and NodeJS `>=14`.

### Patch Changes

- [#901](https://github.com/commercetools/commercetools-docs-kit/pull/901) [`b52dc29`](https://github.com/commercetools/commercetools-docs-kit/commit/b52dc294c48ce6fd462d6e79708fe42a4995a3d5) Thanks [@emmenko](https://github.com/emmenko)! - Export `<Overlay>` and `<TopMenu>` from core theme.

- Updated dependencies [[`3a94401`](https://github.com/commercetools/commercetools-docs-kit/commit/3a94401cdb0aa437448126738878a4b12b7f7381)]:
  - @commercetools-docs/ui-kit@15.0.0

## 14.0.7

### Patch Changes

- [#896](https://github.com/commercetools/commercetools-docs-kit/pull/896) [`a093dc5`](https://github.com/commercetools/commercetools-docs-kit/commit/a093dc5dd44416b9bd400243890cd2470be45d35) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [#895](https://github.com/commercetools/commercetools-docs-kit/pull/895) [`e3a0164`](https://github.com/commercetools/commercetools-docs-kit/commit/e3a01646f97e226d802d140b66ce1672d94a8c7a) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade `prism-react-renderer` to `1.2.0`.

* Updated dependencies [[`cc59270`](https://github.com/commercetools/commercetools-docs-kit/commit/cc59270a892052ff0ec7ae2541794e69d3ae7e5b), [`a093dc5`](https://github.com/commercetools/commercetools-docs-kit/commit/a093dc5dd44416b9bd400243890cd2470be45d35), [`e3a0164`](https://github.com/commercetools/commercetools-docs-kit/commit/e3a01646f97e226d802d140b66ce1672d94a8c7a)]:
  - @commercetools-docs/ui-kit@14.0.7

## 14.0.6

### Patch Changes

- [`09ccdd7`](https://github.com/commercetools/commercetools-docs-kit/commit/09ccdd79b853c9ea892913243647073d14da8e8b) [#881](https://github.com/commercetools/commercetools-docs-kit/pull/881) Thanks [@renovate](https://github.com/apps/renovate)! - Upgrade dependencies

- Updated dependencies [[`4b18472`](https://github.com/commercetools/commercetools-docs-kit/commit/4b184722e3a273303a0240f1d38f88cb0cb19bdd), [`09ccdd7`](https://github.com/commercetools/commercetools-docs-kit/commit/09ccdd79b853c9ea892913243647073d14da8e8b)]:
  - @commercetools-docs/ui-kit@14.0.6

## 14.0.5

### Patch Changes

- [`898af56`](https://github.com/commercetools/commercetools-docs-kit/commit/898af56a02a30505ad0170e482378eb17c085add) [#889](https://github.com/commercetools/commercetools-docs-kit/pull/889) Thanks [@TimonRey](https://github.com/TimonRey)! - hotfix: remove exports of removed icons from theme

## 14.0.4

### Patch Changes

- [`670a475`](https://github.com/commercetools/commercetools-docs-kit/commit/670a47519a873e7f47a15fed5d58edcef9be2ef4) [#858](https://github.com/commercetools/commercetools-docs-kit/pull/858) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`b0dcc19`](https://github.com/commercetools/commercetools-docs-kit/commit/b0dcc1989983043331eb5deb77a6ba40befe51b0) [#866](https://github.com/commercetools/commercetools-docs-kit/pull/866) Thanks [@emmenko](https://github.com/emmenko)! - Update uikit versions to latest

- [`afe3f22`](https://github.com/commercetools/commercetools-docs-kit/commit/afe3f2236007f1991d99fec609a274d7ffc7718e) [#835](https://github.com/commercetools/commercetools-docs-kit/pull/835) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency @sentry/browser to v6

* [`17cdff4`](https://github.com/commercetools/commercetools-docs-kit/commit/17cdff49d6d4ac82ed0bdf65d9df8ecdd20d112a) [#851](https://github.com/commercetools/commercetools-docs-kit/pull/851) Thanks [@TimonRey](https://github.com/TimonRey)! - The back-to-top icon in the index navigation was aligned to the page title.

- [`7c0f15e`](https://github.com/commercetools/commercetools-docs-kit/commit/7c0f15e1ae6736e73a00b7ef39692714bb99e9ae) [#869](https://github.com/commercetools/commercetools-docs-kit/pull/869) Thanks [@TimonRey](https://github.com/TimonRey)! - Icons were implemented next to the title in the sidebar for each microsite.

* [`9d950ef`](https://github.com/commercetools/commercetools-docs-kit/commit/9d950ef8eaf36b19604a707f98a7e2e90f91cb8a) [#860](https://github.com/commercetools/commercetools-docs-kit/pull/860) Thanks [@TimonRey](https://github.com/TimonRey)! - Implement opening animation for top menu.

- [`119bb8b`](https://github.com/commercetools/commercetools-docs-kit/commit/119bb8ba2cc32b6581c43e26aaa7e38063cc4529) [#857](https://github.com/commercetools/commercetools-docs-kit/pull/857) Thanks [@davifantasia](https://github.com/davifantasia)! - chore: readme update for excludeFromSearchIndex's Docsearch limitation

- Updated dependencies [[`670a475`](https://github.com/commercetools/commercetools-docs-kit/commit/670a47519a873e7f47a15fed5d58edcef9be2ef4), [`b0dcc19`](https://github.com/commercetools/commercetools-docs-kit/commit/b0dcc1989983043331eb5deb77a6ba40befe51b0), [`17cdff4`](https://github.com/commercetools/commercetools-docs-kit/commit/17cdff49d6d4ac82ed0bdf65d9df8ecdd20d112a), [`3a024e8`](https://github.com/commercetools/commercetools-docs-kit/commit/3a024e8f51a12d0030c344a6bcbb38fffdc7abc8)]:
  - @commercetools-docs/ui-kit@14.0.4

## 14.0.3

### Patch Changes

- [`a318f55`](https://github.com/commercetools/commercetools-docs-kit/commit/a318f55874b57d3eada7b2b460936acc07c3cec9) [#854](https://github.com/commercetools/commercetools-docs-kit/pull/854) Thanks [@emmenko](https://github.com/emmenko)! - Update uikit version range to `10.45.0`

- Updated dependencies [[`a318f55`](https://github.com/commercetools/commercetools-docs-kit/commit/a318f55874b57d3eada7b2b460936acc07c3cec9), [`758bf49`](https://github.com/commercetools/commercetools-docs-kit/commit/758bf4993e5811765a6c26a65e9e8dc9d49fb00d)]:
  - @commercetools-docs/ui-kit@14.0.3

## 14.0.2

### Patch Changes

- [`921c136`](https://github.com/commercetools/commercetools-docs-kit/commit/921c136cc5703fad7f504c5eeab033b22f0bbc1c) [#850](https://github.com/commercetools/commercetools-docs-kit/pull/850) Thanks [@emmenko](https://github.com/emmenko)! - Fix emotion import, update lockfile

* [`11db7cd`](https://github.com/commercetools/commercetools-docs-kit/commit/11db7cd67e367042e35937ed80167e6f57afe257) [#843](https://github.com/commercetools/commercetools-docs-kit/pull/843) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- [`f55a7f7`](https://github.com/commercetools/commercetools-docs-kit/commit/f55a7f7bf7400f631ba7b3621474170bcae002d6) [#834](https://github.com/commercetools/commercetools-docs-kit/pull/834) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`80c5efa`](https://github.com/commercetools/commercetools-docs-kit/commit/80c5efa1bfd3b3911145ce56d737e79601db9ee4) [#832](https://github.com/commercetools/commercetools-docs-kit/pull/832) Thanks [@TimonRey](https://github.com/TimonRey)! - A script for generating release note files was implemented.
  Run the following command in your console and follow the given instructions to create a new release note.

  ```
  yarn create-docs-release-note
  ```

- [`eeb404f`](https://github.com/commercetools/commercetools-docs-kit/commit/eeb404fb60f643ce58675368a9a11ac248e840e5) [#842](https://github.com/commercetools/commercetools-docs-kit/pull/842) Thanks [@TimonRey](https://github.com/TimonRey)! - A bug regarding multi-line entries in the child section navigator was fixed.

* [`df7876c`](https://github.com/commercetools/commercetools-docs-kit/commit/df7876c0510b436fd4388e28c6aa9116e92d8778) [#844](https://github.com/commercetools/commercetools-docs-kit/pull/844) Thanks [@TimonRey](https://github.com/TimonRey)! - The gatsby dependency was downgraded due to a bug related to the javasript bundle on development.

- [`5336b99`](https://github.com/commercetools/commercetools-docs-kit/commit/5336b9977734fdda6f4a1f3359cfd52ea4a68c06) [#828](https://github.com/commercetools/commercetools-docs-kit/pull/828) Thanks [@emmenko](https://github.com/emmenko)! - Fix SSR warnings, use experimental flags for development.

- Updated dependencies [[`921c136`](https://github.com/commercetools/commercetools-docs-kit/commit/921c136cc5703fad7f504c5eeab033b22f0bbc1c), [`11db7cd`](https://github.com/commercetools/commercetools-docs-kit/commit/11db7cd67e367042e35937ed80167e6f57afe257), [`f55a7f7`](https://github.com/commercetools/commercetools-docs-kit/commit/f55a7f7bf7400f631ba7b3621474170bcae002d6)]:
  - @commercetools-docs/ui-kit@14.0.2

## 14.0.1

### Patch Changes

- [`857965e`](https://github.com/commercetools/commercetools-docs-kit/commit/857965e1d3413f245c377e4065fa55aa0ea2785b) [#826](https://github.com/commercetools/commercetools-docs-kit/pull/826) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

## 14.0.0

### Minor Changes

- [`d435f41`](https://github.com/commercetools/commercetools-docs-kit/commit/d435f414cb6a94ef7c02f1ea907b7ba8cdf294ea) [#813](https://github.com/commercetools/commercetools-docs-kit/pull/813) Thanks [@renovate](https://github.com/apps/renovate)! - Update to gatsby >= `2.30`. See https://www.gatsbyjs.com/docs/reference/release-notes/v2.30/

### Patch Changes

- Updated dependencies [[`d435f41`](https://github.com/commercetools/commercetools-docs-kit/commit/d435f414cb6a94ef7c02f1ea907b7ba8cdf294ea)]:
  - @commercetools-docs/ui-kit@14.0.0

## 13.0.1

### Patch Changes

- [`90a71dc`](https://github.com/commercetools/commercetools-docs-kit/commit/90a71dca81f1a8286b062066f6fff837c02659d8) [#816](https://github.com/commercetools/commercetools-docs-kit/pull/816) Thanks [@emmenko](https://github.com/emmenko)! - Fix patching lobotomized owl selector for emotion SSR.

- Updated dependencies [[`90a71dc`](https://github.com/commercetools/commercetools-docs-kit/commit/90a71dca81f1a8286b062066f6fff837c02659d8)]:
  - @commercetools-docs/ui-kit@13.0.1

## 13.0.0

### Minor Changes

- [`a93fb0d`](https://github.com/commercetools/commercetools-docs-kit/commit/a93fb0da261735f9bdfcd38baa15de948072eab7) [#786](https://github.com/commercetools/commercetools-docs-kit/pull/786) Thanks [@TimonRey](https://github.com/TimonRey)! - A new filter for the child section navigator was implemented.

### Patch Changes

- [`999785f`](https://github.com/commercetools/commercetools-docs-kit/commit/999785f36b916e2cf19e7c6a12f1641dcfc30e7a) [#804](https://github.com/commercetools/commercetools-docs-kit/pull/804) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`47020a1`](https://github.com/commercetools/commercetools-docs-kit/commit/47020a1ec78aeb3f0d98de5b3a90ded66fa95b14) [#810](https://github.com/commercetools/commercetools-docs-kit/pull/810) Thanks [@renovate](https://github.com/apps/renovate)! - Use new scoped packages for fontsource

- [`4232fe6`](https://github.com/commercetools/commercetools-docs-kit/commit/4232fe601e6f8e3688514e60237b8ac3e8b79757) [#809](https://github.com/commercetools/commercetools-docs-kit/pull/809) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`999785f`](https://github.com/commercetools/commercetools-docs-kit/commit/999785f36b916e2cf19e7c6a12f1641dcfc30e7a), [`a93fb0d`](https://github.com/commercetools/commercetools-docs-kit/commit/a93fb0da261735f9bdfcd38baa15de948072eab7)]:
  - @commercetools-docs/ui-kit@13.0.0

## 12.0.1

### Patch Changes

- [`fb83e48`](https://github.com/commercetools/commercetools-docs-kit/commit/fb83e48fc313f3244f6ffe848a111be00206d529) [#800](https://github.com/commercetools/commercetools-docs-kit/pull/800) Thanks [@TimonRey](https://github.com/TimonRey)! - A visual bug was fixed in the page header side of the release notes page.

* [`ea147fa`](https://github.com/commercetools/commercetools-docs-kit/commit/ea147fab4fb63b27144da48cb0f4808bc4683747) [#793](https://github.com/commercetools/commercetools-docs-kit/pull/793) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- [`98c83db`](https://github.com/commercetools/commercetools-docs-kit/commit/98c83dbc75953921fb25284841aef1e9c19b7921) [#795](https://github.com/commercetools/commercetools-docs-kit/pull/795) Thanks [@emmenko](https://github.com/emmenko)! - Do not restyle uikit icons

- Updated dependencies [[`ea147fa`](https://github.com/commercetools/commercetools-docs-kit/commit/ea147fab4fb63b27144da48cb0f4808bc4683747), [`84fcfd2`](https://github.com/commercetools/commercetools-docs-kit/commit/84fcfd2593d392d93d7348f59d683dbfea601d8b)]:
  - @commercetools-docs/ui-kit@12.0.1

## 12.0.0

### Minor Changes

- [`bc0d76f`](https://github.com/commercetools/commercetools-docs-kit/commit/bc0d76f8a23d1a281afd4674c2c429ab27529275) [#756](https://github.com/commercetools/commercetools-docs-kit/pull/756) Thanks [@TimonRey](https://github.com/TimonRey)! - The RssFeed is now one single table which shows the newest release notes of all feeds

* [`bc0d76f`](https://github.com/commercetools/commercetools-docs-kit/commit/bc0d76f8a23d1a281afd4674c2c429ab27529275) [#756](https://github.com/commercetools/commercetools-docs-kit/pull/756) Thanks [@TimonRey](https://github.com/TimonRey)! - Render a User Research banner in all content pages.

### Patch Changes

- [`49953f2`](https://github.com/commercetools/commercetools-docs-kit/commit/49953f254addc795b52290d32df884b028669e75) [#778](https://github.com/commercetools/commercetools-docs-kit/pull/778) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`c26ba76`](https://github.com/commercetools/commercetools-docs-kit/commit/c26ba76e3ecf16212918c2a347744f950031fcde) [#783](https://github.com/commercetools/commercetools-docs-kit/pull/783) Thanks [@TimonRey](https://github.com/TimonRey)! - A bug related to the width of the right column was fixed.

- [`1771b58`](https://github.com/commercetools/commercetools-docs-kit/commit/1771b58de798986eb97fbaa66b87123bfcc5c900) [#792](https://github.com/commercetools/commercetools-docs-kit/pull/792) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all fontsource dependencies to v3.1.5

* [`3b48184`](https://github.com/commercetools/commercetools-docs-kit/commit/3b48184e6ea7d148cf22d18d4abb075b2db04d40) [#791](https://github.com/commercetools/commercetools-docs-kit/pull/791) Thanks [@davifantasia](https://github.com/davifantasia)! - Update all minor and patch dependencies.

* Updated dependencies [[`bc0d76f`](https://github.com/commercetools/commercetools-docs-kit/commit/bc0d76f8a23d1a281afd4674c2c429ab27529275)]:
  - @commercetools-docs/ui-kit@12.0.0

## 11.0.3

### Patch Changes

- [`e72f61f`](https://github.com/commercetools/commercetools-docs-kit/commit/e72f61fa94726ef29fc6122ab1fe7b85df4d772f) [#772](https://github.com/commercetools/commercetools-docs-kit/pull/772) Thanks [@emmenko](https://github.com/emmenko)! - Restore SVG Webpack loader

## 11.0.2

### Patch Changes

- [`ae7263e`](https://github.com/commercetools/commercetools-docs-kit/commit/ae7263e34c13ae3d1c6944f472cbabceda68bbf8) [#768](https://github.com/commercetools/commercetools-docs-kit/pull/768) Thanks [@emmenko](https://github.com/emmenko)! - Pass theme color directly to H1 instead of relying on emotion theming

* [`4c558b9`](https://github.com/commercetools/commercetools-docs-kit/commit/4c558b9b9c5d99691d618813bdb6c4ecaec50069) [#766](https://github.com/commercetools/commercetools-docs-kit/pull/766) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- [`deac3ac`](https://github.com/commercetools/commercetools-docs-kit/commit/deac3ac8372187a5eb3e96a8561eca190373f2cc) [#759](https://github.com/commercetools/commercetools-docs-kit/pull/759) Thanks [@emmenko](https://github.com/emmenko)! - Compile and bundle packages using [preconstruct](https://preconstruct.tools)

* [`cde8175`](https://github.com/commercetools/commercetools-docs-kit/commit/cde8175c9305280fd1961d0e10f1b22deb18bd66) [#771](https://github.com/commercetools/commercetools-docs-kit/pull/771) Thanks [@davifantasia](https://github.com/davifantasia)! - fix: include commonmark in gatsby-plugin-mdx options, the ensures backslashes in mdx texts are transformed to new lines

- [`a838f51`](https://github.com/commercetools/commercetools-docs-kit/commit/a838f518e1a002d7978e5cc12bfd06335ada2ed6) [#769](https://github.com/commercetools/commercetools-docs-kit/pull/769) Thanks [@emmenko](https://github.com/emmenko)! - Fix regression in Firefox about autoprefixer for `height: fit-content`

* [`e99bf1a`](https://github.com/commercetools/commercetools-docs-kit/commit/e99bf1a6678960ae6a466d387f13f279f2e973c4) [#758](https://github.com/commercetools/commercetools-docs-kit/pull/758) Thanks [@emmenko](https://github.com/emmenko)! - Generate SVG icon components using `@svgr/cli`, to avoid importing SVG files via Babel/Rollup/Webpack.

* Updated dependencies [[`deac3ac`](https://github.com/commercetools/commercetools-docs-kit/commit/deac3ac8372187a5eb3e96a8561eca190373f2cc), [`e99bf1a`](https://github.com/commercetools/commercetools-docs-kit/commit/e99bf1a6678960ae6a466d387f13f279f2e973c4)]:
  - @commercetools-docs/ui-kit@11.0.2

## 11.0.1

### Patch Changes

- [`53b83c7`](https://github.com/commercetools/commercetools-docs-kit/commit/53b83c766ab651e1cf7d46116c942c3232daf905) [#763](https://github.com/commercetools/commercetools-docs-kit/pull/763) Thanks [@davifantasia](https://github.com/davifantasia)! - update dependency rehype-slug from 3.0.0 to 4.0.1

- Updated dependencies [[`b3a3911`](https://github.com/commercetools/commercetools-docs-kit/commit/b3a39119987baf7d9bd58c464ed198c9710cc8bb)]:
  - @commercetools-docs/ui-kit@11.0.1

## 11.0.0

### Minor Changes

- [`791d3dc`](https://github.com/commercetools/commercetools-docs-kit/commit/791d3dcecbc5ed4984bf4cef7daa5bee92ad0514) [#743](https://github.com/commercetools/commercetools-docs-kit/pull/743) Thanks [@TimonRey](https://github.com/TimonRey)! - The RssFeed is now one single table which shows the newest release notes of all feeds

* [`b868afb`](https://github.com/commercetools/commercetools-docs-kit/commit/b868afb18542efbae1741ce7f34ac0b6cace2041) [#752](https://github.com/commercetools/commercetools-docs-kit/pull/752) Thanks [@renovate](https://github.com/apps/renovate)! - Migrate to emotion v11. https://emotion.sh/docs/emotion-11

  Additionally, some peer dependencies changed:

  - The `@commercetools-docs/gatsby-theme-api-docs` does not require the peer dependencies `@emotion/core`, and `@emotion/styled`, as they are now included in the package's dependencies.
  - The `@commercetools-docs/gatsby-theme-docs` does not require the peer dependencies `@emotion/core`, and `@emotion/styled`, as they are now included in the package's dependencies.
  - The `@commercetools-docs/ui-kit` does not require the peer dependencies `@commercetools-uikit/design-system`, `@commercetools-uikit/icons`, `@commercetools-uikit/spacings-inline`, `@emotion/core`, and `@emotion/styled`, as they are now included in the package's dependencies.

### Patch Changes

- [`b6530d9`](https://github.com/commercetools/commercetools-docs-kit/commit/b6530d9471ffe48f447d643b158afe4e72a0888f) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies https://github.com/commercetools/commercetools-docs-kit/pull/751

* [`7db947b`](https://github.com/commercetools/commercetools-docs-kit/commit/7db947b3efe69efbcd6dfe8826d408c955c56552) [#755](https://github.com/commercetools/commercetools-docs-kit/pull/755) Thanks [@emmenko](https://github.com/emmenko)! - Use `fontsource` instead of (deprecated) `typeface` package for fonts.

* Updated dependencies [[`791d3dc`](https://github.com/commercetools/commercetools-docs-kit/commit/791d3dcecbc5ed4984bf4cef7daa5bee92ad0514), [`b868afb`](https://github.com/commercetools/commercetools-docs-kit/commit/b868afb18542efbae1741ce7f34ac0b6cace2041), [`b6530d9`](https://github.com/commercetools/commercetools-docs-kit/commit/b6530d9471ffe48f447d643b158afe4e72a0888f)]:
  - @commercetools-docs/ui-kit@11.0.0

## 10.0.2

### Patch Changes

- [`24caa5f`](https://github.com/commercetools/commercetools-docs-kit/commit/24caa5ff2121cfe3a980ef5af74675155965ff2e) [#739](https://github.com/commercetools/commercetools-docs-kit/pull/739) Thanks [@renovate](https://github.com/apps/renovate)! - chore: update dependencies

- Updated dependencies [[`24caa5f`](https://github.com/commercetools/commercetools-docs-kit/commit/24caa5ff2121cfe3a980ef5af74675155965ff2e), [`d292d22`](https://github.com/commercetools/commercetools-docs-kit/commit/d292d22275fd6cf9b316073cfcddb98b7ae055d8)]:
  - @commercetools-docs/ui-kit@10.0.2

## 10.0.1

### Patch Changes

- [`b1190b5`](https://github.com/commercetools/commercetools-docs-kit/commit/b1190b593ce63b2eb3ac4d62f36d7717d35525bf) [#745](https://github.com/commercetools/commercetools-docs-kit/pull/745) Thanks [@emmenko](https://github.com/emmenko)! - It appeared that under some unknown circumstances the `props.theme` accessed from within a styled component results in an empty object when building the website in production mode. To fix that, we explicitly pass wherever possible the `theme` object after reading it from the context with `useTheme`.

- Updated dependencies [[`b1190b5`](https://github.com/commercetools/commercetools-docs-kit/commit/b1190b593ce63b2eb3ac4d62f36d7717d35525bf)]:
  - @commercetools-docs/ui-kit@10.0.1

## 10.0.0

### Minor Changes

- [`c88565b`](https://github.com/commercetools/commercetools-docs-kit/commit/c88565bb932a872b60614f999d711b82faf718ac) [#727](https://github.com/commercetools/commercetools-docs-kit/pull/727) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update react monorepo to v17 (major)

### Patch Changes

- [`94ffef6`](https://github.com/commercetools/commercetools-docs-kit/commit/94ffef67f2d6408c3661374e510d8f000644be5a) [#693](https://github.com/commercetools/commercetools-docs-kit/pull/693) Thanks [@renovate](https://github.com/apps/renovate)! - Use new `remark-parse`, which [changes the internal parser](https://github.com/remarkjs/remark/pull/536) to use `micromark`.

* [`f00c430`](https://github.com/commercetools/commercetools-docs-kit/commit/f00c43023f0701e632a98fd364ce4da2213dbfc5) [#737](https://github.com/commercetools/commercetools-docs-kit/pull/737) Thanks [@emmenko](https://github.com/emmenko)! - Load polyfill for `IntersectionObserver` API.

- [`71dfbe4`](https://github.com/commercetools/commercetools-docs-kit/commit/71dfbe4edf48225efeebe350bee0da4684bf60e1) [#724](https://github.com/commercetools/commercetools-docs-kit/pull/724) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`a4df2b7`](https://github.com/commercetools/commercetools-docs-kit/commit/a4df2b7e286cdedd8383321273ed1e6fe184bee2), [`c88565b`](https://github.com/commercetools/commercetools-docs-kit/commit/c88565bb932a872b60614f999d711b82faf718ac), [`71dfbe4`](https://github.com/commercetools/commercetools-docs-kit/commit/71dfbe4edf48225efeebe350bee0da4684bf60e1)]:
  - @commercetools-docs/ui-kit@10.0.0

## 9.0.0

### Major Changes

- [`9b69b27`](https://github.com/commercetools/commercetools-docs-kit/commit/9b69b275c762aa49f84bf38ea85791390a12aff1) [#702](https://github.com/commercetools/commercetools-docs-kit/pull/702) Thanks [@emmenko](https://github.com/emmenko)! - Do not render any image in the release notes list, Api type and endpoint descriptions and other places where markdown fragments are rendered inside a page.

### Patch Changes

- [`047f4cc`](https://github.com/commercetools/commercetools-docs-kit/commit/047f4ccaf5942b06a40412dbc1c472acd5d542a6) [#681](https://github.com/commercetools/commercetools-docs-kit/pull/681) Thanks [@nkuehn](https://github.com/nkuehn)! - Resize only minimal set of resolutions in dev mode

* [`1d84a91`](https://github.com/commercetools/commercetools-docs-kit/commit/1d84a915a21203f2deb3c1395f941c14fa1ae4e6) [#711](https://github.com/commercetools/commercetools-docs-kit/pull/711) Thanks [@davifantasia](https://github.com/davifantasia)! - fix: stop duplicating release note pages as content pages

- [`459ef12`](https://github.com/commercetools/commercetools-docs-kit/commit/459ef126f2297ef46c38d7297f4f528edbaab2a5) [#695](https://github.com/commercetools/commercetools-docs-kit/pull/695) Thanks [@emmenko](https://github.com/emmenko)! - fix: sentry `allowUrls` option

* [`73c843e`](https://github.com/commercetools/commercetools-docs-kit/commit/73c843e52caca2b9b7fc90d3f2355672b540431d) [#687](https://github.com/commercetools/commercetools-docs-kit/pull/687) Thanks [@TimonRey](https://github.com/TimonRey)! - Fixes the nav text to be inside the window in wide layout

- [`168d064`](https://github.com/commercetools/commercetools-docs-kit/commit/168d064f74eb043af873ca2d3ddc984a61d3ef43) [#701](https://github.com/commercetools/commercetools-docs-kit/pull/701) Thanks [@TimonRey](https://github.com/TimonRey)! - Do not remove top margin for any side by side content. Resolves the API type having been too near to the description and manual side by side content being too near to the heading above.
  ``

* [`7f73056`](https://github.com/commercetools/commercetools-docs-kit/commit/7f73056c2fc9ee1df717d2af08195c752f63994a) [#714](https://github.com/commercetools/commercetools-docs-kit/pull/714) Thanks [@davifantasia](https://github.com/davifantasia)! - refactor: New color (cccccc) for light themed header code block

- [`6ca154c`](https://github.com/commercetools/commercetools-docs-kit/commit/6ca154c3dbc452c6c031c55212018f669f24d9d9) [#713](https://github.com/commercetools/commercetools-docs-kit/pull/713) Thanks [@davifantasia](https://github.com/davifantasia)! - Update top menu

* [`dad7828`](https://github.com/commercetools/commercetools-docs-kit/commit/dad7828c59dffba4b84606f7ba589bb7a2c662b1) [#705](https://github.com/commercetools/commercetools-docs-kit/pull/705) Thanks [@emmenko](https://github.com/emmenko)! - Fix rendering of links for static files as static HTML links

- [`39bf45d`](https://github.com/commercetools/commercetools-docs-kit/commit/39bf45d35bb554899aaf7c05ca0da56963d7f5d3) [#685](https://github.com/commercetools/commercetools-docs-kit/pull/685) Thanks [@TimonRey](https://github.com/TimonRey)! - Fix space between search results

* [`1a99ee3`](https://github.com/commercetools/commercetools-docs-kit/commit/1a99ee34f7d00e55fdfb045570f8cb1bd44ceaca) [#706](https://github.com/commercetools/commercetools-docs-kit/pull/706) Thanks [@TimonRey](https://github.com/TimonRey)! - The beta flag is no longer displayed in the main navigation on the left side. It moved to the top of the index navigation on the right side of the page where the design was slightly changed as well.

* Updated dependencies [[`af0d313`](https://github.com/commercetools/commercetools-docs-kit/commit/af0d313567d94f32b1b397b48df514893e04c1cb)]:
  - @commercetools-docs/ui-kit@9.0.0

## 8.0.1

### Patch Changes

- [`cb51dfa`](https://github.com/commercetools/commercetools-docs-kit/commit/cb51dfaa08f090081e6180e99a1879281836f71a) [#670](https://github.com/commercetools/commercetools-docs-kit/pull/670) Thanks [@emmenko](https://github.com/emmenko)! - Fix release notes image aspect ratio

## 8.0.0

### Minor Changes

- [`2952f1a`](https://github.com/commercetools/commercetools-docs-kit/commit/2952f1afc4d30845634fa909e1ba80026c29ebde) [#663](https://github.com/commercetools/commercetools-docs-kit/pull/663) Thanks [@nkuehn](https://github.com/nkuehn)! - render images in fragment renderer and optimize image scaling for build speed

### Patch Changes

- [`f189cc4`](https://github.com/commercetools/commercetools-docs-kit/commit/f189cc43a794c20595b5d4692f0a429f4872550a) [#664](https://github.com/commercetools/commercetools-docs-kit/pull/664) Thanks [@davifantasia](https://github.com/davifantasia)! - Auto-generate `src/images/releases` directory. Authors/contributors would be directed to this directory when they need to use an image in a release note.

* [`a478cf2`](https://github.com/commercetools/commercetools-docs-kit/commit/a478cf26f688f935e86c72ccf028d967d4ed903d) [#653](https://github.com/commercetools/commercetools-docs-kit/pull/653) Thanks [@TimonRey](https://github.com/TimonRey)! - refactor: align nav-buttons in wide layout into the middle

- [`30ac9e3`](https://github.com/commercetools/commercetools-docs-kit/commit/30ac9e396de85f4f24276c646753514b2a93a721) [#666](https://github.com/commercetools/commercetools-docs-kit/pull/666) Thanks [@davifantasia](https://github.com/davifantasia)! - Canonical URLs are now generated by default unless the option `enableCanonicalUrls: false` is passed to the theme options.

- Updated dependencies [[`849af3c`](https://github.com/commercetools/commercetools-docs-kit/commit/849af3cba129641d1799a5081b2ba6a4141cbc7e), [`12470b9`](https://github.com/commercetools/commercetools-docs-kit/commit/12470b97de700bc0fa4ea47d6ccdbc69a20941c9)]:
  - @commercetools-docs/ui-kit@8.0.0

## 7.0.6

### Patch Changes

- [`386117c`](https://github.com/commercetools/commercetools-docs-kit/commit/386117ced08531af7007ff6b7aac738a78cf4496) [#620](https://github.com/commercetools/commercetools-docs-kit/pull/620) Thanks [@davifantasia](https://github.com/davifantasia)! - Changes here is the last or 3 parts to:

  - render request and response examples and
  - fix broken ui for types rendered in endpoints using a large desktop layout

* [`7248f86`](https://github.com/commercetools/commercetools-docs-kit/commit/7248f867eb1da1ade1301ed50d54e102f7839ec0) [#630](https://github.com/commercetools/commercetools-docs-kit/pull/630) Thanks [@davifantasia](https://github.com/davifantasia)! - Fix for index menu inconsistent highlighting when content menu is used

## 7.0.5

### Patch Changes

- [`f9cd4d4`](https://github.com/commercetools/commercetools-docs-kit/commit/f9cd4d4d41fee1f81689eab63ee9ae04315a9627) [#622](https://github.com/commercetools/commercetools-docs-kit/pull/622) Thanks [@davifantasia](https://github.com/davifantasia)! - fix: correct hover behaviour of release notes

* [`288ac41`](https://github.com/commercetools/commercetools-docs-kit/commit/288ac4121e17d69a8dcbb361043686908273f64f) [#624](https://github.com/commercetools/commercetools-docs-kit/pull/624) Thanks [@renovate](https://github.com/apps/renovate)! - chore: update dependencies

- [`a413bd9`](https://github.com/commercetools/commercetools-docs-kit/commit/a413bd99f6ac7c87363802dde999c29ed79931f0) [#621](https://github.com/commercetools/commercetools-docs-kit/pull/621) Thanks [@davifantasia](https://github.com/davifantasia)! - fix: remove focus outline for top menu link

- Updated dependencies [[`288ac41`](https://github.com/commercetools/commercetools-docs-kit/commit/288ac4121e17d69a8dcbb361043686908273f64f)]:
  - @commercetools-docs/ui-kit@7.0.5

## 7.0.4

### Patch Changes

- [`551c9bb`](https://github.com/commercetools/commercetools-docs-kit/commit/551c9bb0436215ca332c91e1a569471c878a3a8f) [#616](https://github.com/commercetools/commercetools-docs-kit/pull/616) Thanks [@emmenko](https://github.com/emmenko)! - Update UI Kit dependencies

- Updated dependencies [[`551c9bb`](https://github.com/commercetools/commercetools-docs-kit/commit/551c9bb0436215ca332c91e1a569471c878a3a8f)]:
  - @commercetools-docs/ui-kit@7.0.4

## 7.0.3

### Patch Changes

- [`2dd19f2`](https://github.com/commercetools/commercetools-docs-kit/commit/2dd19f2e8a60c55bfd87f72ec8b8ca79fbdbbc52) [#614](https://github.com/commercetools/commercetools-docs-kit/pull/614) Thanks [@emmenko](https://github.com/emmenko)! - Load fonts using typeface packages, instead of gatsby plugin for google fonts

* [`b5aa043`](https://github.com/commercetools/commercetools-docs-kit/commit/b5aa043f4d7655ee51322cb04df6ac766a311f9f) [#601](https://github.com/commercetools/commercetools-docs-kit/pull/601) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency prismjs to v1.21.0 [security]

* Updated dependencies [[`fed7a9b`](https://github.com/commercetools/commercetools-docs-kit/commit/fed7a9b6e375f53750df78b1989ea8c67482516c)]:
  - @commercetools-docs/ui-kit@7.0.3

## 7.0.2

### Patch Changes

- [`aa9e848`](https://github.com/commercetools/commercetools-docs-kit/commit/aa9e8485454a2e18024772192c37979756af9167) [#592](https://github.com/commercetools/commercetools-docs-kit/pull/592) Thanks [@renovate](https://github.com/apps/renovate)! - chore: update dependencies

- Updated dependencies [[`aa9e848`](https://github.com/commercetools/commercetools-docs-kit/commit/aa9e8485454a2e18024772192c37979756af9167)]:
  - @commercetools-docs/ui-kit@7.0.2

## 7.0.1

### Patch Changes

- [`50ce1d6`](https://github.com/commercetools/commercetools-docs-kit/commit/50ce1d67c560a8b42e47e9894d562077ca0f92b5) [#590](https://github.com/commercetools/commercetools-docs-kit/pull/590) Thanks [@nkuehn](https://github.com/nkuehn)! - Fix RSS feeds being empty in some sites

- Updated dependencies [[`50ce1d6`](https://github.com/commercetools/commercetools-docs-kit/commit/50ce1d67c560a8b42e47e9894d562077ca0f92b5)]:
  - @commercetools-docs/ui-kit@7.0.1

## 7.0.0

### Patch Changes

- [`bfc81c9`](https://github.com/commercetools/commercetools-docs-kit/commit/bfc81c9916692e4391e10217ac35ea12ac709301) [#586](https://github.com/commercetools/commercetools-docs-kit/pull/586) Thanks [@davifantasia](https://github.com/davifantasia)! - back to top now linked to header instead of content

* [`79ca608`](https://github.com/commercetools/commercetools-docs-kit/commit/79ca6087b4ed32fbc781ce0797538f60c6860419) [#549](https://github.com/commercetools/commercetools-docs-kit/pull/549) Thanks [@davifantasia](https://github.com/davifantasia)! - fix: broken soft links in import api

- [`f06192c`](https://github.com/commercetools/commercetools-docs-kit/commit/f06192c544987a431094fd9b2d77ffa07ac46ead) [#585](https://github.com/commercetools/commercetools-docs-kit/pull/585) Thanks [@davifantasia](https://github.com/davifantasia)! - Release notes design review styling changes

* [`a592bdf`](https://github.com/commercetools/commercetools-docs-kit/commit/a592bdfdd3720b39501bfe6981eeed9ba55e6941) [#581](https://github.com/commercetools/commercetools-docs-kit/pull/581) Thanks [@davifantasia](https://github.com/davifantasia)! - - top menu is highlighted on hover
  - index menu style changes
* Updated dependencies [[`ff1246e`](https://github.com/commercetools/commercetools-docs-kit/commit/ff1246e5e204181c21b6767239fa3cb788a4c0ee), [`8b44418`](https://github.com/commercetools/commercetools-docs-kit/commit/8b444189da90b5def5c71cc975818b730baaeca7)]:
  - @commercetools-docs/ui-kit@7.0.0

## 6.0.1

### Patch Changes

- [`1311970`](https://github.com/commercetools/commercetools-docs-kit/commit/1311970bb9e69f3646caec077146480255be165d) [#545](https://github.com/commercetools/commercetools-docs-kit/pull/545) Thanks [@davifantasia](https://github.com/davifantasia)! - fix: improper import

  Fixes build failure in sites using the latest theme

## 6.0.0

### Minor Changes

- [`411d6e6`](https://github.com/commercetools/commercetools-docs-kit/commit/411d6e62eff4a6a3804b040c17a39116333b435b) [#529](https://github.com/commercetools/commercetools-docs-kit/pull/529) Thanks [@nkuehn](https://github.com/nkuehn)! - Optional two-column content layout with side-by-side components

  - `<SideBySide>` component for manual pages
  - Side-by-side layout for API types and their examples
  - Theme option and frontmatter to allow wide layouts

  To enable this for all pages, configure the global theme option `allowWideContentLayout`.
  Single pages can also be enabled/disabled by specifying the `wideLayout` frontmatter option.

  Then, in the MDX files, wrap the containers/elements that should go side-by-side with the
  `<SideBySide>` component:

  ```md
  <SideBySide>

  This is the block on the left, or on top if the screen is not wide enough.

    <div>
      This goes to the right when the screen is wide enough. I can write
      **normal** MDX content here.
    </div>

  </SideBySide>
  ```

### Patch Changes

- [`0a61e96`](https://github.com/commercetools/commercetools-docs-kit/commit/0a61e9691ca58322107b5798cd08321df9d51a95) [#523](https://github.com/commercetools/commercetools-docs-kit/pull/523) Thanks [@renovate](https://github.com/apps/renovate)! - chore: update all dependencies

* [`deb72f1`](https://github.com/commercetools/commercetools-docs-kit/commit/deb72f1a055d8bbd11bcb7e5bbdc26359044874c) [#517](https://github.com/commercetools/commercetools-docs-kit/pull/517) Thanks [@davifantasia](https://github.com/davifantasia)! - feat: option to center search dialog in its parent container

- [`1919f39`](https://github.com/commercetools/commercetools-docs-kit/commit/1919f391e824222963eca3807d9d961c3bcf9842) [#533](https://github.com/commercetools/commercetools-docs-kit/pull/533) Thanks [@emmenko](https://github.com/emmenko)! - Use non oppressive language. The `tagWhitelist` option for the `gatsby-transformer-mdx-introspection` has been deprecated in favor of `tagList`.

* [`ca7d387`](https://github.com/commercetools/commercetools-docs-kit/commit/ca7d387ceb82edc9d296517f0e0854146b047d4f) [#544](https://github.com/commercetools/commercetools-docs-kit/pull/544) Thanks [@davifantasia](https://github.com/davifantasia)! - feat: option to center top menu allows passing `centered` prop to LayoutHeader component so the menu is styled to be centered

* Updated dependencies [[`411d6e6`](https://github.com/commercetools/commercetools-docs-kit/commit/411d6e62eff4a6a3804b040c17a39116333b435b), [`2703f63`](https://github.com/commercetools/commercetools-docs-kit/commit/2703f63ec320ea6c79bdc5608bcd240d59d7c2b3), [`76db6f7`](https://github.com/commercetools/commercetools-docs-kit/commit/76db6f7d3dc67c06895259a0e01fd1d7a70f8fac)]:
  - @commercetools-docs/ui-kit@6.0.0

## 5.0.3

### Patch Changes

- [`a1674bd`](https://github.com/commercetools/commercetools-docs-kit/commit/a1674bd294018c8768248826aacd68e708eb882a) [#498](https://github.com/commercetools/commercetools-docs-kit/pull/498) Thanks [@davifantasia](https://github.com/davifantasia)! - feat: hubspot tracking

* [`b6b58e0`](https://github.com/commercetools/commercetools-docs-kit/commit/b6b58e0ec07aa7f877c0037a312c47b34d4b1e51) [#508](https://github.com/commercetools/commercetools-docs-kit/pull/508) Thanks [@davifantasia](https://github.com/davifantasia)! - refactor: allow cards to accept arbitrary children in non mdx files

  The removed check fixes issues of UI elements breaking in some cases.

* Updated dependencies [[`065391d`](https://github.com/commercetools/commercetools-docs-kit/commit/065391dc77e610c3202e9b9f871f16ff5565b681)]:
  - @commercetools-docs/ui-kit@5.0.3

## 5.0.2

### Patch Changes

- [`b0fd7bc`](https://github.com/commercetools/commercetools-docs-kit/commit/b0fd7bc0f8daa77b9d5c360f8e9161d92ec94457) [#496](https://github.com/commercetools/commercetools-docs-kit/pull/496) Thanks [@emmenko](https://github.com/emmenko)! - Push footer to the page bottom, even when page content is very short

- Updated dependencies [[`c0b74d5`](https://github.com/commercetools/commercetools-docs-kit/commit/c0b74d5bd16ef6db8a7ab3844b292dc4daff425d)]:
  - @commercetools-docs/ui-kit@5.0.2

## 5.0.1

### Patch Changes

- [`00abb72`](https://github.com/commercetools/commercetools-docs-kit/commit/00abb725dca4c7d97fa5e6bec7b6edd2bc001594) Thanks [@emmenko](https://github.com/emmenko)! - Update all dependencies

* [`45e874b`](https://github.com/commercetools/commercetools-docs-kit/commit/45e874b50e5af90ef6bb733d90ba424473dadd81) [#488](https://github.com/commercetools/commercetools-docs-kit/pull/488) Thanks [@emmenko](https://github.com/emmenko)! - Do not show release notes topics filter if there are no topics.

* Updated dependencies [[`00abb72`](https://github.com/commercetools/commercetools-docs-kit/commit/00abb725dca4c7d97fa5e6bec7b6edd2bc001594)]:
  - @commercetools-docs/ui-kit@5.0.1

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
