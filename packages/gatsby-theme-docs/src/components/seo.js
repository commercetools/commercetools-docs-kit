/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSiteData } from '../hooks/use-site-data';

const productsToMeta = (products) => {
  return products.map((item) => {
    return {
      name: 'commercetools:product',
      content: item,
    };
  });
};

const getProductsMeta = (siteProducts, pageProducts) => {
  // if products are defined a page level, they should override the site level
  if (pageProducts && pageProducts.length > 0) {
    return productsToMeta(pageProducts);
  }
  // otherwise, use the site level products, if exist
  if (siteProducts && siteProducts.length > 0) {
    return productsToMeta(siteProducts);
  }
  // if no products are defined, return an empty array
  return [];
};

const SEO = (props) => {
  const siteData = useSiteData();
  const siteContextTitle = siteData?.siteMetadata?.breadcrumbs;
  const excludeFromSearchIndex =
    props.excludeFromSearchIndex ||
    siteData.siteMetadata.excludeFromSearchIndex;
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
    {
      name: 'commercetools:title-for-onsite-search',
      content: siteContextTitle
        ? `${siteContextTitle} > ${siteData.siteMetadata.title}`
        : siteData.siteMetadata.title,
    },
    siteData.siteMetadata.contentType && {
      name: 'commercetools:contentType',
      content: siteData.siteMetadata.contentType,
    },
    excludeFromSearchIndex && {
      name: 'robots',
      content: 'noindex',
    },
    ...props.meta,
  ]
    .concat(getProductsMeta(siteData.siteMetadata.products, props.products))
    .filter(Boolean);

  const titleTemplate = `${props.title} | ${siteData.siteMetadata.title} | ${
    siteContextTitle ? `commercetools ${siteContextTitle}` : `commercetools`
  }`;

  return (
    <>
      <meta charSet="utf-8" />
      <title>{titleTemplate}</title>
      {metaTags.map((tag) => (
        <meta key={tag.name || tag.property} {...tag} />
      ))}
    </>
  );
};
SEO.displayName = 'SEO';
SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
  description: '',
  products: [],
};
SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  excludeFromSearchIndex: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.string),
};

export default SEO;
