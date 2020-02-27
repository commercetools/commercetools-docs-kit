# Docs Kit RAML Doc Generator

This package provides an executable script that generates RAML documents compatible with the [RAML transformer ](https://www.npmjs.com/package/@commercetools-docs/gatsby-transformer-raml) plugin.

It's based on the [rmf-codegen](https://github.com/vrapio/rmf-codegen) tool.

## Pre-Installation

At least Java 8 is required to be installed before using this tool.

## Usage

Typical usage in a static generator based website project is to include it as a development dependency

`yarn add --dev @commercetools-docs/ramldoc-generator`

and then run it inside the project directory

`npx commercetools-docs-ramldoc-generator <api-spec-name> <api-spec-source-path>`

The first parameter is the name of the API spec - this will be the directory name of the generated RAML docs so we recommend snake case or camel case naming convention, for example:

- `name-of-spec`
- `nameOfSpec`

The second parameter is the path of the API spec, for a RAML spec the file is usually named `api.raml`.

You can provide the command globally too via `npm install -g @commercetools-docs/ramldoc-generator`

### Generated files

If the module is locally installed in the project, the generated raml documents will be located in `./src/api-specs`.

For globally installation, there is an optional third parameter that should be passed to specify the location for the generated RAML like so:

`npx commercetools-docs-ramldoc-generator <api-spec-name> <api-spec-source-path> <api-spec-destination-path>`
