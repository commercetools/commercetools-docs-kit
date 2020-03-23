import useApiByApiKey from './use-api-by-api-key';
import useApiResources from './use-api-resources';

export default (apiKey, resourcePath) => {
  const api = useApiByApiKey(apiKey);
  if (!api) return undefined;

  const resources = useApiResources();

  const matchedResource = resources.find((resource) => {
    return (
      resource.apiKey === apiKey && resource.resourcePathUri === resourcePath
    );
  });

  if (!matchedResource) return undefined;

  return {
    ...matchedResource,
    uris: {
      baseUri: api.baseUri,
      resourcePathUri: matchedResource.resourcePathUri,
    },
    allUriParameters: mergeUriParameters(
      api.baseUriParameters,
      matchedResource.uriParameters
    ),
  };
};

function mergeUriParameters(baseUriParameters, uriParameters) {
  let returnedParams = [];

  if (baseUriParameters) {
    returnedParams = returnedParams.concat(baseUriParameters);
  }

  if (uriParameters) {
    returnedParams = returnedParams.concat(uriParameters);
  }

  return returnedParams.length > 0 ? returnedParams : undefined;
}
