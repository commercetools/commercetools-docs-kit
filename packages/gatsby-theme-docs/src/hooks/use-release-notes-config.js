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
    const { group, product, productArea } = result.microsites.find(
      (config) => config.micrositeTitle === siteTitle
    );
    const queryString = buildReleaseNotesQueryString(
      group,
      product,
      productArea
    );
    return `${baseUrl}${queryString}`;
  };

  return { data, getReleaseNotesUrlBySiteTitle };
};

export default useReleaseNotesConfig;
