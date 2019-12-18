import React from 'react';
import { useSiteData } from '../hooks/use-site-data';
import LayoutApplication from './internals/layout-application';
import LayoutSidebar from './internals/layout-sidebar';
import LayoutHeader from './internals/layout-header';
import LayoutPage from './internals/layout-page';
import LayoutFooter from './internals/layout-footer';
import LayoutPageContent from './internals/layout-page-content';
import PageContentInset from './internals/page-content-inset';

const LayoutPageNotFound = props => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const siteData = useSiteData();
  return (
    <LayoutApplication>
      <LayoutSidebar
        isMenuOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
        siteTitle={siteData.siteMetadata.title}
        isGlobalBeta={false}
      />
      <LayoutPage>
        <LayoutHeader siteTitle={siteData.siteMetadata.title} />
        <LayoutPageContent>
          <PageContentInset>
            {
              // eslint-disable-next-line react/prop-types
              props.children
            }
          </PageContentInset>
        </LayoutPageContent>
        <LayoutFooter />
      </LayoutPage>
    </LayoutApplication>
  );
};

export default LayoutPageNotFound;
