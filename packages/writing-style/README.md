# commercetools Writing Style Linter

This package provides

- commercetools specific writing style and terminology rules for the configurable [vale](https://errata-ai.github.io/vale/) prose linter.
- the `commercetools-vale` command-line tool which wraps a bundled vale build and calls it using the included writing style and configuration
- the `commercetools-vale-bin` command is directly calling the current bundled vale binary without passing the commercetools configuration and writing style. The configuration has to be passed separately via vale's `--config` flag.

The base style is the [Google Developer Documentation Style Guide](https://github.com/errata-ai/Google), which is included as a copy (MIT licensed, too) and modified and enriched with commercetools specific rules.

The configuration defaults to checking `.md`, `.mdx`, `.txt`, and `.html` files, which can be overridden by calling it with a command-line parameter `commercetools-vale --glob='*.{js,md}' ./path/to/content` passing a list of [supported file format extensions](https://errata-ai.github.io/vale/formats/#formats).

> As of Nov 2019, basing off Google's styles was a pragmatic choice. Other styles like Microsoft's are attractive starting points, too.

## Downloading vale binary

This package automatically downloads the appropriate `vale` binary upon installation (running as `postinstall` script). This ensures that the package is kept as small as possible, as the `vale` binary takes up a few megabytes, and the appropriate binary is downloaded according to the operating system (`macOS`, `linux`, `windows`).

## Downloading Google styles

The [Google styles for vale](https://github.com/errata-ai/Google) should not be changed manually, as they are maintained by the Errata-AI team and pulled directly from their repository. To get the latest changes, run the `yarn download:google` command.

## Linter Usage: Standalone command-line

1.  Install the command globally via `yarn global add @commercetools-docs/writing-style` or `npm install -g @commercetools-docs/writing-style`
1.  Use it by calling `commercetools-vale ./path/to/your/content`

Please don't forget to frequently update the package to get the latest styles.

## Linter Usage: In Editor plugins

In addition, you can install a matching editor plugin to get immediate feedback while authoring.
**If your plugin allows, reconfigure the command from `vale` to `commercetools-vale`**.

The plugin [for VSCode](https://marketplace.visualstudio.com/items?itemName=testthedocs.vale) does not support such configuration yet.

## Linter Usage: CI and command-line in Javascript Projects

1. Add the writing-style package as a development dependency: `yarn add --dev @commercetools-docs/writing-style`
1. In your project's folder, call it from the command
   line via `npx commercetools-vale ./your/path/to/content` and optionally add vale command-line parameters as needed (for example `--no-wrap` on command-line jobs).
   - _Tip_: Running it over your complete repository is not a good idea since it checks the complete node_modules folder which takes a long time and is not your content.

## Contributing

All [contributions](../../CONTRIBUTING.md), especially to enrich and complete the commercetools specific terminology and branding are welcome.

Please always provide content examples in the pull request to explain the rationale and typical use cases.
