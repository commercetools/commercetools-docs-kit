import React from 'react';
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
import LayoutReleaseNotePageHeaderSide from './layout-release-note-page-header-side';
import LayoutPageContent from './internals/layout-page-content';
import PageContentInset from './internals/page-content-inset';
import { ContentNotification } from '@commercetools-uikit/notifications';
import useReleaseNotesConfig from '../hooks/use-release-notes-config';
import Text from '@commercetools-uikit/text';
import KitLink from '../components/link';

const LayoutReleaseNotesList = (props) => {
  const { ref } = useInView();
  const layoutState = useLayoutState();
  const siteData = useSiteData();
  const { getReleaseNotesUrl } = useReleaseNotesConfig();
  const excludeFromSearchIndex =
    props.pageData.excludeFromSearchIndex ||
    siteData.siteMetadata.excludeFromSearchIndex;

  return (
    <LayoutApplication>
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
            <LayoutReleaseNotePageHeaderSide>
              <ReleaseNotesSubscribeLinks />
            </LayoutReleaseNotePageHeaderSide>
            <LayoutPageContent>
              <PageContentInset id="body-content" showRightBorder>
                <ContentNotification type="info">
                  <Text.Body>
                    Discover our{' '}
                    <KitLink href={`/..${getReleaseNotesUrl()}`}>
                      combined Release Notes page
                    </KitLink>{' '}
                    and stay updated with the latest features and improvements!
                    Get comprehensive details on all updates, quickly find
                    specific updates and enhancements with our new search and
                    filter options, and easily browse through different versions
                    and sections.
                  </Text.Body>
                </ContentNotification>
                {props.children}
              </PageContentInset>
            </LayoutPageContent>
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
