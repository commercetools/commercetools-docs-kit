# @commercetools-docs/gatsby-transformer-raml

## 13.7.2

### Patch Changes

- [#2086](https://github.com/commercetools/commercetools-docs-kit/pull/2086) [`575820a`](https://github.com/commercetools/commercetools-docs-kit/commit/575820abee85ad80005f53dd5c8ad0dc01f1fa6c) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - Remove un-necessary LICENSE files

## 13.7.1

### Patch Changes

- [#2070](https://github.com/commercetools/commercetools-docs-kit/pull/2070) [`5f7ed85`](https://github.com/commercetools/commercetools-docs-kit/commit/5f7ed85cbfb9a7f2b21d4f1d7a2451f9d3987bd2) Thanks [@timonrey](https://github.com/timonrey)! - Display union references for api-types correctly.

## 13.7.0

### Minor Changes

- [#2026](https://github.com/commercetools/commercetools-docs-kit/pull/2026) [`8e5aad3`](https://github.com/commercetools/commercetools-docs-kit/commit/8e5aad370aae67c37c6e2577cf2e493b82acfbae) Thanks [@timonrey](https://github.com/timonrey)! - Support default values for query parameters. The default values will now be displayed the same way as for the data types default values.

## 13.6.1

### Patch Changes

- [#1978](https://github.com/commercetools/commercetools-docs-kit/pull/1978) [`f38864b`](https://github.com/commercetools/commercetools-docs-kit/commit/f38864be3d141a3abf3efbf73543902764c07e0f) Thanks [@timonrey](https://github.com/timonrey)! - Request headers are now being displayed in the endpoints.

## 13.6.0

### Minor Changes

- [#1790](https://github.com/commercetools/commercetools-docs-kit/pull/1790) [`f9185c6a`](https://github.com/commercetools/commercetools-docs-kit/commit/f9185c6a3c927d4c1edbeb0a5cc865adc19a48dc) Thanks [@timonrey](https://github.com/timonrey)! - Display the response content type correctly. It also enables support for other content types that are already supported in request bodies.

## 13.5.1

### Patch Changes

- [#1711](https://github.com/commercetools/commercetools-docs-kit/pull/1711) [`789a84f7`](https://github.com/commercetools/commercetools-docs-kit/commit/789a84f733d17c0b5c771ca5199a953c7ae82121) Thanks [@timonrey](https://github.com/timonrey)! - Inline examples into the generated RAML file, which fixes a caching issue after modifying examples.

## 13.5.0

### Minor Changes

- [#1612](https://github.com/commercetools/commercetools-docs-kit/pull/1612) [`81a583d4`](https://github.com/commercetools/commercetools-docs-kit/commit/81a583d400a852a8035750786a06d04262b52bbd) Thanks [@timonrey](https://github.com/timonrey)! - Enums can now be part of an enum group with descriptions.

## 13.4.1

### Patch Changes

- [#1558](https://github.com/commercetools/commercetools-docs-kit/pull/1558) [`149e9ffd`](https://github.com/commercetools/commercetools-docs-kit/commit/149e9ffda65ec3bd8009cfc07070272e968d3b27) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - Upgrade to ESM modules

## 13.4.0

### Minor Changes

- [#1531](https://github.com/commercetools/commercetools-docs-kit/pull/1531) [`0c3d133b`](https://github.com/commercetools/commercetools-docs-kit/commit/0c3d133bdd5769f85b4521fe9faeea94ec2a021b) Thanks [@nkuehn](https://github.com/nkuehn)! - - Update to node 18
  - refactor build scripts following other repos
  - update minor dependency versions
  - get lint and typecheck clean
  - fix issues that will pop up with gatsby 5 (downwards compatible)

## 13.3.0

### Minor Changes

- [#1462](https://github.com/commercetools/commercetools-docs-kit/pull/1462) [`2e4ea1cf`](https://github.com/commercetools/commercetools-docs-kit/commit/2e4ea1cfe7b7b2705664bec9e2bfbc42fe93b1d2) Thanks [@timonrey](https://github.com/timonrey)! - Enhancements for the request and response bodies: the content type is now displayed in the request and response body, the two bodies were adjusted to support images, and descriptions inside of the response body are now displayed next to the response code.

## 13.2.0

### Minor Changes

- [#1448](https://github.com/commercetools/commercetools-docs-kit/pull/1448) [`8266d506`](https://github.com/commercetools/commercetools-docs-kit/commit/8266d5064a27b8c29460e28187ac8a224d21ad5b) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - Display nicely multiple types (union) in API parameters

## 13.1.2

### Patch Changes

- [#1377](https://github.com/commercetools/commercetools-docs-kit/pull/1377) [`de6a79cb`](https://github.com/commercetools/commercetools-docs-kit/commit/de6a79cb7848165dc0eb70a86173df7360b11aa8) Thanks [@emmenko](https://github.com/emmenko)! - Update dependencies

## 13.1.1

### Patch Changes

- [#1347](https://github.com/commercetools/commercetools-docs-kit/pull/1347) [`2940036f`](https://github.com/commercetools/commercetools-docs-kit/commit/2940036f7d3a29565d343b253d1f8eb11da6ed04) Thanks [@timonrey](https://github.com/timonrey)! - Adds support for post requests using the content type "application/x-www-form-urlencoded".

## 13.1.0

### Minor Changes

- [#1331](https://github.com/commercetools/commercetools-docs-kit/pull/1331) [`9dfa5e73`](https://github.com/commercetools/commercetools-docs-kit/commit/9dfa5e7341eddafe876e33b390c4b22de64b41f3) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - When an API endpoint method response has one or more `example` nodes defined in the .raml file, those examples will be displayed in the API method page. In case no `example` nodes are defined, the response type example will be displayed instead.
  The API response code is now visible in the example code section header to help identifying what the example is referring to.

## 13.0.4

### Patch Changes

- [#1329](https://github.com/commercetools/commercetools-docs-kit/pull/1329) [`1a60a240`](https://github.com/commercetools/commercetools-docs-kit/commit/1a60a240d3b004827485ed75e485f90aafaaea1c) Thanks [@gabriele-ct](https://github.com/gabriele-ct)! - Fields marked as `markDeprecated` should not be rendered in the API docs as it happens with the `deprecated` flag.

## 13.0.3

### Patch Changes

- [#1293](https://github.com/commercetools/commercetools-docs-kit/pull/1293) [`8ff60721`](https://github.com/commercetools/commercetools-docs-kit/commit/8ff60721e180b806b6ccbd80ea302dd37a01992b) Thanks [@timonrey](https://github.com/timonrey)! - Update all gatsby dependencies.

## 13.0.2

### Patch Changes

- [#1203](https://github.com/commercetools/commercetools-docs-kit/pull/1203) [`554d26d7`](https://github.com/commercetools/commercetools-docs-kit/commit/554d26d7784d520e6377fc1cd7137dfc729a2a66) Thanks [@emmenko](https://github.com/emmenko)! - Point READMEs to new documentation website.

## 13.0.1

### Patch Changes

- [#1155](https://github.com/commercetools/commercetools-docs-kit/pull/1155) [`1043390`](https://github.com/commercetools/commercetools-docs-kit/commit/1043390d8c220aa30dd6964294e374963e338d64) Thanks [@timonrey](https://github.com/timonrey)! - Add API docs theme support for HEAD and PATCH methods

* [#1152](https://github.com/commercetools/commercetools-docs-kit/pull/1152) [`795b5cc`](https://github.com/commercetools/commercetools-docs-kit/commit/795b5ccd3141220031c4aa3dca2f42b7b2e9d572) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade to Yarn v3

## 13.0.0

### Major Changes

- [#1111](https://github.com/commercetools/commercetools-docs-kit/pull/1111) [`354c165`](https://github.com/commercetools/commercetools-docs-kit/commit/354c165fd29d9c8238bdd06cc63f8560ca269f4f) Thanks [@davifantasia](https://github.com/davifantasia)! - BREAKING CHANGE:

  `movePropertiesToTop` and `movePropertiesToBottom` has been replaced with `moveTypePropertiesToTop` and `moveTypePropertiesToBottom`, but the funtionalities remain the same.

  `moveEndpointQueryParametersToTop` and `moveEndpointQueryParametersToBottom` options are added to provide sorting configuration for query parameters.

## 12.1.0

### Minor Changes

- [#1062](https://github.com/commercetools/commercetools-docs-kit/pull/1062) [`69cfb46`](https://github.com/commercetools/commercetools-docs-kit/commit/69cfb46a7dbdf0e6aa8664b475822de722e50f37) Thanks [@nkuehn](https://github.com/nkuehn)! - Numeric query parameter types render as GraphQL-ish "Int" and "Float" now like in body JSON types

## 12.0.1

### Patch Changes

- [`68592d2`](https://github.com/commercetools/commercetools-docs-kit/commit/68592d2eaf5cfc71ab5b0e6dd6a0d13455b2a428) [#814](https://github.com/commercetools/commercetools-docs-kit/pull/814) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency js-yaml to v4

## 12.0.0

### Patch Changes

- [`1b92bbc`](https://github.com/commercetools/commercetools-docs-kit/commit/1b92bbc0941fe4631d74a34561b1e722dd4013ec) [#788](https://github.com/commercetools/commercetools-docs-kit/pull/788) Thanks [@davifantasia](https://github.com/davifantasia)! - feat: Query parameter "Array" type now renders as `Array of <object>`, and markdown in it's description is parsed appropirately.

* [`45c7306`](https://github.com/commercetools/commercetools-docs-kit/commit/45c73068573b1717c6f3ae810a6927657943c9a0) [#760](https://github.com/commercetools/commercetools-docs-kit/pull/760) Thanks [@nkuehn](https://github.com/nkuehn)! - Add new rmf-codegen package as replacement to ramldoc-generator. The new package directly exposes rmf-codegen with all features and available options instead of wrapping one specific call in a custom CLI.

## 10.0.2

### Patch Changes

- [`24caa5f`](https://github.com/commercetools/commercetools-docs-kit/commit/24caa5ff2121cfe3a980ef5af74675155965ff2e) [#739](https://github.com/commercetools/commercetools-docs-kit/pull/739) Thanks [@renovate](https://github.com/apps/renovate)! - chore: update dependencies

## 9.0.0

### Minor Changes

- [`eae4427`](https://github.com/commercetools/commercetools-docs-kit/commit/eae44272fe9e7f7a9caaa7cf299856b831d6a9e5) [#716](https://github.com/commercetools/commercetools-docs-kit/pull/716) Thanks [@davifantasia](https://github.com/davifantasia)! - feat: render inherited properties from parent types, also includes `hideInheritedProperties` for `ApiType` which hides inherited properties from parent type except the discriminator

## 3.0.2

### Patch Changes

- [`e1df4de`](https://github.com/commercetools/commercetools-docs-kit/commit/e1df4de7e0c0d970f52bc56f463a48e8b260ecba) [#608](https://github.com/commercetools/commercetools-docs-kit/pull/608) Thanks [@davifantasia](https://github.com/davifantasia)! - Transform api code examples to graphql compatible data

## 3.0.1

### Patch Changes

- [`2e3ef6b`](https://github.com/commercetools/commercetools-docs-kit/commit/2e3ef6b0e7bc587de3308c94381a38b0c70b86ca) [#465](https://github.com/commercetools/commercetools-docs-kit/pull/465) Thanks [@emmenko](https://github.com/emmenko)! - Update `@commercetools-uikit/*` packages to `10.21.0`.
