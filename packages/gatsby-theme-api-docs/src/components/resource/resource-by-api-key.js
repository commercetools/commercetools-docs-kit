import PropTypes from 'prop-types';
import { useReadResourceByResourcePath } from '../../hooks/use-read-resource-by-resource-path';
import Resource from './resource';
import reportError from '../../utils/report-error';

// This "by key" wrapper component loads the API data via the static query hook
// an passes them to the implementation component, allowing customized variations
// of this wrapper that load less or more specific data
const ResourceByApiKey = ({ apiKey, resource }) => {
  const resourceObj = useReadResourceByResourcePath(apiKey, resource);

  if (!resourceObj) {
    return reportError(`Resource '${resource}' not found in '${apiKey}' API`);
  }

  return <Resource resourceObj={resourceObj} />;
};

ResourceByApiKey.propTypes = {
  apiKey: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
};
export default ResourceByApiKey;
