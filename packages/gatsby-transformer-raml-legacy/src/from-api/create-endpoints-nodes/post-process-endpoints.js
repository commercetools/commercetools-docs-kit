const postProcessEndpoints = (apiKey, resources) => {
  return flattenResources(apiKey, resources);
};

function flattenResources(apiKey, resources) {
  let flattenedResources = [];

  resources.forEach((resource) => {
    const {
      resources: nestedResources,
      ...resourceWithoutNestedResources
    } = resource;

    resourceWithoutNestedResources.apiKey = apiKey;
    resourceWithoutNestedResources.methods = processMethods(
      resourceWithoutNestedResources.methods
    );
    // transform resourceWithoutNestedResources.methods
    flattenedResources.push(resourceWithoutNestedResources);

    if (nestedResources) {
      flattenedResources = flattenedResources.concat(
        flattenResources(apiKey, nestedResources)
      );
    }
  });

  return flattenedResources;
}

function processMethods(methods) {
  if (methods && methods.length) {
    const methodsC = JSON.parse(JSON.stringify(methods));

    return methodsC.map((method) => {
      return {
        ...method,
        body: processBody(method.body),
        responses: processMethodResponses(method.responses),
      };
    });
  }

  return undefined;
}

function processMethodResponses(responses) {
  if (responses && responses.length) {
    const responsesC = JSON.parse(JSON.stringify(responses));

    return responsesC.map((response) => {
      let { body } = response;
      if (body) {
        body = processBody(body);
        return { ...response, body };
      }

      return response;
    });
  }

  return undefined;
}

function processBody(body) {
  if (body) {
    try {
      isValidBody(body[0]);
      return body.map((item, index) => {
        if (index === 0) {
          return mutateKeyToMimeType(item);
        }

        return item;
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  return undefined;
}

function isValidBody(body) {
  if (
    (body.type === 'object' && body.name === 'application/json') ||
    (body.type === 'array' && body.items.name === 'application/json')
  ) {
    throw new Error(
      `Anonymous type definition of body.\n${JSON.stringify(body, null, 4)}`
    );
  }

  return true;
}

function mutateKeyToMimeType(obj) {
  if (obj && obj.key) {
    const objC = JSON.parse(JSON.stringify(obj));
    const mimeType = objC.key;
    delete objC.key;
    return { ...objC, mimeType };
  }

  return obj;
}

module.exports = {
  postProcessEndpoints,
  flattenResources,
  processMethods,
  processMethodResponses,
  isValidBody,
  mutateKeyToMimeType,
};
