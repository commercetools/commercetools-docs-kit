import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  ContentPagination,
  ContentNotifications,
  Markdown,
} from '../components';
import { colors, dimensions } from '../design-system';
import PlaceholderPageHeaderSide from '../overrides/page-header-side';
import LayoutApplication from './internals/layout-application';
import LayoutHeader from './internals/layout-header';
import LayoutSidebar from './internals/layout-sidebar';
import LayoutMain from './internals/layout-main';
import LayoutFooter from './internals/layout-footer';
import LayoutPageHeader from './internals/layout-page-header';
import LayoutPageHeaderSide from './internals/layout-page-header-side';
import LayoutPageNavigation from './internals/layout-page-navigation';
import LayoutPageContent from './internals/layout-page-content';
import { useSiteData } from '../hooks/use-site-data';

const GridArea = styled.div`
  grid-area: ${props => props.name};
`;
const ResizableGrid = styled.div`
  position: relative;
  display: block;
  width: 100vw;
  overflow: hidden auto;

  @media screen and (${dimensions.viewports.desktop}) {
    display: grid;
    grid:
      [row1-start] 'left center right' auto [row1-end]
      / minmax(0, 100%) 1fr minmax(0, 100%);
    width: auto;
  }
`;

const LayoutContent = props => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const siteData = useSiteData();
  return (
    <LayoutApplication isMenuOpen={isMenuOpen}>
      <LayoutHeader siteTitle={siteData.siteMetadata.title} />
      <ResizableGrid>
        <GridArea
          name="left"
          css={css`
            background-color: ${colors.light.surfaceSecondary1};
          `}
        />
        <GridArea name="right" />
        <GridArea
          name="center"
          css={css`
            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: auto 1fr auto;
            overflow: hidden auto;

            @media screen and (${dimensions.viewports.desktop}) {
              width: calc(
                ${dimensions.widths.pageContentWithMargings} +
                  ${dimensions.widths.pageNavigation} * 2
              );
            }
          `}
        >
          <LayoutSidebar
            isMenuOpen={isMenuOpen}
            setMenuOpen={setMenuOpen}
            slug={props.pageContext.slug}
            siteTitle={siteData.siteMetadata.title}
          />
          <LayoutMain
            css={css`
              grid-column: 2;
              grid-row: 2;

              div {
                min-width: unset;
              }

              @media screen and (${dimensions.viewports.mobile}) {
                grid-column: 1/3;
                grid-row: ${isMenuOpen ? '3' : '2'};
              }
            `}
          >
            <div
              id="anchor-page-top"
              css={css`
                display: block;

                @media screen and (${dimensions.viewports.tablet}) {
                  display: grid;
                  grid-template-rows: auto 1fr;
                  grid-template-columns: ${dimensions.widths
                      .pageContentSmallWithMargings} 0;
                }
                @media screen and (${dimensions.viewports.largeTablet}) {
                  display: grid;
                  grid-template-rows: auto 1fr;
                  grid-template-columns:
                    minmax(
                      ${dimensions.widths.pageContentSmallWithMargings},
                      ${dimensions.widths.pageContentWithMargings}
                    )
                    ${dimensions.widths.pageNavigation};
                }
                @media screen and (${dimensions.viewports.laptop}) {
                  grid-template-columns:
                    minmax(
                      ${dimensions.widths.pageContentSmallWithMargings},
                      ${dimensions.widths.pageContentWithMargings}
                    )
                    ${dimensions.widths.pageNavigationSmall};
                }
                @media screen and (${dimensions.viewports.desktop}) {
                  display: grid;
                  grid-template-rows: auto 1fr;
                  grid-template-columns:
                    ${dimensions.widths.pageContentWithMargings}
                    ${dimensions.widths.pageNavigation};
                }
              `}
            >
              <LayoutPageHeader>
                <Markdown.H1>{props.pageContext.title}</Markdown.H1>
              </LayoutPageHeader>
              <LayoutPageHeaderSide>
                <PlaceholderPageHeaderSide />
              </LayoutPageHeaderSide>
              <LayoutPageContent>
                {props.pageContext.beta && <ContentNotifications.BetaInfo />}
                {props.children}
                <ContentPagination slug={props.pageContext.slug} />
              </LayoutPageContent>
              <LayoutPageNavigation
                pageTitle={
                  props.pageContext.shortTitle || props.pageContext.title
                }
                tableOfContents={props.pageData.tableOfContents}
              />
            </div>
            <LayoutFooter />
          </LayoutMain>
        </GridArea>
      </ResizableGrid>
    </LayoutApplication>
  );
};
LayoutContent.displayName = 'LayoutContent';
LayoutContent.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    shortTitle: PropTypes.string,
    title: PropTypes.string.isRequired,
    beta: PropTypes.bool,
  }).isRequired,
  pageData: PropTypes.shape({
    tableOfContents: PropTypes.object.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default LayoutContent;
