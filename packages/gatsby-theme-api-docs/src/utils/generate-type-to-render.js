import capitalizeFirst from './capitalize-first';
import renderTypeAsLink from './render-type-as-link';

function generateTypeToRender({ typeLocations, property, apiKey }) {
  let displayPrefix;
  let type;

  if (property.type === 'array' && property.items) {
    type = property.items.type;
    displayPrefix = 'Array of ';
  } else if (isConstantLikeAndIsNotPrimitiveType(property)) {
    type = property.builtinType;
  } else {
    type = property.type;
  }

  type = renderTypeAsLink(apiKey, capitalizeFirst(type), typeLocations);

  return {
    displayPrefix,
    type,
  };
}

function isConstantLikeAndIsNotPrimitiveType(property) {
  const primitiveTypes = ['Int', 'String', 'Float'];
  const isConstantLike =
    property.enumeration && property.enumeration.length === 1;
  const isPrimitiveType = primitiveTypes.includes(property.type);
  return isConstantLike && !isPrimitiveType;
}

export default generateTypeToRender;
