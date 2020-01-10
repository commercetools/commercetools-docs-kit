import useApi from './use-apis';

export default apiKey => {
  const apis = useApi();

  return apis.find(api => {
    return api.apiKey === apiKey;
  });
};
