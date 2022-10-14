import PropTypes from 'prop-types';
import { Markdown } from '@commercetools-docs/ui-kit';
import { useInView } from 'react-intersection-observer';
import useLayoutState from '../hooks/use-layout-state';
import { useSiteData } from '../hooks/use-site-data';
import { ReleaseNotesSubscribeLinks } from '../components';
import LayoutApplication from './internals/layout-application';
import LayoutHeader from './internals/layout-header';
import LayoutSidebar from './internals/layout-sidebar';
import LayoutMain from './internals/layout-main';
import LayoutFooter from './internals/layout-footer';
import LayoutPageWrapper from './internals/layout-page-wrapper';
import LayoutPage from './internals/layout-page';
import LayoutPageHeader from './internals/layout-page-header';
import LayoutPageHeaderSide from './internals/layout-page-header-side';
import LayoutPageReleaseNotesFilters from './internals/layout-page-release-notes-filters';
import LayoutPageContent from './internals/layout-page-content';
import PageContentInset from './internals/page-content-inset';

const LayoutReleaseNotesList = (props) => {
  const { ref, inView, entry } = useInView();
  const isSearchBoxInView = !Boolean(entry) || inView;
  const layoutState = useLayoutState();
  const siteData = useSiteData();
  const excludeFromSearchIndex =
    props.pageData.excludeFromSearchIndex ||
    siteData.siteMetadata.excludeFromSearchIndex;

  return (
    <LayoutApplication websitePrimaryColor={props.pageData.websitePrimaryColor}>
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
        />
        <LayoutPageWrapper>
          <LayoutPage>
            <LayoutPageHeader>
              <Markdown.H1>{props.pageData.title}</Markdown.H1>
            </LayoutPageHeader>
            <LayoutPageHeaderSide>
              <ReleaseNotesSubscribeLinks />
            </LayoutPageHeaderSide>
            <LayoutPageContent>
              <PageContentInset id="body-content" showRightBorder>
                {props.children}
              </PageContentInset>
            </LayoutPageContent>
            <LayoutPageReleaseNotesFilters
              {...layoutState.searchDialog}
              isSearchBoxInView={isSearchBoxInView}
              excludeFromSearchIndex={excludeFromSearchIndex}
            />
          </LayoutPage>
        </LayoutPageWrapper>
        <LayoutFooter />
      </LayoutMain>
    </LayoutApplication>
  );
};
LayoutReleaseNotesList.displayName = 'LayoutReleaseNotesList';
LayoutReleaseNotesList.propTypes = {
  pageContext: PropTypes.shape({
    hasReleaseNotes: PropTypes.bool.isRequired,
  }).isRequired,
  pageData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    websitePrimaryColor: PropTypes.string.isRequired,
    excludeFromSearchIndex: PropTypes.bool.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default LayoutReleaseNotesList;
