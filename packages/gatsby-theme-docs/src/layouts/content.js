import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { LordIcon, Markdown } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { useInView } from 'react-intersection-observer';
import useLayoutState from '../hooks/use-layout-state';
import { useSiteData } from '../hooks/use-site-data';
import { BetaFlag, ContentPagination, GlobalNotification } from '../components';
import PlaceholderPageHeaderSide from '../overrides/page-header-side';
import PlaceholderPageHeaderSideBannerArea from '../overrides/page-header-banner-area';
import LayoutApplication from './internals/layout-application';
import LayoutHeader from './internals/layout-header';
import LayoutSidebar from './internals/layout-sidebar';
import LayoutMain from './internals/layout-main';
import LayoutFooter from './internals/layout-footer';
import LayoutPageWrapper from './internals/layout-page-wrapper';
import LayoutPage from './internals/layout-page';
import LayoutGlobalNotification from './internals/layout-global-notification';
import LayoutPageHeader from './internals/layout-page-header';
import LayoutPageHeaderSide from '../overrides/layout-page-header-side';
import LayoutPageNavigation from './internals/layout-page-navigation';
import LayoutPageContent from './internals/layout-page-content';
import PageContentInset from './internals/page-content-inset';
import PageReadTime from './internals/page-read-time-estimation';
import {
  CourseCompleteModal,
  useCourseInfoByPageSlugs,
} from '../modules/self-learning';

const LayoutContent = (props) => {
  const courseInfo = useCourseInfoByPageSlugs([props.pageContext.slug]);
  const courseId = courseInfo[props.pageContext.slug]?.courseId;
  const { ref, inView, entry } = useInView();
  const isSearchBoxInView = !Boolean(entry) || inView;
  const layoutState = useLayoutState();
  const siteData = useSiteData();
  const excludeFromSearchIndex =
    props.pageData.excludeFromSearchIndex ||
    siteData.siteMetadata.excludeFromSearchIndex;
  const isBeta = props.pageData.beta || siteData.siteMetadata.beta;

  return (
    <LayoutApplication
      globalNotification={siteData.siteMetadata.globalNotification}
    >
      {courseId && <CourseCompleteModal courseId={courseId} />}
      <LayoutSidebar
        {...layoutState.sidebar}
        {...layoutState.searchDialog}
        {...layoutState.topMenu}
        siteTitle={siteData.siteMetadata.title}
        isGlobalBeta={siteData.siteMetadata.beta}
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
          excludeFromSearchIndex={excludeFromSearchIndex}
          allowWideContentLayout={props.pageData.allowWideContentLayout}
        />
        <LayoutPageWrapper>
          <LayoutPage
            allowWideContentLayout={props.pageData.allowWideContentLayout}
          >
            <LayoutGlobalNotification>
              {siteData.siteMetadata.globalNotification.active && (
                <GlobalNotification
                  type={
                    siteData.siteMetadata.globalNotification.notificationType
                  }
                >
                  {siteData.siteMetadata.globalNotification.content}
                </GlobalNotification>
              )}
            </LayoutGlobalNotification>
            <LayoutPageHeader>
              {isBeta && <BetaFlag href={siteData.siteMetadata.betaLink} />}
              <Markdown.H1>{props.pageData.title}</Markdown.H1>
              {props.pageData.showTimeToRead && (
                <PageReadTime data={props.pageData} />
              )}
            </LayoutPageHeader>
            <LayoutPageHeaderSide>
              <SpacingsStack scale="m">
                <PlaceholderPageHeaderSide />
                <PlaceholderPageHeaderSideBannerArea />
              </SpacingsStack>
            </LayoutPageHeaderSide>
            <LayoutPageContent>
              <div>
                <LordIcon
                  iconName="suitcase"
                  trigger="hover"
                  height="40px"
                  width="40px"
                />
                <LordIcon
                  iconName="command"
                  trigger="hover"
                  height="40px"
                  width="40px"
                />
                <LordIcon
                  iconName="unlocked"
                  trigger="hover"
                  height="40px"
                  width="40px"
                />
                <LordIcon
                  iconName="package"
                  trigger="hover"
                  height="40px"
                  width="40px"
                />
                <LordIcon
                  iconName="login"
                  trigger="hover"
                  height="40px"
                  width="40px"
                />
                <LordIcon
                  iconName="heartbeat"
                  trigger="hover"
                  height="40px"
                  width="40px"
                />
                <LordIcon
                  iconName="headset"
                  trigger="hover"
                  height="40px"
                  width="40px"
                />
                <LordIcon
                  iconName="handshake"
                  trigger="hover"
                  height="40px"
                  width="40px"
                />
                <LordIcon
                  iconName="graduation"
                  trigger="hover"
                  height="40px"
                  width="40px"
                />
                <LordIcon
                  iconName="flag"
                  trigger="hover"
                  height="40px"
                  width="40px"
                />
                <LordIcon
                  iconName="document"
                  trigger="hover"
                  height="40px"
                  width="40px"
                />
                <LordIcon
                  iconName="api"
                  trigger="hover"
                  height="40px"
                  width="40px"
                />
              </div>
              <PageContentInset id="body-content" showRightBorder>
                {props.children}
                <ContentPagination slug={props.pageContext.slug} />
              </PageContentInset>
            </LayoutPageContent>
            <LayoutPageNavigation
              {...layoutState.searchDialog}
              isSearchBoxInView={isSearchBoxInView}
              excludeFromSearchIndex={excludeFromSearchIndex}
              pageTitle={props.pageContext.shortTitle || props.pageData.title}
              tableOfContents={props.pageData.tableOfContents}
              navLevels={props.pageData.navLevels}
              beta={isBeta}
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
    courseId: PropTypes.number,
  }).isRequired,
  pageData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    websitePrimaryColor: PropTypes.string.isRequired,
    beta: PropTypes.bool.isRequired,
    excludeFromSearchIndex: PropTypes.bool.isRequired,
    allowWideContentLayout: PropTypes.bool.isRequired,
    tableOfContents: PropTypes.object.isRequired,
    navLevels: PropTypes.number.isRequired,
    showTimeToRead: PropTypes.bool.isRequired,
    timeToRead: PropTypes.number.isRequired,
    estimatedTimeToRead: PropTypes.number.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default LayoutContent;
