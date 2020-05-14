import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import { designSystem } from '@commercetools-docs/ui-kit';
import { useLocation } from '@reach/router';
import navigateWithFilters from '../utils/navigate-with-filters';
import extractQueryParameters from '../utils/extract-query-parameters';
import { useReleaseNotesTopicsSet } from '../hooks/use-all-release-notes';
import { FilterTitle } from './release-notes-filter-dates';

const Container = styled.div`
  border-top: 1px solid ${designSystem.colors.light.borderInput};
  padding-top: ${designSystem.dimensions.spacings.m};
`;
const ClearAll = styled.button`
  border: none;
  cursor: pointer;
  padding: 0;
  color: ${designSystem.colors.light.textInfo};
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  text-decoration: none;
  background-color: transparent;
`;

const ReleaseNotesFilterTopics = (props) => {
  const location = useLocation();
  const { filterTopics } = extractQueryParameters(location);
  const topicsSet = useReleaseNotesTopicsSet();
  const checkedTopics = topicsSet.map((topic) => ({
    name: topic,
    checked: isChecked(filterTopics, topic),
  }));

  function isChecked(filterTopicsArray, topic) {
    if (filterTopicsArray) {
      return Array.isArray(filterTopicsArray)
        ? filterTopicsArray.includes(topic)
        : topic === filterTopicsArray;
    }

    return false;
  }

  return (
    <Container>
      <SpacingsStack>
        <SpacingsInline alignItems="center" justifyContent="space-between">
          <FilterTitle>Filter By Topics</FilterTitle>
          <ClearAll onClick={handleOnClearAll} aria-label="Clear all">
            Clear all
          </ClearAll>
        </SpacingsInline>
        <SpacingsStack scale="s">
          {checkedTopics.map((topic) => (
            <div key={topic.name}>
              <CheckboxInput
                value={topic.name}
                onChange={handleOnTopicChange}
                isChecked={topic.checked}
              >
                {topic.name}
              </CheckboxInput>
            </div>
          ))}
        </SpacingsStack>
      </SpacingsStack>
    </Container>
  );

  function handleOnClearAll() {
    navigateWithFilters(
      {
        filterTopics: [],
      },
      location
    );
    props.scrollToTop();
  }

  function handleOnTopicChange(e) {
    const filterdTopics = checkedTopics.map((topic) => {
      if (topic.name === e.target.value) {
        return { ...topic, checked: !topic.checked };
      }

      return topic;
    });
    navigateWithFilters(
      {
        filterTopics: filterdTopics
          .filter((topic) => topic.checked)
          .map((topic) => topic.name),
      },
      location
    );
    props.scrollToTop();
  }
};

ReleaseNotesFilterTopics.propTypes = {
  scrollToTop: PropTypes.func,
};

export default ReleaseNotesFilterTopics;
