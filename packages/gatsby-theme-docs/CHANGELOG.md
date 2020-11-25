# @commercetools-docs/gatsby-theme-docs

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

  ```jsx
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
