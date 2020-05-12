import React from 'react';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import { designSystem } from '@commercetools-docs/ui-kit';
import { useLocation } from '@reach/router';
import navigateWithFilters from '../utils/navigate-with-filters';
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
`;

const ReleaseNotesFilterTopics = () => {
  const location = useLocation();
  const topicsSet = useReleaseNotesTopicsSet();
  const checkedTopics = topicsSet.map((topic) => ({
    name: topic,
    checked: false,
  }));

  const [topics, setTopics] = React.useState(checkedTopics);

  return (
    <Container>
      <SpacingsStack>
        <SpacingsInline alignItems="center" justifyContent="space-between">
          <FilterTitle>Filter By Topics</FilterTitle>
          <ClearAll onClick={handleOnClearAll}>Clear all</ClearAll>
        </SpacingsInline>
        <SpacingsStack scale="s">
          {topics.map((topic) => (
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

  function handleOnClearAll(e) {
    e.preventDefault();
    setTopics(topics.map((topic) => ({ ...topic, checked: false })));
    navigateWithFilters(
      {
        filterTopics: [],
      },
      location
    );
  }

  function handleOnTopicChange(e) {
    const filterTopics = topics.map((topic) => {
      if (topic.name === e.target.value) {
        return { ...topic, checked: !topic.checked };
      }

      return topic;
    });
    setTopics(filterTopics);
    navigateWithFilters(
      {
        filterTopics: filterTopics
          .filter((topic) => topic.checked)
          .map((topic) => topic.name),
      },
      location
    );
  }
};

export default ReleaseNotesFilterTopics;
