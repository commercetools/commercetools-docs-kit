const { postProcessTypes } = require('./post-process-types');

const createTypesNodes = (
  types,
  apiNode,
  {
    annotateConstantLikeEnums,
    annotateUnionLikeInheritance,
    customNumberScalars,
    flattenLibraryNamespaces,
    movePropertiesToTop,
    movePropertiesToBottom,
  },
  { createNodeId, createContentDigest, createNode, createParentChildLink }
) => {
  types.forEach(type => {
    let typeObj = { ...type, apiKey: apiNode.key };
    typeObj = postProcessTypes(typeObj, {
      annotateConstantLikeEnums,
      annotateUnionLikeInheritance,
      customNumberScalars,
      flattenLibraryNamespaces,
      movePropertiesToTop,
      movePropertiesToBottom,
    });

    const typeNode = {
      ...typeObj,
      id: createNodeId(
        `${apiNode.id}.${apiNode.key}.${type.name} >>> RAML_TYPE`
      ),
      children: [],
      parent: apiNode.id, // important!
      internal: {
        contentDigest: createContentDigest(typeObj),
        type: 'RamlType',
      },
    };
    createNode(typeNode);
    createParentChildLink({ parent: apiNode, child: typeNode });
  });
};

module.exports = {
  createTypesNodes,
};
