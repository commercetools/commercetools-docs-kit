<h2 align="center">commercetools Documentation Kit 💅</h2>
<p align="center">
  <i>✨ Monorepository with tools and components for developing Documentation websites 🛠</i>
</p>
<p align="center">
  <a href="https://circleci.com/gh/commercetools/commercetools-docs-kit"><img src="https://circleci.com/gh/commercetools/commercetools-docs-kit.svg?style=shield" alt="CI status" /></a> <a href="https://github.com/commercetools/commercetools-docs-kit/releases"><img src="https://badgen.net/github/release/commercetools/commercetools-docs-kit" alt="Latest release" /></a> <a href="https://github.com/commercetools/commercetools-docs-kit/blob/master/LICENSE"><img src="https://badgen.net/github/license/commercetools/commercetools-docs-kit" alt="GitHub license" /></a>
</p>

## Getting started

This repository contains packages to develop documentation websites for commercetools. It includes things like Gatsby themes, Gatsby plugins, UI components, etc.

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

Start the [docs-smoke-test website](./websites/docs-smoke-test):

```bash
$ yarn start
```

## Documentation

Please look at the single packages in [`packages` folder](./packages) for documentation specific of each package.

## Contributing

Contributions are welcomed. Please have a read at our [contribution guidelines](CONTRIBUTING.md).

## Licenses

Source code is under the MIT License (see the [LICENSE](LICENSE) file)

All icons, images and the implemented visual design are **UNLICENSED** outside commercetools and its subsidiaries.

Individual packages in this repository can have deviating licensing in their respective `LICENSE`, `README.md` and `package.json` files.
