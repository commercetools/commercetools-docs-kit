import React from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import { useStaticQuery, graphql, Link, withPrefix } from 'gatsby';
import { css, ClassNames } from '@emotion/core';
import styled from '@emotion/styled';
import { BackIcon } from '@commercetools-uikit/icons';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { designSystem, createStyledIcon } from '@commercetools-docs/ui-kit';
import useScrollPosition from '../../hooks/use-scroll-position';
import { BetaFlag } from '../../components';
import UnstyledReleaseNotesIcon from '../../icons/release-notes.svg';
import LayoutHeaderLogo from './layout-header-logo';

const ReleaseNotesIcon = createStyledIcon(UnstyledReleaseNotesIcon);

const trimTrailingSlash = (url) => url.replace(/(\/?)$/, '');

const scrollContainerId = 'navigation-scroll-container';

const ScrollContainer = styled.div`
  overflow: auto;
  height: 100%;
  flex: 1;
  border-top: 1px solid ${designSystem.colors.light.borderPrimary};

  > div {
    margin-right: ${designSystem.dimensions.spacings.m};
    padding: ${designSystem.dimensions.spacings.l} 0;
  }
  > * + * {
    border-top: 1px solid ${designSystem.colors.light.borderPrimary};
  }
`;
const SidebarHeader = styled.div`
  box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.1);
`;
const WebsiteTitle = styled.div`
  color: ${designSystem.colors.light.primary};
  padding: ${designSystem.dimensions.spacings.m};
  font-size: ${designSystem.typography.fontSizes.h4};
`;
const ReleaseNotesTitle = styled.div`
  border-top: 1px solid ${designSystem.colors.light.borderPrimary};
  padding: ${designSystem.dimensions.spacings.m} 0 !important;
`;
const LinkTitle = styled.div`
  font-size: ${designSystem.typography.fontSizes.body};
  text-overflow: ellipsis;
  overflow-x: hidden;
  width: 100%;
`;
const LinkSubtitle = styled.div`
  font-size: ${designSystem.typography.fontSizes.small};
  text-overflow: ellipsis;
  overflow-x: hidden;
  width: 100%;
`;
const LinkItem = styled.div`
  padding: 0 0 0 ${designSystem.dimensions.spacings.m};
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;
const linkStyles = `
  border-left: ${designSystem.dimensions.spacings.xs} solid ${designSystem.colors.light.surfaceSecondary1};
  padding-left: calc(${designSystem.dimensions.spacings.m} - ${designSystem.dimensions.spacings.xs});
  text-decoration: none;
  color: ${designSystem.colors.light.textSecondary};
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  :hover {
    color: ${designSystem.colors.light.linkNavigation} !important;
  }

  > * + * {
    margin: 0 0 0 ${designSystem.dimensions.spacings.s};
  }
`;
const activeLinkStyles = `
  border-left: ${designSystem.dimensions.spacings.xs} solid ${designSystem.colors.light.linkNavigation} !important;
  color: ${designSystem.colors.light.linkNavigation} !important;
`;

const SidebarLink = (props) => {
  const {
    locationPath,
    customStyles,
    customActiveStyles,
    ...forwardProps
  } = props;
  return (
    <ClassNames>
      {({ css: makeClassName }) => {
        const linkClassName = makeClassName`
          ${linkStyles}
          ${customStyles}
        `;
        const activeClassName = makeClassName`
          ${activeLinkStyles}
          ${customActiveStyles}
        `;
        return (
          <Link
            {...forwardProps}
            to={trimTrailingSlash(props.to)}
            getProps={({ href }) => {
              // Manually check that the link is the active one, even with trailing slashes.
              // The gatsby link is by default configured to match the exact path, therefore we
              // need to check this manually.
              const linkPath = trimTrailingSlash(href);
              if (linkPath === locationPath) {
                return {
                  className: [linkClassName, activeClassName].join(' '),
                  'aria-current': 'page',
                };
              }
              return { className: linkClassName };
            }}
          />
        );
      }}
    </ClassNames>
  );
};
SidebarLink.propTypes = {
  to: PropTypes.string.isRequired,
  locationPath: PropTypes.string,
  customStyles: PropTypes.string,
  customActiveStyles: PropTypes.string,
};

const SidebarLinkWrapper = (props) => {
  // Filter out props that we don't want to forward to the Link component
  const {
    location,
    nextScrollPosition,
    getChapterDOMElement,
    ...forwardProps
  } = props;

  const cachedScrollPosition = (location.state || {}).sidebarScrollPosition;
  const locationPath = trimTrailingSlash(location.pathname);

  const linkRef = React.useRef();

  const restoreScrollPosition = React.useCallback(() => {
    document
      .getElementById(scrollContainerId)
      .scrollBy(0, cachedScrollPosition);
  }, [cachedScrollPosition]);

  // We need to restore the scroll position as soon as possible, therefore we
  // use `useLayoutEffect` instead of `useEffect` as it fires synchronously after
  // all DOM mutations.
  React.useLayoutEffect(() => {
    const isActive = linkRef.current.getAttribute('aria-current') === 'page';
    // In case there was no scroll position saved in the location, and the link
    // is the active one, make sure that the chapter is "visible".
    if (isActive && !cachedScrollPosition) {
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView#Parameters
      getChapterDOMElement().scrollIntoView({ block: 'start' });
    }
    // In case there was a scroll position saved in the location make sure that
    // the scroll position is restored.
    // We check for the active link to ensure that we scroll to the position only once.
    else if (isActive && cachedScrollPosition >= 0) {
      restoreScrollPosition();
    }
  }, [
    linkRef,
    cachedScrollPosition,
    getChapterDOMElement,
    restoreScrollPosition,
  ]);

  return (
    <SidebarLink
      {...forwardProps}
      innerRef={linkRef}
      state={{
        sidebarScrollPosition: nextScrollPosition,
      }}
      locationPath={locationPath}
    />
  );
};
SidebarLinkWrapper.displayName = 'SidebarLinkWrapper';
SidebarLinkWrapper.propTypes = {
  to: PropTypes.string.isRequired,
  nextScrollPosition: PropTypes.number.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      sidebarScrollPosition: PropTypes.number,
    }),
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  getChapterDOMElement: PropTypes.func.isRequired,
};

const SidebarChapter = (props) => {
  const elemId = `sidebar-chapter-${props.index}`;
  const getChapterDOMElement = React.useCallback(
    () => document.getElementById(elemId),
    [elemId]
  );
  return (
    <div role="sidebar-chapter" id={elemId}>
      <SpacingsStack scale="s">
        <LinkItem>
          <LinkTitle>{props.chapter.chapterTitle}</LinkTitle>
          {props.chapter.beta && !props.isGlobalBeta && <BetaFlag />}
        </LinkItem>
        <SpacingsStack scale="s">
          {props.chapter.pages &&
            props.chapter.pages.map((pageLink, pageIndex) => (
              <SidebarLinkWrapper
                key={`${props.index}-${pageIndex}-${pageLink.path}`}
                to={pageLink.path}
                onClick={props.onLinkClick}
                location={props.location}
                nextScrollPosition={props.nextScrollPosition}
                getChapterDOMElement={getChapterDOMElement}
              >
                <LinkSubtitle>{pageLink.title}</LinkSubtitle>
                {pageLink.beta && !props.isGlobalBeta && <BetaFlag />}
              </SidebarLinkWrapper>
            ))}
        </SpacingsStack>
      </SpacingsStack>
    </div>
  );
};
SidebarChapter.propTypes = {
  index: PropTypes.number.isRequired,
  chapter: PropTypes.shape({
    chapterTitle: PropTypes.string.isRequired,
    beta: PropTypes.bool,
    pages: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  isGlobalBeta: PropTypes.bool.isRequired,
  onLinkClick: PropTypes.func,
  nextScrollPosition: PropTypes.number.isRequired,
  // from @react/router
  location: PropTypes.shape({
    state: PropTypes.shape({
      sidebarScrollPosition: PropTypes.number,
    }),
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const SidebarNavigationLinks = (props) => {
  const data = useStaticQuery(graphql`
    query SidebarQuery {
      allNavigationYaml {
        nodes {
          chapterTitle
          beta
          pages {
            title
            path
            beta
          }
        }
      }
    }
  `);
  // Restore scroll position
  // - read the position from the location state, in case it was set
  // - clear the location state
  // - initialize the new scroll position
  // - scroll to the previous position in case it was defined
  const nextScrollPosition = useScrollPosition(scrollContainerId);
  return (
    <>
      {data.allNavigationYaml.nodes.map((node, index) => (
        <SidebarChapter
          key={index}
          index={index}
          chapter={node}
          isGlobalBeta={props.isGlobalBeta}
          onLinkClick={props.onLinkClick}
          nextScrollPosition={nextScrollPosition}
          location={props.location}
        />
      ))}
    </>
  );
};
SidebarNavigationLinks.propTypes = {
  onLinkClick: PropTypes.func,
  siteTitle: PropTypes.string.isRequired,
  isGlobalBeta: PropTypes.bool.isRequired,
  hasReleaseNotes: PropTypes.bool.isRequired,
  // from @react/router
  location: PropTypes.shape({
    state: PropTypes.shape({
      sidebarScrollPosition: PropTypes.number,
    }),
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const Sidebar = (props) => {
  // If this is a release page, we need to render the "back" link instead of
  // the normal navigation links.
  const isReleasePage = props.location.pathname.startsWith(
    withPrefix('/releases')
  );
  const shouldRenderLinkToReleaseNotes = props.hasReleaseNotes;
  const shouldRenderBackToDocsLink = props.hasReleaseNotes && isReleasePage;
  return (
    <>
      <SidebarHeader>
        <LayoutHeaderLogo />
        <WebsiteTitle>
          <SpacingsStack scale="xs">
            <div>{props.isGlobalBeta && <BetaFlag />}</div>
            <Link
              id="site-title"
              to="/"
              css={css`
                text-decoration: none;
                color: ${designSystem.colors.light.primary};
                :hover {
                  text-decoration: underline;
                }
              `}
            >
              {props.siteTitle}
            </Link>
          </SpacingsStack>
        </WebsiteTitle>
      </SidebarHeader>
      <ScrollContainer id={scrollContainerId}>
        {shouldRenderLinkToReleaseNotes && (
          <ReleaseNotesTitle>
            <SidebarLink
              to="/releases"
              onClick={props.onLinkClick}
              locationPath={
                isReleasePage
                  ? withPrefix('/releases')
                  : props.location.pathname
              }
              customStyles={css`
                color: ${designSystem.colors.light.link} !important;
                text-decoration: underline;
                :hover {
                  color: ${designSystem.colors.light.linkHover} !important;
                  text-decoration: none;
                }
              `}
              customActiveStyles={css`
                color: ${designSystem.colors.light.linkNavigation} !important;
                text-decoration: none;
                :hover {
                  color: ${designSystem.colors.light.linkNavigation} !important;
                }
              `}
            >
              <SpacingsInline alignItems="center">
                <LinkSubtitle>{'Release notes'}</LinkSubtitle>
                <ReleaseNotesIcon
                  size="medium"
                  color={isReleasePage ? 'linkNavigation' : 'link'}
                />
              </SpacingsInline>
            </SidebarLink>
          </ReleaseNotesTitle>
        )}
        {shouldRenderBackToDocsLink && (
          <div>
            <SidebarLink to="/" onClick={props.onLinkClick}>
              <SpacingsInline alignItems="center">
                <BackIcon size="medium" />
                <LinkSubtitle>{'Back to documentation'}</LinkSubtitle>
              </SpacingsInline>
            </SidebarLink>
          </div>
        )}
        {!shouldRenderBackToDocsLink && <SidebarNavigationLinks {...props} />}
      </ScrollContainer>
    </>
  );
};
Sidebar.displayName = 'Sidebar';
Sidebar.propTypes = {
  onLinkClick: PropTypes.func,
  siteTitle: PropTypes.string.isRequired,
  isGlobalBeta: PropTypes.bool.isRequired,
  hasReleaseNotes: PropTypes.bool.isRequired,
  // from @react/router
  location: PropTypes.shape({
    state: PropTypes.shape({
      sidebarScrollPosition: PropTypes.number,
    }),
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const SidebarWithLocation = (props) => (
  <Location>
    {({ location }) => <Sidebar location={location} {...props} />}
  </Location>
);

export default SidebarWithLocation;
