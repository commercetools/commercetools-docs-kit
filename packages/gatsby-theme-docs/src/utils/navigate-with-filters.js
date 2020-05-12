import { navigate } from '@reach/router';
import extractQueryParameters from './extract-query-parameters';

function navigateWithFilters(filters, location) {
  const currentQueryParameters = extractQueryParameters(location);
  const newQueryParameters = { ...currentQueryParameters, ...filters };

  newQueryParameters.filterTopics = JSON.stringify(
    newQueryParameters.filterTopics
  );

  navigate(
    `?fromFilterDate=${encodeURIComponent(
      newQueryParameters.fromFilterDate
    )}&toFilterDate=${encodeURIComponent(
      newQueryParameters.toFilterDate
    )}&filterTopics=${encodeURIComponent(newQueryParameters.filterTopics)}`
  );
}

export default navigateWithFilters;
