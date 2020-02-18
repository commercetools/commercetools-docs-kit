import React from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { css, ClassNames } from '@emotion/core';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { designSystem, LogoButton } from '@commercetools-docs/ui-kit';
import useScrollPosition from '../../hooks/use-scroll-position';
import { BetaFlag } from '../../components';

const trimTrailingSlash = url => url.replace(/(\/?)$/, '');

const scrollContainerId = 'navigation-scroll-container';

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
const LogoContainer = styled.div`
  display: none;
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    height: calc(
      ${designSystem.dimensions.heights.header} - 1px
    ); /* TODO: investigate why we need 1px less here */
    width: ${designSystem.dimensions.widths.pageNavigationSmall};
    background-color: ${designSystem.colors.light.surfacePrimary};
    border-bottom: 1px solid ${designSystem.colors.light.borderPrimary};
    display: flex;
    justify-content: flex-end;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: ${designSystem.dimensions.widths.pageNavigation};
  }
`;
const WebsiteTitle = styled.div`
  color: ${designSystem.colors.light.primary};
  padding: ${designSystem.dimensions.spacings.m};
  font-size: ${designSystem.typography.fontSizes.h4};
  box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.1);
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

const SidebarLink = React.forwardRef((props, ref) => {
  // Filter out props that we don't want to forward to the Link component
  const { location, nextScrollPosition, ...forwardProps } = props;

  const cachedScrollPosition = (location.state || {}).scrollPosition;
  const locationPath = trimTrailingSlash(location.pathname);

  const linkRef = React.useRef();
  const scrollIntoView = React.useCallback(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView#Parameters
    ref.current.scrollIntoView({ block: 'start' });
  }, [ref]);
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
      scrollIntoView();
    }
    // In case there was a scroll position saved in the location make sure that
    // the scroll position is restored.
    // We check for the active link to ensure that we scroll to the position only once.
    else if (isActive && cachedScrollPosition >= 0) {
      restoreScrollPosition();
    }
  }, [linkRef, cachedScrollPosition, scrollIntoView, restoreScrollPosition]);

  return (
    <ClassNames>
      {({ css: makeClassName }) => {
        const linkClassName = makeClassName`
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
        const activeClassName = makeClassName`
          border-left: ${designSystem.dimensions.spacings.xs} solid ${designSystem.colors.light.linkNavigation} !important;
          color: ${designSystem.colors.light.linkNavigation} !important;
        `;
        return (
          <Link
            {...forwardProps}
            innerRef={linkRef}
            to={trimTrailingSlash(props.to)}
            state={{
              scrollPosition: nextScrollPosition,
            }}
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
});
SidebarLink.displayName = 'SidebarLink';
SidebarLink.propTypes = {
  to: PropTypes.string.isRequired,
  nextScrollPosition: PropTypes.number.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      scrollPosition: PropTypes.number,
    }),
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const SidebarChapter = props => {
  const ref = React.useRef();
  return (
    <div ref={ref}>
      <SpacingsStack scale="s">
        <LinkItem>
          <LinkTitle>{props.chapter.chapterTitle}</LinkTitle>
          {props.chapter.beta && !props.isGlobalBeta && <BetaFlag />}
        </LinkItem>
        <SpacingsStack scale="s">
          {props.chapter.pages &&
            props.chapter.pages.map((pageLink, pageIndex) => (
              <Location key={`${props.index}-${pageIndex}-${pageLink.path}`}>
                {({ location }) => (
                  <SidebarLink
                    ref={ref}
                    to={pageLink.path}
                    onClick={props.onLinkClick}
                    location={location}
                    nextScrollPosition={props.nextScrollPosition}
                  >
                    <LinkSubtitle>{pageLink.title}</LinkSubtitle>
                    {pageLink.beta && !props.isGlobalBeta && <BetaFlag />}
                  </SidebarLink>
                )}
              </Location>
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
};

const Sidebar = props => {
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
      <LogoContainer>
        <LogoButton />
      </LogoContainer>
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
      <ScrollContainer id={scrollContainerId}>
        {data.allNavigationYaml.nodes.map((node, index) => (
          <SidebarChapter
            key={index}
            index={index}
            chapter={node}
            isGlobalBeta={props.isGlobalBeta}
            onLinkClick={props.onLinkClick}
            nextScrollPosition={nextScrollPosition}
          />
        ))}
      </ScrollContainer>
    </>
  );
};
Sidebar.displayName = 'Sidebar';
Sidebar.propTypes = {
  onLinkClick: PropTypes.func,
  siteTitle: PropTypes.string.isRequired,
  isGlobalBeta: PropTypes.bool.isRequired,
};

export default Sidebar;
