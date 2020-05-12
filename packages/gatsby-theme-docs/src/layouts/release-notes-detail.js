import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { navigate } from '@reach/router';
import { designSystem, Link as StyledLink } from '@commercetools-docs/ui-kit';
import { AngleLeftIcon } from '@commercetools-uikit/icons';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import useLayoutState from '../hooks/use-layout-state';
import { useSiteData } from '../hooks/use-site-data';
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
import { ReleaseNotePageTitle } from '../components/release-note-heading';

const LayoutReleaseNotesDetail = (props) => {
  const layoutState = useLayoutState();
  const siteData = useSiteData();

  return (
    <LayoutApplication websitePrimaryColor={props.pageData.websitePrimaryColor}>
      <LayoutSidebar
        {...layoutState.sidebar}
        {...layoutState.searchDialog}
        siteTitle={siteData.siteMetadata.title}
        isGlobalBeta={props.pageData.isGlobalBeta}
        // Rendering a release note details page implicitly implies
        // that there are release notes.
        hasReleaseNotes={true}
      />
      <LayoutMain
        preventScroll={
          layoutState.topMenu.isTopMenuOpen ||
          layoutState.sidebar.isSidebarMenuOpen
        }
      >
        <LayoutHeader
          {...layoutState.searchDialog}
          {...layoutState.topMenu}
          siteTitle={siteData.siteMetadata.title}
          excludeFromSearchIndex={props.pageData.excludeFromSearchIndex}
        />
        <LayoutPage id="top">
          <LayoutPageHeader>
            <SpacingsInline alignItems="center">
              <AngleLeftIcon size="medium" color="primary" />
              <StyledLink
                href="#"
                css={css`
                  text-decoration: none;
                `}
                onClick={handleOnBackToAllReleases}
              >
                <span
                  css={css`
                    font-size: ${designSystem.typography.fontSizes.small};
                  `}
                >
                  {`All Release Notes`}
                </span>
              </StyledLink>
            </SpacingsInline>
            <ReleaseNotePageTitle>{props.pageData.title}</ReleaseNotePageTitle>
          </LayoutPageHeader>
          <LayoutPageHeaderSide />
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

  function handleOnBackToAllReleases(e) {
    e.preventDefault();
    navigate(-1);
  }
};
LayoutReleaseNotesDetail.displayName = 'LayoutReleaseNotesDetail';
LayoutReleaseNotesDetail.propTypes = {
  pageData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    websitePrimaryColor: PropTypes.string.isRequired,
    isGlobalBeta: PropTypes.bool.isRequired,
    excludeFromSearchIndex: PropTypes.bool.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default LayoutReleaseNotesDetail;
