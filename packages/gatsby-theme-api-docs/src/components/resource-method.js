import PropTypes from 'prop-types';
import { FullWidthContainer } from '@commercetools-docs/gatsby-theme-docs';
import useReadResourceByResourcePath from '../hooks/use-read-resource-by-resource-path';
import reportError from '../utils/report-error';
import Method from './resource/method';

const ResourceMethod = ({ apiKey, resource, method, title }) => {
  const resourceObject = useReadResourceByResourcePath(apiKey, resource);

  if (!resourceObject) {
    return reportError(`Resource '${resource}' not found in '${apiKey}' API`);
  }

  const methodObject = resourceObject[method.toLowerCase()];

  if (!methodObject) {
    return reportError(
      `Method '${method}' of resource '${resource}' not found in '${apiKey}' API`
    );
  }

  return (
    <FullWidthContainer>
      <Method
        apiKey={apiKey}
        uris={resourceObject.uris}
        resourceUriParameters={resourceObject.allUriParameters}
        method={methodObject}
        methodType={method}
        title={title}
      />
    </FullWidthContainer>
  );
};

ResourceMethod.propTypes = {
  apiKey: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default ResourceMethod;
