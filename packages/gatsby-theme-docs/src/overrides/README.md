Overrides files using Gatsby theme shadowing, to inject functionalities to specific parts of the theme.

## Usage

To use this feature, the website should mimic the folder structure of the Gatsby theme and list the files in the `overrides` folder that should be overridden.

```
src
└── @commercetools-docs
    └── gatsby-theme-docs
        └── overrides
            ├── markdown-components.js
            ├── page-header-side.js
            └── use-additional-site-data.js
```

## Available overrides

- `markdown-components`: allows to pass React components to be injected in the content pages

  ```jsx
  import MyCustomComponent from '../../../components/my-custom-component';

  const markdownComponents = {
    MyCustomComponent,
  };
  export default markdownComponents;
  ```

  Then in the `*.mdx` content pages the `<MyCustomComponent>` is available to use.

- `page-header-side`: allows to render something in the top-right corner of a content page
- `use-additional-site-data`: allows to return custom site metadata using React hooks. The data will be merged with the default `siteMetadata` of the Gatsby theme and is available to use when using `useSiteData` hook.

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
