import visit from 'unist-util-visit';
import {
  locationForEndpoint,
  useEndpointLocations,
} from '../hooks/use-endpoint-locations';
import { useTypeLocations, locationForType } from '../hooks/use-type-locations';
import { parseEndpointURN, parseTypeURN } from './ctp-urn';

// a custom remark plugin that resolves URN style links from RAML descriptions to URLs
const transformURNLinksPlugin = () => (ast) => {
  const typeLocations = useTypeLocations();
  const endpointLocations = useEndpointLocations();
  visit(ast, 'link', (node) => {
    const typeUrn = parseTypeURN(node.url);
    const endpointUrn = parseEndpointURN(node.url);
    if (typeUrn !== false) {
      const typeUrl = locationForType(
        typeUrn.apiKey,
        typeUrn.name,
        typeLocations
      );
      if (typeUrl === undefined) {
        node.url = `Content Error - type with name '${typeUrn.name}' not found in '${typeUrn.apiKey}' API`;
      } else {
        node.url =
          typeUrl.url && typeof typeUrl.url === 'string'
            ? typeUrl.url
            : `Content Error - type location not found for: ${node.url}`;
      }
    }
    if (endpointUrn !== false) {
      const endpointUrl = locationForEndpoint(
        endpointUrn.apiKey,
        endpointUrn.path,
        endpointUrn.method,
        endpointLocations
      );
      if (endpointUrl === undefined) {
        node.url = `Content Error - endpoint with path '${endpointUrn.path}' path '${endpointUrn.method}' not found in '${endpointUrn.apiKey}' API`;
      } else {
        node.url =
          endpointUrl.url && typeof endpointUrl.url === 'string'
            ? endpointUrl.url
            : `Content Error - type location not found for: ${endpointUrn.url}`;
      }
    }
  });
};

export default transformURNLinksPlugin;
