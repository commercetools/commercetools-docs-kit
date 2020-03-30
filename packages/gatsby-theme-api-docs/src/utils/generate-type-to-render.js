import capitalizeFirst from './capitalize-first';
import renderTypeAsLink from './render-type-as-link';

function generateTypeToRender({ typeLocations, property, apiKey }) {
  let displayPrefix;
  let type;

  if (property.type === 'array' && property.items) {
    type = property.items.type;
    displayPrefix = 'Array of ';
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
