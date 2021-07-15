# commercetools RMF-Codegen provider package

This package provides the REST Modeling Framework's [rmf-codegen](https://github.com/commercetools/rmf-codegen) CLI to javascript projects without separate installation or version choice steps.

The RMF-Codegen version is defined via the `rmfCodegenVersion` property in [package.json](./package.json) and refers to the [GitHub release version of RMF-Codgen](https://github.com/commercetools/rmf-codegen/releases).

> RMF-Codegen is a java program. Java needs to be available on the command line to run the `rmf-codegen` commands.
> Binary executables are possible but not provided as pre-built downloads yet. [Read more...](https://github.com/commercetools/rmf-codegen#build-a-native-executable-with-graalvm)

## Prerequisites

A Java 8 or newer `java` runtime is required to be installed and available on the path. `rmf-codegen` is downloaded automatically at install time.

`rmf-codegen` was chosen over other (native JS and/or official) RAML parsers because it proved to be the only implementation that can correctly and reliably load even extremely large API definitions in very short time where others fail to load the same API definition at all.

## Usage

Typical usage is to include it as a development dependency

`yarn add --dev @commercetools-docs/rmf-codegen`

and then run it inside the project directory

`npx rmf-codegen`

**See the [RMF-Codegen README](https://github.com/commercetools/rmf-codegen/blob/master/README.md) for all available options and features. Alternatively refer to the help output of the bundled rmf-codegen for current options and details, for example `npx rmf-codegen generate`**

You can provide the command globally too via `npm install -g @commercetools-docs/rmf-codegen`, but for this purpose it may be better suited to use the install script directly provided by RMF-Codegen.

## Maintenance

To update the `rmf-codegen` version, update the custom `rmfCodegenVersion` property in `package.json`.

The rmf-codegen JAR is downloaded from [the project's GitHub releases page](https://github.com/commercetools/rmf-codegen/releases).

For more help on getting an appropriate version, create an issue here - https://github.com/commercetools/rmf-codegen/issues.
