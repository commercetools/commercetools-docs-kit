import React from 'react';
import { useSiteData } from '../hooks/use-site-data';
import LayoutApplication from './internals/layout-application';
import LayoutHeader from './internals/layout-header';
import LayoutPage from './internals/layout-page';
import LayoutFooter from './internals/layout-footer';
import LayoutMain from './internals/layout-main';
import LayoutPageContent from './internals/layout-page-content';
import PageContentInset from './internals/page-content-inset';

const PageNotFound = props => {
  const siteData = useSiteData();
  return (
    <LayoutApplication>
      <LayoutHeader siteTitle={siteData.siteMetadata.title} />
      <LayoutMain>
        <LayoutPage>
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
      </LayoutMain>
    </LayoutApplication>
  );
};

export default PageNotFound;
