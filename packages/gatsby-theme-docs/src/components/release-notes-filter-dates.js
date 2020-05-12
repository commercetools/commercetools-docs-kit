import React from 'react';
import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import DateInput from '@commercetools-uikit/date-input';
import { useLocation } from '@reach/router';
import navigateWithFilters from '../utils/navigate-with-filters';

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

const ReleaseNotesFilterDates = () => {
  const location = useLocation();
  const [fromFilterDate, setFromFilterDate] = React.useState('');
  const [toFilterDate, setToFilterDate] = React.useState('');

  return (
    <SpacingsStack scale="s">
      <FilterTitle>Filter by Date</FilterTitle>

      <SpacingsStack scale="xs">
        <DateLabel htmlFor="from-filter-date">From</DateLabel>
        <div>
          <DateInput
            id="from-filter-date"
            value={fromFilterDate}
            onChange={handleOnFromFilterDateChange}
          />
        </div>
      </SpacingsStack>

      <SpacingsStack scale="xs">
        <DateLabel htmlFor="to-filter-date">To</DateLabel>
        <div>
          <DateInput
            id="to-filter-date"
            value={toFilterDate}
            onChange={handleOnToFilterDateChange}
          />
        </div>
      </SpacingsStack>
    </SpacingsStack>
  );

  function handleOnFromFilterDateChange(e) {
    setFromFilterDate(e.target.value);
    navigateWithFilters({ fromFilterDate: e.target.value }, location);
  }

  function handleOnToFilterDateChange(e) {
    setToFilterDate(e.target.value);
    navigateWithFilters({ toFilterDate: e.target.value }, location);
  }
};

export default ReleaseNotesFilterDates;
