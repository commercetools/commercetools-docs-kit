<h2 align="center">commercetools Documentation Kit 💅</h2>
<p align="center">
  <i>✨ Tools and components for developing Documentation websites 🛠</i>
</p>

This repository contains packages to develop documentation websites for commercetools. It includes things like Gatsby themes, Gatsby plugins, UI components, and more.

Usage instructions can be found in the individual packages' READMEs.

| Package                                                                                                     |                                                                                                                                                                                                                                                                  | NPM Link & Version                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[@commercetools-docs/gatsby-theme-docs](./packages/gatsby-theme-docs)**                                   | **The base GatsbyJS theme to always be used. Start here to use the docs kit.**                                                                                                                                                                                   | [![Latest gatsby-theme-docs release](https://badgen.net/npm/v/@commercetools-docs/gatsby-theme-docs)](https://www.npmjs.com/package/@commercetools-docs/gatsby-theme-docs)                                                          |
| [@commercetools-docs/gatsby-theme-api-docs](./packages/gatsby-theme-docs)                                   | Add-On theme that allows to generate API references from RAML                                                                                                                                                                                                    | [![Latest gatsby-theme-api-docs release](https://badgen.net/npm/v/@commercetools-docs/gatsby-theme-api-docs)](https://www.npmjs.com/package/@commercetools-docs/gatsby-theme-api-docs)                                              |
| [@commercetools-docs/gatsby-theme-constants](./packages/gatsby-theme-constants)                             | Add-On theme that allows to centrally provide data values for usage in other MDX content                                                                                                                                                                         | [![Latest gatsby-theme-constants release](https://badgen.net/npm/v/@commercetools-docs/gatsby-theme-constants)](https://www.npmjs.com/package/@commercetools-docs/gatsby-theme-constants)                                           |
| [@commercetools-docs/gatsby-theme-code-examples](./packages/gatsby-theme-code-examples)                     | Add-On theme that allows to author code examples in own source files, including support for multi language code examples                                                                                                                                         | [![Latest gatsby-theme-code-examples release](https://badgen.net/npm/v/@commercetools-docs/gatsby-theme-code-examples)](https://www.npmjs.com/package/@commercetools-docs/gatsby-theme-code-examples)                               |
| [@commercetools-docs/ui-kit](./packages/ui-kit)                                                             | Standalone React UI components for styling documentation content                                                                                                                                                                                                 | [![Latest ui-kit release](https://badgen.net/npm/v/@commercetools-docs/ui-kit)](https://www.npmjs.com/package/@commercetools-docs/ui-kit)                                                                                           |
| [@commercetools-docs/writing-style](./packages/writing-style)                                               | Provides the [vale](https://docs.errata.ai/vale/about) prose linter binary bundled with the commercetools writing style ruleset.                                                                                                                                 | [![Latest writing style release](https://badgen.net/npm/v/@commercetools-docs/writing-style)](https://www.npmjs.com/package/@commercetools-docs/writing-style)                                                                      |
| [@commercetools-docs/ramldoc-generator](./packages/ramldoc-generator)                                       | Provides the [rmf-codegen](https://github.com/commercetools/rmf-codegen) Java JAR for transforming any RAML API specification into the ready-for-documentation "ramldoc" subset required by `gatsby-transformer-raml`. **No native binary yet, requires a JRE.** | [![Latest ramldoc-generator release](https://badgen.net/npm/v/@commercetools-docs/ramldoc-generator)](https://www.npmjs.com/package/@commercetools-docs/ramldoc-generator)                                                          |
| [@commercetools-docs/gatsby-transformer-raml](./packages/gatsby-transformer-raml)                           | Provides RAML Data Types and Resources in GatsbyJS as GraphQL nodes. Not a parser, assumes the API model was fully parsed, resolved and exported using `rmf-codegen`'s "ramldoc" target format. Used by the API docs theme.                                      | [![Latest gatsby-transformer-raml release](https://badgen.net/npm/v/@commercetools-docs/gatsby-transformer-raml)](https://www.npmjs.com/package/@commercetools-docs/gatsby-transformer-raml)                                        |
| [@commercetools-docs/gatsby-transformer-mdx-introspection](./packages/gatsby-transformer-mdx-introspection) | A GatsbyJS plugin that allows querying deep into MDX content to find specific content or component usage inside it. API docs theme uses it to dynamically link to API types and resources.                                                                       | [![Latest gatsby-transformer-mdx-introspection release](https://badgen.net/npm/v/@commercetools-docs/gatsby-transformer-mdx-introspection)](https://www.npmjs.com/package/@commercetools-docs/gatsby-transformer-mdx-introspection) |

## Smoke Test Sites

The repository contains test websites that aim to implement every possible feature of all the GatsbyJS theme and transformer plugins. These sites serve as a reference for usage and are used for the Percy visual regression tests.

- `docs-smoke-test` - [See Code](./websites/docs-smoke-test) - [Open Site](https://commercetools-docs-kit.vercel.app/docs-smoke-test/)
- `api-docs-smoke-test` - [See Code](./websites/api-docs-smoke-test) - [Open Site](https://commercetools-docs-kit.vercel.app/api-docs-smoke-test/)

## Developing

Install the dependencies (uses yarn workspaces, npm not supported):

```bash
$ yarn
```

To run the tests:

```bash
$ yarn test

# or
$ yarn test:watch
```

Build the packages

```bash
$ yarn build
```

Start the [docs-smoke-test website](./websites/docs-smoke-test):

```bash
$ cd websites/docs-smoke-test
$ yarn start
```

## Contributing

Contributions are welcomed. Please have a read at the [contribution guidelines](CONTRIBUTING.md).

## Licenses

Source code is provided under the MIT License (see the [LICENSE](LICENSE) file)

All icons, images, and the implemented visual design are **UNLICENSED** outside commercetools and its subsidiaries.

Individual packages in this repository can have deviating licensing in their respective `LICENSE`, `README.md` and `package.json` files.
