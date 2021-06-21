import React from 'react';
import ApiType from './type';
import { useApiTypes } from '../../hooks/use-api-types';

const ApiTypeByKey = (props) => {
  const apiTypeData = useApiTypes();
  return <ApiType apiTypes={apiTypeData} {...props} />;
};

export default ApiTypeByKey;
