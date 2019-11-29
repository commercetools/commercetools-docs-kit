import React from 'react';
import { ThemeProvider } from '../components';
import LayoutApplication from '../layouts/internals/layout-application';
import LayoutCentered from '../layouts/internals/layout-centered';
import LayoutHeader from '../layouts/internals/layout-header';
import LayoutPage from '../layouts/internals/layout-page';
import LayoutFooter from '../layouts/internals/layout-footer';
import LayoutMain from '../layouts/internals/layout-main';
import LayoutPageContent from '../layouts/internals/layout-page-content';
import PageContentInset from '../layouts/internals/page-content-inset';
import { useSiteData } from '../hooks/use-site-data';

const PageNotFound = () => {
  const siteData = useSiteData();
  return (
    <ThemeProvider>
      <LayoutApplication>
        <LayoutHeader siteTitle={siteData.siteMetadata.title} />
        <LayoutCentered>
          <LayoutMain>
            <LayoutPage>
              <LayoutPageContent>
                <PageContentInset>
                  <div>{'Page not found'}</div>
                </PageContentInset>
                <LayoutFooter />
              </LayoutPageContent>
            </LayoutPage>
          </LayoutMain>
        </LayoutCentered>
      </LayoutApplication>
    </ThemeProvider>
  );
};

export default PageNotFound;
