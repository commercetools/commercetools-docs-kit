import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Markdown, designSystem } from '@commercetools-docs/ui-kit';
import { AngleLeftIcon } from '@commercetools-uikit/icons';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import useLayoutState from '../hooks/use-layout-state';
import { useSiteData } from '../hooks/use-site-data';
import { ReleaseNotesSubscribeLinks, Link } from '../components';
import LayoutApplication from './internals/layout-application';
import LayoutHeader from './internals/layout-header';
import LayoutSidebar from './internals/layout-sidebar';
import LayoutMain from './internals/layout-main';
import LayoutFooter from './internals/layout-footer';
import LayoutPage from './internals/layout-page';
import LayoutPageHeader from './internals/layout-page-header';
import LayoutPageHeaderSide from './internals/layout-page-header-side';
import LayoutPageContent from './internals/layout-page-content';
import PageContentInset from './internals/page-content-inset';

const LayoutReleaseNotesDetail = (props) => {
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
            <SpacingsInline alignItems="center">
              <AngleLeftIcon size="medium" color="primary" />
              <Link href="/releases" noUnderline={true}>
                <span
                  css={css`
                    font-size: ${designSystem.typography.fontSizes.small};
                  `}
                >
                  {'Back to all releases'}
                </span>
              </Link>
            </SpacingsInline>
            <Markdown.H1
              // Use h1 for the page title but style it as an h3.
              css={css`
                font-size: ${designSystem.typography.fontSizes.h3};
                margin: ${designSystem.dimensions.spacings.big} 0 0;
                color: unset;
              `}
            >
              {props.pageContext.title}
            </Markdown.H1>
          </LayoutPageHeader>
          <LayoutPageHeaderSide>
            <ReleaseNotesSubscribeLinks />
          </LayoutPageHeaderSide>
          <LayoutPageContent>
            <PageContentInset id="body-content">
              {props.children}
            </PageContentInset>
          </LayoutPageContent>
        </LayoutPage>
        <LayoutFooter />
      </LayoutMain>
    </LayoutApplication>
  );
};
LayoutReleaseNotesDetail.displayName = 'LayoutReleaseNotesDetail';
LayoutReleaseNotesDetail.propTypes = {
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

export default LayoutReleaseNotesDetail;
