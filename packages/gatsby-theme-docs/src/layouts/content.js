import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from '@commercetools-docs/ui-kit';
import { useSiteData } from '../hooks/use-site-data';
import { BetaFlag, ContentPagination } from '../components';
import PlaceholderPageHeaderSide from '../overrides/page-header-side';
import LayoutApplication from './internals/layout-application';
import LayoutCentered from './internals/layout-centered';
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

const LayoutContent = props => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const siteData = useSiteData();
  return (
    <LayoutApplication>
      <LayoutHeader siteTitle={siteData.siteMetadata.title} />
      <LayoutCentered>
        <LayoutMain>
          <LayoutSidebar
            isMenuOpen={isMenuOpen}
            setMenuOpen={setMenuOpen}
            slug={props.pageContext.slug}
            siteTitle={siteData.siteMetadata.title}
            isGlobalBeta={props.pageContext.isGlobalBeta}
          />
          <LayoutPage>
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
              <PageContentInset>
                {props.children}
                <ContentPagination slug={props.pageContext.slug} />
              </PageContentInset>
              <LayoutFooter />
            </LayoutPageContent>
            <LayoutPageNavigation
              pageTitle={
                props.pageContext.shortTitle || props.pageContext.title
              }
              tableOfContents={props.pageData.tableOfContents}
            />
          </LayoutPage>
        </LayoutMain>
      </LayoutCentered>
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
