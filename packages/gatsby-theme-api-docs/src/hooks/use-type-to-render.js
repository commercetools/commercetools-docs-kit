import { useTypeLocations } from './use-type-locations';
import generateTypeToRender from '../utils/generate-type-to-render';

function useTypeToRender({ property, apiKey, isParameter } = {}) {
  const typeLocations = useTypeLocations();
  return generateTypeToRender({
    typeLocations,
    property,
    apiKey,
    isParameter,
  });
}

export default useTypeToRender;
