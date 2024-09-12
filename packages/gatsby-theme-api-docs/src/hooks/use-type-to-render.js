import { useTypeLocations } from './use-type-locations';
import generateTypesToRender from '../utils/generate-type-to-render';

/**
 * It accepts either a single property or an array of properties.
 * The function returns an array of types to render
 */
function useTypesToRender({ property, apiKey, isParameter } = {}) {
  const typeLocations = useTypeLocations();
  const properties = Array.isArray(property) ? property : [property];
  return generateTypesToRender({
    typeLocations,
    properties,
    apiKey,
    isParameter,
  });
}

export default useTypesToRender;
