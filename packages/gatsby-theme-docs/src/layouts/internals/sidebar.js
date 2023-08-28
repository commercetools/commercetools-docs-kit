import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import { useStaticQuery, graphql, Link, withPrefix } from 'gatsby';
import { css, ClassNames } from '@emotion/react';
import styled from '@emotion/styled';
import {
  BackIcon,
  PlusBoldIcon,
  MinimizeIcon,
} from '@commercetools-uikit/icons';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsStack from '@commercetools-uikit/spacings-stack';

import {
  designSystem,
  createStyledIcon,
  Icons,
} from '@commercetools-docs/ui-kit';
import SiteIcon from '../../overrides/site-icon';
import useScrollPosition from '../../hooks/use-scroll-position';
import { BetaTag } from '../../components';
import LayoutHeaderLogo from './layout-header-logo';

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
    margin-right: ${designSystem.dimensions.spacings.m};
    padding: ${designSystem.dimensions.spacings.l} 0;
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
  padding-left: ${designSystem.dimensions.spacings.m};
  text-decoration: none;
  color: ${designSystem.tokens.websitePrimaryColor};
  :hover {
    text-decoration: underline;
  }
`;
const ReleaseNotesTitle = styled.div``;
const LinkTitle = styled.div`
  font-size: ${designSystem.typography.fontSizes.body};
  text-overflow: ellipsis;
  overflow-x: hidden;
  width: 100%;
`;
const LinkSubtitle = styled.div`
  padding-left: ${(props) =>
    props.level === 1 ? designSystem.dimensions.spacings.s : '0px'};
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
  vertical-align: middle;
`;

const linkStyles = css`
  padding-left: ${designSystem.dimensions.spacings.l};
  text-decoration: none;
  color: ${designSystem.colors.light.textSecondary};
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  :hover {
    color: ${designSystem.colors.light.linkNavigation} !important;

    svg {
      * {
        fill: ${designSystem.colors.light.linkNavigation};
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
    ${designSystem.colors.light.linkNavigation} !important;
  color: ${designSystem.colors.light.linkNavigation} !important;
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
  padding-right: 16px;
  font-weight: ${designSystem.typography.fontWeights.medium};
`;

const ChapterTitle = (props) => (
  <ChapterTitleWrapper level={props.level} onClick={() => props.toggleExpand()}>
    <Title>{props.text}</Title>
    {props.isExpanded ? (
      <MinimizeIcon size="medium" />
    ) : (
      <PlusBoldIcon size="medium" />
    )}
  </ChapterTitleWrapper>
);
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
      max-height: 1000px;
    `}
`;

const ChapterItem = styled.div`
  margin: 8px 0;
`;

const Chapter = (props) => {
  const isRightChapter = (chapter) => {
    return chapter.pages.find((page) =>
      page.pages ? isRightChapter(page) : page.path === props.location.pathname
    );
  };
  const initialState = isRightChapter(props.chapter) !== undefined;

  const [isExpanded, setIsExpanded] = useState(initialState);
  const elemId = `sidebar-chapter-${props.level}-${props.index}`;
  const chapterTitle =
    props.level === 0 ? props.chapter.chapterTitle : props.chapter.title;

  const getChapterDOMElement = React.useCallback(
    () => document.getElementById(elemId),
    [elemId]
  );

  return (
    <div role="sidebar-chapter" id={elemId}>
      <SpacingsStack data-testid={`sidebar-chapter`} scale="s">
        <ChapterTitle
          level={props.level}
          text={chapterTitle}
          isExpanded={isExpanded}
          toggleExpand={() => setIsExpanded(!isExpanded)}
        />
        <ChapterPagesWrapper isExpanded={isExpanded}>
          {props.chapter.pages.map((page, pageIndex) => (
            <ChapterItem key={pageIndex}>
              {page.pages ? (
                <Chapter
                  index={pageIndex}
                  level={1}
                  chapter={page}
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

// const SidebarChapter = (props) => {
//   const elemId = `sidebar-chapter-${props.index}`;
//   const getChapterDOMElement = React.useCallback(
//     () => document.getElementById(elemId),
//     [elemId]
//   );

//   return (
//     <div role="sidebar-chapter" id={elemId}>
//       <SpacingsStack data-testid={`sidebar-chapter`} scale="s">
//         <LinkItem>
//           <LinkTitle>{props.chapter.chapterTitle}</LinkTitle>
//         </LinkItem>

//         <SpacingsStack scale="s">
//           {props.chapter.pages &&
//             props.chapter.pages.map((pageLink, pageIndex) => {
//               return (
//                 <SidebarLinkWrapper
//                   data-testid={`sidebar-chapter-item-${pageIndex}`}
//                   key={`${props.index}-${pageIndex}-${pageLink.path}`}
//                   to={pageLink.path}
//                   onClick={props.onLinkClick}
//                   location={props.location}
//                   nextScrollPosition={props.nextScrollPosition}
//                   getChapterDOMElement={getChapterDOMElement}
//                 >
//                   <LinkSubtitle>{pageLink.title}</LinkSubtitle>
//                 </SidebarLinkWrapper>
//               );
//             })}
//         </SpacingsStack>
//       </SpacingsStack>
//     </div>
//   );
// };
// SidebarChapter.propTypes = {
//   index: PropTypes.number.isRequired,
//   chapter: PropTypes.shape({
//     chapterTitle: PropTypes.string.isRequired,
//     beta: PropTypes.bool,
//     pages: PropTypes.arrayOf(
//       PropTypes.shape({
//         title: PropTypes.string.isRequired,
//         path: PropTypes.string.isRequired,
//       })
//     ),
//   }).isRequired,
//   onLinkClick: PropTypes.func,
//   nextScrollPosition: PropTypes.number.isRequired,
//   // from @react/router
//   location: PropTypes.shape({
//     state: PropTypes.shape({
//       sidebarScrollPosition: PropTypes.number,
//     }),
//     pathname: PropTypes.string.isRequired,
//   }).isRequired,
// };

const SidebarNavigationLinks = (props) => {
  const data = useStaticQuery(graphql`
    query SidebarQuery {
      allNavigationYaml {
        nodes {
          chapterTitle
          path
          pages {
            title
            path
            beta
            pages {
              title
              path
              beta
            }
          }
        }
      }
    }
  `);
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
              <SpacingsInline scale="s">
                <SiteIcon />
                <span id="site-title">{props.siteTitle}</span>
              </SpacingsInline>
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
          }}
        />
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
                  svg {
                    * {
                      fill: ${releaseNotesIconHoverStyle};
                    }
                  }
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
