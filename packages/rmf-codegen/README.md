# commercetools RMF-Codegen provider package

This package provides the REST Modeling Framework's [rmf-codegen](https://github.com/commercetools/rmf-codegen) CLI to javascript projects without separate installation or version choice steps.

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

> **Please refer to the help output of the bundled rmf-codegen for current options and details, for example `npx rmf-codegen generate`**

You can provide the command globally too via `npm install -g @commercetools-docs/rmf-codegen`, but for this purpose it may be better suited to use the install script directly provided by RMF-Codegen.

## Output Targets

**See the [RMF-Codegen sources for the complete list](https://github.com/commercetools/rmf-codegen/blob/master/tools/cli-application/src/main/kotlin/io/vrap/rmf/codegen/cli/GenerateSubcommand.kt#L47)**

### `RAML_DOC`

Transforms any spec-compliant RAML API definition into the (also RAML-compliant) RAML document structure and layout required by the [@commercetools-docs/gatsby-transformer-raml](../gatsby-transformer-raml) plugin.

The conversion step is applying a number normalizations and resolutions so that the RAML spec exposed to the site generator can be published exactly as-is without further semantic understanding of the API definition.

Among others, it flattens most type inheritance into the effectively visible API surface and distributes the information into separate fragments for API Endpoints and API Types that match the way they are exposed in web documentation.

## `POSTMAN`

Generates a Collection File with all Endpoints for the [Postman](https://www.postman.com/product/api-client/) API client.

## Client SDKs

`JAVA_CLIENT`, `TYPESCRIPT_CLIENT`, `CSHARP_CLIENT`, `PHP_CLIENT`, ...

## Maintenance

To update the `rmf-codegen` version, update the custom `rmfCodegenVersion` property in `package.json`.

Versions can be found on Bintray here - https://bintray.com/vrapio/vrapio/rmf-codegen#.

For more help on getting an appropriate version, create an issue here - https://github.com/vrapio/rmf-codegen/issues.
