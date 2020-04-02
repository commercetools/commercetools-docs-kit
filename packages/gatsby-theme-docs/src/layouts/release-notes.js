import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from '@commercetools-docs/ui-kit';
import { useSiteData } from '../hooks/use-site-data';
import PlaceholderPageHeaderSide from '../overrides/page-header-side';
import LayoutApplication from './internals/layout-application';
import LayoutHeader from './internals/layout-header';
import LayoutSidebarEmpty from './internals/layout-sidebar-empty';
import LayoutMain from './internals/layout-main';
import LayoutFooter from './internals/layout-footer';
import LayoutPage from './internals/layout-page';
import LayoutPageHeader from './internals/layout-page-header';
import LayoutPageHeaderSide from './internals/layout-page-header-side';
import LayoutPageReleaseNotesFilters from './internals/layout-page-release-notes-filters';
import LayoutPageContent from './internals/layout-page-content';
import PageContentInset from './internals/page-content-inset';

const LayoutReleaseNotes = (props) => {
  // State for the top menu
  const [isTopMenuOpen, setIsTopMenuOpen] = React.useState(false);
  const toggleTopMenu = React.useCallback(() => {
    setIsTopMenuOpen((prev) => !prev);
  }, [setIsTopMenuOpen]);
  const closeTopMenu = React.useCallback(() => {
    setIsTopMenuOpen(false);
  }, [setIsTopMenuOpen]);

  // State for the search dialog
  const [isSearchDialogOpen, setIsSearchDialogOpen] = React.useState(false);
  const openSearchDialog = React.useCallback(() => {
    setIsSearchDialogOpen(true);
    // Additionally make sure to close the top menu
    closeTopMenu();
  }, [setIsSearchDialogOpen, closeTopMenu]);
  const closeSearchDialog = React.useCallback(() => {
    setIsSearchDialogOpen(false);
  }, [setIsSearchDialogOpen]);

  const siteData = useSiteData();

  return (
    <LayoutApplication>
      <LayoutSidebarEmpty />
      <LayoutMain isTopMenuOpen={isTopMenuOpen}>
        <LayoutHeader
          siteTitle={siteData.siteMetadata.title}
          excludeFromSearchIndex={props.pageContext.excludeFromSearchIndex}
          isSearchDialogOpen={isSearchDialogOpen}
          openSearchDialog={openSearchDialog}
          closeSearchDialog={closeSearchDialog}
          isTopMenuOpen={isTopMenuOpen}
          toggleTopMenu={toggleTopMenu}
          closeTopMenu={closeTopMenu}
        />
        <LayoutPage id="top">
          <LayoutPageHeader>
            <Markdown.H1>{props.pageContext.title}</Markdown.H1>
          </LayoutPageHeader>
          <LayoutPageHeaderSide>
            <PlaceholderPageHeaderSide />
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
LayoutReleaseNotes.displayName = 'LayoutReleaseNotes';
LayoutReleaseNotes.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excludeFromSearchIndex: PropTypes.bool.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default LayoutReleaseNotes;
