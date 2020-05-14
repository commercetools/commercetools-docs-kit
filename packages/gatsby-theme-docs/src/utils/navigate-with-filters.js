import { navigate } from '@reach/router';
import { encode } from 'qss';
import extractQueryParameters from './extract-query-parameters';

function navigateWithFilters(filters, location) {
  const currentQueryParameters = extractQueryParameters(location);
  const newQueryParameters = removeUnnecessaryParameters({
    ...currentQueryParameters,
    ...filters,
  });

  const to =
    Object.keys(newQueryParameters).length > 0
      ? encode(newQueryParameters, '?')
      : location.pathname;

  navigate(to, { state: { scrollToTop: true } });
}

function removeUnnecessaryParameters(parameters) {
  const returnedParameters = {};
  Object.keys(parameters).forEach((key) => {
    if (!Array.isArray(parameters[key]) && parameters[key]) {
      returnedParameters[key] = parameters[key];
    } else if (parameters[key].length > 0) {
      returnedParameters[key] = parameters[key];
    }
  });

  return returnedParameters;
}

export default navigateWithFilters;
