import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import { Link, withPrefix } from 'gatsby';
import { css, ClassNames } from '@emotion/react';
import styled from '@emotion/styled';
import {
  BackIcon,
  AngleRightIcon,
  AngleDownIcon,
} from '@commercetools-uikit/icons';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsStack from '@commercetools-uikit/spacings-stack';

import {
  designSystem,
  createStyledIcon,
  Icons,
} from '@commercetools-docs/ui-kit';
import useScrollPosition from '../../hooks/use-scroll-position';
import useSidebarNavigationItems from '../../hooks/use-sidebar-navigation-items';
import { BetaTag } from '../../components';
import LayoutHeaderLogo from './layout-header-logo';
import {
  SidebarContextApi,
  SidebarContextState,
} from '../../components/sidebar-context';
import {
  getItemDescendants,
  getItemAncestors,
  isRightChapter,
  isRightChapterRecursive,
} from './sidebar.utils';
import { useSiteData } from '../../hooks/use-site-data';
import {
  getReleaseNotesBasePath,
  getReleaseNotesQueryStringBySiteTitle,
} from '../../utils/release-notes';

const ReleaseNotesIcon = createStyledIcon(Icons.ReleaseNotesSvgIcon);

// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser. We need useLayoutEffect because we want
// `connect` to perform sync updates to a ref to save the latest props after
// a render is actually committed to the DOM.
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const trimTrailingSlash = (url) => url.replace(/(\/?)$/, '');

const scrollContainerId = 'navigation-scroll-container';
const scrollFaderHeight = 32;

const ScrollContainer = styled.div`
  overflow: auto;
  height: 100%;
  flex: 1;

  > div {
    padding: ${designSystem.dimensions.spacings.m}
      ${designSystem.dimensions.spacings.m}
      ${designSystem.dimensions.spacings.s} 0;
  }
  > * + * {
    border-top: 1px solid ${designSystem.colors.light.borderPrimary};
  }
`;
const SidebarHeader = styled.div`
  position: relative;
  border-bottom: 1px solid ${designSystem.colors.light.borderPrimary};
`;
const SidebarScrollFader = styled.div`
  content: '';
  width: 100%;
  background: linear-gradient(
    180deg,
    ${designSystem.colors.light.surfaceSecondary1},
    transparent
  );
  position: absolute;
`;
const WebsiteTitle = styled.div`
  color: ${designSystem.tokens.websitePrimaryColor};
  padding: ${designSystem.dimensions.spacings.m};
  font-size: ${designSystem.typography.fontSizes.h4};
`;
const WebsiteTitleLink = styled.a`
  text-decoration: none;
  color: ${designSystem.tokens.websitePrimaryColor};
  :hover {
    text-decoration: underline;
  }
`;

const ReleaseNoteLinkContainer = styled.div`
  margin-bottom: ${designSystem.dimensions.spacings.s};
`;

const LinkSubtitle = styled.div`
  padding-left: ${(props) =>
    props.level === 1 ? designSystem.dimensions.spacings.s : '0px'};
  font-size: ${designSystem.typography.fontSizes.small};
  text-overflow: ellipsis;
  overflow-x: hidden;
  width: 100%;
`;

const linkStyles = css`
  padding-left: ${designSystem.dimensions.spacings.l};
  text-decoration: none;
  color: ${designSystem.colors.light.textPrimary};
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  :hover {
    color: ${designSystem.colors.light.linkHover} !important;

    svg {
      * {
        fill: ${designSystem.colors.light.linkHover};
      }
    }
  }
`;
const activeLinkStyles = css`
  padding-left: calc(
    ${designSystem.dimensions.spacings.l} -
      ${designSystem.dimensions.spacings.xs}
  );
  border-left: ${designSystem.dimensions.spacings.xs} solid
    ${designSystem.colors.light.linkHover} !important;
  color: ${designSystem.colors.light.linkHover} !important;
`;

const SidebarLink = (props) => {
  const { locationPath, customStyles, customActiveStyles, ...forwardProps } =
    props;
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
            to={props.to === '/' ? props.to : trimTrailingSlash(props.to)}
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
  customStyles: PropTypes.object, // emotion css object
  customActiveStyles: PropTypes.object, // emotion css object
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
  useIsomorphicLayoutEffect(() => {
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

/** new implementation start */

const ChapterTitleWrapper = styled.div`
  display: flex;
  padding-left: ${(props) =>
    props.level < 1
      ? designSystem.dimensions.spacings.m
      : designSystem.dimensions.spacings.l};
  font-weight: ${designSystem.typography.fontWeights['light-bold']};
  font-size: ${(props) =>
    props.level < 1
      ? designSystem.typography.fontSizes.body
      : designSystem.typography.fontSizes.small};
  align-items: center;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
`;

const Title = styled.span`
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-right: 16px;
  color: ${(props) =>
    props.isExpanded
      ? designSystem.colors.light.websitePrimaryColor
      : designSystem.colors.light.textPrimary};
  font-weight: ${(props) =>
    props.isExpanded
      ? designSystem.typography.fontWeights.medium
      : designSystem.typography.fontWeights.regular};
`;

const ChapterTitle = (props) => {
  return (
    <ChapterTitleWrapper
      level={props.level}
      onClick={() => props.toggleExpand()}
    >
      <Title isExpanded={props.isExpanded} level={props.level}>
        {props.text}
      </Title>
      {props.isExpanded ? (
        <AngleDownIcon size="medium" />
      ) : (
        <AngleRightIcon size="medium" />
      )}
    </ChapterTitleWrapper>
  );
};
ChapterTitle.propTypes = {
  text: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool,
  toggleExpand: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
};

const chapterContentAnimation = css`
  transition: max-height 0.3s ease;
  max-height: 0;
  overflow: hidden;
`;

const ChapterPagesWrapper = styled.div`
  ${chapterContentAnimation}
  transform-origin: top center;
  ${({ isExpanded }) =>
    isExpanded &&
    css`
      max-height: 10000px;
    `}
`;

const ChapterItem = styled.div`
  padding: ${(props) =>
    props.isChapter
      ? `${designSystem.dimensions.spacings.xs} 0 0 0`
      : `${designSystem.dimensions.spacings.xs} 0`};
`;

const Chapter = (props) => {
  const { pathPrefix } = useSiteData();
  const pathnameNoPrefix = props.location.pathname.replace(pathPrefix, '');
  const isSelectedChapter = isRightChapter(props.chapter, pathnameNoPrefix);
  const isSSRSelectedChapter = isRightChapterRecursive(
    props.chapter,
    pathnameNoPrefix
  );
  const { ancestorsMap } = useSidebarNavigationItems();
  const chapterId =
    props.level === 1 && props.parentChapterId
      ? `${props.parentChapterId}#${props.level}-${props.index}`
      : `${props.level}-${props.index}`;
  const { setExpandedChapters } = useContext(SidebarContextApi);
  const { expandedChapters } = useContext(SidebarContextState);

  useEffect(() => {
    if (isSelectedChapter) {
      const initialState = getItemAncestors(chapterId, ancestorsMap);
      const expandedItemsList =
        initialState.length > 0 ? initialState : [chapterId];

      if (expandedChapters) {
        // this case happens in all the subsequent interactions with the UI (client side)
        setExpandedChapters([...expandedChapters, ...expandedItemsList]);
      } else {
        // this case happens only on first page load (SSR)
        setExpandedChapters(expandedItemsList);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location]); // we want to re-calculate the menu state only when the URL changes

  const toggleExpand = () => {
    if (expandedChapters?.includes(chapterId)) {
      // close the chapter (and all its descendants, if any)
      const descendants = getItemDescendants(
        chapterId,
        props.level,
        props.index,
        ancestorsMap
      );
      setExpandedChapters(
        expandedChapters?.filter((item) => !descendants.includes(item))
      );
    } else {
      const updatedState = expandedChapters ? [...expandedChapters] : []; // create a clone in order to aviod mutating state
      updatedState.push(chapterId);
      setExpandedChapters(updatedState);
    }
  };

  // the state of each chapter is based on the (expandedChapters) which is stored in the context.
  // The initial SSR state (when context is not available) is handled by isSelecteChapter
  const isExpanded = expandedChapters
    ? expandedChapters.includes(chapterId)
    : isSSRSelectedChapter;

  const elemId = `sidebar-chapter-${props.level}-${props.index}`;
  const chapterTitle =
    props.level === 0 ? props.chapter.chapterTitle : props.chapter.title;

  const getChapterDOMElement = React.useCallback(
    () => document.getElementById(elemId),
    [elemId]
  );

  return (
    <div role="sidebar-chapter" id={elemId}>
      <SpacingsStack data-testid={`sidebar-chapter`} scale="xs">
        <ChapterTitle
          level={props.level}
          text={chapterTitle}
          isExpanded={isExpanded}
          toggleExpand={toggleExpand}
        />
        <ChapterPagesWrapper isExpanded={isExpanded}>
          {props.chapter.pages.map((page, pageIndex) => (
            <ChapterItem isChapter={page.pages && true} key={pageIndex}>
              {page.pages ? (
                <Chapter
                  index={pageIndex}
                  level={1}
                  chapter={page}
                  parentChapterId={chapterId}
                  location={props.location}
                  onLinkClick={props.onLinkClick}
                  nextScrollPosition={props.nextScrollPosition}
                />
              ) : (
                <SidebarLinkWrapper
                  data-testid={`sidebar-chapter-item-${pageIndex}`}
                  key={`${props.index}-${pageIndex}-${page.path}`}
                  to={page.path}
                  onClick={props.onLinkClick}
                  location={props.location}
                  nextScrollPosition={props.nextScrollPosition}
                  getChapterDOMElement={getChapterDOMElement}
                >
                  <LinkSubtitle level={props.level}>{page.title}</LinkSubtitle>
                </SidebarLinkWrapper>
              )}
            </ChapterItem>
          ))}
        </ChapterPagesWrapper>
      </SpacingsStack>
    </div>
  );
};
Chapter.propTypes = {
  index: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  parentChapterId: PropTypes.string,
  chapter: PropTypes.object.isRequired,
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
/** new implementation end */

const SidebarNavigationLinks = (props) => {
  const { data } = useSidebarNavigationItems();
  return (
    <>
      {data.allNavigationYaml.nodes.map((node, index) => (
        <Chapter
          index={index}
          level={0}
          chapter={node}
          location={props.location}
          onLinkClick={props.onLinkClick}
          isGlobalBeta={props.isGlobalBeta}
          nextScrollPosition={props.nextScrollPosition}
          key={index}
        />
      ))}
    </>
  );
};
SidebarNavigationLinks.propTypes = {
  onLinkClick: PropTypes.func,
  isGlobalBeta: PropTypes.bool.isRequired,
  nextScrollPosition: PropTypes.number.isRequired,
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
  const releaseNotesIconHoverStyle = isReleasePage
    ? designSystem.colors.light.linkNavigation
    : designSystem.colors.light.linkHover;
  const shouldRenderLinkToReleaseNotes = props.hasReleaseNotes;
  const shouldRenderBackToDocsLink = props.hasReleaseNotes && isReleasePage;
  // Restore scroll position
  // - read the position from the location state, in case it was set
  // - clear the location state
  // - initialize the new scroll position
  // - scroll to the previous position in case it was defined
  const nextScrollPosition = useScrollPosition(scrollContainerId);

  return (
    <>
      <SidebarHeader>
        <LayoutHeaderLogo />
        <WebsiteTitle>
          <SpacingsStack scale="xs">
            <div>{props.isGlobalBeta && <BetaTag />}</div>
            <WebsiteTitleLink as={Link} to="/">
              <span id="site-title">{props.siteTitle}</span>
            </WebsiteTitleLink>
          </SpacingsStack>
        </WebsiteTitle>
        <SidebarScrollFader
          style={{
            opacity:
              nextScrollPosition > scrollFaderHeight
                ? 1
                : nextScrollPosition / scrollFaderHeight,
            height:
              nextScrollPosition > scrollFaderHeight / 2
                ? scrollFaderHeight
                : nextScrollPosition / scrollFaderHeight,
            bottom:
              nextScrollPosition > scrollFaderHeight / 2
                ? 0 - scrollFaderHeight - 1
                : 0 - nextScrollPosition / scrollFaderHeight,
            'pointer-events': 'none',
          }}
        />
      </SidebarHeader>
      <ScrollContainer id={scrollContainerId}>
        {shouldRenderLinkToReleaseNotes && (
          <ReleaseNoteLinkContainer>
            <SidebarLink
              to={`/../${getReleaseNotesBasePath(
                props.siteTitle
              )}${getReleaseNotesQueryStringBySiteTitle(props.siteTitle)}`}
              onClick={props.onLinkClick}
              locationPath={
                isReleasePage
                  ? withPrefix('/releases')
                  : props.location.pathname
              }
              customStyles={css`
                color: ${designSystem.colors.light.link} !important;
                padding-left: ${designSystem.dimensions.spacings.m};
                text-decoration: underline;
                :hover {
                  color: ${designSystem.colors.light.linkHover} !important;
                  svg {
                    * {
                      fill: ${releaseNotesIconHoverStyle};
                    }
                  }
                }
              `}
              customActiveStyles={css`
                color: ${designSystem.colors.light.linkNavigation} !important;
                padding-left: calc(
                  ${designSystem.dimensions.spacings.m} -
                    ${designSystem.dimensions.spacings.xs}
                ) !important;
                text-decoration: none;
                :hover {
                  color: ${designSystem.colors.light.linkNavigation} !important;
                }
              `}
            >
              <SpacingsInline alignItems="center">
                <LinkSubtitle isReleaseNoteLink>{'Release notes'}</LinkSubtitle>
                <ReleaseNotesIcon size="medium" color={'link'} />
              </SpacingsInline>
            </SidebarLink>
          </ReleaseNoteLinkContainer>
        )}
        {shouldRenderBackToDocsLink && (
          <div>
            <SidebarLink
              to="/"
              onClick={props.onLinkClick}
              customStyles={css`
                padding-left: ${designSystem.dimensions.spacings.m} !important;
              `}
            >
              <SpacingsInline alignItems="center">
                <BackIcon size="medium" />
                <LinkSubtitle>{'Back to documentation'}</LinkSubtitle>
              </SpacingsInline>
            </SidebarLink>
          </div>
        )}
        {!shouldRenderBackToDocsLink && (
          <SidebarNavigationLinks
            {...props}
            nextScrollPosition={nextScrollPosition}
          />
        )}
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
