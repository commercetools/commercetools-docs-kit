# Docs Kit Broken Link Checker

This package provides an executable script that checks a statically built website on the file system for any broken internal or external links.

It's based on the excellent [`broken-link-checker`](https://github.com/stevenvachon/broken-link-checker#readme) library and is fully preconfigured.

The exit code is 1 if a broken link was found, otherwise zero. This way the command can be used directly in build scripts to have the build fail or pass.

# Usage

Typical usage in a static generator based website project is to include it as a development dependency

`yarn add --dev @commercetools-docs/broken-link-checker`

and then run it inside the project directory

`npx commercetools-broken-link-checker ./my-site-output-folder entrypoint1/ entrypoint2/hello.html`

The first parameter is the path to the site folder, all following parameters are entrypoints to be crawled.

The _first_ entrypoint (for example the second parameter) is also considered the root URL of the complete site. For instance, in the preceeding example links to `/` are redirected to `/entrypoint1/`.

The crawler follows all links from the entrypoint, so if you accidentally provide multiple entrypoints that indirectly link to each other, pages are tested multiple times. Entrypoints are tested independently as separate runs.

You can provide the command globally too via `npm install -g @commercetools-docs/broken-link-checker`
