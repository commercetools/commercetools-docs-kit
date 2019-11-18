const raml = require('raml-1-parser');
const raml2obj = require('raml2obj');
const TrackingFSResolver = require('../tracking-fs-resolver');
const includeGraph = require('../includeGraph');
const createTypesNodes = require('./create-types-nodes');
const createEndpointsNodes = require('./create-endpoints-nodes');

async function createNodes(
  createNode,
  createNodeId,
  createParentChildLink,
  createContentDigest,
  apiNode,
  {
    validate,
    canonicalTypeImpl,
    annotateConstantLikeEnums,
    annotateUnionLikeInheritance,
    customNumberScalars,
    flattenLibraryNamespaces,
    movePropertiesToTop,
    movePropertiesToBottom,
  }
) {
  const customFsResolver = new TrackingFSResolver();
  let api = await raml.loadApi(apiNode.absolutePath, {
    fsResolver: customFsResolver,
  });
  api = api.expand(true);
  includeGraph.addIncludedFilesForApi(
    customFsResolver.filesLoaded,
    apiNode.absolutePath
  );

  const apiObj = await raml2obj.parse(api, {
    validate,
    canonicalTypeImpl,
    collectionFormat: 'arrays',
  });

  // comment out to analyze the output outside GraphQL (e.g. to find out about type collisions in graphql)
  // const fs = require('fs');
  // fs.writeFileSync(
  //   `DEBUG-${apiNode.key}-obj.json`,
  //   JSON.stringify(apiObj, null, 2)
  // );

  // console.log(' : (re)creating type nodes for api node ' + apiNode.key + ' at ' + apiNode.internal.contentDigest);
  createTypesNodes(
    apiObj.types,
    apiNode,
    {
      annotateConstantLikeEnums,
      annotateUnionLikeInheritance,
      customNumberScalars,
      flattenLibraryNamespaces,
      movePropertiesToTop,
      movePropertiesToBottom,
    },
    {
      createNodeId,
      createContentDigest,
      createNode,
      createParentChildLink,
    }
  );

  const { resources } = apiObj;
  createEndpointsNodes(resources, apiNode, {
    createNodeId,
    createContentDigest,
    createNode,
    createParentChildLink,
  });
}

module.exports = createNodes;
