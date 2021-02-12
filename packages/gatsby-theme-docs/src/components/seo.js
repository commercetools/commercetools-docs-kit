/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useSiteData } from '../hooks/use-site-data';

const SEO = (props) => {
  const siteData = useSiteData();
  const metaDescription =
    props.description || siteData.siteMetadata.description;
  const metaTags = [
    {
      name: 'description',
      content: metaDescription,
    },
    props.keywords.length > 0 && {
      name: 'keywords',
      content: props.keywords.join(', '),
    },
    {
      property: 'og:title',
      content: props.title,
    },
    {
      property: 'og:description',
      content: metaDescription,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:creator',
      content: siteData.siteMetadata.author,
    },
    {
      name: 'twitter:title',
      content: props.title,
    },
    {
      name: 'twitter:description',
      content: metaDescription,
    },
    props.excludeFromSearchIndex && {
      name: 'robots',
      content: 'noindex',
    },
    ...props.meta,
  ].filter(Boolean);
  return (
    <Helmet
      titleTemplate={`%s | ${siteData.siteMetadata.title} | commercetools`}
    >
      <meta charSet="utf-8" />
      <html lang={props.lang} amp />
      <title>{props.title}</title>
      {metaTags.map((tag) => (
        <meta key={tag.name || tag.property} {...tag} />
      ))}
    </Helmet>
  );
};
SEO.displayName = 'SEO';
SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
  description: '',
};
SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  excludeFromSearchIndex: PropTypes.bool.isRequired,
};

export default SEO;
