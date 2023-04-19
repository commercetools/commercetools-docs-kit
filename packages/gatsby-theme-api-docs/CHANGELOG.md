# @commercetools-docs/gatsby-theme-api-docs

## 21.3.0

### Patch Changes

- [#1614](https://github.com/commercetools/commercetools-docs-kit/pull/1614) [`c8bf7936`](https://github.com/commercetools/commercetools-docs-kit/commit/c8bf7936804a1e5d65a8e23bae97834044d12ff6) Thanks [@timonrey](https://github.com/timonrey)! - Improves the new enum groups feature. You can now define the enum group directly in an enum group list in the raml spec.

- Updated dependencies [[`c478edd5`](https://github.com/commercetools/commercetools-docs-kit/commit/c478edd5ab3664da92195b44aef7f6ffc9daac04)]:
  - @commercetools-docs/ui-kit@21.3.0

## 21.2.0

### Minor Changes

- [#1612](https://github.com/commercetools/commercetools-docs-kit/pull/1612) [`81a583d4`](https://github.com/commercetools/commercetools-docs-kit/commit/81a583d400a852a8035750786a06d04262b52bbd) Thanks [@timonrey](https://github.com/timonrey)! - Enums can now be part of an enum group with descriptions.

### Patch Changes

- Updated dependencies [[`81a583d4`](https://github.com/commercetools/commercetools-docs-kit/commit/81a583d400a852a8035750786a06d04262b52bbd)]:
  - @commercetools-docs/gatsby-transformer-raml@13.5.0

## 21.1.4

### Patch Changes

- Updated dependencies [[`9f735b86`](https://github.com/commercetools/commercetools-docs-kit/commit/9f735b86a1ccb13cd070fcde4d960f5d82d88216)]:
  - @commercetools-docs/ui-kit@21.1.4

## 21.1.3

### Patch Changes

- [#1562](https://github.com/commercetools/commercetools-docs-kit/pull/1562) [`b47c5fe8`](https://github.com/commercetools/commercetools-docs-kit/commit/b47c5fe8ef4970e5a43784ccc5643c2478e71cf3) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - Upgrade the dependencies previously locked by renovate rules, to their latest ESM version

- Updated dependencies [[`b47c5fe8`](https://github.com/commercetools/commercetools-docs-kit/commit/b47c5fe8ef4970e5a43784ccc5643c2478e71cf3), [`fea8d809`](https://github.com/commercetools/commercetools-docs-kit/commit/fea8d8093bad979c6e4a6c1208bb0951e1ec0855)]:
  - @commercetools-docs/ui-kit@21.1.3

## 21.1.2

### Patch Changes

- [#1558](https://github.com/commercetools/commercetools-docs-kit/pull/1558) [`149e9ffd`](https://github.com/commercetools/commercetools-docs-kit/commit/149e9ffda65ec3bd8009cfc07070272e968d3b27) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - Upgrade to ESM modules

- Updated dependencies [[`149e9ffd`](https://github.com/commercetools/commercetools-docs-kit/commit/149e9ffda65ec3bd8009cfc07070272e968d3b27)]:
  - @commercetools-docs/gatsby-transformer-raml@13.4.1

## 21.1.0

### Minor Changes

- [#1545](https://github.com/commercetools/commercetools-docs-kit/pull/1545) [`1cf7f782`](https://github.com/commercetools/commercetools-docs-kit/commit/1cf7f782305780152ed35eae3e4ab963b7ba268a) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - Upgrade to Gatsby v5 (5.7.0)

- [#1531](https://github.com/commercetools/commercetools-docs-kit/pull/1531) [`0c3d133b`](https://github.com/commercetools/commercetools-docs-kit/commit/0c3d133bdd5769f85b4521fe9faeea94ec2a021b) Thanks [@nkuehn](https://github.com/nkuehn)! - - Update to node 18
  - refactor build scripts following other repos
  - update minor dependency versions
  - get lint and typecheck clean
  - fix issues that will pop up with gatsby 5 (downwards compatible)

### Patch Changes

- Updated dependencies [[`0c3d133b`](https://github.com/commercetools/commercetools-docs-kit/commit/0c3d133bdd5769f85b4521fe9faeea94ec2a021b)]:
  - @commercetools-docs/gatsby-transformer-raml@13.4.0
  - @commercetools-docs/ui-kit@21.1.0

## 21.0.0

### Major Changes

- [#1535](https://github.com/commercetools/commercetools-docs-kit/pull/1535) [`c8d5b734`](https://github.com/commercetools/commercetools-docs-kit/commit/c8d5b734603ba77bfd36c84b7f4ac3e53dab35d2) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - Revert all the changes strictly related with MDX v2 because of performance issue on local development. This version includes all the refactoring and performance optimizations implemented during MDX v2 implementation.

### Patch Changes

- Updated dependencies [[`c8d5b734`](https://github.com/commercetools/commercetools-docs-kit/commit/c8d5b734603ba77bfd36c84b7f4ac3e53dab35d2), [`28f404f3`](https://github.com/commercetools/commercetools-docs-kit/commit/28f404f377b79939bf58c039ef166c1000198a92)]:
  - @commercetools-docs/gatsby-transformer-mdx-introspection@16.0.0
  - @commercetools-docs/ui-kit@21.0.0

## 20.2.0

### Minor Changes

- [#1503](https://github.com/commercetools/commercetools-docs-kit/pull/1503) [`d78c80b1`](https://github.com/commercetools/commercetools-docs-kit/commit/d78c80b1174e47696f1630c44dcf8a0df23fb26c) Thanks [@nkuehn](https://github.com/nkuehn)! - Upgrade to React 18

### Patch Changes

- Updated dependencies [[`d78c80b1`](https://github.com/commercetools/commercetools-docs-kit/commit/d78c80b1174e47696f1630c44dcf8a0df23fb26c)]:
  - @commercetools-docs/ui-kit@20.2.0

## 20.1.1

### Patch Changes

- [#1509](https://github.com/commercetools/commercetools-docs-kit/pull/1509) [`95920fbb`](https://github.com/commercetools/commercetools-docs-kit/commit/95920fbb47979bad1f4f88accc1ea6e186339acb) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - hack to force shared components out of intermediate per-page bundles at SSR bundling time

## 20.0.2

### Patch Changes

- [#1495](https://github.com/commercetools/commercetools-docs-kit/pull/1495) [`1f8395f1`](https://github.com/commercetools/commercetools-docs-kit/commit/1f8395f15b81d5ceca475c8fcddb443fa2bdeefc) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - Ensure api location and type location are correctly loaded and filtered

## 20.0.0

### Major Changes

- [#1459](https://github.com/commercetools/commercetools-docs-kit/pull/1459) [`20e0fce1`](https://github.com/commercetools/commercetools-docs-kit/commit/20e0fce158aeb3e3983587330416cb7283a6e9c8) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - Migrate theme packages and websites to MDX v2. Deprecate gatsby-transformer-mdx-introspection package

### Patch Changes

- Updated dependencies [[`20e0fce1`](https://github.com/commercetools/commercetools-docs-kit/commit/20e0fce158aeb3e3983587330416cb7283a6e9c8)]:
  - @commercetools-docs/ui-kit@20.0.0

## 19.11.1

### Patch Changes

- [#1487](https://github.com/commercetools/commercetools-docs-kit/pull/1487) [`44d13733`](https://github.com/commercetools/commercetools-docs-kit/commit/44d1373366c22f512de43cba972b4c08bdd227c5) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - Fix UI issue with Api Type properties list displayed in Api Method page

## 19.11.0

### Minor Changes

- [#1462](https://github.com/commercetools/commercetools-docs-kit/pull/1462) [`2e4ea1cf`](https://github.com/commercetools/commercetools-docs-kit/commit/2e4ea1cfe7b7b2705664bec9e2bfbc42fe93b1d2) Thanks [@timonrey](https://github.com/timonrey)! - Enhancements for the request and response bodies: the content type is now displayed in the request and response body, the two bodies were adjusted to support images, and descriptions inside of the response body are now displayed next to the response code.

### Patch Changes

- Updated dependencies [[`3ab7b187`](https://github.com/commercetools/commercetools-docs-kit/commit/3ab7b187404347e96bea178fcea6fe9016dcab16), [`2e4ea1cf`](https://github.com/commercetools/commercetools-docs-kit/commit/2e4ea1cfe7b7b2705664bec9e2bfbc42fe93b1d2)]:
  - @commercetools-docs/ui-kit@19.11.0
  - @commercetools-docs/gatsby-transformer-raml@13.3.0

## 19.10.0

### Patch Changes

- Updated dependencies [[`598a26f9`](https://github.com/commercetools/commercetools-docs-kit/commit/598a26f967ad6a0202661d5969c315009260fc59), [`0d3cfb33`](https://github.com/commercetools/commercetools-docs-kit/commit/0d3cfb334e8a61bb3563dba4d77eb6c0467404b4), [`d052cb76`](https://github.com/commercetools/commercetools-docs-kit/commit/d052cb767f7b1d5b165b1c65fd5052fc62a2fb10)]:
  - @commercetools-docs/ui-kit@19.10.0

## 19.9.0

### Minor Changes

- [#1453](https://github.com/commercetools/commercetools-docs-kit/pull/1453) [`86feac81`](https://github.com/commercetools/commercetools-docs-kit/commit/86feac81f1127d2b5c9645147463a8d77bef33c3) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - Add sticky behaviour to code content in the right column (when in wide screen mode) for both endpoints and types

- [#1448](https://github.com/commercetools/commercetools-docs-kit/pull/1448) [`8266d506`](https://github.com/commercetools/commercetools-docs-kit/commit/8266d5064a27b8c29460e28187ac8a224d21ad5b) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - Display nicely multiple types (union) in API parameters

- [#1445](https://github.com/commercetools/commercetools-docs-kit/pull/1445) [`ae9d441a`](https://github.com/commercetools/commercetools-docs-kit/commit/ae9d441a1acf5289724281a16680795d1ea1167b) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - Add support for endpoint URN resolution in links. As per type URN, an override mechanism is provided and documented

### Patch Changes

- Updated dependencies [[`86feac81`](https://github.com/commercetools/commercetools-docs-kit/commit/86feac81f1127d2b5c9645147463a8d77bef33c3), [`8266d506`](https://github.com/commercetools/commercetools-docs-kit/commit/8266d5064a27b8c29460e28187ac8a224d21ad5b)]:
  - @commercetools-docs/ui-kit@19.9.0
  - @commercetools-docs/gatsby-transformer-raml@13.2.0

## 19.7.0

### Patch Changes

- Updated dependencies [[`e873a23a`](https://github.com/commercetools/commercetools-docs-kit/commit/e873a23a6ea9647bb09d9e43d9c535880d616d48)]:
  - @commercetools-docs/ui-kit@19.7.0

## 19.6.1

### Patch Changes

- Updated dependencies [[`a4adfb57`](https://github.com/commercetools/commercetools-docs-kit/commit/a4adfb5757e426bc652869d4c81e808962015b71)]:
  - @commercetools-docs/ui-kit@19.6.1

## 19.6.0

### Patch Changes

- [#1377](https://github.com/commercetools/commercetools-docs-kit/pull/1377) [`de6a79cb`](https://github.com/commercetools/commercetools-docs-kit/commit/de6a79cb7848165dc0eb70a86173df7360b11aa8) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies

- [#1372](https://github.com/commercetools/commercetools-docs-kit/pull/1372) [`3a86de1f`](https://github.com/commercetools/commercetools-docs-kit/commit/3a86de1ffd92ccc2d8a017fbe7dd2fd5393abe69) Thanks [@emmenko](https://github.com/emmenko)! - Migrate to new UIKit design tokens

- Updated dependencies [[`c5998ed7`](https://github.com/commercetools/commercetools-docs-kit/commit/c5998ed73228437b955e1e131897872510a9ff0c), [`de6a79cb`](https://github.com/commercetools/commercetools-docs-kit/commit/de6a79cb7848165dc0eb70a86173df7360b11aa8), [`3a86de1f`](https://github.com/commercetools/commercetools-docs-kit/commit/3a86de1ffd92ccc2d8a017fbe7dd2fd5393abe69)]:
  - @commercetools-docs/ui-kit@19.6.0
  - @commercetools-docs/gatsby-transformer-mdx-introspection@15.0.5
  - @commercetools-docs/gatsby-transformer-raml@13.1.2

## 19.5.2

### Patch Changes

- [#1367](https://github.com/commercetools/commercetools-docs-kit/pull/1367) [`1c857112`](https://github.com/commercetools/commercetools-docs-kit/commit/1c8571124b6821f1bfd63789d4612b1a93705da3) Thanks [@timonrey](https://github.com/timonrey)! - Allow Regex properties to be used with any type, not only string.

## 19.5.1

### Patch Changes

- [#1347](https://github.com/commercetools/commercetools-docs-kit/pull/1347) [`2940036f`](https://github.com/commercetools/commercetools-docs-kit/commit/2940036f7d3a29565d343b253d1f8eb11da6ed04) Thanks [@timonrey](https://github.com/timonrey)! - Adds support for post requests using the content type "application/x-www-form-urlencoded".

- Updated dependencies [[`2940036f`](https://github.com/commercetools/commercetools-docs-kit/commit/2940036f7d3a29565d343b253d1f8eb11da6ed04)]:
  - @commercetools-docs/gatsby-transformer-raml@13.1.1

## 19.5.0

### Minor Changes

- [#1331](https://github.com/commercetools/commercetools-docs-kit/pull/1331) [`9dfa5e73`](https://github.com/commercetools/commercetools-docs-kit/commit/9dfa5e7341eddafe876e33b390c4b22de64b41f3) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - When an API endpoint method response has one or more `example` nodes defined in the .raml file, those examples will be displayed in the API method page. In case no `example` nodes are defined, the response type example will be displayed instead.
  The API response code is now visible in the example code section header to help identifying what the example is referring to.

### Patch Changes

- Updated dependencies [[`9dfa5e73`](https://github.com/commercetools/commercetools-docs-kit/commit/9dfa5e7341eddafe876e33b390c4b22de64b41f3)]:
  - @commercetools-docs/gatsby-transformer-raml@13.1.0

## 19.3.0

### Minor Changes

- [#1314](https://github.com/commercetools/commercetools-docs-kit/pull/1314) [`db91f3a4`](https://github.com/commercetools/commercetools-docs-kit/commit/db91f3a4e8d8c79bda250f1d81ce0f80d33e6adc) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - The change is about the functionality of the "ribbon" icon displayed along with each section header.

  When hoverying over the icon a "Copy to clipboard" tooltip appears and, once clicked, the href pointing to that specific section is copied to the clipboard.

* [#1315](https://github.com/commercetools/commercetools-docs-kit/pull/1315) [`5cc71fa6`](https://github.com/commercetools/commercetools-docs-kit/commit/5cc71fa6c85871f12cb26bb8b8085d0db0c13f36) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - Render API method description within the ApiEndpoint method container to give hints for application of scopes and give the ability to use description to render specific error codes.

### Patch Changes

- Updated dependencies [[`db91f3a4`](https://github.com/commercetools/commercetools-docs-kit/commit/db91f3a4e8d8c79bda250f1d81ce0f80d33e6adc), [`1a60a240`](https://github.com/commercetools/commercetools-docs-kit/commit/1a60a240d3b004827485ed75e485f90aafaaea1c), [`a0c67021`](https://github.com/commercetools/commercetools-docs-kit/commit/a0c670214a231869fe999a8684c0a6c6c4508863)]:
  - @commercetools-docs/ui-kit@19.3.0
  - @commercetools-docs/gatsby-transformer-raml@13.0.4

## 19.1.0

### Minor Changes

- [#1318](https://github.com/commercetools/commercetools-docs-kit/pull/1318) [`fdeedf76`](https://github.com/commercetools/commercetools-docs-kit/commit/fdeedf7634ef2f4fbd6533913e3dfad7bf12597b) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - Improve the error handling and error message for the `transformURNLinksPlugin` function handling the case in which `typeUrl` cannot be found. The implementation prevents the unhandled error to happen and offers a more explanatory error detailing `name` and `apiKey` of the not found typeUrl.

### Patch Changes

- [#1288](https://github.com/commercetools/commercetools-docs-kit/pull/1288) [`40184fc4`](https://github.com/commercetools/commercetools-docs-kit/commit/40184fc48cdfe44de1df2c568e025a8ae55d1f85) Thanks [@renovate](https://github.com/apps/renovate)! - Update all ui-kit packages to v15

- Updated dependencies [[`40184fc4`](https://github.com/commercetools/commercetools-docs-kit/commit/40184fc48cdfe44de1df2c568e025a8ae55d1f85)]:
  - @commercetools-docs/ui-kit@19.1.0

## 19.0.0

### Patch Changes

- [#1293](https://github.com/commercetools/commercetools-docs-kit/pull/1293) [`8ff60721`](https://github.com/commercetools/commercetools-docs-kit/commit/8ff60721e180b806b6ccbd80ea302dd37a01992b) Thanks [@timonrey](https://github.com/timonrey)! - Update all gatsby dependencies.

- Updated dependencies [[`5b54ea00`](https://github.com/commercetools/commercetools-docs-kit/commit/5b54ea00aa618be2248a0640a683d493fdf8add0), [`8ff60721`](https://github.com/commercetools/commercetools-docs-kit/commit/8ff60721e180b806b6ccbd80ea302dd37a01992b)]:
  - @commercetools-docs/ui-kit@19.0.0
  - @commercetools-docs/gatsby-transformer-mdx-introspection@15.0.4
  - @commercetools-docs/gatsby-transformer-raml@13.0.3

## 18.6.0

### Patch Changes

- [#1250](https://github.com/commercetools/commercetools-docs-kit/pull/1250) [`b8f5e3a8`](https://github.com/commercetools/commercetools-docs-kit/commit/b8f5e3a828ba8d7cb581390293a88beda3105409) Thanks [@timonrey](https://github.com/timonrey)! - - Enum types are not taking the full width of the page any more in wide layout pages
  - The side column now has the correct, slightly wider, width in the wide layout to match the minimum width promised for body content.
- Updated dependencies [[`6ad663b7`](https://github.com/commercetools/commercetools-docs-kit/commit/6ad663b76bbc4d2414ebd52eb12fea5ef28efd70), [`302e94af`](https://github.com/commercetools/commercetools-docs-kit/commit/302e94af4c01d78ac782f3acf363604c679ce8b6), [`a362fa4e`](https://github.com/commercetools/commercetools-docs-kit/commit/a362fa4e614aecc7037845f6b4b52de6fd5b7813), [`a4cd66c1`](https://github.com/commercetools/commercetools-docs-kit/commit/a4cd66c10a346aacb03cc1e019d2aba009168c14)]:
  - @commercetools-docs/ui-kit@18.6.0

## 18.5.0

### Minor Changes

- [#1258](https://github.com/commercetools/commercetools-docs-kit/pull/1258) [`4f0c3984`](https://github.com/commercetools/commercetools-docs-kit/commit/4f0c3984d173fe4d77cced2c835825ffcad59487) Thanks [@renovate](https://github.com/apps/renovate)! - Update uikit dependencies

### Patch Changes

- Updated dependencies [[`4f0c3984`](https://github.com/commercetools/commercetools-docs-kit/commit/4f0c3984d173fe4d77cced2c835825ffcad59487)]:
  - @commercetools-docs/ui-kit@18.5.0

## 18.4.0

### Patch Changes

- [#1234](https://github.com/commercetools/commercetools-docs-kit/pull/1234) [`666d2b8b`](https://github.com/commercetools/commercetools-docs-kit/commit/666d2b8bd5cee0e739248e47f6723616ce147431) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

* [#1243](https://github.com/commercetools/commercetools-docs-kit/pull/1243) [`7c12b041`](https://github.com/commercetools/commercetools-docs-kit/commit/7c12b0415c33655059bc8229f8e40c14c8f43f8f) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

* Updated dependencies [[`666d2b8b`](https://github.com/commercetools/commercetools-docs-kit/commit/666d2b8bd5cee0e739248e47f6723616ce147431), [`7c12b041`](https://github.com/commercetools/commercetools-docs-kit/commit/7c12b0415c33655059bc8229f8e40c14c8f43f8f)]:
  - @commercetools-docs/ui-kit@18.4.0

## 18.3.1

### Patch Changes

- [#1231](https://github.com/commercetools/commercetools-docs-kit/pull/1231) [`2a674341`](https://github.com/commercetools/commercetools-docs-kit/commit/2a674341ec649c192e58b05bb17445308ea8a993) Thanks [@nkuehn](https://github.com/nkuehn)! - Fixes the package dependency setup for gatsby plugins referred in the theme config.

## 18.3.0

### Patch Changes

- Updated dependencies [[`2e69493b`](https://github.com/commercetools/commercetools-docs-kit/commit/2e69493bc8091d07266ba3ae3d261973b9058699)]:
  - @commercetools-docs/ui-kit@18.3.0

## 18.2.2

### Patch Changes

- [#1190](https://github.com/commercetools/commercetools-docs-kit/pull/1190) [`a494bb95`](https://github.com/commercetools/commercetools-docs-kit/commit/a494bb9563b3c967eaa7b32342c1f13daefba835) Thanks [@timonrey](https://github.com/timonrey)! - The 'minimum', 'maximum' and 'default' tags are now displayed in order.

- Updated dependencies [[`3610dc6f`](https://github.com/commercetools/commercetools-docs-kit/commit/3610dc6f692d281f1a1ad37653aed2134b40175e)]:
  - @commercetools-docs/ui-kit@18.2.2

## 18.2.1

### Patch Changes

- [#1206](https://github.com/commercetools/commercetools-docs-kit/pull/1206) [`1a5b9aae`](https://github.com/commercetools/commercetools-docs-kit/commit/1a5b9aae72652d0faef1ecb99f1642bc9ce9a4fa) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies range versions

- Updated dependencies [[`1a5b9aae`](https://github.com/commercetools/commercetools-docs-kit/commit/1a5b9aae72652d0faef1ecb99f1642bc9ce9a4fa)]:
  - @commercetools-docs/gatsby-transformer-mdx-introspection@15.0.3
  - @commercetools-docs/ui-kit@18.2.1

## 18.2.0

### Patch Changes

- [#1203](https://github.com/commercetools/commercetools-docs-kit/pull/1203) [`554d26d7`](https://github.com/commercetools/commercetools-docs-kit/commit/554d26d7784d520e6377fc1cd7137dfc729a2a66) Thanks [@emmenko](https://github.com/emmenko)! - Point READMEs to new documentation website.

* [#1198](https://github.com/commercetools/commercetools-docs-kit/pull/1198) [`fdc249d5`](https://github.com/commercetools/commercetools-docs-kit/commit/fdc249d5df2198dacea00bf26573bdbf684519f3) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

* Updated dependencies [[`554d26d7`](https://github.com/commercetools/commercetools-docs-kit/commit/554d26d7784d520e6377fc1cd7137dfc729a2a66), [`fdc249d5`](https://github.com/commercetools/commercetools-docs-kit/commit/fdc249d5df2198dacea00bf26573bdbf684519f3)]:
  - @commercetools-docs/gatsby-transformer-mdx-introspection@15.0.2
  - @commercetools-docs/gatsby-transformer-raml@13.0.2
  - @commercetools-docs/ui-kit@18.2.0

## 18.1.0

### Minor Changes

- [#1187](https://github.com/commercetools/commercetools-docs-kit/pull/1187) [`6609ee62`](https://github.com/commercetools/commercetools-docs-kit/commit/6609ee62bd6964b1c50b0042e9880d9433852bc4) Thanks [@nkuehn](https://github.com/nkuehn)! - Render enum values as string literal code formatting

* [#1177](https://github.com/commercetools/commercetools-docs-kit/pull/1177) [`4a4ed7b3`](https://github.com/commercetools/commercetools-docs-kit/commit/4a4ed7b35f0082fcc0aeac7f558cf22cace0190b) Thanks [@timonrey](https://github.com/timonrey)! - Format query parameters with regex pattern like for the regex property types.

### Patch Changes

- [#1182](https://github.com/commercetools/commercetools-docs-kit/pull/1182) [`a540653f`](https://github.com/commercetools/commercetools-docs-kit/commit/a540653f85e3b396a1b5a937997bd54aaa8fb772) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

* [#1178](https://github.com/commercetools/commercetools-docs-kit/pull/1178) [`c3e43bb4`](https://github.com/commercetools/commercetools-docs-kit/commit/c3e43bb46941ebc4805e0a70f5043a34346b7053) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies

* Updated dependencies [[`a540653f`](https://github.com/commercetools/commercetools-docs-kit/commit/a540653f85e3b396a1b5a937997bd54aaa8fb772)]:
  - @commercetools-docs/gatsby-transformer-mdx-introspection@15.0.1
  - @commercetools-docs/ui-kit@18.1.0

## 18.0.1

### Patch Changes

- [#1166](https://github.com/commercetools/commercetools-docs-kit/pull/1166) [`ca1c9c8c`](https://github.com/commercetools/commercetools-docs-kit/commit/ca1c9c8cd1793df9a27272ad88eb77032acff4c3) Thanks [@timonrey](https://github.com/timonrey)! - API type properties without descriptions render without the dash to avoid unnecessary whitespace

* [#1160](https://github.com/commercetools/commercetools-docs-kit/pull/1160) [`fb3acae6`](https://github.com/commercetools/commercetools-docs-kit/commit/fb3acae66a72ebc8d1fc5cbff83dbe498d96540f) Thanks [@nkuehn](https://github.com/nkuehn)! - Update and Improve Algolia Docsearch Setup

* Updated dependencies [[`45f78836`](https://github.com/commercetools/commercetools-docs-kit/commit/45f788361de5ba8cf2d67794ecc1b726ff5e56aa)]:
  - @commercetools-docs/ui-kit@18.0.1

## 18.0.0

### Major Changes

- [#1139](https://github.com/commercetools/commercetools-docs-kit/pull/1139) [`001e85a`](https://github.com/commercetools/commercetools-docs-kit/commit/001e85aa36d6d6d5bc0ecc0cac822ccd6d1ea38b) Thanks [@renovate](https://github.com/apps/renovate)! - Migrate to Gatsby v4 (see [official release notes](https://v4.gatsbyjs.com/docs/reference/release-notes/migrating-from-v3-to-v4) for more info).

  Running Gatsby now requires a minimal Node.js version of `4.15.0`.

### Patch Changes

- [#1127](https://github.com/commercetools/commercetools-docs-kit/pull/1127) [`abcaccf`](https://github.com/commercetools/commercetools-docs-kit/commit/abcaccf64530492ee7a788c3170e92751c5886ac) Thanks [@jenschude](https://github.com/jenschude)! - The `@commercetools-docs/rmf-codegen` package has been moved to its own repository https://github.com/commercetools/rmf-codegen.

* [#1155](https://github.com/commercetools/commercetools-docs-kit/pull/1155) [`1043390`](https://github.com/commercetools/commercetools-docs-kit/commit/1043390d8c220aa30dd6964294e374963e338d64) Thanks [@timonrey](https://github.com/timonrey)! - Add API docs theme support for HEAD and PATCH methods

- [#1145](https://github.com/commercetools/commercetools-docs-kit/pull/1145) [`424806a`](https://github.com/commercetools/commercetools-docs-kit/commit/424806a8fedeacc33b2fa9ce68a353049ef0c42a) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [#1116](https://github.com/commercetools/commercetools-docs-kit/pull/1116) [`b25c4e1`](https://github.com/commercetools/commercetools-docs-kit/commit/b25c4e16dd4cfea81c517cacda19a1b9cbbcf6e6) Thanks [@renovate](https://github.com/apps/renovate)! - update dependencies

- [#1152](https://github.com/commercetools/commercetools-docs-kit/pull/1152) [`795b5cc`](https://github.com/commercetools/commercetools-docs-kit/commit/795b5ccd3141220031c4aa3dca2f42b7b2e9d572) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade to Yarn v3

- Updated dependencies [[`ae4051a`](https://github.com/commercetools/commercetools-docs-kit/commit/ae4051a8edccae26a4d907903c743fc496cf4eba), [`001e85a`](https://github.com/commercetools/commercetools-docs-kit/commit/001e85aa36d6d6d5bc0ecc0cac822ccd6d1ea38b), [`1043390`](https://github.com/commercetools/commercetools-docs-kit/commit/1043390d8c220aa30dd6964294e374963e338d64), [`424806a`](https://github.com/commercetools/commercetools-docs-kit/commit/424806a8fedeacc33b2fa9ce68a353049ef0c42a), [`b25c4e1`](https://github.com/commercetools/commercetools-docs-kit/commit/b25c4e16dd4cfea81c517cacda19a1b9cbbcf6e6), [`795b5cc`](https://github.com/commercetools/commercetools-docs-kit/commit/795b5ccd3141220031c4aa3dca2f42b7b2e9d572), [`795b5cc`](https://github.com/commercetools/commercetools-docs-kit/commit/795b5ccd3141220031c4aa3dca2f42b7b2e9d572)]:
  - @commercetools-docs/ui-kit@18.0.0
  - @commercetools-docs/gatsby-transformer-mdx-introspection@15.0.0
  - @commercetools-docs/gatsby-transformer-raml@13.0.1

## 17.0.8

### Patch Changes

- [#1082](https://github.com/commercetools/commercetools-docs-kit/pull/1082) [`42a7393`](https://github.com/commercetools/commercetools-docs-kit/commit/42a7393ed3b3dad44a36196c5ba7d03bcaee7629) Thanks [@renovate](https://github.com/apps/renovate)! - Update all dependencies.

- Updated dependencies [[`354c165`](https://github.com/commercetools/commercetools-docs-kit/commit/354c165fd29d9c8238bdd06cc63f8560ca269f4f), [`42a7393`](https://github.com/commercetools/commercetools-docs-kit/commit/42a7393ed3b3dad44a36196c5ba7d03bcaee7629)]:
  - @commercetools-docs/gatsby-transformer-raml@13.0.0
  - @commercetools-docs/gatsby-transformer-mdx-introspection@14.0.8
  - @commercetools-docs/ui-kit@17.0.8

## 17.0.7

### Patch Changes

- [#1090](https://github.com/commercetools/commercetools-docs-kit/pull/1090) [`e7526d8`](https://github.com/commercetools/commercetools-docs-kit/commit/e7526d82f342744f285ebb296220bd2bed0d5895) Thanks [@davifantasia](https://github.com/davifantasia)! - feat: parse enum description as markdown

## 17.0.5

### Patch Changes

- [#1068](https://github.com/commercetools/commercetools-docs-kit/pull/1068) [`5010b56`](https://github.com/commercetools/commercetools-docs-kit/commit/5010b56faaa213b713d6d95f1774b29efc65d22c) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [#1074](https://github.com/commercetools/commercetools-docs-kit/pull/1074) [`e8dfa87`](https://github.com/commercetools/commercetools-docs-kit/commit/e8dfa87ec45596cb21aaa3217bfc73ca2c7a39c5) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* Updated dependencies [[`5010b56`](https://github.com/commercetools/commercetools-docs-kit/commit/5010b56faaa213b713d6d95f1774b29efc65d22c), [`80bed81`](https://github.com/commercetools/commercetools-docs-kit/commit/80bed81184c7d20b07e5c848adbef4735f777d41), [`e8dfa87`](https://github.com/commercetools/commercetools-docs-kit/commit/e8dfa87ec45596cb21aaa3217bfc73ca2c7a39c5), [`69cfb46`](https://github.com/commercetools/commercetools-docs-kit/commit/69cfb46a7dbdf0e6aa8664b475822de722e50f37)]:
  - @commercetools-docs/gatsby-transformer-mdx-introspection@14.0.7
  - @commercetools-docs/ui-kit@17.0.5
  - @commercetools-docs/gatsby-transformer-raml@12.1.0

## 17.0.4

### Patch Changes

- [#1043](https://github.com/commercetools/commercetools-docs-kit/pull/1043) [`8fcf1d2`](https://github.com/commercetools/commercetools-docs-kit/commit/8fcf1d2acb1b579c07157dd6811a5b3673e182d5) Thanks [@davifantasia](https://github.com/davifantasia)! - fix: property name and beta flag spacing

## 17.0.3

### Patch Changes

- [#1034](https://github.com/commercetools/commercetools-docs-kit/pull/1034) [`13f9e8e`](https://github.com/commercetools/commercetools-docs-kit/commit/13f9e8e30966b4717e910417e6115df1913d55ad) Thanks [@timonrey](https://github.com/timonrey)! - Use index for type locations to improve performance.

## 17.0.2

### Patch Changes

- [#1030](https://github.com/commercetools/commercetools-docs-kit/pull/1030) [`f8d04a9`](https://github.com/commercetools/commercetools-docs-kit/commit/f8d04a930f5d3c029dfb3fed0b7b1582ee64ba89) Thanks [@emmenko](https://github.com/emmenko)! - Update uikit packages to `12.2.1`

- Updated dependencies [[`f8d04a9`](https://github.com/commercetools/commercetools-docs-kit/commit/f8d04a930f5d3c029dfb3fed0b7b1582ee64ba89)]:
  - @commercetools-docs/ui-kit@17.0.2

## 17.0.1

### Patch Changes

- [#1025](https://github.com/commercetools/commercetools-docs-kit/pull/1025) [`a9aae5d`](https://github.com/commercetools/commercetools-docs-kit/commit/a9aae5da783d257a7e2cee75b8d21e37749b0274) Thanks [@davifantasia](https://github.com/davifantasia)! - feat: put request is now color-coded

## 17.0.0

### Major Changes

- [#997](https://github.com/commercetools/commercetools-docs-kit/pull/997) [`18f44a9`](https://github.com/commercetools/commercetools-docs-kit/commit/18f44a9cb27c4e0a782cb910cdeabff136cdfab2) Thanks [@nkuehn](https://github.com/nkuehn)! - Refactored the provisioning of theme extensions' components into MDX to support components that have to be imported explicitly in MDX. Auto-provided components now have to be exported via `./shortcodes` by theme add-ons.

  The API documentation is not automatically injecting its components into MDX any more to allow sites with large APIs to optimize the site performance (time to interactive).

  To migrate, all MDX pages have to explicitly import the `ApiType` and `ApiEndpoint` components. It's recommended that sites create an intermediate `/shortcodes.js` file so that the MDX import lines only read

  ```
  import { ApiType, ApiEndpoint } from "./shortcodes"
  ```

### Minor Changes

- [#1018](https://github.com/commercetools/commercetools-docs-kit/pull/1018) [`853f891`](https://github.com/commercetools/commercetools-docs-kit/commit/853f8915072f8153fd1efa266b06b66f0360717a) Thanks [@nkuehn](https://github.com/nkuehn)! - Resolve URN style links in RAML descriptions

### Patch Changes

- [#1017](https://github.com/commercetools/commercetools-docs-kit/pull/1017) [`8d25b89`](https://github.com/commercetools/commercetools-docs-kit/commit/8d25b89ea3214bb631a1a82813678d8e0e3b55a3) Thanks [@timonrey](https://github.com/timonrey)! - Refactor type-locations hook to improve performance.

* [#1023](https://github.com/commercetools/commercetools-docs-kit/pull/1023) [`4350552`](https://github.com/commercetools/commercetools-docs-kit/commit/4350552a891816ea3356bf350385eee797cd3365) Thanks [@davifantasia](https://github.com/davifantasia)! - fix: query parameters of type array now renderd as string with additional auto-generated description of usage

## 16.3.1

### Patch Changes

- [#987](https://github.com/commercetools/commercetools-docs-kit/pull/987) [`1dede6f`](https://github.com/commercetools/commercetools-docs-kit/commit/1dede6f2e025af68a1327f6a7ac2ce8f04b42598) Thanks [@nkuehn](https://github.com/nkuehn)! - Refactor API data hooks for performance

* [#991](https://github.com/commercetools/commercetools-docs-kit/pull/991) [`05c9b91`](https://github.com/commercetools/commercetools-docs-kit/commit/05c9b9108397b8f32fd82d6e8b8cbb1298fa1042) Thanks [@timonrey](https://github.com/timonrey)! - Improve performance of type location overrides

- [#978](https://github.com/commercetools/commercetools-docs-kit/pull/978) [`78bc6b0`](https://github.com/commercetools/commercetools-docs-kit/commit/78bc6b0a4c0c678fb941121b2e410bbf329065b0) Thanks [@renovate](https://github.com/apps/renovate)! - update all dependencies

* [#988](https://github.com/commercetools/commercetools-docs-kit/pull/988) [`49d2059`](https://github.com/commercetools/commercetools-docs-kit/commit/49d20592a9808efb942649840dc62fde68c22c5a) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* Updated dependencies [[`78bc6b0`](https://github.com/commercetools/commercetools-docs-kit/commit/78bc6b0a4c0c678fb941121b2e410bbf329065b0), [`49d2059`](https://github.com/commercetools/commercetools-docs-kit/commit/49d20592a9808efb942649840dc62fde68c22c5a)]:
  - @commercetools-docs/gatsby-transformer-mdx-introspection@14.0.6
  - @commercetools-docs/ui-kit@16.3.1

## 16.3.0

### Minor Changes

- [#944](https://github.com/commercetools/commercetools-docs-kit/pull/944) [`d72fafa`](https://github.com/commercetools/commercetools-docs-kit/commit/d72fafae1e5d2b6000fd36ccc6f8ab13a6d2480e) Thanks [@timonrey](https://github.com/timonrey)! - Implement manual overrides of type locations

### Patch Changes

- [#951](https://github.com/commercetools/commercetools-docs-kit/pull/951) [`fcd26ee`](https://github.com/commercetools/commercetools-docs-kit/commit/fcd26ee5d61ab1559339ce86d9c20194fdd94d9f) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [#972](https://github.com/commercetools/commercetools-docs-kit/pull/972) [`dac6330`](https://github.com/commercetools/commercetools-docs-kit/commit/dac63303c353994afcb66728309cfb254ea66da8) Thanks [@renovate](https://github.com/apps/renovate)! - update all dependencies

- [#956](https://github.com/commercetools/commercetools-docs-kit/pull/956) [`fad6d6e`](https://github.com/commercetools/commercetools-docs-kit/commit/fad6d6e29963cef930530fc5b1c233b6334a1cee) Thanks [@timonrey](https://github.com/timonrey)! - Lowercase 'parameters'

* [#964](https://github.com/commercetools/commercetools-docs-kit/pull/964) [`88e7919`](https://github.com/commercetools/commercetools-docs-kit/commit/88e7919d99fd10bb82adf5aa61fd5d541f529e65) Thanks [@timonrey](https://github.com/timonrey)! - Visualize regular expression properties

* Updated dependencies [[`fcd26ee`](https://github.com/commercetools/commercetools-docs-kit/commit/fcd26ee5d61ab1559339ce86d9c20194fdd94d9f), [`dac6330`](https://github.com/commercetools/commercetools-docs-kit/commit/dac63303c353994afcb66728309cfb254ea66da8), [`3965cba`](https://github.com/commercetools/commercetools-docs-kit/commit/3965cba917fd4b8cd375225e3794ea81e0c38669)]:
  - @commercetools-docs/gatsby-transformer-mdx-introspection@14.0.5
  - @commercetools-docs/ui-kit@16.3.0

## 16.2.0

### Patch Changes

- [#939](https://github.com/commercetools/commercetools-docs-kit/pull/939) [`6b70c61`](https://github.com/commercetools/commercetools-docs-kit/commit/6b70c61799fb612ed8bc03b4e28a81c7ffd52924) Thanks [@renovate](https://github.com/apps/renovate)! - update dependencies

* [#945](https://github.com/commercetools/commercetools-docs-kit/pull/945) [`a37b748`](https://github.com/commercetools/commercetools-docs-kit/commit/a37b7486e56ba7373b9d86d51c5e97d04ae2cb49) Thanks [@renovate](https://github.com/apps/renovate)! - update dependencies

- [#938](https://github.com/commercetools/commercetools-docs-kit/pull/938) [`9b59e9a`](https://github.com/commercetools/commercetools-docs-kit/commit/9b59e9a223e5ccf66cb221c81ee9fafce95fcd2d) Thanks [@TimonRey](https://github.com/TimonRey)! - Remove the union-type rendering feature

- Updated dependencies [[`bbd73a7`](https://github.com/commercetools/commercetools-docs-kit/commit/bbd73a78b2492a9f56761937eb29ab915a7afc46), [`a37b748`](https://github.com/commercetools/commercetools-docs-kit/commit/a37b7486e56ba7373b9d86d51c5e97d04ae2cb49), [`8d47a15`](https://github.com/commercetools/commercetools-docs-kit/commit/8d47a15bbf61c4190c3e5b877f5be3f41ca83450)]:
  - @commercetools-docs/ui-kit@16.2.0
  - @commercetools-docs/gatsby-transformer-mdx-introspection@14.0.4

## 16.1.0

### Minor Changes

- [#933](https://github.com/commercetools/commercetools-docs-kit/pull/933) [`9aa2f00`](https://github.com/commercetools/commercetools-docs-kit/commit/9aa2f0048cc79f222cdf32ce96701d4138113331) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade uikit packages to v12

### Patch Changes

- [`9c58dd9`](https://github.com/commercetools/commercetools-docs-kit/commit/9c58dd9d509f2d3abd0ef5bf1738cd67e6dd2c02) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies (ref [#927](https://github.com/commercetools/commercetools-docs-kit/pull/927), [#932](https://github.com/commercetools/commercetools-docs-kit/pull/932)).

- Updated dependencies [[`9c58dd9`](https://github.com/commercetools/commercetools-docs-kit/commit/9c58dd9d509f2d3abd0ef5bf1738cd67e6dd2c02), [`9aa2f00`](https://github.com/commercetools/commercetools-docs-kit/commit/9aa2f0048cc79f222cdf32ce96701d4138113331)]:
  - @commercetools-docs/gatsby-transformer-mdx-introspection@14.0.3
  - @commercetools-docs/ui-kit@16.1.0

## 16.0.0

### Patch Changes

- [#923](https://github.com/commercetools/commercetools-docs-kit/pull/923) [`529c35b`](https://github.com/commercetools/commercetools-docs-kit/commit/529c35bd8da4fbcb91d1125cd42f903376cc0627) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`529c35b`](https://github.com/commercetools/commercetools-docs-kit/commit/529c35bd8da4fbcb91d1125cd42f903376cc0627), [`c47e680`](https://github.com/commercetools/commercetools-docs-kit/commit/c47e680c69ff45d59bee33fde380f12d467dccf2)]:
  - @commercetools-docs/gatsby-theme-docs@16.0.0
  - @commercetools-docs/gatsby-transformer-mdx-introspection@14.0.2
  - @commercetools-docs/ui-kit@16.0.0

## 15.0.2

### Patch Changes

- [#915](https://github.com/commercetools/commercetools-docs-kit/pull/915) [`e730e88`](https://github.com/commercetools/commercetools-docs-kit/commit/e730e884428a688919563e912301825eab81acd3) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [#913](https://github.com/commercetools/commercetools-docs-kit/pull/913) [`8eb6fb3`](https://github.com/commercetools/commercetools-docs-kit/commit/8eb6fb3eb60b5bd1e110baaed7b46b1febddfa7b) Thanks [@emmenko](https://github.com/emmenko)! - Update uikit dependencies to `11.2.0`

* Updated dependencies [[`f10c62d`](https://github.com/commercetools/commercetools-docs-kit/commit/f10c62d56bcaa99efaa6e9bf753caf76bd9e78e7), [`714fa0c`](https://github.com/commercetools/commercetools-docs-kit/commit/714fa0c0f13364aed4479fc61de3adde1d2b068d), [`e730e88`](https://github.com/commercetools/commercetools-docs-kit/commit/e730e884428a688919563e912301825eab81acd3), [`8eb6fb3`](https://github.com/commercetools/commercetools-docs-kit/commit/8eb6fb3eb60b5bd1e110baaed7b46b1febddfa7b), [`379c4ba`](https://github.com/commercetools/commercetools-docs-kit/commit/379c4baaa540df17384db7f553acfe2fd713c2be)]:
  - @commercetools-docs/gatsby-theme-docs@15.0.2
  - @commercetools-docs/ui-kit@15.0.2
  - @commercetools-docs/gatsby-transformer-mdx-introspection@14.0.1

## 15.0.1

### Patch Changes

- Updated dependencies [[`df6061e`](https://github.com/commercetools/commercetools-docs-kit/commit/df6061e3812d912e38aa07b9190dd78301e448a6)]:
  - @commercetools-docs/gatsby-theme-docs@15.0.1

## 15.0.0

### Major Changes

- [#884](https://github.com/commercetools/commercetools-docs-kit/pull/884) [`ab2b717`](https://github.com/commercetools/commercetools-docs-kit/commit/ab2b717c48791df5543a66ff1cb5dde8ed31fc2e) Thanks [@renovate](https://github.com/apps/renovate)! - Migrate packages to Gatsby `v3`. Please refer to the official release notes: https://www.gatsbyjs.com/docs/reference/release-notes/v3.0/

  Note that in the docs-kit packages there are no breaking changes, except for requiring React `>=17` and NodeJS `>=14`.

### Patch Changes

- [#903](https://github.com/commercetools/commercetools-docs-kit/pull/903) [`3a94401`](https://github.com/commercetools/commercetools-docs-kit/commit/3a94401cdb0aa437448126738878a4b12b7f7381) Thanks [@emmenko](https://github.com/emmenko)! - Format ISO 31-0 number using `react-intl` instead of number format polyfill.

- Updated dependencies [[`b52dc29`](https://github.com/commercetools/commercetools-docs-kit/commit/b52dc294c48ce6fd462d6e79708fe42a4995a3d5), [`3a94401`](https://github.com/commercetools/commercetools-docs-kit/commit/3a94401cdb0aa437448126738878a4b12b7f7381), [`ab2b717`](https://github.com/commercetools/commercetools-docs-kit/commit/ab2b717c48791df5543a66ff1cb5dde8ed31fc2e)]:
  - @commercetools-docs/gatsby-theme-docs@15.0.0
  - @commercetools-docs/ui-kit@15.0.0
  - @commercetools-docs/gatsby-transformer-mdx-introspection@14.0.0

## 14.0.7

### Patch Changes

- [#896](https://github.com/commercetools/commercetools-docs-kit/pull/896) [`a093dc5`](https://github.com/commercetools/commercetools-docs-kit/commit/a093dc5dd44416b9bd400243890cd2470be45d35) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`cc59270`](https://github.com/commercetools/commercetools-docs-kit/commit/cc59270a892052ff0ec7ae2541794e69d3ae7e5b), [`a093dc5`](https://github.com/commercetools/commercetools-docs-kit/commit/a093dc5dd44416b9bd400243890cd2470be45d35), [`e3a0164`](https://github.com/commercetools/commercetools-docs-kit/commit/e3a01646f97e226d802d140b66ce1672d94a8c7a)]:
  - @commercetools-docs/ui-kit@14.0.7
  - @commercetools-docs/gatsby-theme-docs@14.0.7
  - @commercetools-docs/gatsby-transformer-mdx-introspection@13.0.3

## 14.0.6

### Patch Changes

- [`4b18472`](https://github.com/commercetools/commercetools-docs-kit/commit/4b184722e3a273303a0240f1d38f88cb0cb19bdd) [#880](https://github.com/commercetools/commercetools-docs-kit/pull/880) Thanks [@nkuehn](https://github.com/nkuehn)! - ISO 31 (international) number formating for constants and API property constraints (narrow nonbreaking space as thousands separator)

* [`09ccdd7`](https://github.com/commercetools/commercetools-docs-kit/commit/09ccdd79b853c9ea892913243647073d14da8e8b) [#881](https://github.com/commercetools/commercetools-docs-kit/pull/881) Thanks [@renovate](https://github.com/apps/renovate)! - Upgrade dependencies

* Updated dependencies [[`4b18472`](https://github.com/commercetools/commercetools-docs-kit/commit/4b184722e3a273303a0240f1d38f88cb0cb19bdd), [`09ccdd7`](https://github.com/commercetools/commercetools-docs-kit/commit/09ccdd79b853c9ea892913243647073d14da8e8b)]:
  - @commercetools-docs/ui-kit@14.0.6
  - @commercetools-docs/gatsby-theme-docs@14.0.6
  - @commercetools-docs/gatsby-transformer-mdx-introspection@13.0.2

## 14.0.5

### Patch Changes

- [`a6cc2ae`](https://github.com/commercetools/commercetools-docs-kit/commit/a6cc2ae2d2cf542fff654918798f0f1cc50f27eb) [#879](https://github.com/commercetools/commercetools-docs-kit/pull/879) Thanks [@nkuehn](https://github.com/nkuehn)! - Format union type members as heading and make them linkable

- Updated dependencies [[`898af56`](https://github.com/commercetools/commercetools-docs-kit/commit/898af56a02a30505ad0170e482378eb17c085add)]:
  - @commercetools-docs/gatsby-theme-docs@14.0.5

## 14.0.4

### Patch Changes

- [`670a475`](https://github.com/commercetools/commercetools-docs-kit/commit/670a47519a873e7f47a15fed5d58edcef9be2ef4) [#858](https://github.com/commercetools/commercetools-docs-kit/pull/858) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`b0dcc19`](https://github.com/commercetools/commercetools-docs-kit/commit/b0dcc1989983043331eb5deb77a6ba40befe51b0) [#866](https://github.com/commercetools/commercetools-docs-kit/pull/866) Thanks [@emmenko](https://github.com/emmenko)! - Update uikit versions to latest

* Updated dependencies [[`670a475`](https://github.com/commercetools/commercetools-docs-kit/commit/670a47519a873e7f47a15fed5d58edcef9be2ef4), [`b0dcc19`](https://github.com/commercetools/commercetools-docs-kit/commit/b0dcc1989983043331eb5deb77a6ba40befe51b0), [`afe3f22`](https://github.com/commercetools/commercetools-docs-kit/commit/afe3f2236007f1991d99fec609a274d7ffc7718e), [`17cdff4`](https://github.com/commercetools/commercetools-docs-kit/commit/17cdff49d6d4ac82ed0bdf65d9df8ecdd20d112a), [`7c0f15e`](https://github.com/commercetools/commercetools-docs-kit/commit/7c0f15e1ae6736e73a00b7ef39692714bb99e9ae), [`9d950ef`](https://github.com/commercetools/commercetools-docs-kit/commit/9d950ef8eaf36b19604a707f98a7e2e90f91cb8a), [`3a024e8`](https://github.com/commercetools/commercetools-docs-kit/commit/3a024e8f51a12d0030c344a6bcbb38fffdc7abc8), [`119bb8b`](https://github.com/commercetools/commercetools-docs-kit/commit/119bb8ba2cc32b6581c43e26aaa7e38063cc4529)]:
  - @commercetools-docs/gatsby-theme-docs@14.0.4
  - @commercetools-docs/gatsby-transformer-mdx-introspection@13.0.1
  - @commercetools-docs/ui-kit@14.0.4

## 14.0.3

### Patch Changes

- [`a318f55`](https://github.com/commercetools/commercetools-docs-kit/commit/a318f55874b57d3eada7b2b460936acc07c3cec9) [#854](https://github.com/commercetools/commercetools-docs-kit/pull/854) Thanks [@emmenko](https://github.com/emmenko)! - Update uikit version range to `10.45.0`

- Updated dependencies [[`a318f55`](https://github.com/commercetools/commercetools-docs-kit/commit/a318f55874b57d3eada7b2b460936acc07c3cec9), [`758bf49`](https://github.com/commercetools/commercetools-docs-kit/commit/758bf4993e5811765a6c26a65e9e8dc9d49fb00d)]:
  - @commercetools-docs/gatsby-theme-docs@14.0.3
  - @commercetools-docs/ui-kit@14.0.3

## 14.0.2

### Patch Changes

- [`f55a7f7`](https://github.com/commercetools/commercetools-docs-kit/commit/f55a7f7bf7400f631ba7b3621474170bcae002d6) [#834](https://github.com/commercetools/commercetools-docs-kit/pull/834) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`df7876c`](https://github.com/commercetools/commercetools-docs-kit/commit/df7876c0510b436fd4388e28c6aa9116e92d8778) [#844](https://github.com/commercetools/commercetools-docs-kit/pull/844) Thanks [@TimonRey](https://github.com/TimonRey)! - The gatsby dependency was downgraded due to a bug related to the javasript bundle on development.

* Updated dependencies [[`921c136`](https://github.com/commercetools/commercetools-docs-kit/commit/921c136cc5703fad7f504c5eeab033b22f0bbc1c), [`11db7cd`](https://github.com/commercetools/commercetools-docs-kit/commit/11db7cd67e367042e35937ed80167e6f57afe257), [`f55a7f7`](https://github.com/commercetools/commercetools-docs-kit/commit/f55a7f7bf7400f631ba7b3621474170bcae002d6), [`80c5efa`](https://github.com/commercetools/commercetools-docs-kit/commit/80c5efa1bfd3b3911145ce56d737e79601db9ee4), [`eeb404f`](https://github.com/commercetools/commercetools-docs-kit/commit/eeb404fb60f643ce58675368a9a11ac248e840e5), [`df7876c`](https://github.com/commercetools/commercetools-docs-kit/commit/df7876c0510b436fd4388e28c6aa9116e92d8778), [`5336b99`](https://github.com/commercetools/commercetools-docs-kit/commit/5336b9977734fdda6f4a1f3359cfd52ea4a68c06)]:
  - @commercetools-docs/gatsby-theme-docs@14.0.2
  - @commercetools-docs/ui-kit@14.0.2

## 14.0.1

### Patch Changes

- [`857965e`](https://github.com/commercetools/commercetools-docs-kit/commit/857965e1d3413f245c377e4065fa55aa0ea2785b) [#826](https://github.com/commercetools/commercetools-docs-kit/pull/826) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`68592d2`](https://github.com/commercetools/commercetools-docs-kit/commit/68592d2eaf5cfc71ab5b0e6dd6a0d13455b2a428), [`857965e`](https://github.com/commercetools/commercetools-docs-kit/commit/857965e1d3413f245c377e4065fa55aa0ea2785b)]:
  - @commercetools-docs/gatsby-transformer-raml@12.0.1
  - @commercetools-docs/gatsby-theme-docs@14.0.1

## 14.0.0

### Minor Changes

- [`d435f41`](https://github.com/commercetools/commercetools-docs-kit/commit/d435f414cb6a94ef7c02f1ea907b7ba8cdf294ea) [#813](https://github.com/commercetools/commercetools-docs-kit/pull/813) Thanks [@renovate](https://github.com/apps/renovate)! - Update to gatsby >= `2.30`. See https://www.gatsbyjs.com/docs/reference/release-notes/v2.30/

### Patch Changes

- Updated dependencies [[`d435f41`](https://github.com/commercetools/commercetools-docs-kit/commit/d435f414cb6a94ef7c02f1ea907b7ba8cdf294ea)]:
  - @commercetools-docs/gatsby-theme-docs@14.0.0
  - @commercetools-docs/ui-kit@14.0.0

## 13.0.1

### Patch Changes

- Updated dependencies [[`90a71dc`](https://github.com/commercetools/commercetools-docs-kit/commit/90a71dca81f1a8286b062066f6fff837c02659d8)]:
  - @commercetools-docs/gatsby-theme-docs@13.0.1
  - @commercetools-docs/ui-kit@13.0.1

## 13.0.0

### Patch Changes

- [`999785f`](https://github.com/commercetools/commercetools-docs-kit/commit/999785f36b916e2cf19e7c6a12f1641dcfc30e7a) [#804](https://github.com/commercetools/commercetools-docs-kit/pull/804) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`4232fe6`](https://github.com/commercetools/commercetools-docs-kit/commit/4232fe601e6f8e3688514e60237b8ac3e8b79757) [#809](https://github.com/commercetools/commercetools-docs-kit/pull/809) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* Updated dependencies [[`999785f`](https://github.com/commercetools/commercetools-docs-kit/commit/999785f36b916e2cf19e7c6a12f1641dcfc30e7a), [`a93fb0d`](https://github.com/commercetools/commercetools-docs-kit/commit/a93fb0da261735f9bdfcd38baa15de948072eab7), [`47020a1`](https://github.com/commercetools/commercetools-docs-kit/commit/47020a1ec78aeb3f0d98de5b3a90ded66fa95b14), [`4232fe6`](https://github.com/commercetools/commercetools-docs-kit/commit/4232fe601e6f8e3688514e60237b8ac3e8b79757)]:
  - @commercetools-docs/gatsby-theme-docs@13.0.0
  - @commercetools-docs/gatsby-transformer-mdx-introspection@13.0.0
  - @commercetools-docs/ui-kit@13.0.0

## 12.0.1

### Patch Changes

- [`ea147fa`](https://github.com/commercetools/commercetools-docs-kit/commit/ea147fab4fb63b27144da48cb0f4808bc4683747) [#793](https://github.com/commercetools/commercetools-docs-kit/pull/793) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`fb83e48`](https://github.com/commercetools/commercetools-docs-kit/commit/fb83e48fc313f3244f6ffe848a111be00206d529), [`ea147fa`](https://github.com/commercetools/commercetools-docs-kit/commit/ea147fab4fb63b27144da48cb0f4808bc4683747), [`98c83db`](https://github.com/commercetools/commercetools-docs-kit/commit/98c83dbc75953921fb25284841aef1e9c19b7921), [`84fcfd2`](https://github.com/commercetools/commercetools-docs-kit/commit/84fcfd2593d392d93d7348f59d683dbfea601d8b)]:
  - @commercetools-docs/gatsby-theme-docs@12.0.1
  - @commercetools-docs/gatsby-transformer-mdx-introspection@12.0.1
  - @commercetools-docs/ui-kit@12.0.1

## 12.0.0

### Patch Changes

- [`49953f2`](https://github.com/commercetools/commercetools-docs-kit/commit/49953f254addc795b52290d32df884b028669e75) [#778](https://github.com/commercetools/commercetools-docs-kit/pull/778) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

* [`1b92bbc`](https://github.com/commercetools/commercetools-docs-kit/commit/1b92bbc0941fe4631d74a34561b1e722dd4013ec) [#788](https://github.com/commercetools/commercetools-docs-kit/pull/788) Thanks [@davifantasia](https://github.com/davifantasia)! - feat: Query parameter "Array" type now renders as `Array of <object>`, and markdown in it's description is parsed appropirately.

- [`45c7306`](https://github.com/commercetools/commercetools-docs-kit/commit/45c73068573b1717c6f3ae810a6927657943c9a0) [#760](https://github.com/commercetools/commercetools-docs-kit/pull/760) Thanks [@nkuehn](https://github.com/nkuehn)! - Add new rmf-codegen package as replacement to ramldoc-generator. The new package directly exposes rmf-codegen with all features and available options instead of wrapping one specific call in a custom CLI.

* [`3b48184`](https://github.com/commercetools/commercetools-docs-kit/commit/3b48184e6ea7d148cf22d18d4abb075b2db04d40) [#791](https://github.com/commercetools/commercetools-docs-kit/pull/791) Thanks [@davifantasia](https://github.com/davifantasia)! - Update all minor and patch dependencies.

* Updated dependencies [[`bc0d76f`](https://github.com/commercetools/commercetools-docs-kit/commit/bc0d76f8a23d1a281afd4674c2c429ab27529275), [`49953f2`](https://github.com/commercetools/commercetools-docs-kit/commit/49953f254addc795b52290d32df884b028669e75), [`1b92bbc`](https://github.com/commercetools/commercetools-docs-kit/commit/1b92bbc0941fe4631d74a34561b1e722dd4013ec), [`c26ba76`](https://github.com/commercetools/commercetools-docs-kit/commit/c26ba76e3ecf16212918c2a347744f950031fcde), [`45c7306`](https://github.com/commercetools/commercetools-docs-kit/commit/45c73068573b1717c6f3ae810a6927657943c9a0), [`bc0d76f`](https://github.com/commercetools/commercetools-docs-kit/commit/bc0d76f8a23d1a281afd4674c2c429ab27529275), [`1771b58`](https://github.com/commercetools/commercetools-docs-kit/commit/1771b58de798986eb97fbaa66b87123bfcc5c900), [`3b48184`](https://github.com/commercetools/commercetools-docs-kit/commit/3b48184e6ea7d148cf22d18d4abb075b2db04d40)]:
  - @commercetools-docs/gatsby-theme-docs@12.0.0
  - @commercetools-docs/ui-kit@12.0.0
  - @commercetools-docs/gatsby-transformer-mdx-introspection@12.0.0
  - @commercetools-docs/gatsby-transformer-raml@12.0.0

## 11.0.3

### Patch Changes

- Updated dependencies [[`e72f61f`](https://github.com/commercetools/commercetools-docs-kit/commit/e72f61fa94726ef29fc6122ab1fe7b85df4d772f)]:
  - @commercetools-docs/gatsby-theme-docs@11.0.3

## 11.0.2

### Patch Changes

- [`4c558b9`](https://github.com/commercetools/commercetools-docs-kit/commit/4c558b9b9c5d99691d618813bdb6c4ecaec50069) [#766](https://github.com/commercetools/commercetools-docs-kit/pull/766) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update all dependencies

- Updated dependencies [[`ae7263e`](https://github.com/commercetools/commercetools-docs-kit/commit/ae7263e34c13ae3d1c6944f472cbabceda68bbf8), [`4c558b9`](https://github.com/commercetools/commercetools-docs-kit/commit/4c558b9b9c5d99691d618813bdb6c4ecaec50069), [`deac3ac`](https://github.com/commercetools/commercetools-docs-kit/commit/deac3ac8372187a5eb3e96a8561eca190373f2cc), [`cde8175`](https://github.com/commercetools/commercetools-docs-kit/commit/cde8175c9305280fd1961d0e10f1b22deb18bd66), [`a838f51`](https://github.com/commercetools/commercetools-docs-kit/commit/a838f518e1a002d7978e5cc12bfd06335ada2ed6), [`e99bf1a`](https://github.com/commercetools/commercetools-docs-kit/commit/e99bf1a6678960ae6a466d387f13f279f2e973c4)]:
  - @commercetools-docs/gatsby-theme-docs@11.0.2
  - @commercetools-docs/ui-kit@11.0.2

## 11.0.1

### Patch Changes

- Updated dependencies [[`53b83c7`](https://github.com/commercetools/commercetools-docs-kit/commit/53b83c766ab651e1cf7d46116c942c3232daf905), [`b3a3911`](https://github.com/commercetools/commercetools-docs-kit/commit/b3a39119987baf7d9bd58c464ed198c9710cc8bb)]:
  - @commercetools-docs/gatsby-theme-docs@11.0.1
  - @commercetools-docs/ui-kit@11.0.1

## 11.0.0

### Minor Changes

- [`b868afb`](https://github.com/commercetools/commercetools-docs-kit/commit/b868afb18542efbae1741ce7f34ac0b6cace2041) [#752](https://github.com/commercetools/commercetools-docs-kit/pull/752) Thanks [@renovate](https://github.com/apps/renovate)! - Migrate to emotion v11. https://emotion.sh/docs/emotion-11

  Additionally, some peer dependencies changed:

  - The `@commercetools-docs/gatsby-theme-api-docs` does not require the peer dependencies `@emotion/core`, and `@emotion/styled`, as they are now included in the package's dependencies.
  - The `@commercetools-docs/gatsby-theme-docs` does not require the peer dependencies `@emotion/core`, and `@emotion/styled`, as they are now included in the package's dependencies.
  - The `@commercetools-docs/ui-kit` does not require the peer dependencies `@commercetools-uikit/design-system`, `@commercetools-uikit/icons`, `@commercetools-uikit/spacings-inline`, `@emotion/core`, and `@emotion/styled`, as they are now included in the package's dependencies.

### Patch Changes

- [`b6530d9`](https://github.com/commercetools/commercetools-docs-kit/commit/b6530d9471ffe48f447d643b158afe4e72a0888f) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies https://github.com/commercetools/commercetools-docs-kit/pull/751

- Updated dependencies [[`791d3dc`](https://github.com/commercetools/commercetools-docs-kit/commit/791d3dcecbc5ed4984bf4cef7daa5bee92ad0514), [`b868afb`](https://github.com/commercetools/commercetools-docs-kit/commit/b868afb18542efbae1741ce7f34ac0b6cace2041), [`b6530d9`](https://github.com/commercetools/commercetools-docs-kit/commit/b6530d9471ffe48f447d643b158afe4e72a0888f), [`7db947b`](https://github.com/commercetools/commercetools-docs-kit/commit/7db947b3efe69efbcd6dfe8826d408c955c56552)]:
  - @commercetools-docs/gatsby-theme-docs@11.0.0
  - @commercetools-docs/ui-kit@11.0.0
  - @commercetools-docs/gatsby-transformer-mdx-introspection@11.0.0

## 10.0.2

### Patch Changes

- [`24caa5f`](https://github.com/commercetools/commercetools-docs-kit/commit/24caa5ff2121cfe3a980ef5af74675155965ff2e) [#739](https://github.com/commercetools/commercetools-docs-kit/pull/739) Thanks [@renovate](https://github.com/apps/renovate)! - chore: update dependencies

- Updated dependencies [[`24caa5f`](https://github.com/commercetools/commercetools-docs-kit/commit/24caa5ff2121cfe3a980ef5af74675155965ff2e), [`d292d22`](https://github.com/commercetools/commercetools-docs-kit/commit/d292d22275fd6cf9b316073cfcddb98b7ae055d8)]:
  - @commercetools-docs/gatsby-theme-docs@10.0.2
  - @commercetools-docs/gatsby-transformer-mdx-introspection@10.0.2
  - @commercetools-docs/gatsby-transformer-raml@10.0.2
  - @commercetools-docs/ui-kit@10.0.2

## 10.0.1

### Patch Changes

- Updated dependencies [[`b1190b5`](https://github.com/commercetools/commercetools-docs-kit/commit/b1190b593ce63b2eb3ac4d62f36d7717d35525bf)]:
  - @commercetools-docs/gatsby-theme-docs@10.0.1
  - @commercetools-docs/ui-kit@10.0.1

## 10.0.0

### Minor Changes

- [`c88565b`](https://github.com/commercetools/commercetools-docs-kit/commit/c88565bb932a872b60614f999d711b82faf718ac) [#727](https://github.com/commercetools/commercetools-docs-kit/pull/727) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update react monorepo to v17 (major)

### Patch Changes

- [`71dfbe4`](https://github.com/commercetools/commercetools-docs-kit/commit/71dfbe4edf48225efeebe350bee0da4684bf60e1) [#724](https://github.com/commercetools/commercetools-docs-kit/pull/724) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

- Updated dependencies [[`94ffef6`](https://github.com/commercetools/commercetools-docs-kit/commit/94ffef67f2d6408c3661374e510d8f000644be5a), [`a4df2b7`](https://github.com/commercetools/commercetools-docs-kit/commit/a4df2b7e286cdedd8383321273ed1e6fe184bee2), [`c88565b`](https://github.com/commercetools/commercetools-docs-kit/commit/c88565bb932a872b60614f999d711b82faf718ac), [`f00c430`](https://github.com/commercetools/commercetools-docs-kit/commit/f00c43023f0701e632a98fd364ce4da2213dbfc5), [`71dfbe4`](https://github.com/commercetools/commercetools-docs-kit/commit/71dfbe4edf48225efeebe350bee0da4684bf60e1)]:
  - @commercetools-docs/gatsby-theme-docs@10.0.0
  - @commercetools-docs/ui-kit@10.0.0
  - @commercetools-docs/gatsby-transformer-mdx-introspection@10.0.0

## 9.0.0

### Minor Changes

- [`eae4427`](https://github.com/commercetools/commercetools-docs-kit/commit/eae44272fe9e7f7a9caaa7cf299856b831d6a9e5) [#716](https://github.com/commercetools/commercetools-docs-kit/pull/716) Thanks [@davifantasia](https://github.com/davifantasia)! - feat: render inherited properties from parent types, also includes `hideInheritedProperties` for `ApiType` which hides inherited properties from parent type except the discriminator

### Patch Changes

- [`af0d313`](https://github.com/commercetools/commercetools-docs-kit/commit/af0d313567d94f32b1b397b48df514893e04c1cb) [#692](https://github.com/commercetools/commercetools-docs-kit/pull/692) Thanks [@davifantasia](https://github.com/davifantasia)! - Endpoint design implementation.

- Updated dependencies [[`047f4cc`](https://github.com/commercetools/commercetools-docs-kit/commit/047f4ccaf5942b06a40412dbc1c472acd5d542a6), [`1d84a91`](https://github.com/commercetools/commercetools-docs-kit/commit/1d84a915a21203f2deb3c1395f941c14fa1ae4e6), [`459ef12`](https://github.com/commercetools/commercetools-docs-kit/commit/459ef126f2297ef46c38d7297f4f528edbaab2a5), [`73c843e`](https://github.com/commercetools/commercetools-docs-kit/commit/73c843e52caca2b9b7fc90d3f2355672b540431d), [`168d064`](https://github.com/commercetools/commercetools-docs-kit/commit/168d064f74eb043af873ca2d3ddc984a61d3ef43), [`9b69b27`](https://github.com/commercetools/commercetools-docs-kit/commit/9b69b275c762aa49f84bf38ea85791390a12aff1), [`7f73056`](https://github.com/commercetools/commercetools-docs-kit/commit/7f73056c2fc9ee1df717d2af08195c752f63994a), [`af0d313`](https://github.com/commercetools/commercetools-docs-kit/commit/af0d313567d94f32b1b397b48df514893e04c1cb), [`6ca154c`](https://github.com/commercetools/commercetools-docs-kit/commit/6ca154c3dbc452c6c031c55212018f669f24d9d9), [`dad7828`](https://github.com/commercetools/commercetools-docs-kit/commit/dad7828c59dffba4b84606f7ba589bb7a2c662b1), [`eae4427`](https://github.com/commercetools/commercetools-docs-kit/commit/eae44272fe9e7f7a9caaa7cf299856b831d6a9e5), [`39bf45d`](https://github.com/commercetools/commercetools-docs-kit/commit/39bf45d35bb554899aaf7c05ca0da56963d7f5d3), [`1a99ee3`](https://github.com/commercetools/commercetools-docs-kit/commit/1a99ee34f7d00e55fdfb045570f8cb1bd44ceaca)]:
  - @commercetools-docs/gatsby-theme-docs@9.0.0
  - @commercetools-docs/ui-kit@9.0.0
  - @commercetools-docs/gatsby-transformer-raml@9.0.0

## 8.0.1

### Patch Changes

- Updated dependencies [[`cb51dfa`](https://github.com/commercetools/commercetools-docs-kit/commit/cb51dfaa08f090081e6180e99a1879281836f71a)]:
  - @commercetools-docs/gatsby-theme-docs@8.0.1

## 8.0.0

### Patch Changes

- Updated dependencies [[`f189cc4`](https://github.com/commercetools/commercetools-docs-kit/commit/f189cc43a794c20595b5d4692f0a429f4872550a), [`849af3c`](https://github.com/commercetools/commercetools-docs-kit/commit/849af3cba129641d1799a5081b2ba6a4141cbc7e), [`12470b9`](https://github.com/commercetools/commercetools-docs-kit/commit/12470b97de700bc0fa4ea47d6ccdbc69a20941c9), [`a478cf2`](https://github.com/commercetools/commercetools-docs-kit/commit/a478cf26f688f935e86c72ccf028d967d4ed903d), [`30ac9e3`](https://github.com/commercetools/commercetools-docs-kit/commit/30ac9e396de85f4f24276c646753514b2a93a721), [`2952f1a`](https://github.com/commercetools/commercetools-docs-kit/commit/2952f1afc4d30845634fa909e1ba80026c29ebde)]:
  - @commercetools-docs/gatsby-theme-docs@8.0.0
  - @commercetools-docs/ui-kit@8.0.0

## 7.0.6

### Patch Changes

- [`386117c`](https://github.com/commercetools/commercetools-docs-kit/commit/386117ced08531af7007ff6b7aac738a78cf4496) [#620](https://github.com/commercetools/commercetools-docs-kit/pull/620) Thanks [@davifantasia](https://github.com/davifantasia)! - Changes here is the last or 3 parts to:

  - render request and response examples and
  - fix broken ui for types rendered in endpoints using a large desktop layout

- Updated dependencies [[`386117c`](https://github.com/commercetools/commercetools-docs-kit/commit/386117ced08531af7007ff6b7aac738a78cf4496), [`7248f86`](https://github.com/commercetools/commercetools-docs-kit/commit/7248f867eb1da1ade1301ed50d54e102f7839ec0)]:
  - @commercetools-docs/gatsby-theme-docs@7.0.6

## 7.0.5

### Patch Changes

- [`288ac41`](https://github.com/commercetools/commercetools-docs-kit/commit/288ac4121e17d69a8dcbb361043686908273f64f) [#624](https://github.com/commercetools/commercetools-docs-kit/pull/624) Thanks [@renovate](https://github.com/apps/renovate)! - chore: update dependencies

- Updated dependencies [[`f9cd4d4`](https://github.com/commercetools/commercetools-docs-kit/commit/f9cd4d4d41fee1f81689eab63ee9ae04315a9627), [`288ac41`](https://github.com/commercetools/commercetools-docs-kit/commit/288ac4121e17d69a8dcbb361043686908273f64f), [`a413bd9`](https://github.com/commercetools/commercetools-docs-kit/commit/a413bd99f6ac7c87363802dde999c29ed79931f0)]:
  - @commercetools-docs/gatsby-theme-docs@7.0.5
  - @commercetools-docs/gatsby-transformer-mdx-introspection@3.0.5
  - @commercetools-docs/ui-kit@7.0.5

## 7.0.4

### Patch Changes

- [`551c9bb`](https://github.com/commercetools/commercetools-docs-kit/commit/551c9bb0436215ca332c91e1a569471c878a3a8f) [#616](https://github.com/commercetools/commercetools-docs-kit/pull/616) Thanks [@emmenko](https://github.com/emmenko)! - Update UI Kit dependencies

- Updated dependencies [[`551c9bb`](https://github.com/commercetools/commercetools-docs-kit/commit/551c9bb0436215ca332c91e1a569471c878a3a8f)]:
  - @commercetools-docs/gatsby-theme-docs@7.0.4
  - @commercetools-docs/ui-kit@7.0.4

## 7.0.3

### Patch Changes

- Updated dependencies [[`2dd19f2`](https://github.com/commercetools/commercetools-docs-kit/commit/2dd19f2e8a60c55bfd87f72ec8b8ca79fbdbbc52), [`fed7a9b`](https://github.com/commercetools/commercetools-docs-kit/commit/fed7a9b6e375f53750df78b1989ea8c67482516c), [`b5aa043`](https://github.com/commercetools/commercetools-docs-kit/commit/b5aa043f4d7655ee51322cb04df6ac766a311f9f), [`e1df4de`](https://github.com/commercetools/commercetools-docs-kit/commit/e1df4de7e0c0d970f52bc56f463a48e8b260ecba)]:
  - @commercetools-docs/gatsby-theme-docs@7.0.3
  - @commercetools-docs/ui-kit@7.0.3
  - @commercetools-docs/gatsby-transformer-raml@3.0.2

## 7.0.2

### Patch Changes

- [`aa9e848`](https://github.com/commercetools/commercetools-docs-kit/commit/aa9e8485454a2e18024772192c37979756af9167) [#592](https://github.com/commercetools/commercetools-docs-kit/pull/592) Thanks [@renovate](https://github.com/apps/renovate)! - chore: update dependencies

- Updated dependencies [[`aa9e848`](https://github.com/commercetools/commercetools-docs-kit/commit/aa9e8485454a2e18024772192c37979756af9167)]:
  - @commercetools-docs/gatsby-theme-docs@7.0.2
  - @commercetools-docs/gatsby-transformer-mdx-introspection@3.0.4
  - @commercetools-docs/ui-kit@7.0.2

## 7.0.1

### Patch Changes

- [`cebd5c9`](https://github.com/commercetools/commercetools-docs-kit/commit/cebd5c9d6c0d294f1335580f18d728b5eac4aa15) [#588](https://github.com/commercetools/commercetools-docs-kit/pull/588) Thanks [@emmenko](https://github.com/emmenko)! - Use version range for gatsby docs peer deps

- Updated dependencies [[`50ce1d6`](https://github.com/commercetools/commercetools-docs-kit/commit/50ce1d67c560a8b42e47e9894d562077ca0f92b5), [`50ce1d6`](https://github.com/commercetools/commercetools-docs-kit/commit/50ce1d67c560a8b42e47e9894d562077ca0f92b5)]:
  - @commercetools-docs/ui-kit@7.0.1
  - @commercetools-docs/gatsby-theme-docs@7.0.1

## 7.0.0

### Patch Changes

- [`bf583d6`](https://github.com/commercetools/commercetools-docs-kit/commit/bf583d67ef763bc10dc2c872a74f20c14834834b) [#561](https://github.com/commercetools/commercetools-docs-kit/pull/561) Thanks [@davifantasia](https://github.com/davifantasia)! - Render constant (single value enum) pattern in type properties. Types are also consistently rendered whether they are rendered as sub types of a union like or as stand alone.

- Updated dependencies [[`bfc81c9`](https://github.com/commercetools/commercetools-docs-kit/commit/bfc81c9916692e4391e10217ac35ea12ac709301), [`ff1246e`](https://github.com/commercetools/commercetools-docs-kit/commit/ff1246e5e204181c21b6767239fa3cb788a4c0ee), [`79ca608`](https://github.com/commercetools/commercetools-docs-kit/commit/79ca6087b4ed32fbc781ce0797538f60c6860419), [`f06192c`](https://github.com/commercetools/commercetools-docs-kit/commit/f06192c544987a431094fd9b2d77ffa07ac46ead), [`8b44418`](https://github.com/commercetools/commercetools-docs-kit/commit/8b444189da90b5def5c71cc975818b730baaeca7), [`a592bdf`](https://github.com/commercetools/commercetools-docs-kit/commit/a592bdfdd3720b39501bfe6981eeed9ba55e6941)]:
  - @commercetools-docs/gatsby-theme-docs@7.0.0
  - @commercetools-docs/ui-kit@7.0.0

## 6.0.2

### Patch Changes

- [`9d36ae3`](https://github.com/commercetools/commercetools-docs-kit/commit/9d36ae3445a2146808695110317a687e7f463d87) [#547](https://github.com/commercetools/commercetools-docs-kit/pull/547) Thanks [@davifantasia](https://github.com/davifantasia)! - fix: for undefined enum description that causes build failure in microsites that depend on gatsby-theme-api-docs

## 6.0.1

### Patch Changes

- Updated dependencies [[`1311970`](https://github.com/commercetools/commercetools-docs-kit/commit/1311970bb9e69f3646caec077146480255be165d)]:
  - @commercetools-docs/gatsby-theme-docs@6.0.1

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

* [`1919f39`](https://github.com/commercetools/commercetools-docs-kit/commit/1919f391e824222963eca3807d9d961c3bcf9842) [#533](https://github.com/commercetools/commercetools-docs-kit/pull/533) Thanks [@emmenko](https://github.com/emmenko)! - Use non oppressive language. The `tagWhitelist` option for the `gatsby-transformer-mdx-introspection` has been deprecated in favor of `tagList`.

- [`fb16ae5`](https://github.com/commercetools/commercetools-docs-kit/commit/fb16ae56a69f7ccc8761dca287590e15bc329bfc) [#535](https://github.com/commercetools/commercetools-docs-kit/pull/535) Thanks [@davifantasia](https://github.com/davifantasia)! - refactor: render enums as a definition list

- Updated dependencies [[`411d6e6`](https://github.com/commercetools/commercetools-docs-kit/commit/411d6e62eff4a6a3804b040c17a39116333b435b), [`2703f63`](https://github.com/commercetools/commercetools-docs-kit/commit/2703f63ec320ea6c79bdc5608bcd240d59d7c2b3), [`0a61e96`](https://github.com/commercetools/commercetools-docs-kit/commit/0a61e9691ca58322107b5798cd08321df9d51a95), [`76db6f7`](https://github.com/commercetools/commercetools-docs-kit/commit/76db6f7d3dc67c06895259a0e01fd1d7a70f8fac), [`deb72f1`](https://github.com/commercetools/commercetools-docs-kit/commit/deb72f1a055d8bbd11bcb7e5bbdc26359044874c), [`1919f39`](https://github.com/commercetools/commercetools-docs-kit/commit/1919f391e824222963eca3807d9d961c3bcf9842), [`ca7d387`](https://github.com/commercetools/commercetools-docs-kit/commit/ca7d387ceb82edc9d296517f0e0854146b047d4f)]:
  - @commercetools-docs/gatsby-theme-docs@6.0.0
  - @commercetools-docs/ui-kit@6.0.0
  - @commercetools-docs/gatsby-transformer-mdx-introspection@3.0.3

## 5.0.3

### Patch Changes

- Updated dependencies [[`065391d`](https://github.com/commercetools/commercetools-docs-kit/commit/065391dc77e610c3202e9b9f871f16ff5565b681), [`a1674bd`](https://github.com/commercetools/commercetools-docs-kit/commit/a1674bd294018c8768248826aacd68e708eb882a), [`b6b58e0`](https://github.com/commercetools/commercetools-docs-kit/commit/b6b58e0ec07aa7f877c0037a312c47b34d4b1e51)]:
  - @commercetools-docs/ui-kit@5.0.3
  - @commercetools-docs/gatsby-theme-docs@5.0.3

## 5.0.2

### Patch Changes

- Updated dependencies [[`c0b74d5`](https://github.com/commercetools/commercetools-docs-kit/commit/c0b74d5bd16ef6db8a7ab3844b292dc4daff425d), [`b0fd7bc`](https://github.com/commercetools/commercetools-docs-kit/commit/b0fd7bc0f8daa77b9d5c360f8e9161d92ec94457)]:
  - @commercetools-docs/ui-kit@5.0.2
  - @commercetools-docs/gatsby-theme-docs@5.0.2

## 5.0.1

### Patch Changes

- [`00abb72`](https://github.com/commercetools/commercetools-docs-kit/commit/00abb725dca4c7d97fa5e6bec7b6edd2bc001594) Thanks [@emmenko](https://github.com/emmenko)! - Update all dependencies

* [`262053d`](https://github.com/commercetools/commercetools-docs-kit/commit/262053d351e5478a19cf21a8e2c11d3f2e80c8b4) [#492](https://github.com/commercetools/commercetools-docs-kit/pull/492) Thanks [@davifantasia](https://github.com/davifantasia)! - refactor: render api type examples with title

* Updated dependencies [[`00abb72`](https://github.com/commercetools/commercetools-docs-kit/commit/00abb725dca4c7d97fa5e6bec7b6edd2bc001594), [`45e874b`](https://github.com/commercetools/commercetools-docs-kit/commit/45e874b50e5af90ef6bb733d90ba424473dadd81)]:
  - @commercetools-docs/gatsby-theme-docs@5.0.1
  - @commercetools-docs/ui-kit@5.0.1

## 5.0.0

### Minor Changes

- [`ca5d835`](https://github.com/commercetools/commercetools-docs-kit/commit/ca5d835da62191eb2343eb7bcfb57985f23eb186) [#455](https://github.com/commercetools/commercetools-docs-kit/pull/455) Thanks [@nkuehn](https://github.com/nkuehn)! - - New visual arrangement of API endpoints
  - optimize responsiveness of API docs in many places
  - implement beta tag on properties
  - visual framing for property value constraints

### Patch Changes

- Updated dependencies [[`4e69047`](https://github.com/commercetools/commercetools-docs-kit/commit/4e690472d48135461ab3b1fa5b6fcdfc789e19a2), [`3dd84ca`](https://github.com/commercetools/commercetools-docs-kit/commit/3dd84ca932145271cc6dba0e79d5e129a4e5a090), [`6b19dbc`](https://github.com/commercetools/commercetools-docs-kit/commit/6b19dbc32d60954e0c741757045e1805b32cb001), [`08e13cd`](https://github.com/commercetools/commercetools-docs-kit/commit/08e13cd4bf505dbc6124077bc794a0777ffa88f3), [`8c1a43e`](https://github.com/commercetools/commercetools-docs-kit/commit/8c1a43e61e1050db0fe4aa61cbcda3bf2d978a46), [`e58e26a`](https://github.com/commercetools/commercetools-docs-kit/commit/e58e26a0399afc6a86a49721971a5999b2df25b7)]:
  - @commercetools-docs/gatsby-theme-docs@5.0.0
  - @commercetools-docs/ui-kit@5.0.0

## 4.0.1

### Patch Changes

- [`2e3ef6b`](https://github.com/commercetools/commercetools-docs-kit/commit/2e3ef6b0e7bc587de3308c94381a38b0c70b86ca) [#465](https://github.com/commercetools/commercetools-docs-kit/pull/465) Thanks [@emmenko](https://github.com/emmenko)! - Update `@commercetools-uikit/*` packages to `10.21.0`.

- Updated dependencies [[`2e3ef6b`](https://github.com/commercetools/commercetools-docs-kit/commit/2e3ef6b0e7bc587de3308c94381a38b0c70b86ca), [`2e3ef6b`](https://github.com/commercetools/commercetools-docs-kit/commit/2e3ef6b0e7bc587de3308c94381a38b0c70b86ca), [`2e3ef6b`](https://github.com/commercetools/commercetools-docs-kit/commit/2e3ef6b0e7bc587de3308c94381a38b0c70b86ca)]:
  - @commercetools-docs/gatsby-theme-docs@4.1.1
  - @commercetools-docs/gatsby-transformer-mdx-introspection@3.0.2
  - @commercetools-docs/gatsby-transformer-raml@3.0.1
  - @commercetools-docs/ui-kit@3.1.1

## 4.0.0

### Patch Changes

- Updated dependencies [[`6206775`](https://github.com/commercetools/commercetools-docs-kit/commit/620677547ea378038309ac508872dd889383c4c8), [`6206775`](https://github.com/commercetools/commercetools-docs-kit/commit/620677547ea378038309ac508872dd889383c4c8), [`6206775`](https://github.com/commercetools/commercetools-docs-kit/commit/620677547ea378038309ac508872dd889383c4c8), [`6206775`](https://github.com/commercetools/commercetools-docs-kit/commit/620677547ea378038309ac508872dd889383c4c8), [`6206775`](https://github.com/commercetools/commercetools-docs-kit/commit/620677547ea378038309ac508872dd889383c4c8)]:
  - @commercetools-docs/gatsby-theme-docs@4.1.0
  - @commercetools-docs/ui-kit@3.1.0

## 3.0.3

### Patch Changes

- [`a8ba1b2`](https://github.com/commercetools/commercetools-docs-kit/commit/a8ba1b24913a6857941d4fdd35733086b7e2560f) Thanks [@emmenko](https://github.com/emmenko)! - Update all dependencies

* [`a8ba1b2`](https://github.com/commercetools/commercetools-docs-kit/commit/a8ba1b24913a6857941d4fdd35733086b7e2560f) Thanks [@emmenko](https://github.com/emmenko)! - chore(deps): update all dependencies

* Updated dependencies [[`a8ba1b2`](https://github.com/commercetools/commercetools-docs-kit/commit/a8ba1b24913a6857941d4fdd35733086b7e2560f), [`a8ba1b2`](https://github.com/commercetools/commercetools-docs-kit/commit/a8ba1b24913a6857941d4fdd35733086b7e2560f)]:
  - @commercetools-docs/gatsby-theme-docs@4.0.2
  - @commercetools-docs/gatsby-transformer-mdx-introspection@3.0.1
  - @commercetools-docs/ui-kit@3.0.2

## 3.0.2

### Patch Changes

- Updated dependencies [[`c18f1fa`](https://github.com/commercetools/commercetools-docs-kit/commit/c18f1fa7c31244912145fe4b8c8f5352fe1fd0ed), [`c18f1fa`](https://github.com/commercetools/commercetools-docs-kit/commit/c18f1fa7c31244912145fe4b8c8f5352fe1fd0ed)]:
  - @commercetools-docs/gatsby-theme-docs@4.0.1

## 3.0.1

### Patch Changes

- Updated dependencies [[`18976f7`](https://github.com/commercetools/commercetools-docs-kit/commit/18976f7344f0d5a219641da75ee996741e2d7ac2), [`f8d349b`](https://github.com/commercetools/commercetools-docs-kit/commit/f8d349b6a4f9d552fb66cdf96241b7f259c862d4)]:
  - @commercetools-docs/gatsby-theme-docs@4.0.0
  - @commercetools-docs/ui-kit@3.0.1
