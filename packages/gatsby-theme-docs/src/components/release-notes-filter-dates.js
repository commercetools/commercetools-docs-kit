import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
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

const ClearAll = styled.button`
  border: none;
  cursor: pointer;
  padding: 0;
  color: ${designSystem.colors.light.link};
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  text-decoration: none;
  background-color: transparent;

  :hover {
    color: ${designSystem.colors.light.linkHover};
  }
`;

/**
 * Return the date in yyyy-mm-dd format
 */
const isoYMD = (inDate) => {
  const date = inDate || new Date();
  return date.toISOString().substring(0, 10);
};

const ReleaseNotesFilterDates = () => {
  const [filterParams, setFilterParams] = useReleaseNotesFilterParams();
  const [fromDate, setFromFilterDate] = useState('');
  const [toDate, setToFilterDate] = useState('');
  const maximumDate = isoYMD();

  useEffect(() => {
    if (filterParams.fromFilterDate) {
      setFromFilterDate(filterParams.fromFilterDate);
    }
    if (filterParams.toFilterDate) {
      setToFilterDate(filterParams.toFilterDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SpacingsStack scale="s">
      <SpacingsInline alignItems="center">
        <ClearAll onClick={handleOnClearAll} aria-label="Clear all">
          Clear all
        </ClearAll>
      </SpacingsInline>
      <FilterTitle>Filter by date</FilterTitle>

      <SpacingsStack scale="xs">
        <DateLabel htmlFor="from-filter-date">From</DateLabel>
        <div>
          <DateInputField
            type="date"
            id="from-filter-date"
            max={maximumDate}
            value={fromDate}
            onChange={handleOnFromFilterDateChange}
            onBlur={(e) => handleOnBlur(e, 'from')}
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
            value={toDate}
            onChange={handleOnToFilterDateChange}
            onBlur={(e) => handleOnBlur(e, 'to')}
          />
        </div>
      </SpacingsStack>
    </SpacingsStack>
  );

  function handleOnClearAll() {
    setFilterParams({
      fromFilterDate: undefined,
      toFilterDate: undefined,
      filterTopics: [],
    });
    setFromFilterDate('');
    setToFilterDate('');
  }

  function handleOnFromFilterDateChange(e) {
    let date;
    try {
      date = isoYMD(new Date(e.target.value));
    } catch (err) {
      if (fromDate) {
        setFromFilterDate('');
      }
    }
    setFromFilterDate(date);
  }

  function handleOnToFilterDateChange(e) {
    let date;
    try {
      date = isoYMD(new Date(e.target.value));
    } catch (err) {
      if (toDate) {
        setToFilterDate('');
      }
    }
    setToFilterDate(date);
  }

  function handleOnBlur(event, field) {
    event.stopPropagation();
    if (field === 'from') {
      setFilterParams({ fromFilterDate: fromDate || undefined });
    } else {
      setFilterParams({ toFilterDate: toDate || undefined });
    }
    scrollToTop();
  }
};

export default ReleaseNotesFilterDates;
