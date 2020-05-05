import React from 'react';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
// import CheckboxInput from '@commercetools-uikit/checkbox-input';
import { designSystem } from '@commercetools-docs/ui-kit';
import { useReleaseNotesTopicsSet } from '../hooks/use-all-release-topics';
import { FilterTitle } from './release-notes-filter-dates';

const Container = styled.div`
  border-top: 1px solid ${designSystem.colors.light.borderInput};
  padding-top: ${designSystem.dimensions.spacings.m};
`;
const ClearAll = styled.a`
  color: ${designSystem.colors.light.textInfo};
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  text-decoration: none;
`;

const ReleaseNotesFilterTopics = () => {
  const topics = useReleaseNotesTopicsSet();

  return (
    <Container>
      <SpacingsStack>
        <SpacingsInline alignItems="center">
          <FilterTitle>Filter By Topics</FilterTitle>
          <ClearAll href="#" onClick={handleOnClearAll}>
            Clear all
          </ClearAll>
        </SpacingsInline>
        <div>
          {topics.map((topic) => (
            <div key={topic}>
              <input
                type="checkbox"
                id={topic}
                value={topic}
                onClick={handleOnTopicChange}
              />
              <label htmlFor={topic}> {topic}</label>
            </div>
          ))}
        </div>
      </SpacingsStack>
    </Container>
  );

  function handleOnClearAll(e) {
    e.preventDefault();
    console.log('clear selected topics');
  }

  function handleOnTopicChange(e) {
    console.log(e.target.value);
  }
};

export default ReleaseNotesFilterTopics;
