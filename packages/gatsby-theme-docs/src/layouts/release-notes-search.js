import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { LordIcon, Markdown } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { useInView } from 'react-intersection-observer';
import useLayoutState from '../hooks/use-layout-state';
import { useSiteData } from '../hooks/use-site-data';
import {
  PlanTag,
  BetaTag,
  ContentPagination,
  GlobalNotification,
} from '../components';
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
import CourseCompleteModal from '../modules/self-learning/components/course-complete-modal';
import { useCourseInfoByPageSlugs } from '../modules/self-learning/hooks/use-course-pages';
import styled from '@emotion/styled';
import useAiAssistant from '../modules/ai-assistant/hooks/use-ai-assistant';

const PlansWrapper = styled.div`
  & > span {
    margin-right: 10px;
  }
`;

const LayoutReleaseNotesSearch = (props) => {
  const { ref, inView, entry } = useInView();
  const isSearchBoxInView = !Boolean(entry) || inView;
  const layoutState = useLayoutState();
  const siteData = useSiteData();
  const excludeFromSearchIndex = false;
  useAiAssistant();
  return (
    <LayoutApplication
      globalNotification={siteData.siteMetadata.globalNotification}
    >
      <LayoutSidebar
        {...layoutState.sidebar}
        {...layoutState.searchDialog}
        {...layoutState.topMenu}
        siteTitle={siteData.siteMetadata.title}
        isGlobalBeta={siteData.siteMetadata.beta}
        hasReleaseNotes={false}
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
          allowWideContentLayout={false}
        />
        <LayoutPageWrapper>
          <LayoutPage allowWideContentLayout={false}>
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
              <Markdown.H1>Relase notes</Markdown.H1>
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
              </PageContentInset>
            </LayoutPageContent>
            {/* <LayoutPageNavigation
              {...layoutState.searchDialog}
              isSearchBoxInView={isSearchBoxInView}
              excludeFromSearchIndex={excludeFromSearchIndex}
              pageTitle={props.pageContext.shortTitle || props.pageData.title}
              tableOfContents={props.pageData.tableOfContents}
              navLevels={props.pageData.navLevels}
              beta={isBeta}
              planTags={planTags}
            /> */}
          </LayoutPage>
        </LayoutPageWrapper>
        <LayoutFooter />
      </LayoutMain>
    </LayoutApplication>
  );
};
LayoutReleaseNotesSearch.displayName = 'LayoutReleaseNotesSearch';
LayoutReleaseNotesSearch.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutReleaseNotesSearch;
