import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from '@commercetools-docs/ui-kit';
import useLayoutState from '../hooks/use-layout-state';
import { useSiteData } from '../hooks/use-site-data';
import { ReleaseNotesSubscribeLinks } from '../components';
import LayoutApplication from './internals/layout-application';
import LayoutHeader from './internals/layout-header';
import LayoutSidebar from './internals/layout-sidebar';
import LayoutMain from './internals/layout-main';
import LayoutFooter from './internals/layout-footer';
import LayoutPage from './internals/layout-page';
import LayoutPageHeader from './internals/layout-page-header';
import LayoutPageHeaderSide from './internals/layout-page-header-side';
import LayoutPageReleaseNotesFilters from './internals/layout-page-release-notes-filters';
import LayoutPageContent from './internals/layout-page-content';
import PageContentInset from './internals/page-content-inset';

const LayoutReleaseNotesList = (props) => {
  const layoutState = useLayoutState();
  const siteData = useSiteData();

  return (
    <LayoutApplication>
      <LayoutSidebar
        {...layoutState.sidebar}
        {...layoutState.searchDialog}
        siteTitle={siteData.siteMetadata.title}
        isGlobalBeta={props.pageContext.isGlobalBeta}
        hasReleaseNotes={props.pageContext.hasReleaseNotes}
      />
      <LayoutMain isTopMenuOpen={layoutState.topMenu.isTopMenuOpen}>
        <LayoutHeader
          {...layoutState.searchDialog}
          {...layoutState.topMenu}
          siteTitle={siteData.siteMetadata.title}
          excludeFromSearchIndex={props.pageContext.excludeFromSearchIndex}
        />
        <LayoutPage id="top">
          <LayoutPageHeader>
            <Markdown.H1>{props.pageContext.title}</Markdown.H1>
          </LayoutPageHeader>
          <LayoutPageHeaderSide>
            <ReleaseNotesSubscribeLinks />
          </LayoutPageHeaderSide>
          <LayoutPageContent>
            <PageContentInset id="body-content">
              {props.children}
            </PageContentInset>
          </LayoutPageContent>
          <LayoutPageReleaseNotesFilters />
        </LayoutPage>
        <LayoutFooter />
      </LayoutMain>
    </LayoutApplication>
  );
};
LayoutReleaseNotesList.displayName = 'LayoutReleaseNotesList';
LayoutReleaseNotesList.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    beta: PropTypes.bool.isRequired,
    isGlobalBeta: PropTypes.bool.isRequired,
    excludeFromSearchIndex: PropTypes.bool.isRequired,
    hasReleaseNotes: PropTypes.bool.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default LayoutReleaseNotesList;
