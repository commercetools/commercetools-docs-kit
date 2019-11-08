const webapi = require('webapi-parser');
const firstline = require('firstline');
const path = require('path');

async function onCreateNode({ node }) {
  if (!['File', 'RamlApi'].includes(node.internal.type)) return;

  if (node.internal.type === 'RamlApi') {
    // TODO here would the nodes be created then as children of the API node.
    return;
  }

  if (node.internal.mediaType !== 'application/raml+yaml') return;

  // Only actual Apis, Overlays and Extensions reliably provide the effective type information. Ignore all others.
  // This is only a high-performance but superficial check that does not cover all cases.
  const ramlIndicator = await firstline(node.absolutePath);
  if (
    !['#%RAML 1.0', '#%RAML 1.0 Overlay', '#%RAML 1.0 Extension'].includes(
      ramlIndicator.trim()
    )
  )
    return;

  // const dumpsDir = path.join(path.resolve(`./api-spec-dumps/`), node.relativeDirectory);
  // if (!fs.existsSync(dumpsDir)) fs.mkdirSync(dumpsDir);

  const parser = webapi.WebApiParser;
  const model = await parser.raml10.parse(`file://${node.absolutePath}`);

  // Validate parser model and get validation results

  // TODO validating creates inhumane output and even out of memory errors.
  // const validationReport = await parser.raml10.validate(model)
  // console.log('Validation errors:\n', validationReport.results)

  // const errorDumpPath = path.join(path.resolve(`./api-spec-dumps/`), node.relativePath + '.validation.txt');
  // fs.writeFileSync(errorDumpPath, util.inspect(validationReport, {depth: 20, colors: false }));

  const dumpsPath = path.join(
    path.resolve(`./api-spec-dumps/`),
    `${node.relativePath}.parsed.raml`
  );
  await webapi.WebApiParser.raml10.generateFile(model, `file://${dumpsPath}`);

  const resolver = webapi.Resolver('RAML 1.0');
  const resolved = resolver.resolve(model, 'editing'); // Note the 'editing' argument
  const resolvedDumpsPath = path.join(
    path.resolve(`./api-spec-dumps/`),
    `${node.relativePath}.resolved.raml`
  );
  await webapi.WebApiParser.raml10.generateFile(
    resolved,
    `file://${resolvedDumpsPath}`
  );

  const amfDumpsPath = path.join(
    path.resolve(`./api-spec-dumps/`),
    `${node.relativePath}.amfgraph.raml`
  );
  await parser.amfGraph.generateFile(model, `file://${amfDumpsPath}`);

  // other interesting calls:
  // resolved.getDeclarationByName('User').toJsonSchema)

  // Get all types (both defined in root and in endpoints):
  // const allTypes = model.findByType('http://www.w3.org/ns/shacl#NodeShape')

  // Generate RAML 1.0 string instead file
  // const generated = await wap.raml10.generateString(resolved)
}
exports.onCreateNode = onCreateNode;
