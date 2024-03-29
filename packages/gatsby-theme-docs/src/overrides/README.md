Overrides files using [Gatsby theme shadowing](https://www.gatsbyjs.org/docs/themes/shadowing/), to inject functionalities to specific parts of the theme.

## Usage

To use this feature, the website must mimic the folder structure of the Gatsby theme and list the files in the `overrides` folder that should be overridden.

```
src
└── @commercetools-docs
    └── gatsby-theme-docs
        └── overrides
            ├── markdown-components.js
            ├── page-header-side.js
            └── use-additional-site-data.js
```

> Note that Gatsby shadowing works with any file in the theme. However, the theme provides an explicit stable extension point that is the `overrides` folder. Users of the theme should use this extension point only instead of relying on theme-internal file system paths that can potentially change any time.

## Available overrides

- `markdown-components`: allows to pass React components to be injected in the content pages.

  ```jsx
  import MyCustomComponent from '../../../components/my-custom-component';

  const markdownComponents = {
    MyCustomComponent,
  };
  export default markdownComponents;
  ```

  With this, in the `*.mdx` content pages the `<MyCustomComponent>` is available to use.

- `page-header-side`: allows to render something in the top-right corner of a content page. Any valid React component should be _default_ exported.

- `use-additional-site-data`: allows to return custom site metadata using React hooks. The data is merged with the default `siteMetadata` of the Gatsby theme and can be accessed using the `useSiteData` hook.

  ```js
  import { useStaticQuery, graphql } from 'gatsby';

  // This website defines the `repositoryUrl` value in the `siteMetadata` config.
  // Therefore, we query those extra values and return them.
  const useAdditionalSiteData = () => {
    const data = useStaticQuery(graphql`
      query GetAdditionalSiteData {
        site {
          siteMetadata {
            repositoryUrl
          }
        }
      }
    `);

    return data.site.siteMetadata;
  };
  export default useAdditionalSiteData;
  ```
