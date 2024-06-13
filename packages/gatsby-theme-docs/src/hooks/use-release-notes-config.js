import { buildReleaseNotesQueryString } from '../utils/release-notes';
import { useSiteData } from './use-site-data';

const OTHER_GROUP_SITE_PREFIXES = ['/docs']; // let's yse pathPrefix to identify websites (works only on prod)

const useReleaseNotesConfig = () => {
  const {
    pathPrefix,
    siteMetadata: { products, title },
  } = useSiteData();

  const getReleaseNotesUrl = () => {
    const product = products?.[0];

    const queryString = buildReleaseNotesQueryString(
      OTHER_GROUP_SITE_PREFIXES.includes(pathPrefix) ? 'other' : 'product',
      title,
      product
    );
    return `/docs/release-notes${queryString}`; // only prod url
  };

  return { getReleaseNotesUrl };
};

export default useReleaseNotesConfig;
