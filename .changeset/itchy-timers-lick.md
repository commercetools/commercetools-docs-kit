---
'@commercetools-docs/gatsby-theme-docs': minor
---

Fix an issue with release note generator CLI.

How to create a release note over your console:

1. Navigate to the microsite where you want to create the release note
2. Run the following command in your terminal

```
yarn create-docs-release-note
```

3. Follow the instructions in your console.
4. After finishing all instructions in the console, you can find the generated release note in the `src/releases` folder of your microsite.

How to create a release note over over Visual Studio Code:

1. Go to the `npm scripts` section and open the `package.json` file from the microsite in which you want to create a release note.
2. Run the script `create-docs-release-note`.
3. Follow the instructions in the console.
4. After finishing all instructions in the console, you can find the generated release note in the `src/releases` folder of your microsite.
