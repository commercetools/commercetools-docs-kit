import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import styled from '@emotion/styled';
import { createStyledIcon, designSystem } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import UnstyledStackedLinesIndentedIcon from '../../icons/stacked-lines-indented-icon.svg';
import ReleaseNotesFilterDates from '../../components/release-notes-filter-dates';
import ReleaseNotesFilterTopics from '../../components/release-notes-filter-topics';

const StackedLinesIndentedIcon = createStyledIcon(
  UnstyledStackedLinesIndentedIcon
);

const GridContainer = styled.div`
  display: none;
  border-left: 1px solid ${designSystem.colors.light.borderPrimary};
  margin-top: ${designSystem.dimensions.spacings.wide};

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    display: block;
    grid-area: page-navigation;
    width: ${designSystem.dimensions.widths.pageNavigation};
  }
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    width: ${designSystem.dimensions.widths.pageNavigationSmall};
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: ${designSystem.dimensions.widths.pageNavigation};
  }
`;
const StickyContainer = styled.div`
  position: sticky;
  top: ${designSystem.dimensions.spacings.xxl};
  margin: 0 0 ${designSystem.dimensions.spacings.s};
  padding-left: ${designSystem.dimensions.spacings.m};
`;
const ReleasesTitleLink = styled.a`
  color: ${designSystem.colors.light.textSecondary};
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  text-decoration: none;
  :hover {
    color: ${designSystem.colors.light.linkNavigation};
    svg {
      * {
        fill: ${designSystem.colors.light.linkNavigation};
      }
    }
  }
  :hover,
  :active {
    outline-width: 0;
  }
`;

const LayoutPageReleaseNotesFilters = (props) => {
  return (
    <IntlProvider locale="en">
      <GridContainer>
        <StickyContainer>
          <SpacingsStack scale="m">
            <ReleasesTitleLink href="#top">
              <SpacingsInline scale="s" alignItems="center">
                <div>Releases</div>
                <div>
                  <StackedLinesIndentedIcon color="textSecondary" />
                </div>
              </SpacingsInline>
            </ReleasesTitleLink>

            <ReleaseNotesFilterDates
              onFromFilterDateChange={props.onFromFilterDateChange}
              onToFilterDateChange={props.onToFilterDateChange}
            />

            <ReleaseNotesFilterTopics
              onFilterTopicsChange={props.onFilterTopicsChange}
            />
          </SpacingsStack>
        </StickyContainer>
      </GridContainer>
    </IntlProvider>
  );
};
LayoutPageReleaseNotesFilters.displayName = 'LayoutPageReleaseNotesFilters';

LayoutPageReleaseNotesFilters.propTypes = {
  onFromFilterDateChange: PropTypes.func.isRequired,
  onToFilterDateChange: PropTypes.func.isRequired,
  onFilterTopicsChange: PropTypes.func.isRequired,
};

export default LayoutPageReleaseNotesFilters;
