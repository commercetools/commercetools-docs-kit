# Core Gatsby theme

This is the ore Gatsby theme for building commercetools documentation websites.

## Getting started

To create a new documentation website you need to install this theme and its peer dependencies:

```
npx install-peerdeps --dev @commercetools-docs/gatsby-theme-docs
```

### Choose a path prefix

All commercetools documentation websites are served under `docs.commercetools.com`. In order to make this work, all documentation websites must be bundled for production using a `pathPrefix`. This value determines the URL path where the website is served from.

For example, for the "Custom Applications" website, the path prefix is `/custom-applications`.

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
    ├── data
    │   └── navigation.yaml
    └── images
```

- `.eslintrc.yaml`: in case you're using a monorepository, you need to provide this file with an empty object `{}`

- `gatsby-config.js`: this is required for a Gatsby website and should contains the website specific configuration. At the very least, the core theme should be defined as plugin. You are free to provide more plugins as you need for your specific website.

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

  - `websiteKey` (**required**): the identifier of the website, without whitespaces. Usually this value would be the same as the `pathPrefix` without the leading slash.

  - `gaTrackingId` (**required**): this is the Google Analytics tracking ID.

    > For test websites the field should not be set.

  - `createNodeSlug` (_optional_): in case you need to have more control over the creation of the page slugs, you can implement this function.

    ```ts
    type Options = { node: Node }; // A Gatsby Node
    type CreateNodeSlugFn = (originalSlug: string, { node }: Options) => string;
    ```

- `src/content`: this is where you would put your content pages as `*.mdx` files (_see [Writing content pages](#writing-content-pages)_).

- `src/data/navigation.yaml`: this contains the website main navigation links. The structure of the file is a _list of chapters_ as following:

  ```yaml
  - chapter-title: This is the title
    beta: false # (optional): will show the beta flag next to the chapter title
    pagination: false # (optional) will remove this page from the content pagination
    pages:
      - title: The first page
        path: '/chapter-1/first-page'
        beta: false # (optional): will show the beta flag next to the page title
  - chapter-title: {} # another chapter, and so on...
  ```

- `src/content/files`: this folder should contain static files that can be referenced within the `*.mdx` content files. For example SVG files, PDF files, etc.

- `src/images`: this folder should contain images that are used within the `*.mdx` content files. Images are processed and optimized by Gatsby for lazy loading.

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

- `title`: the title of the page. Most of the time is the same value as in the `src/data/navigation.yaml` but it can be longer if needed.
- `beta`: to indicate if the _beta_ info message should be displayed or not.

### Available components within markdown files

Besides the standard markdown syntax, the theme provides some extra elements to be directly used within the `*.mdx` files.

The elements should be rendered as XML tags, like HTML elements. For example

```mdx
<MyComponent>

Content inside the element.

</MyComponent>
```

The elements are:

- `<Subtitle>`: used to provide more detailed information about the page, besides the title. The element should be places before the other content, so that it's rendered after the page title.
- `<Info>`: a notification message with info colors
- `<Warning>`: a notification message with warning colors
- `<Error>`: a notification message with error colors

## Theme overrides

The theme allows to inject functionalities to specific parts of it. [Read here](./overrides) for more information.

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
