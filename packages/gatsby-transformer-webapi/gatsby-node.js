const webapi = require('webapi-parser');
const firstline = require('firstline');
const { apiKeyForFileNode, includeApi } = require('./src/helpers');

async function onCreateNode(
  { node, actions, createNodeId, createContentDigest, reporter },
  { validate = true, includeApis = [] }
) {
  const { createNode, createParentChildLink } = actions;
  if (node.internal.type !== 'File') return;

  if (node.internal.mediaType !== 'application/raml+yaml') return;

  // Only actual Apis, Overlays and Extensions reliably provide the effective type information. Ignore all others.
  const ramlIndicator = await firstline(node.absolutePath);
  if (
    !['#%RAML 1.0', '#%RAML 1.0 Overlay', '#%RAML 1.0 Extension'].includes(
      ramlIndicator.trim()
    )
  )
    return;

  if (!includeApi(node, includeApis)) return;
  const apiKey = apiKeyForFileNode(node);

  const parser = webapi.WebApiParser;
  const model = await parser.raml10.parse(`file://${node.absolutePath}`);

  if (validate) {
    const validationReport = await parser.raml10.validate(model);
    if (!validationReport.conforms) {
      reporter.warn(`validation errors in API "${apiKey}" :`);
      reporter.warn(validationReport.toString());
    }
  }
  const resolver = webapi.Resolver('RAML 1.0');
  const resolved = resolver.resolve(model, 'editing'); // Note the 'editing' argument, inoffical flag to retain the types
  const resolvedRamlString = await webapi.WebApiParser.raml10.generateString(
    resolved
  );

  const apiNode = {
    id: createNodeId(`${node.id}.${apiKey} >>> RESOLVED_WEBAPI_RAML`),
    apiKey,
    children: [],
    parent: node.id,
    internal: {
      content: resolvedRamlString,
      contentDigest: createContentDigest(resolvedRamlString),
      mediaType: node.internal.mediaType,
      type: 'ResolvedWebapiRaml',
    },
  };
  createNode(apiNode);
  createParentChildLink({ parent: node, child: apiNode });
}

exports.onCreateNode = onCreateNode;
