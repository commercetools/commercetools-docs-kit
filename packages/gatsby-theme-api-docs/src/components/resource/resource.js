import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { FullWidthContainer } from '@commercetools-docs/gatsby-theme-docs';
import Method from './method';

const Resource = ({ resourceObj }) => {
  const methods = ['post', 'put', 'get', 'delete'];

  return (
    <FullWidthContainer>
      <SpacingsStack scale="xl">
        {methods.map((method) => {
          return resourceObj[method] ? (
            <Method
              key={method}
              apiKey={resourceObj.apiKey}
              uris={resourceObj.uris}
              resourceUriParameters={resourceObj.allUriParameters}
              method={resourceObj[method]}
              methodType={method}
            />
          ) : null;
        })}
      </SpacingsStack>
    </FullWidthContainer>
  );
};

Resource.propTypes = {
  resourceObj: PropTypes.object.isRequired,
};

export default Resource;
