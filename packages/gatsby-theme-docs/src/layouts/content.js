import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from '@commercetools-docs/ui-kit';
import { useSiteData } from '../hooks/use-site-data';
import { BetaFlag, ContentPagination } from '../components';
import PlaceholderPageHeaderSide from '../overrides/page-header-side';
import LayoutApplication from './internals/layout-application';
import LayoutHeader from './internals/layout-header';
import LayoutSidebar from './internals/layout-sidebar';
import LayoutMain from './internals/layout-main';
import LayoutFooter from './internals/layout-footer';
import LayoutPage from './internals/layout-page';
import LayoutPageHeader from './internals/layout-page-header';
import LayoutPageHeaderSide from './internals/layout-page-header-side';
import LayoutPageNavigation from './internals/layout-page-navigation';
import LayoutPageContent from './internals/layout-page-content';
import PageContentInset from './internals/page-content-inset';

const LayoutContent = (props) => {
  // State for the sidebar menu
  const [isSidebarMenuOpen, setSidebarMenuOpen] = React.useState(false);
  const toggleSidebarMenu = React.useCallback(() => {
    setSidebarMenuOpen((prev) => !prev);
  }, [setSidebarMenuOpen]);
  const closeSidebarMenu = React.useCallback(() => {
    setSidebarMenuOpen(false);
  }, [setSidebarMenuOpen]);

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
      <LayoutSidebar
        isMenuOpen={isSidebarMenuOpen}
        toggleSidebarMenu={toggleSidebarMenu}
        closeSidebarMenu={closeSidebarMenu}
        siteTitle={siteData.siteMetadata.title}
        isGlobalBeta={props.pageContext.isGlobalBeta}
        isSearchDialogOpen={isSearchDialogOpen}
        closeSearchDialog={closeSearchDialog}
      />
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
            {props.pageContext.beta && (
              <BetaFlag href={siteData.siteMetadata.betaLink} />
            )}
            <Markdown.H1>{props.pageContext.title}</Markdown.H1>
          </LayoutPageHeader>
          <LayoutPageHeaderSide>
            <PlaceholderPageHeaderSide />
          </LayoutPageHeaderSide>
          <LayoutPageContent>
            <PageContentInset id="body-content">
              {props.children}
              <ContentPagination slug={props.pageContext.slug} />
            </PageContentInset>
          </LayoutPageContent>
          <LayoutPageNavigation
            pageTitle={props.pageContext.shortTitle || props.pageContext.title}
            tableOfContents={props.pageData.tableOfContents}
          />
        </LayoutPage>
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
    title: PropTypes.string.isRequired,
    beta: PropTypes.bool.isRequired,
    isGlobalBeta: PropTypes.bool.isRequired,
    excludeFromSearchIndex: PropTypes.bool.isRequired,
  }).isRequired,
  pageData: PropTypes.shape({
    tableOfContents: PropTypes.object.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default LayoutContent;
