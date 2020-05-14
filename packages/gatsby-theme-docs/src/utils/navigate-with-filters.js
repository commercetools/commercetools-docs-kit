import { navigate } from '@reach/router';
import { encode } from 'qss';
import extractQueryParameters from './extract-query-parameters';

function navigateWithFilters(filters, location) {
  const currentQueryParameters = extractQueryParameters(location);
  const newQueryParameters = removeUnnecessaryParameters({
    ...currentQueryParameters,
    ...filters,
  });

  navigate(encode(newQueryParameters, '?'), { state: { scrollToTop: true } });
}

function removeUnnecessaryParameters(parameters) {
  const returnedParameters = {};
  Object.keys(parameters).forEach((key) => {
    if (Array.isArray(parameters[key]) && parameters.length > 0) {
      returnedParameters[key] = parameters[key];
    } else if (parameters[key]) {
      returnedParameters[key] = parameters[key];
    }
  });

  return returnedParameters;
}

export default navigateWithFilters;
