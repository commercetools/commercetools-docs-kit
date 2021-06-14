import useApi from './use-apis';

const useApiByKey = (apiKey) => {
  const apis = useApi();

  return apis.find((api) => {
    return api.apiKey === apiKey;
  });
};

export default useApiByKey;
