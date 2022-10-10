import ApiType from './type';
import { useApiTypes } from '../../hooks/use-api-types';

// This "by key" wrapper component loads the API data via the static query hook
// an passes them to the implementation component, allowing customized variations
// of this wrapper that load less or more specific data
const ApiTypeByApiKey = (props) => {
  const apiTypeData = useApiTypes();
  return <ApiType apiTypes={apiTypeData} {...props} />;
};

export default ApiTypeByApiKey;
