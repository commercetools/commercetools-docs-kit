import React from 'react';
import styled from '@emotion/styled';
import { designSystem, IsoDateFormat } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import DateInput from '@commercetools-uikit/date-input';
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

// Override min-width from the uikit date component
const DateInputContainer = styled.div`
  div span div {
    min-width: 0;
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
        <DateInputContainer>
          <DateInput
            id="from-filter-date"
            value={filterParams.fromFilterDate || ''}
            onChange={handleOnFromFilterDateChange}
            maxValue={maximumDate}
          />
        </DateInputContainer>
      </SpacingsStack>

      <SpacingsStack scale="xs">
        <DateLabel htmlFor="to-filter-date">To</DateLabel>
        <DateInputContainer>
          <DateInput
            id="to-filter-date"
            value={filterParams.toFilterDate || ''}
            onChange={handleOnToFilterDateChange}
            maxValue={maximumDate}
          />
        </DateInputContainer>
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
