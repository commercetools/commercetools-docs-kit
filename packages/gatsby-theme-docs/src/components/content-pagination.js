import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import Card from '@commercetools-uikit/card';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import {
  AngleThinLeftIcon,
  AngleThinRightIcon,
} from '@commercetools-uikit/icons';
import { designSystem, TextSmall } from '@commercetools-docs/ui-kit';
import { useSiteData } from '../hooks/use-site-data';

const trimTrailingSlash = (url) =>
  url ? url.replace(/(\/?)$/, '') : undefined;

const isMatching = (a, b) => trimTrailingSlash(a) === trimTrailingSlash(b);

const Container = styled.nav`
  max-width: ${designSystem.dimensions.widths.pageContent};
  display: grid;
  grid-gap: ${designSystem.dimensions.spacings.m};
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr;
  margin-left: auto !important;
  margin-right: auto !important;

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid-gap: ${designSystem.dimensions.spacings.xl};
  }
`;

const PaginationButton = styled(Card)`
  svg {
    fill: ${designSystem.colors.light.textPrimary};
  }
  :hover {
    background-color: ${designSystem.colors.light.surfaceQuote};
    svg {
      fill: ${designSystem.colors.light.textInfo};
    }
  }
`;

const PaginationButtonLink = styled(Link)`
  text-align: ${(props) => props.align};
  text-decoration: none;
  font-size: ${designSystem.typography.fontSizes.h5};
  color: ${designSystem.colors.light.textPrimary};

  :hover > ${PaginationButton} {
    background-color: ${designSystem.colors.light.surfaceQuote};
  }
`;
PaginationButtonLink.defaultProps = {
  align: 'left',
};
PaginationButtonLink.propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
};

const PaginationLink = (props) => (
  <PaginationButtonLink
    to={trimTrailingSlash(props.linkTo)}
    align={props.direction === 'left' ? 'right' : 'left'}
  >
    <PaginationButton
      data-testid={
        props.direction === 'left' ? 'pagination-prev' : 'pagination-next'
      }
      insetScale="s"
    >
      <SpacingsInline
        scale="m"
        alignItems="center"
        justifyContent="space-between"
      >
        {props.direction === 'left' ? (
          <>
            <AngleThinLeftIcon />
            <SpacingsStack scale="s">
              <TextSmall>{'Previous:'}</TextSmall>
              <div>{props.label}</div>
            </SpacingsStack>
          </>
        ) : (
          <>
            <SpacingsStack scale="s">
              <TextSmall>{'Next:'}</TextSmall>
              <div>{props.label}</div>
            </SpacingsStack>
            <AngleThinRightIcon />
          </>
        )}
      </SpacingsInline>
    </PaginationButton>
  </PaginationButtonLink>
);
PaginationLink.propTypes = {
  linkTo: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
};

// TODO: cleanup. After docs websites migrate to clickable chapter, this function
// can be simplified/removed or refactored since is currently supporting both clickable
// and non-clickable configs
const isChapterPathOrPageMatchingSlug = (node, slug) => {
  if (node.path && isMatching(slug, node.path)) {
    return true;
  }
  return node.pages.some((page) => isMatching(slug, page.path));
};

// TODO: cleanup. After docs websites migrate to clickable chapter, this function
// can be simplified/removed or refactored since is currently supporting both clickable
// and non-clickable configs
const findActivePageIndex = (node, slug) => {
  let indexOffset = 0;
  if (node.path) {
    indexOffset = 1;
  }
  if (node.path && isMatching(slug, node.path)) {
    return 0;
  }
  const index = node.pages.findIndex(
    (page) => page.path && isMatching(slug, page.path)
  );
  if (index >= 0) {
    return index + indexOffset;
  }
  return index;
};

// TODO: cleanup. After docs websites migrate to clickable chapter, this function
// can be simplified/removed or refactored since is currently supporting both clickable
// and non-clickable configs
const getPreviousPageLink = (node, currentIndex) => {
  if (node.path) {
    if (currentIndex === 1) {
      // return the chapter
      return { path: node.path, title: node.chapterTitle };
    } else {
      return node.pages[currentIndex - 2];
    }
  }
  return node.pages[currentIndex - 1];
};

// TODO: cleanup. After docs websites migrate to clickable chapter, this function
// can be simplified/removed or refactored since is currently supporting both clickable
// and non-clickable configs
const getNextPageLink = (node, currentIndex) => {
  const indexOffset = node.path ? 1 : 0;
  return node.pages[currentIndex - indexOffset + 1];
};

export const PurePagination = (props) => {
  const siteData = useSiteData();
  const activeChapter = props.data.allNavigationYaml.nodes.find((node) => {
    const isPaginationEnabledForChapter =
      typeof node.pagination === 'boolean' ? node.pagination : true;
    if (!isPaginationEnabledForChapter) return false;
    if (!node.pages) return false;
    return isChapterPathOrPageMatchingSlug(node, props.slug);
  });

  if (!activeChapter) {
    return <Container />;
  }

  const isSelfLearning = siteData.siteMetadata.isSelfLearning;
  const currentPageLinkIndex = findActivePageIndex(activeChapter, props.slug);
  const hasPagination = currentPageLinkIndex > -1;
  const previousPage = isSelfLearning
    ? getPreviousPageLink(activeChapter, currentPageLinkIndex)
    : activeChapter.pages[currentPageLinkIndex - 1];
  const nextPage = isSelfLearning
    ? getNextPageLink(activeChapter, currentPageLinkIndex)
    : activeChapter.pages[currentPageLinkIndex + 1];

  return (
    <Container aria-label="Next / Previous in Chapter Navigation">
      {hasPagination && previousPage?.path ? (
        <PaginationLink
          linkTo={previousPage.path}
          label={previousPage.title}
          direction="left"
        />
      ) : (
        <span />
      )}
      {hasPagination && nextPage?.path ? (
        <PaginationLink
          linkTo={nextPage.path}
          label={nextPage.title}
          direction="right"
        />
      ) : (
        <span />
      )}
    </Container>
  );
};

PurePagination.propTypes = {
  slug: PropTypes.string.isRequired,
  data: PropTypes.shape({
    allNavigationYaml: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          chapterTitle: PropTypes.string.isRequired,
          pagination: PropTypes.bool,
          pages: PropTypes.arrayOf(
            PropTypes.shape({
              title: PropTypes.string.isRequired,
              path: PropTypes.string,
              beta: PropTypes.bool,
            })
          ),
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};
PurePagination.displayName = 'Pagination';

const Pagination = (props) => {
  const data = useStaticQuery(graphql`
    query GetNavbarLinks {
      allNavigationYaml {
        nodes {
          chapterTitle
          path
          pagination
          pages {
            title
            path
            beta
          }
        }
      }
    }
  `);

  return <PurePagination {...props} data={data} />;
};

export default Pagination;
