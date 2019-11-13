import React from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import { Link as GatsbyLink, withPrefix } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import getEnv from '../utils/get-env';
import ExternalLinkIcon from '../icons/external-link-icon.svg';
import { colors, dimensions } from '../design-system';
import { useSiteData } from '../hooks/use-site-data';

const dummyHostname = 'dummy.com';

// Gatsby links should be written with the full url path starting with `/` (so no
// "filesystem"-relative paths).
// In order to resolve relative paths that do no start with a `/`, we need to first
// trim the possible `pathPrefix` included in the `location` of `@react/router`.
const withoutPrefix = (value, pathPrefix) =>
  value.replace(new RegExp(`^${pathPrefix}`), '');

const trimTrailingSlash = url => url.replace(/(\/?)$/, '');

const linkStyles = css`
  text-decoration: underline;
  &,
  > code {
    color: ${colors.light.link};
    :active,
    :focus,
    :hover {
      color: ${colors.light.linkHover};
    }
  }
`;

export const ExternalSiteLink = props => (
  <OutboundLink
    {...props}
    css={linkStyles}
    target="_blank"
    rel="noopener noreferrer"
  />
);
const AnchorLink = styled.a`
  ${linkStyles}
`;
const InternalSiteLink = styled(AnchorLink)``;
const GatsbyRouterLink = styled(GatsbyLink)`
  ${linkStyles}
`;
const InlineLink = styled.span`
  display: inline-flex;
  align-items: center;
  > * + * {
    margin: 0 0 0 ${dimensions.spacings.xs};
  }
  svg {
    * {
      fill: ${colors.light.link};
    }
  }
  :hover {
    svg {
      * {
        fill: ${colors.light.linkHover};
      }
    }
  }
`;

/**
 * The <Link> component handles different scenarios of how links are written in the website.
 * Below are the recommended convention for providing a link `href`. However, to be
 * as compatible as possible, the component also tries to support other possible scenarios,
 * including relative filesystem paths, etc.
 *
 * ---
 * # Links conventions
 *
 * ## same page
 * #anchor
 *
 * ## same site
 * /getting-started
 * overview/
 *
 * ### hidden features
 * ./overview/
 * ../foo
 * ???
 *
 * ## other CT site
 * https://docs.commercetools.com/app-kit/getting-started
 * - prod: without origin
 * - dev: warning
 *
 * ### hidden features
 * /../app-kit/getting-started
 *
 * ## external site
 * https://<domain>/something/else
 *
 * ---
 *
 * For outboud links to external websites, we use the <OutboudLink> component for
 * tracking Google Analytics.
 */
const PureLink = extendedProps => {
  const siteData = useSiteData();
  const { location, ...props } = extendedProps;
  // For image links, return the link as-is.
  if (props.href.startsWith(withPrefix('/static'))) {
    return <a {...props} role="image-link" />;
  }

  // Remove possible `pathPrefix` from both the `location.pathname` and the provided `href`.
  const pathnameWithoutPrefix = withoutPrefix(
    trimTrailingSlash(location.pathname),
    siteData.pathPrefix
  );
  const hrefWithoutPrefix = withoutPrefix(props.href, siteData.pathPrefix);
  // Construct an URL object for the given `href` and provide a "dummy" base origin
  // from the current website location url with the sole purpose of resolving
  // the correct pathname in case the `href` is a filesystem-relative path.
  const hrefObject = new URL(
    hrefWithoutPrefix,
    `https://${dummyHostname}${pathnameWithoutPrefix}${location.hash || ''}`
  );

  // Case 1: the link points to an external website.
  const isExternalLink =
    /^https?/.test(props.href) || (props.target && props.target === '_blank');
  if (
    isExternalLink &&
    ![siteData.siteMetadata.productionHostname, dummyHostname].includes(
      hrefObject.host
    )
  ) {
    const linkWithIcon = React.isValidElement(props.children) ? (
      // In case the children are a React element (e.g. <code>) we need to inject
      // the external link icon next to the actual text.
      // For this we assume that the React element's own child is plain text.
      React.cloneElement(props.children, {
        children: (
          <InlineLink>
            <span>{props.children.props.children}</span>
            <ExternalLinkIcon height={12} width={12} />
          </InlineLink>
        ),
      })
    ) : (
      <InlineLink>
        <span>{props.children}</span>
        <ExternalLinkIcon height={12} width={12} />
      </InlineLink>
    );
    return (
      <ExternalSiteLink {...props} role="external-link">
        {linkWithIcon}
      </ExternalSiteLink>
    );
  }

  // Case 2: the link points to the exact same page. We use only the `hash` parameter
  // to avoids Gatsby to add the `pathPrefix`.
  const isAnchorLink = hrefWithoutPrefix.startsWith('#');
  const isLinkToSamePage = hrefObject.pathname === pathnameWithoutPrefix;
  if (isAnchorLink || isLinkToSamePage) {
    return (
      <AnchorLink
        role="anchor-link"
        href={trimTrailingSlash(hrefObject.hash)}
        className={props.className}
      >
        {props.children}
      </AnchorLink>
    );
  }

  // Case 3: the link points to the same site but to a different page. We use the Gatsby link
  // to take advantage of the history navigation.
  const isUsingUndocumentedNotationToLinkToAnotherDocsSite = hrefWithoutPrefix.startsWith(
    '/../'
  );
  const isSameDocsHostname =
    hrefObject.hostname === siteData.siteMetadata.productionHostname;
  const isLinkToAnotherDocsSite =
    isUsingUndocumentedNotationToLinkToAnotherDocsSite || isSameDocsHostname;
  if (!isLinkToAnotherDocsSite) {
    return (
      <GatsbyRouterLink
        role="gatsby-link"
        to={trimTrailingSlash(hrefObject.pathname) + hrefObject.hash}
        className={props.className}
      >
        {props.children}
      </GatsbyRouterLink>
    );
  }

  // All other links (e.g. to another documentation micro site) should be rendered as normal
  // HTML links.
  const isProduction = getEnv('production');
  const internalHref =
    isLinkToAnotherDocsSite &&
    !isProduction &&
    !isUsingUndocumentedNotationToLinkToAnotherDocsSite
      ? hrefObject.origin + hrefObject.pathname + hrefObject.hash
      : hrefObject.pathname + hrefObject.hash;
  return (
    <InternalSiteLink
      role="internal-link"
      href={internalHref}
      className={props.className}
    >
      {props.children}
    </InternalSiteLink>
  );
};
PureLink.propTypes = {
  href: PropTypes.string.isRequired,
  target: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  // from @react/router
  location: PropTypes.object.isRequired,
};

const Link = props => (
  <Location>
    {({ location }) => <PureLink location={location} {...props} />}
  </Location>
);

export default Link;
