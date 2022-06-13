---
'@commercetools-docs/gatsby-theme-api-docs': minor
---

Improve the error handling and error message for the `transformURNLinksPlugin` function handling the case in which `typeUrl` cannot be found. The implementation prevents the unhandled error to happen and offers a more explanatory error detailing `name` and `apiKey` of the not found typeUrl.
