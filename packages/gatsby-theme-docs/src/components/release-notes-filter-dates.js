import React from 'react';
import styled from '@emotion/styled';
import { designSystem, IsoDateFormat } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import useReleaseNotesFilterParams from '../hooks/use-release-notes-filter-params';
import scrollToTop from '../utils/scroll-to-top';

export const FilterTitle = styled.div`
  font-size: ${designSystem.typography.fontSizes.small};
  font-weight: ${designSystem.typography.fontWeights.bold};
  line-height: ${designSystem.typography.lineHeights.body};
`;
const DateLabel = styled.label`
  color: ${designSystem.colors.light.textSecondary};
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  line-height: ${designSystem.typography.lineHeights.small};
`;

const DateInputField = styled.input`
  color: ${designSystem.colors.light.textPrimary};
  border: 1px solid ${designSystem.colors.light.borderInput};
  border-radius: ${designSystem.tokens.borderRadiusForSearchDialog};
  font-size: ${designSystem.typography.fontSizes.body};
  height: ${designSystem.dimensions.heights.inputSearchPrimary};
  padding: 0 ${designSystem.dimensions.spacings.s};
  box-sizing: border-box;
  font-family: inherit;
  outline: none;
  width: 100%;

  &:focus {
    border-color: ${designSystem.colors.light.borderHighlight};
  }
`;

const ReleaseNotesFilterDates = () => {
  const [filterParams, setFilterParams] = useReleaseNotesFilterParams();
  const maximumDate = IsoDateFormat.format(new Date());

  return (
    <SpacingsStack scale="s">
      <FilterTitle>Filter by date</FilterTitle>

      <SpacingsStack scale="xs">
        <DateLabel htmlFor="from-filter-date">From</DateLabel>
        <div>
          <DateInputField
            type="date"
            id="from-filter-date"
            max={maximumDate}
            value={filterParams.fromFilterDate || ''}
            onChange={handleOnFromFilterDateChange}
          />
        </div>
      </SpacingsStack>

      <SpacingsStack scale="xs">
        <DateLabel htmlFor="to-filter-date">To</DateLabel>
        <div>
          <DateInputField
            type="date"
            id="to-filter-date"
            max={maximumDate}
            value={filterParams.toFilterDate || ''}
            onChange={handleOnToFilterDateChange}
          />
        </div>
      </SpacingsStack>
    </SpacingsStack>
  );

  function handleOnFromFilterDateChange(e) {
    setFilterParams({ fromFilterDate: e.target.value || undefined });
    scrollToTop();
  }

  function handleOnToFilterDateChange(e) {
    setFilterParams({ toFilterDate: e.target.value || undefined });
    scrollToTop();
  }
};

export default ReleaseNotesFilterDates;
