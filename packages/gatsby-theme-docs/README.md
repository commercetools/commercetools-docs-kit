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
    ├── code-examples
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

  - `gaTrackingId` (_optional_): this is the Google Analytics tracking ID. For all sites hosted on the `docs.commercetools.com` domain the ID must be: `UA-38285631-3`.

    > For test websites the field should not be set.

  - `excludeFromSearchIndex` (_optional_): indicates that the website should not be indexed by crawlers. This option effectively sets the `robots="noindex"` meta attribute. **Default: `true`**

  - `beta` (_optional_): indicates that the website should be marked as **beta**. Each page gets a beta flag, no matter if the page frontmatter has it defined or not. Furthermore, in the main navigation, the beta flag is shown near the website title and not next to each link. **Default: `false`**

  - `createNodeSlug` (_optional_): in case you need to have more control over the creation of the page slugs, you can implement this function. This is useful if for example your website has content files in other file system locations and you want to provide a more meaningful URL path.

    ```ts
    type Options = { node: Node }; // A Gatsby Node
    type CreateNodeSlugFn = (originalSlug: string, { node }: Options) => string;
    ```

  - `availablePrismLanguages` (_optional_): in case you need to include **Prism languages** that are [not included by default by `prism-react-renderer`](https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js), you can pass a list of them here.

  - `overrideDefaultConfigurationData` (_optional_, array of strings): allows to replace the configuration files in `src/data` instead of augmenting them. The option is passed to the `ignore` [option of the gatsby filesystem plugin](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/#options). For example, by passing `['**/top-*']` and placing `top-menu.yaml` and `top-side-menu.yaml` files in the website's `src/data` folder the top navigation can be overridden completely. The ignored files **must** be provided.

- `src/content`: this is where you would put your content pages as `*.mdx` files (_see [Writing content pages](#writing-content-pages)_).

- `src/content/files`: this folder should contain static files that can be referenced within the `*.mdx` content files. For example SVG files, PDF files, etc.

- `src/images`: this folder should contain images that are used within the `*.mdx` content files. Images in this folder are processed and optimized by Gatsby for lazy loading. Supported image formats are `JPEG` and `PNG`.

- `src/code-examples`: instead of placing them into markdown fenced code blocks, code examples can be put into this folder and be loaded into the documentation using the `<CodeExample>` component.

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

- `title`: the title of the page. Most of the time is the same value as in the `src/data/navigation.yaml` but it can be longer if needed.
- `beta`: to indicate if the _beta_ info message should be displayed or not.
- `excludeFromSearchIndex`: to indicate if the page should be excluded from being indexed by crawlers. This option effectively sets the `robots="noindex"` meta attribute.

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
- `<CodeExample file="example.js" title="JavaScript Code Sample" />`: loading a code block from a file in `src/code-examples/`, supports all parameters of the fenced code block.
- `<Anchor>`: inserts a custom anchor on any part of the document, can be used with headers, lists, in paragraphs, etc, it is used for navigating to specific parts of the document that are not headings. Also useful when a document has multiple headings with the same text or when heading names change and old third party links shall continue to work. Cannot override ID generation of the site generator, this adds additional named anchors and IDs have precedence.

> When using JSX components, it's recommended to leave a **blank line** between the element tags and the actual content. This allows the content to be parsed as markdown, so you can use markdown syntax within the custom component tags.

## Theme overrides

The theme allows to inject functionalities to specific parts of it. [Read here](./src/overrides) for more information.

## API usage

The theme additionally [exports](./index.js) some React components and functions that are useful to build custom views in your website.

```jsx
import {
  Markdown,
  Spacings,
  useSiteData,
} from '@commercetools-docs/gatsby-theme-docs';

const MyComponent = () => {
  const siteData = useSiteData();
  return (
    <Spacings.Stack>
      <Markdown.H1>{siteData.siteMetadata.title}</Markdown.H1>
      <Markdown.Paragraph>{'Hello, world!'}</Markdown.Paragraph>
    </Spacings.Stack>
  );
};
export default MyComponent;
```
