import React from 'react';
import { useSiteData } from '../hooks/use-site-data';
import LayoutApplication from './internals/layout-application';
import LayoutHeader from './internals/layout-header';
import LayoutPage from './internals/layout-page';
import LayoutFooter from './internals/layout-footer';
import LayoutPageContent from './internals/layout-page-content';
import PageContentInset from './internals/page-content-inset';

const PageNotFound = props => {
  const siteData = useSiteData();
  return (
    <LayoutApplication>
      <LayoutPage>
        <LayoutHeader siteTitle={siteData.siteMetadata.title} />
        <LayoutPageContent>
          <PageContentInset>
            {
              // eslint-disable-next-line react/prop-types
              props.children
            }
          </PageContentInset>
          <LayoutFooter />
        </LayoutPageContent>
      </LayoutPage>
    </LayoutApplication>
  );
};

export default PageNotFound;
