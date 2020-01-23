import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { css, ClassNames } from '@emotion/core';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { designSystem, LogoButton } from '@commercetools-docs/ui-kit';
import { BetaFlag } from '../../components';

const trimTrailingSlash = url => url.replace(/(\/?)$/, '');

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

const SidebarLink = props => (
  <ClassNames>
    {({ css: makeClassName }) => {
      const linkClassName = makeClassName`
        border-left: ${designSystem.dimensions.spacings.xs} solid
          ${designSystem.colors.light.surfacePrimary};
        padding-left: calc(
          ${designSystem.dimensions.spacings.m} - ${designSystem.dimensions.spacings.xs}
        );
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
          {...props}
          // eslint-disable-next-line react/prop-types
          to={trimTrailingSlash(props.to)}
          getProps={({ href, location }) => {
            // Manually check that the link is the active one, even with trailing slashes.
            // The gatsby link is by default configured to match the exact path, therefore we
            // need to check this manually.
            const linkPath = trimTrailingSlash(href);
            const locationPath = trimTrailingSlash(location.pathname);
            if (linkPath === locationPath) {
              return { className: [linkClassName, activeClassName].join(' ') };
            }
            return { className: linkClassName };
          }}
        />
      );
    }}
  </ClassNames>
);
SidebarLink.displayName = 'SidebarLink';

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
  return (
    <>
      <LogoContainer>
        <LogoButton />
      </LogoContainer>
      <WebsiteTitle>
        <SpacingsStack scale="xs">
          <div>{props.isGlobalBeta && <BetaFlag />}</div>
          <Link
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
      <ScrollContainer>
        {data.allNavigationYaml.nodes.map((node, index) => (
          <SpacingsStack scale="s" key={index}>
            <LinkItem>
              <LinkTitle>{node.chapterTitle}</LinkTitle>
              {node.beta && !props.isGlobalBeta && <BetaFlag />}
            </LinkItem>
            <SpacingsStack scale="s">
              {node.pages &&
                node.pages.map((pageLink, pageIndex) => (
                  <SidebarLink
                    to={pageLink.path}
                    key={`${index}-${pageIndex}-${pageLink.path}`}
                    onClick={props.onLinkClick}
                  >
                    <LinkSubtitle>{pageLink.title}</LinkSubtitle>
                    {pageLink.beta && !props.isGlobalBeta && <BetaFlag />}
                  </SidebarLink>
                ))}
            </SpacingsStack>
          </SpacingsStack>
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
