import { useStaticQuery, graphql } from 'gatsby';
import { buildReleaseNotesQueryString } from '../utils/release-notes';

const useReleaseNotesConfig = () => {
  const data = useStaticQuery(graphql`
    query ReleaseNotesConfigQuery {
      allReleaseNotesYaml {
        nodes {
          searchPagePath
          microsites {
            group
            micrositeTitle
            product
            productArea
          }
        }
      }
    }
  `);

  const getReleaseNotesUrlBySiteTitle = (siteTitle) => {
    const result = data?.allReleaseNotesYaml?.nodes?.[0];
    if (!result) {
      return '';
    }
    const baseUrl = `${result.searchPagePath || ''}`;
    const config = result.microsites.find(
      (config) => config.micrositeTitle === siteTitle
    );
    if (!config) {
      return baseUrl;
    }
    const queryString = buildReleaseNotesQueryString(
      config.group,
      config.product,
      config.productArea
    );
    return `${baseUrl}${queryString}`;
  };

  return { data, getReleaseNotesUrlBySiteTitle };
};

export default useReleaseNotesConfig;
