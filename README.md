<h2 align="center">commercetools Documentation Kit 💅</h2>
<p align="center">
  <i>✨ Monorepository with tools and components for developing Documentation websites 🛠</i>
</p>
<p align="center">
  <a href="https://github.com/commercetools/commercetools-docs-kit/releases"><img src="https://badgen.net/github/release/commercetools/commercetools-docs-kit" alt="Latest release" /></a> <a href="https://github.com/commercetools/commercetools-docs-kit/blob/master/LICENSE"><img src="https://badgen.net/github/license/commercetools/commercetools-docs-kit" alt="GitHub license" /></a>
</p>

This repository contains packages to develop documentation websites for commercetools. It includes things like Gatsby themes, Gatsby plugins, UI components, etc. Please look at the individual packages in [`packages` folder](./packages) for functional documentation.

## Getting started

For general documentation use cases, start with the [base theme](./packages/gatsby-theme-docs). The [`packages` folder](./packages) also includes [base theme](./packages/gatsby-theme-docs) addons that you may find useful.

For documention based on API specifications, start with the [API theme](./packages/gatsby-theme-api-docs). Note that the [API theme](./packages/gatsby-theme-api-docs) is also an addon to the [base theme](./packages/gatsby-theme-docs).

## Developing packages

Install the dependencies (uses yarn workspaces):

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

Start the [docs-smoke-test website](./websites/docs-smoke-test) or the [api-docs-smoke-test website](./websites/api-docs-smoke-test):

```bash
$ cd websites/docs-smoke-test
$ yarn start
```

When locally building the API docs smoke test site, a [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) based size analysis is run and automatically opened. Keep in mind that the analysis only covers the JS content, GatsbyJS GraphQL data live in separate JSON files in the `/public/page-data` folder, the `sq` subfolder contains the static query results.

## Contributing

Contributions are welcomed. Please have a read at the [contribution guidelines](CONTRIBUTING.md).

## Licenses

Source code is under the MIT License (see the [LICENSE](LICENSE) file)

All icons, images, and the implemented visual design are **UNLICENSED** outside commercetools and its subsidiaries.

Individual packages in this repository can have deviating licensing in their respective `LICENSE`, `README.md` and `package.json` files.
