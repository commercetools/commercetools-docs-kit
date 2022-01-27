import React from 'react';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import { designSystem } from '@commercetools-docs/ui-kit';
import useReleaseNotesFilterParams from '../hooks/use-release-notes-filter-params';
import scrollToTop from '../utils/scroll-to-top';
import useReleaseNotesTopics from '../hooks/use-release-notes-topics';
import { FilterTitle } from './release-notes-filter-dates';

const Container = styled.div`
  border-top: 1px solid ${designSystem.colors.light.borderInput};
  padding: ${designSystem.dimensions.spacings.m} 0;
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

const ReleaseNotesFilterTopics = () => {
  const [filterParams, setFilterParams] = useReleaseNotesFilterParams();
  const allTopics = useReleaseNotesTopics(filterParams.filterTopics);

  if (allTopics.length === 0) return null;

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
          {allTopics.map((topic) => (
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
    setFilterParams({ filterTopics: [] });
    scrollToTop();
  }

  function handleOnTopicChange(e) {
    const isChecked = e.target.checked;
    const selectedTopic = e.target.value;
    const newFilterTopic = isChecked
      ? filterParams.filterTopics.concat(selectedTopic)
      : filterParams.filterTopics.filter(
          (topicName) => topicName !== selectedTopic
        );
    setFilterParams({
      filterTopics: newFilterTopic,
    });
    scrollToTop();
  }
};

export default ReleaseNotesFilterTopics;
