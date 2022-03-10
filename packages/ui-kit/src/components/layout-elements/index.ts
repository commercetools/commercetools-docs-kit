import LayoutApplication from './layout-application';

/*
// a typical content page layout would be composed as follows:
import { useInView } from 'react-intersection-observer';
const { ref, inView } = useInView();
const layoutState = useLayoutState();
<LayoutApplication websitePrimaryColor={} globalNotification={}>
  <LayoutSidebar
    {...layoutState.sidebar}
    {...layoutState.searchDialog}
    {...layoutState.topMenu}
    siteTitle={}
    isGlobalBeta={}
    hasReleaseNotes={}
  />
  <LayoutMain
    {...layoutState.topMenu}
    preventScroll={
      layoutState.topMenu.isTopMenuOpen || layoutState.sidebar.isSidebarMenuOpen
    }
  >
    <LayoutHeader
      {...layoutState.searchDialog}
      {...layoutState.topMenu}
      ref={ref}
      siteTitle={}
      excludeFromSearchIndex={}
      allowWideContentLayout={}
    />
    <LayoutPageWrapper>
      <LayoutPage allowWideContentLayout={}>
        <LayoutGlobalNotification>
          {props.globalNotification && (
            <GlobalNotification type={}>{}</GlobalNotification>
          )}
        </LayoutGlobalNotification>
        <LayoutPageHeader>
          {beta && <BetaFlag href={} />}
          <Markdown.H1>{}</Markdown.H1>
          {props.showTimeToRead && <PageReadTime data={} />}
        </LayoutPageHeader>
        <LayoutPageHeaderSide>
          <SpacingsStack scale="m">
            <PlaceholderPageHeaderSide />
            <PlaceholderPageHeaderSideBannerArea />
          </SpacingsStack>
        </LayoutPageHeaderSide>
        <LayoutPageContent>
          <PageContentInset id="body-content" showRightBorder>
            {props.children} // THIS IS THE ACTUAL PAGE CONTENT!
            <ContentPagination slug={} />
          </PageContentInset>
        </LayoutPageContent>
        <LayoutPageNavigation
          {...layoutState.searchDialog}
          isSearchBoxInView={inView}
          excludeFromSearchIndex={}
          pageTitle={}
          tableOfContents={}
          navLevels={}
          beta={}
        />
      </LayoutPage>
    </LayoutPageWrapper>
    <LayoutFooter />
  </LayoutMain>
</LayoutApplication>;
*/

export { default as LayoutApplication } from './layout-application';
