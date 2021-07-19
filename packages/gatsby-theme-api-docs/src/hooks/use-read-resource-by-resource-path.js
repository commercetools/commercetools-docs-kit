import { useApiByKey } from './use-apis';
import { useApiResourceByApiKeyAndResourcePathUri } from './use-api-resources';

export const useReadResourceByResourcePath = (apiKey, resourcePath) => {
  const api = useApiByKey(apiKey);
  const matchedResource = useApiResourceByApiKeyAndResourcePathUri(
    apiKey,
    resourcePath
  );
  if (!api) return undefined;
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
