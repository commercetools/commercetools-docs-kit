import { useTypeLocations } from './use-type-locations';
import generateTypeToRender from '../utils/generate-type-to-render';

function useTypeToRender({ property, apiKey, isParameter } = {}) {
  const typeLocations = useTypeLocations();
  const properties = Array.isArray(property) ? property : [property];
  return generateTypeToRender({
    typeLocations,
    properties,
    apiKey,
    isParameter,
  });
}

export default useTypeToRender;
