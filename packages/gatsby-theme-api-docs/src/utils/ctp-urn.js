/**
 * parser-generator for our URN-like globally unique addressing of API types, endpoints etc.
 * It's not actual registered URNs but we stick with the name for the interface.
 * Formally correct, a URN would have to be urn:example:ctp:$apiKey:type:$typeName but we omit the urn:example namespace.
 */
const prefix = 'ctp';
const encodedColon = '%3A';
const encodedHash = '%23';
const colonRegExp = new RegExp(encodedColon, 'g');
const hashRegExp = new RegExp(encodedHash, 'g');

// encode the minimum required only, but add the hash so the result is compatible
// being a URL fragment identifier a.k.a. hash.
const encodeURNComponent = (input) => {
  return input.replace(/:/g, encodedColon).replace(/#/g, encodedHash);
};

const decodeURNComponent = (input) => {
  return decodeURI(input.replace(colonRegExp, ':').replace(hashRegExp, '#'));
};

const URNComponents = (urn) => {
  return urn.split(':').map(decodeURNComponent);
};

export const generateTypeURN = ({ apiKey = '', displayName = '' }) => {
  return `${prefix}:${encodeURNComponent(apiKey)}:type:${encodeURNComponent(
    displayName
  )}`;
};

export const parseTypeURN = (urn) => {
  const components = URNComponents(urn);
  if (
    components.length === 4 &&
    components[0] === 'ctp' &&
    components[2] === 'type'
  ) {
    return {
      apiKey: components[1],
      name: components[3],
    };
  }
  return false;
};

export const generateEndpointURN = ({
  apiKey = '',
  path = '',
  method = '',
}) => {
  return `${prefix}:${encodeURNComponent(apiKey)}:endpoint:${encodeURNComponent(
    path
  )}:${encodeURNComponent(method.toUpperCase())}`;
};

export const parseEndpointURN = (urn) => {
  const components = URNComponents(urn);
  if (
    components.length === 5 &&
    components[0] === 'ctp' &&
    components[2] === 'endpoint'
  ) {
    return {
      apiKey: components[1],
      path: components[3],
      method: components[4],
    };
  }
  return false;
};
