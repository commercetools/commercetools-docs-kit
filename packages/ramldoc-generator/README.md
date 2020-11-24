# commercetools Docs Kit "RAMLdoc" Generator

> **DEPRECATED** in favor of the new **@commercetools-docs/rmf-codegen** package which provides the complete functionality of rmf-codegen without a restrictive wrapper CLI.

This package provides an executable to transform any spec-compliant RAML API definition into the (also RAML-compliant) RAML document structure and layout required by the [@commercetools-docs/gatsby-transformer-raml](../gatsby-transformer-raml) plugin.

The conversion step is applying a number normalizations and resolutions so that the RAML spec exposed to the site generator can be published exactly as-is without further semantic understanding of the API definition.

Among others, it flattens most type inheritance into the effectively visible API surface and distributes the information into separate fragments for API Endpoints and API Types that match the way they are exposed in web documentation.

It's based on the REST Modeling Framework's [rmf-codegen](https://github.com/commercetools/rmf-codegen) CLI.

## Prerequisites

A Java 8 or newer `java` runtime is required to be installed and available on the path. `rmf-codegen` is downloaded automatically at install time.

`rmf-codegen` was chosen over other (native JS and/or official) RAML parsers because it proved to be the only implementation that can correctly and reliably load even extremely large API definitions in very short time where others fail to load the same API definition at all.

## Usage

Typical usage in a static generator based website project is to include it as a development dependency

`yarn add --dev @commercetools-docs/ramldoc-generator`

and then run it inside the project directory

`npx commercetools-ramldoc-generator --name <api-spec-name> --src <api-spec-source-path>`

The first parameter is the name of the API spec - this will be the directory name of the generated RAML docs so we recommend snake case or camel case naming convention, for example:

- `name-of-spec`
- `nameOfSpec`

The second parameter is the path of the API spec, for a RAML spec the file is usually named `api.raml`.

You can provide the command globally too via `npm install -g @commercetools-docs/ramldoc-generator`

### Generated files

If the module is locally installed in the project, the generated raml documents will be located in `./src/api-specs`.

For globally installation, there is an optional third parameter that should be passed to specify the location for the generated RAML like so:

`npx commercetools-ramldoc-generator --name <api-spec-name> --src <api-spec-source-path> --dest <api-spec-destination-path>`

## Maintenance

To update the `rmf-codegen` version, update the custom `rmfCodegenVersion` property in `package.json`.

Versions can be found on Bintray here - https://bintray.com/vrapio/vrapio/rmf-codegen#.

For more help on getting an appropriate version, create an issue here - https://github.com/vrapio/rmf-codegen/issues.
