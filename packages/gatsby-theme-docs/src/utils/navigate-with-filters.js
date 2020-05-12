import { navigate } from '@reach/router';
import { encode } from 'qss';
import extractQueryParameters from './extract-query-parameters';

function navigateWithFilters(filters, location) {
  const currentQueryParameters = extractQueryParameters(location);
  const newQueryParameters = { ...currentQueryParameters, ...filters };

  navigate(
    encode(
      newQueryParameters,
      Object.keys(newQueryParameters).length > 0 ? '?' : ''
    )
  );
}

export default navigateWithFilters;
