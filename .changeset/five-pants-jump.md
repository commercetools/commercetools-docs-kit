---
'@commercetools-docs/gatsby-theme-api-docs': major
'@commercetools-docs/gatsby-theme-code-examples': major
'@commercetools-docs/gatsby-theme-constants': major
'@commercetools-docs/gatsby-theme-docs': major
'@commercetools-website/api-docs-smoke-test': major
---

Refactored the provisioning of theme extensions' components into MDX to support components that have to be imported explicitly in MDX. Auto-provided components now have to be exported via `./shortcodes` by theme add-ons.

The API documentation is not automatically injecting its components into MDX any more to allow sites with large APIs to optimize the site performance (time to interactive).

To migrate, all MDX pages have to explicitly import the `ApiType` and `ApiEndpoint` components. It's recommended that sites create an intermediate `/shortcodes.js` file so that the MDX import lines only read

```
import { ApiType, ApiEndpoint } from "./shortcodes"
```
