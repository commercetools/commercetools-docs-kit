import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useStaticQuery, graphql } from 'gatsby';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { designSystem, Link as StyledLink } from '@commercetools-docs/ui-kit';
import Link from '../../components/link';

const trimTrailingSlash = url => url.replace(/(\/?)$/, '');

const isMatching = (a, b) => trimTrailingSlash(a) === trimTrailingSlash(b);

/* NOTE: `overflow` shorthand is only supported is Chrome and FF */
const Wrapper = styled.div`
  position: relative;
  display: grid;
  width: 100vw;
  grid-area: breadcrumbs;
  background-color: ${designSystem.colors.light.surfacePrimary};
  border-bottom: 1px solid ${designSystem.colors.light.borderPrimary};

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    grid:
      [row1-start] 'b-center' auto [row1-end]
      / 100%;
    width: auto;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid:
      [row1-start] 'b-left b-center b-right' auto [row1-end]
      / minmax(0, 100%) 1fr minmax(0, 100%);
    width: auto;
  }
`;
const EmptyLeft = styled.div`
  display: none;

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid-area: b-left;
    display: block;
  }
`;
const EmptyRight = styled.div`
  display: none;

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid-area: b-right;
    display: block;
  }
`;
const Container = styled.div`
  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    grid-area: b-center;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: calc(
      ${designSystem.dimensions.widths.pageContentWithMargings} +
        ${designSystem.dimensions.widths.pageNavigation} * 2
    );
  }
`;
const Inner = styled.div`
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  padding: ${designSystem.dimensions.spacings.xs}
    ${designSystem.dimensions.spacings.m};
`;
const Divider = styled.span`
  color: ${designSystem.colors.light.textFaded};
`;
const RootBreadcrumbLink = styled(StyledLink)`
  text-decoration: none;
`;
const BreadcrumbLink = styled(Link)`
  text-decoration: none;
`;
const ActiveBreadcrumbLink = styled.span`
  color: ${designSystem.colors.light.textFaded};
`;

const getBreadcrumbsForActivePage = (slug, activeChapter) => {
  if (!activeChapter) return [];
  const firstChapterPage = activeChapter.pages[0];
  const activePage = activeChapter.pages.find(page =>
    isMatching(slug, page.path)
  );

  return [
    {
      label: activeChapter.chapterTitle,
      href: firstChapterPage.path,
    },
    activePage && {
      label: activePage.title,
    },
  ].filter(Boolean);
};

const LayoutBreadcrumbs = props => {
  const data = useStaticQuery(graphql`
    query BreadcrumbsQuery {
      allNavigationYaml {
        nodes {
          chapterTitle
          pages {
            title
            path
          }
        }
      }
    }
  `);
  const activeChapter = data.allNavigationYaml.nodes.find(node => {
    if (!node.pages) return false;
    return node.pages.some(page => isMatching(props.slug, page.path));
  });
  const breadcrumbs = [
    { label: 'Documentation', href: '/', Component: RootBreadcrumbLink },
    { label: props.siteTitle, href: '/' },
    ...getBreadcrumbsForActivePage(props.slug, activeChapter),
  ].filter(Boolean);

  return (
    <Wrapper>
      <EmptyLeft />
      <EmptyRight />
      <Container>
        <Inner>
          <SpacingsInline scale="s">
            {breadcrumbs.map(({ label, href, Component }, index) => {
              const isLast = breadcrumbs.length - (index + 1) === 0;
              const Breadcrumb = (() => {
                if (Component) return Component;
                if (isLast) return ActiveBreadcrumbLink;
                if (href) return BreadcrumbLink;
                return ActiveBreadcrumbLink;
              })();
              return (
                <React.Fragment key={index}>
                  <Breadcrumb href={href}>{label}</Breadcrumb>
                  {isLast ? null : <Divider>{'/'}</Divider>}
                </React.Fragment>
              );
            })}
          </SpacingsInline>
        </Inner>
      </Container>
    </Wrapper>
  );
};
LayoutBreadcrumbs.propTypes = {
  slug: PropTypes.string.isRequired,
  siteTitle: PropTypes.string.isRequired,
};

export default LayoutBreadcrumbs;
