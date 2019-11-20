# Helpful resources for developing

## RAML Documentation:

- [RAML 1.0 specification](https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md)
- [RAML JS Parser Getting Started](https://github.com/raml-org/raml-js-parser-2/blob/master/documentation/GettingStarted.md) (outdated! Lots of functions and properties renamed now)
- [RAML JS Parser API Documentation](https://raml-org.github.io/raml-js-parser-2/modules/_src_index_.html) (an unfortunately bad documentation)

## RAML Js Parser: A practical documentation

(section to be moved out of the README later)

FYI: There's a potential blocker at the moment: https://github.com/raml-org/raml-js-parser-2/issues/848 (created by us)

### General restrictions and good-to-knows

**TL;DR: To reliably get the effective Types, this is your starting point:**
`raml.loadApi("./path/to/root/api.raml").expand(true).types().map(t => t.runtimeDefinition())`

Only load root RAML files, no libraries, no other Fragments!

1. _"expansion"_

- the documentation is wild.
- traits, type declarations and libraries are _not_ effective in the loaded RAML unless explicitly called for using `Api.expand()`
- libraries are not included in the effective Api unless `Api.expand(true)` is called (note the boolean parameter!)
- even then, libraries pulled in via "uses" are _only_ pulled in on top-level "Api" RAML files. Libraries used inside other libraries are _not_ expanded by the JS Parser.

2.  _The "Nominal Type System"_

- That is what you really want to work on, it's the effective API surface after applying all of RAMLs concepts. What you initially get is "just" a `TypeDeclaration`, but the interesting perspective is the `ITypeDefinition`
- the documentation is wild and there are more than three kinds of old names for the concept and its function calls spread over the documentation:
  - "Nominal Type System"
  - "Type Definition" (best use this name)
  - `.localType()` (old name in older versions and the Getting Started)
  - `.definition()` (also returns an `ITypeDefinition` but on the "meta" level of the parser -> totally not what you want)
  - `.runtimeDefinition()` -> YES!
- once you have the `ITypeDefinition` at hand, you can call `allProperties()` which yields all inherited properties from supertypes, too.
- BUT... it would be too nice. Not all information is available on the Nominal Type System. So for all else you have to look up the information in the matching -Declaration instead of the -Description. E.g. annotation values, number formats etc.

3. `description` fields: Unlike stated in the documentation, most do not return a String but a `MarkdownStringImpl` ([documentation](https://raml-org.github.io/raml-js-parser-2/classes/_src_raml1_artifacts_raml08parser_.markdownstringimpl.html))
