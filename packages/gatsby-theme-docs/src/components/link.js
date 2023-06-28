import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Location } from '@reach/router';
import { Link as GatsbyLink, withPrefix } from 'gatsby';
import styled from '@emotion/styled';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import { ExternalLinkIcon } from '@commercetools-uikit/icons';
import { Link as StyledLink, designSystem } from '@commercetools-docs/ui-kit';
import getEnv from '../utils/get-env';
import { useSiteData } from '../hooks/use-site-data';

const dummyHostname = 'dummy.com';

// Gatsby links should be written with the full url path starting with `/` (so no
// "filesystem"-relative paths).
// In order to resolve relative paths that do no start with a `/`, we need to first
// trim the possible `pathPrefix` included in the `location` of `@react/router`.
const withoutPrefix = (value, pathPrefix) =>
  value.replace(new RegExp(`^${pathPrefix}\\b`), '');

const trimTrailingSlash = (url) => url.replace(/(\/?)$/, '');

const getStylesFromProps = ({ nounderline }) => css`
  text-decoration: ${nounderline ? 'none' : 'underline'};
`;

const AnchorLink = styled(StyledLink)``;
const InternalSiteLink = styled(StyledLink)``;
const GatsbyRouterLink = StyledLink.withComponent(GatsbyLink);
const StyledExternalSiteLink = StyledLink.withComponent(OutboundLink);
const InlineLink = styled.span`
  display: inline-flex;
  align-items: center;
  > * + * {
    margin: 0 0 0 ${designSystem.dimensions.spacings.xs};
  }
  svg {
    fill: ${designSystem.colors.light.link};
  }
  :hover {
    svg {
      fill: ${designSystem.colors.light.linkHover};
    }
  }
`;

export const ExternalSiteLink = (props) => (
  <StyledExternalSiteLink {...props} target="_blank" rel="noopener" />
);

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
 * /../app-kit/getting-started
 * OR:
 * https://docs.commercetools.com/app-kit/getting-started
 * - prod: without origin, removed automatically
 * - dev: warning
 *
 * ## external site
 * https://<domain>/something/else
 *
 * ---
 *
 * For outboud links to external websites, we use the <OutboudLink> component for
 * tracking Google Analytics.
 */
const PureLink = (extendedProps) => {
  const siteData = useSiteData();
  const { location, nounderline, ...props } = extendedProps;
  console.log('location', location);
  // For image links, return the link as-is.
  if (props.href.startsWith(withPrefix('/static'))) {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a {...props} data-link-type="image-link" />;
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

  // Case 1: the link points to a static file/page, so it should not be processed by Gatsby.
  // Note that all files that should be served statically MUST be defined in the `/static` folder
  // of the website.
  // As a convention, we only match links to those files that respect the following rules:
  // - the files are within the `/downloads` folder
  // - any HTML file (file path ending with `.html`)
  if (
    hrefObject.pathname.startsWith('/downloads') ||
    // NOTE: serving static HTML pages does not work in development mode.
    // https://github.com/gatsbyjs/gatsby/issues/13072
    hrefObject.pathname.endsWith('.html')
  ) {
    return <StyledExternalSiteLink {...props} data-link-type="static-link" />;
  }

  // Case 2: the link points to an external website.
  const isExternalLink =
    /^https?/.test(props.href) ||
    /^mailto?/.test(props.href) ||
    (props.target && props.target === '_blank');
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
            <span css={getStylesFromProps({ nounderline })}>
              {props.children.props.children}
            </span>
            <ExternalLinkIcon size="small" />
          </InlineLink>
        ),
      })
    ) : (
      <InlineLink>
        <span css={getStylesFromProps({ nounderline })}>{props.children}</span>
        <ExternalLinkIcon size="small" />
      </InlineLink>
    );
    if (props.noadditionalstyling) {
      return (
        <ExternalSiteLink
          {...props}
          data-link-type="external-link"
          css={getStylesFromProps({ nounderline })}
        ></ExternalSiteLink>
      );
    }
    return (
      <ExternalSiteLink
        {...props}
        data-link-type="external-link"
        css={getStylesFromProps({ nounderline })}
      >
        {linkWithIcon}
      </ExternalSiteLink>
    );
  }

  // Case 3: the link points to the exact same page. We use only the `hash` parameter
  // to avoids Gatsby to add the `pathPrefix`.
  const isAnchorLink = hrefWithoutPrefix.startsWith('#');
  const isLinkToSamePage = hrefObject.pathname === pathnameWithoutPrefix;
  if (isAnchorLink || isLinkToSamePage) {
    return (
      <AnchorLink
        data-link-type="anchor-link"
        href={trimTrailingSlash(hrefObject.hash)}
        className={props.className}
        css={getStylesFromProps({ nounderline })}
      >
        {props.children}
      </AnchorLink>
    );
  }

  // Case 4: the link points to the same site but to a different page. We use the Gatsby link
  // to take advantage of the history navigation.
  const isUsingUndocumentedNotationToLinkToAnotherDocsSite =
    hrefWithoutPrefix.startsWith('/../');
  const isSameDocsHostname =
    hrefObject.hostname === siteData.siteMetadata.productionHostname;
  const isLinkToAnotherDocsSite =
    isUsingUndocumentedNotationToLinkToAnotherDocsSite || isSameDocsHostname;
  if (!isLinkToAnotherDocsSite) {
    return (
      <GatsbyRouterLink
        data-link-type="gatsby-link"
        to={trimTrailingSlash(hrefObject.pathname) + hrefObject.hash}
        className={props.className}
        css={getStylesFromProps({ nounderline })}
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
      ? hrefObject.origin +
        trimTrailingSlash(hrefObject.pathname) +
        hrefObject.hash
      : trimTrailingSlash(hrefObject.pathname) + hrefObject.hash;
  return (
    <InternalSiteLink
      data-link-type="internal-link"
      href={internalHref}
      className={props.className}
      css={getStylesFromProps({ nounderline })}
    >
      {props.children}
    </InternalSiteLink>
  );
};
PureLink.propTypes = {
  href: PropTypes.string.isRequired,
  target: PropTypes.string,
  className: PropTypes.string,
  nounderline: PropTypes.bool,
  noadditionalstyling: PropTypes.bool,
  children: PropTypes.node,
  // from @react/router
  location: PropTypes.object.isRequired,
};

const Link = (props) => (
  <Location>
    {({ location }) => <PureLink location={location} {...props} />}
  </Location>
);

export default Link;
