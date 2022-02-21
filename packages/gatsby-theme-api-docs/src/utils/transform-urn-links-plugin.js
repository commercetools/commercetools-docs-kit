import visit from 'unist-util-visit';
import { useTypeLocations, locationForType } from '../hooks/use-type-locations';
import { parseTypeURN } from './ctp-urn';

// a custom remark plugin that resolves URN style links from RAML descriptions to URLs
const transformURNLinksPlugin = () => (ast) => {
  const typeLocations = useTypeLocations();
  visit(ast, 'link', (node) => {
    const typeUrn = parseTypeURN(node.url);
    if (typeUrn !== false) {
      const typeUrl = locationForType(
        typeUrn.apiKey,
        typeUrn.name,
        typeLocations
      );
      node.url =
        typeUrl.url && typeof typeUrl.url === 'string'
          ? typeUrl.url
          : 'Content Error - type location not found for: ' + node.url;
    }
  });
};

export default transformURNLinksPlugin;
