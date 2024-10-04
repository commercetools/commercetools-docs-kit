import { buildReleaseNotesQueryString } from '../utils/release-notes';
import { useSiteData } from './use-site-data';

const OTHER_GROUP_SITE_PREFIXES = []; // let's use pathPrefix to identify websites that point to others tab (works only on prod), docs-team asked to point all to product sofar
const NO_PRODUCT_AREA_SITE_PREFIXES = ['/docs']; // when matching these site prefixes, the productArea param will not be added to the release notes url
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
      NO_PRODUCT_AREA_SITE_PREFIXES.includes(pathPrefix) ? undefined : title
    );
    return `${RELEASE_NOTES_BASE_URL}?${queryString}`;
  };

  return { getReleaseNotesUrl, RELEASE_NOTES_BASE_URL };
};

export default useReleaseNotesConfig;
