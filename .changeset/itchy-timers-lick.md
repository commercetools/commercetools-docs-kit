---
'@commercetools-docs/gatsby-theme-docs': minor
---

Fix an issue with release note generator CLI.

If you want to configure a topic list for a microsite, create a file called `docs-release-notes-config.yml` in the microsite folder. Then you can configure topics in the following format:

```yml
topics:
  Carts:
    name: Carts
  Limits:
    name: Limits
  Orders:
    name: Orders
    description: Describe the topic here
```

The description is optional.
