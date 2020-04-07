import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from '@commercetools-docs/ui-kit';
import useLayoutState from '../hooks/use-layout-state';
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
  const layoutState = useLayoutState();
  const siteData = useSiteData();

  return (
    <LayoutApplication>
      <LayoutSidebar
        {...layoutState.sidebar}
        {...layoutState.searchDialog}
        siteTitle={siteData.siteMetadata.title}
        isGlobalBeta={props.pageData.isGlobalBeta}
        hasReleaseNotes={props.pageContext.hasReleaseNotes}
      />
      <LayoutMain isTopMenuOpen={layoutState.topMenu.isTopMenuOpen}>
        <LayoutHeader
          {...layoutState.searchDialog}
          {...layoutState.topMenu}
          siteTitle={siteData.siteMetadata.title}
          excludeFromSearchIndex={props.pageData.excludeFromSearchIndex}
        />
        <LayoutPage id="top">
          <LayoutPageHeader>
            {props.pageData.beta && (
              <BetaFlag href={siteData.siteMetadata.betaLink} />
            )}
            <Markdown.H1>{props.pageData.title}</Markdown.H1>
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
            pageTitle={props.pageContext.shortTitle || props.pageData.title}
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
    hasReleaseNotes: PropTypes.bool.isRequired,
  }).isRequired,
  pageData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    beta: PropTypes.bool.isRequired,
    isGlobalBeta: PropTypes.bool.isRequired,
    excludeFromSearchIndex: PropTypes.bool.isRequired,
    tableOfContents: PropTypes.object.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default LayoutContent;
