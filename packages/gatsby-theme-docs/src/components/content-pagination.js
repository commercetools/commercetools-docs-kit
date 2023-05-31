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

const trimTrailingSlash = (url) => url.replace(/(\/?)$/, '');

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
      data-test-id={
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

export const PurePagination = (props) => {
  const activeChapter = props.data.allNavigationYaml.nodes.find((node) => {
    const isPaginationEnabledForChapter =
      typeof node.pagination === 'boolean' ? node.pagination : true;
    if (!isPaginationEnabledForChapter) return false;
    if (!node.pages) return false;
    return node.pages.some((page) => isMatching(props.slug, page.path));
  });

  if (!activeChapter) {
    return <Container />;
  }

  const currentPageLinkIndex = activeChapter.pages.findIndex((page) =>
    isMatching(props.slug, page.path)
  );
  const hasPagination = currentPageLinkIndex > -1;
  const previousPage = activeChapter.pages[currentPageLinkIndex - 1];
  const nextPage = activeChapter.pages[currentPageLinkIndex + 1];

  return (
    <Container aria-label="Next / Previous in Chapter Navigation">
      {hasPagination && previousPage ? (
        <PaginationLink
          linkTo={previousPage.path}
          label={previousPage.title}
          direction="left"
        />
      ) : (
        <span />
      )}
      {hasPagination && nextPage ? (
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
              path: PropTypes.string.isRequired,
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
