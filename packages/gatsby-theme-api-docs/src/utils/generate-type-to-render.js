import capitalizeFirst from './capitalize-first';
import renderTypeAsLink from './render-type-as-link';

function generateTypeToRender({ typeLocations, property, apiKey }) {
  let displayPrefix;
  let type;

  if (property.type === 'array' && property.items) {
    type = property.items.type;
    displayPrefix = 'Array of ';
  } else if (property.enumeration && property.enumeration.length === 1) {
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

export default generateTypeToRender;
