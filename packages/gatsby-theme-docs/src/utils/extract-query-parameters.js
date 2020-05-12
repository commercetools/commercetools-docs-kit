import { decode } from 'qss';

function extractQueryParameters(loc) {
  const queryString = loc.search.substring(1);
  return decode(queryString);
}

export default extractQueryParameters;
