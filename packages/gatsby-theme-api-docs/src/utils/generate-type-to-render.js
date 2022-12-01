import capitalizeFirst from './capitalize-first';
import renderTypeAsLink from './render-type-as-link';

/**
 * Give an array of type properties, it returns
 * an array of types ready to be rendered
 */
function generateTypesToRender({
  typeLocations,
  properties, // array of properties
  apiKey,
  isParameter,
}) {
  const typesToRender = [];
  properties.forEach((property) => {
    let displayPrefix;
    let type;
    if (property.type === 'array' && property.items) {
      type = property.items.type;
      displayPrefix = isParameter ? '' : 'Array of ';
    } else if (isConstantLikeAndIsNotPrimitiveType(property)) {
      type = property.builtinType;
    } else {
      type = property.type;
    }

    type = renderTypeAsLink(apiKey, capitalizeFirst(type), typeLocations);

    typesToRender.push({
      displayPrefix,
      type,
    });
  });
  return typesToRender;
}

function isConstantLikeAndIsNotPrimitiveType(property) {
  const primitiveTypes = ['Int', 'String', 'Float'];
  const isConstantLike =
    property.enumeration && property.enumeration.length === 1;
  const isPrimitiveType = primitiveTypes.includes(property.type);
  return isConstantLike && !isPrimitiveType;
}

export default generateTypesToRender;
