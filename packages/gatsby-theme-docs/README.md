# Core Gatsby theme

This is the core Gatsby theme for building commercetools documentation websites.

## Getting started

To create a new documentation website you need to install this theme and its peer dependencies:

```
npx install-peerdeps --dev @commercetools-docs/gatsby-theme-docs
```

### Choose a path prefix

All commercetools documentation websites are served under `docs.commercetools.com`. To make this work, all documentation websites must be bundled for production using a `pathPrefix`. This value determines the URL path where the website is served from.

For example, for the "Custom Applications" website, the path prefix is `/custom-applications`.

The `pathPrefix` is configured in the `gatsby-config.js` file.

### Folder structure

The project structure should contain at least the following files and folders:

```
├── .eslintrc.yml
├── gatsby-config.js
├── package.json
└── src
    ├── content
    │   ├── files
    │   └── index.mdx
    ├── images
    └── data
        └── navigation.yaml
```

- `.eslintrc.yaml`: in case you're using a monorepository, you need to provide this file with an empty object `{}`, otherwise provide a valid ESLint configuration.

- `gatsby-config.js`: this is required for a Gatsby website and should contain the website specific configuration. At the very least, the commercetools Gatsby theme must be listed in the plugins section. You are free to provide more plugins as you need for your specific website.

  ```js
  module.exports = {
    pathPrefix: '/change-me',
    siteMetadata: {
      title: 'CHANGE_ME',
      description: 'CHANGE_ME',
    },
    plugins: [
      {
        resolve: '@commercetools-docs/gatsby-theme-docs',
        options: {
          websiteKey: 'change-me',
        },
      },
    ],
  };
  ```

  Available options for the theme plugin are:

  - `websiteKey` (**required**): the identifier of the website, used for error reporting and similar concerns. Usually this value would be the same as the `pathPrefix` without the leading slash and without whitespaces.

  - `colorPreset` (_optional_): pick the "look and feel" of the website by choosing one of the available [Color Presets](./color-presets). **Default: `base`**

  - `gaTrackingId` (_optional_): this is the Google Analytics tracking ID. For all sites hosted on the `docs.commercetools.com` domain the ID must be: `UA-38285631-3`.

    > For test websites the gaTrackingId field should not be set.

  - `hubspotTrackingCode` (_optional_): this is HubSpot tracking code.

  - `excludeFromSearchIndex` (_optional_): indicates that the website should not be indexed by crawlers. This option effectively sets the `robots="noindex"` meta attribute. **Default: `true`**

  - `allowWideContentLayout` (_optional_): enables all content pages to use a wider layout that gives space to side-by-side content on large viewports. This must be used with `wideLayout`, see also the `wideLayout` frontmatter option and the `<SideBySide>` component on how to use it. **Default: `false`**.

  - `beta` (_optional_): indicates that the website should be marked as **beta**. Each page gets a beta flag, no matter if the page frontmatter has it defined or not. Furthermore, in the main navigation, the beta flag is shown near the website title and not next to each link. **Default: `false`**

  - `createNodeSlug` (_optional_): in case you need to have more control over the creation of the page slugs, you can implement this function. This is useful if for example your website has content files in other file system locations and you want to provide a more meaningful URL path.

    ```ts
    type Options = { node: Node }; // A Gatsby Node
    type CreateNodeSlugFn = (originalSlug: string, { node }: Options) => string;
    ```

  - `availablePrismLanguages` (_optional_): in case you need to include **Prism languages** that are [not included by default by `prism-react-renderer`](https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js), you can pass a list of them here.

  - `overrideDefaultConfigurationData` (_optional_, array of glob strings): allows to replace the configuration files in `src/data` instead of augmenting them. The option is passed to the `ignore` [option of the gatsby filesystem plugin](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/#options). For example, by passing `['**/top-*']` and placing `top-menu.yaml` and `top-side-menu.yaml` files in the website's `src/data` folder the top navigation can be overridden completely. If this option is used, the files matching the glob patterns **must** be provided.

- `src/content`: this is where you would put your content pages as `*.mdx` files (_see [Writing content pages](#writing-content-pages)_).

- `src/content/files`: this folder should contain static files that can be referenced within the `*.mdx` content files. For example SVG files, PDF files, etc.

- `src/images`: this folder should contain images that are used within the `*.mdx` content files. Images in this folder are processed and optimized by Gatsby for lazy loading. Supported image formats are `JPEG` and `PNG`.

- `src/data/navigation.yaml`: this contains the website main navigation links. The structure of the file is a _list of chapters_ as following:

  ```yaml
  - chapter-title: This is the title
    beta: false # (optional): will show the beta flag next to the chapter title
    pagination: false # (optional) hides the prev/next content pagination at the bottom of the pages in this chapter. Use for non-linear content like reference documentation.
    pages:
      - title: The first page
        path: '/chapter-1/first-page'
        beta: false # (optional): will show the beta flag next to the page title
      - title: Another page
        path: '/chapter-1/another-page'
      # another page, and so on...
  - chapter-title: {} # another chapter, and so on...
  ```

## Writing content pages

Content pages are located in the `src/content` folder and should be `*.mdx` files.

Pages can be freely organized accordingly to the website structure. Note that the pages URL matches the file system path by default.
For example, `src/content/getting-started/installation.mdx` results in the URL path `/getting-started/installation`.

Each `*.mdx` content page must contain some metadata in the frontmatter section, which is the leading section of the file within the `---` lines.

```mdx
---
title: The title of this page
beta: false
---

This is the actual page content.
```

Supported frontmatter options are:

- `title` (string, **required**): the title of the page. Most of the time is the same value as in the `src/data/navigation.yaml` but it can be longer if needed.
- `beta` (boolean): to indicate if the _beta_ info message should be displayed or not.
- `excludeFromSearchIndex` (boolean): to indicate if the page should be excluded from being indexed by crawlers. This option effectively sets the `robots="noindex"` meta attribute.
- `navLevels` (number): allows to reduce the depth of the on-page navigation for pages where it would get too long to fit the screen. You want to set 2 here if you need it.
- `wideLayout` (boolean): to indicate that the page can go into a two-column content space on large viewport sizes. See the `<SideBySide>` component below for more information on how to use it. This option must be used with `allowWideContentLayout` theme option set to `true`.

## Writing release notes

Release notes files follow a different specification and their file location does not imply the URL so they can be reorganized without changing the permanent release note URL.

Take a look at [typical example template](../websites/docs-smoke-test/src/releases/release-note-template.mdx) or read the [specification by example file](../websites/docs-smoke-test/src/releases/release-format-definition.mdx) to learn the complete format.

### Available JSX components within markdown files

Besides the standard markdown syntax, the theme provides some extra JSX components that can be used within the `*.mdx` files.

The components should be rendered as XML tags, like HTML elements. For example:

```mdx
<Subtitle>

Content inside the component.

</Subtitle>
```

The available JSX components are:

- `<Subtitle>`: used to provide more detailed information about the page, besides the title. The component should be placed before the other content, so that it's rendered after the page title.
- `<Info>`: a notification message with info colors
- `<Warning>`: a notification message with warning colors
- `<Error>`: a notification message with error colors
- `<Anchor>`: inserts a custom anchor on any part of the document, can be used with headers, lists, in paragraphs, etc, it is used for navigating to specific parts of the document that are not headings. Also useful when a document has multiple headings with the same text or when heading names change and old third party links shall continue to work. Cannot override ID generation of the site generator, this adds additional named anchors and IDs have precedence.
- `<ChildSectionsNav parent="a-section-slug" />`: a table of contents containing links to all subsections of the given parent. Use only for large numbers of child sections with _markdown level four or higher_ which are not part of the index navigation on the right side of the page. The component allows to make long pages with long lists of deep sections easier to navigate.
- `<SideBySide>`: use this component to wrap two content blocks that should be positioned side by side on wide viewport sizes. This feature is enabled by configuring the `allowWideContentLayout` theme option or the `wideLayout` page frontmatter option.

> When using JSX components, it's recommended to leave a **blank line** between the element tags and the actual content. This allows the content to be parsed as markdown, so you can use markdown syntax within the custom component tags.

## Using Theme with Add-Ons

A theme add-on is a Gatsby Theme that exposes React components to be injected into the MDX provider of the core theme.

Gatsby enables a child theme to use component shadowing (see [Theme overrides](#theme-overrides)). However, with multiple themes, the shadowed components are _only_ loaded from the last theme in the Gatsby configuration. To solve this problem, a commercetools-docs Gatsby Theme can be used as an add-on, allowing _multiple_ add-ons to provide additional components to be available in MDX without having to manually import them into every page.

When using add-on themes, a proxy export file will be generated in the websites `src/@commercetools-docs/gatsby-theme-docs/overrides` folder to leverage Gatsby's component shadowing (see [Theme overrides](#theme-overrides)). This file provides all the exported components from the add-on packages. For a component to be exported by an add-on package it has to be exported from `index.js` in the add-on package root.

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
      // Define and configure the add-on plugins instead of configuring them in the main plugins array.
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

## Theme overrides

The theme allows to inject custom functionalities to specific parts of it. [Read here](./src/overrides) for more information.

## API usage

The theme additionally [exports](./index.js) some React components and functions that are useful to build custom views in your website. Two hooks allow to build components that can be placed into MDX files while still having access to all necessary data:

- `usePageData` provides frontmatter values or their defaults and other page-level metadata like the table of contents.
- `useSiteData` provides site wide metadata.

```jsx
import {
  Markdown,
  Spacings,
  useSiteData,
  usePageData,
} from '@commercetools-docs/gatsby-theme-docs';

const MyComponent = () => {
  const siteData = useSiteData();
  const pageData = usePageData();
  return (
    <Spacings.Stack>
      <Markdown.H1>{siteData.siteMetadata.title}</Markdown.H1>
      <Markdown.Paragraph>{'Hello, world!'}</Markdown.Paragraph>
      {usePageData.beta ? (
        <Warning>Beta!</Warning>
      ) : (
        <Info>Generally available</Info>
      )}
    </Spacings.Stack>
  );
};
export default MyComponent;
```
