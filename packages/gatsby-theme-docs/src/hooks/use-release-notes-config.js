import { buildReleaseNotesQueryString } from '../utils/release-notes';
import { useSiteData } from './use-site-data';

const OTHER_GROUP_SITE_PREFIXES = ['/docs']; // let's use pathPrefix to identify websites (works only on prod)
const RELEASE_NOTES_BASE_URL = '/docs/release-notes'; // only prod url

const useReleaseNotesConfig = () => {
  const {
    pathPrefix,
    siteMetadata: { products, title },
  } = useSiteData();

  const getReleaseNotesUrl = () => {
    const product = products?.[0];

    const queryString = buildReleaseNotesQueryString(
      OTHER_GROUP_SITE_PREFIXES.includes(pathPrefix) ? 'other' : 'product',
      product,
      title
    );
    return `${RELEASE_NOTES_BASE_URL}?${queryString}`;
  };

  return { getReleaseNotesUrl, RELEASE_NOTES_BASE_URL };
};

export default useReleaseNotesConfig;
