const webapi = require('webapi-parser');
const fs = require('fs');
const path = require('path');

async function dump(ramlFile) {
  const absolutePath = path.resolve(ramlFile);
  const parser = webapi.WebApiParser;
  const model = await parser.raml10.parse(`file://${absolutePath}`);
  const validationReport = await parser.raml10.validate(model);
  fs.writeFileSync(
    `${absolutePath}.validation.txt`,
    validationReport.toString()
  );
  await webapi.WebApiParser.raml10.generateFile(
    model,
    `file://${absolutePath}.parsed.raml`
  );
  const resolver = webapi.Resolver('RAML 1.0');
  const resolved = resolver.resolve(model, 'editing'); // Note the 'editing' argument, inoffical flag to retain the types

  // const payload = resolved.encodes.endPoints[0].operations[0].responses[0].payloads[0]
  // const typeName = payload.schema.name.value()
  const metaData = {
    resources: {},
    types: {},
  };

  resolved.encodes.endPoints.forEach(endpoint => {
    const endpointMeta = { operations: {} };
    metaData.resources[endpoint.path.value()] = endpointMeta;
    endpoint.operations.forEach(operation => {
      const operationMeta = { responses: {} };
      endpointMeta.operations[operation.method.value()] = operationMeta;
      operation.responses.forEach(response => {
        const responseMeta = { payloads: {} };
        operationMeta.responses[response.statusCode.value()] = responseMeta;
        response.payloads.forEach(payload => {
          const payloadMeta = {
            declaredTypeName: payload.schema.name.value(),
            declaredTypeDisplayName: payload.schema.displayName.value(),
          };
          responseMeta.payloads[payload.mediaType.value()] = payloadMeta;
        });
      });
    });
  });

  await webapi.WebApiParser.raml10.generateFile(
    resolved,
    `file://${absolutePath}.resolved.raml`
  );
  await parser.amfGraph.generateFile(
    model,
    `file://${absolutePath}.amfgraph.raml`
  );
  console.log('wrote files');
}

dump(process.argv[2]);
