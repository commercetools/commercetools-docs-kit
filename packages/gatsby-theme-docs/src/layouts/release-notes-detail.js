import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { designSystem } from '@commercetools-docs/ui-kit';
import { AngleLeftIcon } from '@commercetools-uikit/icons';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { useInView } from 'react-intersection-observer';
import useLayoutState from '../hooks/use-layout-state';
import { useSiteData } from '../hooks/use-site-data';
import { Link } from '../components';
import LayoutApplication from './internals/layout-application';
import LayoutHeader from './internals/layout-header';
import LayoutSidebar from './internals/layout-sidebar';
import LayoutMain from './internals/layout-main';
import LayoutFooter from './internals/layout-footer';
import LayoutPageWrapper from './internals/layout-page-wrapper';
import LayoutPage from './internals/layout-page';
import LayoutPageHeader from './internals/layout-page-header';
import LayoutReleaseNotePageHeaderSide from './layout-release-note-page-header-side';
import LayoutPageContent from './internals/layout-page-content';
import PageContentInset from './internals/page-content-inset';
import { ReleaseNotePageTitle } from '../components/release-note-heading';

const LayoutReleaseNotesDetail = (props) => {
  const { ref } = useInView();
  const layoutState = useLayoutState();
  const siteData = useSiteData();
  const excludeFromSearchIndex =
    props.pageData.excludeFromSearchIndex ||
    siteData.siteMetadata.excludeFromSearchIndex;

  return (
    <LayoutApplication>
      <LayoutSidebar
        {...layoutState.sidebar}
        {...layoutState.searchDialog}
        {...layoutState.topMenu}
        siteTitle={siteData.siteMetadata.title}
        isGlobalBeta={siteData.siteMetadata.beta}
        // Rendering a release note details page implicitly implies
        // that there are release notes.
        hasReleaseNotes={true}
      />
      <LayoutMain
        {...layoutState.topMenu}
        preventScroll={
          layoutState.topMenu.isTopMenuOpen ||
          layoutState.sidebar.isSidebarMenuOpen
        }
      >
        <LayoutHeader
          {...layoutState.searchDialog}
          {...layoutState.topMenu}
          ref={ref}
          siteTitle={siteData.siteMetadata.title}
          excludeFromSearchIndex={excludeFromSearchIndex}
        />
        <LayoutPageWrapper>
          <LayoutPage>
            <LayoutPageHeader>
              <Link
                href="/releases"
                nounderline={true}
                css={css`
                  svg {
                    fill: ${designSystem.colors.light.link};
                  }

                  :hover {
                    svg {
                      fill: ${designSystem.colors.light.linkHover};
                    }
                  }
                `}
              >
                <SpacingsInline alignItems="center">
                  <AngleLeftIcon size="medium" />

                  <span
                    css={css`
                      font-size: ${designSystem.typography.fontSizes.small};
                    `}
                  >
                    {`All Release Notes`}
                  </span>
                </SpacingsInline>
              </Link>
              <ReleaseNotePageTitle>
                {props.pageData.title}
              </ReleaseNotePageTitle>
            </LayoutPageHeader>
            <LayoutReleaseNotePageHeaderSide />
            <LayoutPageContent>
              <PageContentInset id="body-content">
                {props.children}
              </PageContentInset>
            </LayoutPageContent>
          </LayoutPage>
        </LayoutPageWrapper>
        <LayoutFooter />
      </LayoutMain>
    </LayoutApplication>
  );
};
LayoutReleaseNotesDetail.displayName = 'LayoutReleaseNotesDetail';
LayoutReleaseNotesDetail.propTypes = {
  pageData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    websitePrimaryColor: PropTypes.string.isRequired,
    excludeFromSearchIndex: PropTypes.bool.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default LayoutReleaseNotesDetail;
