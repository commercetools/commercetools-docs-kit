function extractQueryParameters(loc) {
  const queryString = loc.search.substring(1);

  if (queryString) {
    const keyValueArray = queryString.split('&');
    return {
      fromFilterDate: decodeURIComponent(keyValueArray[0].split('=')[1]),
      toFilterDate: decodeURIComponent(keyValueArray[1].split('=')[1]),
      filterTopics: JSON.parse(
        decodeURIComponent(keyValueArray[2].split('=')[1])
      ),
    };
  }

  return {
    fromFilterDate: '',
    toFilterDate: '',
    filterTopics: [],
  };
}

export default extractQueryParameters;
