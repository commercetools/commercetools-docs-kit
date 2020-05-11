import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import DateInput from '@commercetools-uikit/date-input';
import { useEarliestLatestDates } from '../hooks/use-all-release-notes';

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

const ReleaseNotesFilterDates = (props) => {
  const dates = useEarliestLatestDates();
  const [fromFilterDate, setFromFilterDate] = React.useState(
    dates.earliestDate
  );
  const [toFilterDate, setToFilterDate] = React.useState(dates.latestDate);

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
    props.onFromFilterDateChange(e.target.value);
  }

  function handleOnToFilterDateChange(e) {
    setToFilterDate(e.target.value);
    props.onToFilterDateChange(e.target.value);
  }
};

ReleaseNotesFilterDates.propTypes = {
  onFromFilterDateChange: PropTypes.func.isRequired,
  onToFilterDateChange: PropTypes.func.isRequired,
};

export default ReleaseNotesFilterDates;
