import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { useInView } from 'react-intersection-observer';
import useLayoutState from '../hooks/use-layout-state';
import { useSiteData } from '../hooks/use-site-data';
import { BetaFlag, ContentPagination } from '../components';
import PlaceholderPageHeaderSide from '../overrides/page-header-side';
import PlaceholderPageHeaderSideBannerArea from '../overrides/page-header-banner-area';
import PlaceholderGlobalNotification from '../overrides/global-notification';
import LayoutApplication from './internals/layout-application';
import LayoutHeader from './internals/layout-header';
import LayoutSidebar from './internals/layout-sidebar';
import LayoutMain from './internals/layout-main';
import LayoutFooter from './internals/layout-footer';
import LayoutPageWrapper from './internals/layout-page-wrapper';
import LayoutPage from './internals/layout-page';
import LayoutGlobalNotification from './internals/layout-global-notification';
import LayoutPageHeader from './internals/layout-page-header';
import LayoutPageHeaderSide from './internals/layout-page-header-side';
import LayoutPageNavigation from './internals/layout-page-navigation';
import LayoutPageContent from './internals/layout-page-content';
import PageContentInset from './internals/page-content-inset';

const LayoutContent = (props) => {
  const { ref, inView } = useInView();
  const layoutState = useLayoutState();
  const siteData = useSiteData();

  return (
    <LayoutApplication websitePrimaryColor={props.pageData.websitePrimaryColor}>
      <LayoutSidebar
        {...layoutState.sidebar}
        {...layoutState.searchDialog}
        {...layoutState.topMenu}
        siteTitle={siteData.siteMetadata.title}
        isGlobalBeta={props.pageData.isGlobalBeta}
        hasReleaseNotes={props.pageContext.hasReleaseNotes}
      />
      <LayoutMain
        {...layoutState.topMenu}
        preventScroll={
          layoutState.topMenu.isTopMenuOpen ||
          layoutState.sidebar.isSidebarMenuOpen
        }
      >
        <LayoutHeader
          {...layoutState.searchDialog}
          {...layoutState.topMenu}
          ref={ref}
          siteTitle={siteData.siteMetadata.title}
          excludeFromSearchIndex={props.pageData.excludeFromSearchIndex}
          allowWideContentLayout={props.pageData.allowWideContentLayout}
        />
        <LayoutPageWrapper>
          <LayoutPage
            allowWideContentLayout={props.pageData.allowWideContentLayout}
          >
            <LayoutGlobalNotification>
              <PlaceholderGlobalNotification />
            </LayoutGlobalNotification>
            <LayoutPageHeader>
              {props.pageData.beta && (
                <BetaFlag href={siteData.siteMetadata.betaLink} />
              )}
              <Markdown.H1>{props.pageData.title}</Markdown.H1>
            </LayoutPageHeader>
            <LayoutPageHeaderSide>
              <SpacingsStack scale="m">
                <PlaceholderPageHeaderSide />
                <PlaceholderPageHeaderSideBannerArea />
              </SpacingsStack>
            </LayoutPageHeaderSide>
            <LayoutPageContent>
              <PageContentInset id="body-content" showRightBorder>
                {props.children}
                <ContentPagination slug={props.pageContext.slug} />
              </PageContentInset>
            </LayoutPageContent>
            <LayoutPageNavigation
              {...layoutState.searchDialog}
              isSearchBoxInView={inView}
              excludeFromSearchIndex={props.pageData.excludeFromSearchIndex}
              pageTitle={props.pageContext.shortTitle || props.pageData.title}
              tableOfContents={props.pageData.tableOfContents}
              navLevels={props.pageData.navLevels}
              beta={props.pageData.beta}
            />
          </LayoutPage>
        </LayoutPageWrapper>
        <LayoutFooter />
      </LayoutMain>
    </LayoutApplication>
  );
};
LayoutContent.displayName = 'LayoutContent';
LayoutContent.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    shortTitle: PropTypes.string,
    hasReleaseNotes: PropTypes.bool.isRequired,
  }).isRequired,
  pageData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    websitePrimaryColor: PropTypes.string.isRequired,
    beta: PropTypes.bool.isRequired,
    isGlobalBeta: PropTypes.bool.isRequired,
    excludeFromSearchIndex: PropTypes.bool.isRequired,
    allowWideContentLayout: PropTypes.bool.isRequired,
    tableOfContents: PropTypes.object.isRequired,
    navLevels: PropTypes.number.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default LayoutContent;
