# commercetools Writing Style Rules

This package provides

- commercetools specific writing style and terminology rules for the configurable [vale](https://errata-ai.github.io/vale/) prose linter.
- the `commercetools-vale` command line tools which wraps a bundled vale build and calls it using the included writing style and configuration

The base style is the [Google Developer Documentation Style Guide](https://github.com/errata-ai/Google), which is included as a copy (MIT licensed, too) and modified and enriched with commercetools specific rules.

The configuration defaults to checking `.md`, `.mdx`, `.txt`, and `.html` files, which can be overridden by calling it with a command-line parameter `commercetools-vale --glob='*.{js,md}' ./path/to/content` passing a list of [supported file format extensions](https://errata-ai.github.io/vale/formats/#formats).

> As of Nov 2019, basing off Google's styles was a pragmatic choice. Other styles like Microsoft's are attractive starting points, too.

## Linter Usage: Standalone and via Editor Plugins

1.  Install the command globally via `npm install -g @commercetools-docs/writing-style`
1.  Use it by calling `commercetools-vale ./path/to/your/content`

In addition, you can install a matching editor plugin to get immediate feedback while authoring, for example [for VSCode](https://marketplace.visualstudio.com/items?itemName=testthedocs.vale) - don't use the `vale-server` one but the one for the command line.

**If your plugin allows, reconfigure the command from `vale` to `commercetools-vale`**. Otherwise, for example in VSCode, you have to uninstall your global vale installation and create an alias via `echo "alias vale=commercetools-vale" >>~/.bash_profile` (or ending `.zsh` if you are on a fresh Mac OS X catalina) (no insurance provided, suggestions for a cleaner method welcome).

Please don't forget to frequently update the package to get the latest styles.

## Linter Usage: CI and command line in Javascript Projects

1. Add the writing-style package as a development dependency: `yarn add --dev @commercetools-docs/writing-style`
1. In your project's folder, call it from the command
   line via `npx commercetools-vale ./your/path/to/content` and optionally add vale command line parameters as needed (for example `--no-wrap` on command line jobs).
   - Running it over your complete repository is not a good idea since it checks the complete node_modules folder which takes a long time and is not your content.

# Contributing

All [contributions](../../CONTRIBUTING.md), especially to enrich and complete the commercetools specific terminology and branding are welcome.

Please always provide content examples in the pull request to explain the rationale and typical use cases.
