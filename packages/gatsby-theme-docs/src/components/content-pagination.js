import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import AngleThinLeftIcon from '../icons/angle-thin-left-icon.svg';
import AngleThinRightIcon from '../icons/angle-thin-right-icon.svg';
import { colors, dimensions, typography } from '../design-system';
import Card from './card';
import Spacings from './spacings';
import TextSmall from './text-small';

const trimTrailingSlash = url => url.replace(/(\/?)$/, '');

const PaginationButtonLink = styled(Link)`
  text-align: ${props => props.align};
  text-decoration: none;
  font-size: ${typography.fontSizes.h5};
  color: ${colors.light.textPrimary};

  :hover {
    background-color: ${colors.light.surfaceQuote};
  }
`;
PaginationButtonLink.defaultProps = {
  align: 'left',
};
PaginationButtonLink.propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
};

const PaginationButton = styled(Card)`
  > div {
    padding: ${dimensions.spacings.s};
  }
  svg {
    * {
      fill: ${colors.light.textPrimary};
    }
  }
  :hover {
    background-color: ${colors.light.surfaceQuote};
    svg {
      * {
        fill: ${colors.light.textInfo};
      }
    }
  }
`;

const PaginationLink = props => (
  <PaginationButtonLink
    to={trimTrailingSlash(props.linkTo)}
    align={props.direction === 'left' ? 'right' : 'left'}
  >
    <PaginationButton>
      <Spacings.Inline
        scale="m"
        alignItems="center"
        justifyContent="space-between"
      >
        {props.direction === 'left' ? (
          <>
            <AngleThinLeftIcon />
            <Spacings.Stack scale="s">
              <TextSmall>{'Previous:'}</TextSmall>
              <div>{props.label}</div>
            </Spacings.Stack>
          </>
        ) : (
          <>
            <Spacings.Stack scale="s">
              <TextSmall>{'Next:'}</TextSmall>
              <div>{props.label}</div>
            </Spacings.Stack>
            <AngleThinRightIcon />
          </>
        )}
      </Spacings.Inline>
    </PaginationButton>
  </PaginationButtonLink>
);
PaginationLink.propTypes = {
  linkTo: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
};

export const PurePagination = props => {
  const [, chapterPath] = props.slug.split('/');
  const chapterSlug = `/${chapterPath}`;
  const chapterPageLinks = props.data.allNavigationYaml.nodes.reduce(
    (links, node) => {
      const isPaginationEnabledForChapter =
        typeof node.pagination === 'boolean' ? node.pagination : true;
      if (isPaginationEnabledForChapter && node.pages) {
        return [
          ...links,
          ...node.pages.filter(page => page.path.startsWith(chapterSlug)),
        ];
      }
      return links;
    },
    []
  );
  const currentPageLinkIndex = chapterPageLinks.findIndex(
    page => trimTrailingSlash(props.slug) === trimTrailingSlash(page.path)
  );
  const hasPagination = currentPageLinkIndex > -1;
  const previousPage = chapterPageLinks[currentPageLinkIndex - 1];
  const nextPage = chapterPageLinks[currentPageLinkIndex + 1];

  return (
    <div
      css={css`
        display: grid;
        grid-gap: ${dimensions.spacings.m};
        grid-auto-columns: 1fr;
        grid-template-columns: repeat(
          auto-fill,
          minmax(
            calc(
              ${dimensions.widths.pageContent} / 2 - ${dimensions.spacings.m} *
                2
            ),
            1fr
          )
        );

        @media screen and (${dimensions.viewports.tablet}) {
          grid-template-columns: 1fr 1fr;
        }
      `}
    >
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
    </div>
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

const Pagination = props => {
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
