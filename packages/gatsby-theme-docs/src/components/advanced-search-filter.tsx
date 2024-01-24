import styled from '@emotion/styled';
import React from 'react';
import Stack from '@commercetools-uikit/spacings-stack';
import { designSystem } from '@commercetools-docs/ui-kit';
import PrimaryButton from '@commercetools-uikit/primary-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import FlatButton from '@commercetools-uikit/flat-button';
import { CheckThinIcon } from '@commercetools-uikit/icons';
import { gtagEvent } from '../modules/sso/utils/analytics.utils';
import SpacingsInline from '@commercetools-uikit/spacings-inline';

type AdvancedSearchFilterProps = {
  setFilters: (filter: string[]) => void;
  filters: string[];
};

const tagsFilterConfig = [
  {
    label: 'Composable Commerce',
    value: 'Composable Commerce',
  },
  {
    label: 'Checkout',
    value: 'Checkout',
  },
  {
    label: 'Connect',
    value: 'Connect',
  },
  {
    label: 'Frontend',
    value: 'Frontend',
  },
];

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  button {
    flex: 0 0 auto;
    margin-right: 8px;
    margin-bottom: 5px;
  }
`;

const FilterContainer = styled.div``;

const Title = styled.h3`
  color: ${designSystem.colors.light.textSecondary};
`;

const AdvancedSearchFilter: React.FC<AdvancedSearchFilterProps> = (
  props: AdvancedSearchFilterProps
) => {
  const onClearFilterClick = () => {
    props.setFilters([]);
  };

  const toggleTagFilter = (tag: string) => {
    gtagEvent('search_tag_click', {
      tag,
    });
    if (props.filters.includes(tag)) {
      props.setFilters(props.filters.filter((item) => item !== tag));
    } else {
      props.setFilters([...props.filters, tag]);
    }
  };

  return (
    <FilterContainer>
      <Stack scale="s">
        <Title>Filter by:</Title>

        <TagsContainer>
          {tagsFilterConfig.map((tag) =>
            !props.filters.includes(tag.value) ? (
              <SecondaryButton
                key={tag.value}
                size="medium"
                isToggleButton={true}
                isToggled={false}
                label={tag.label}
                onClick={() => toggleTagFilter(tag.value)}
                isDisabled={false}
              />
            ) : (
              <PrimaryButton
                key={tag.value}
                size="medium"
                iconLeft={<CheckThinIcon />}
                label={tag.label}
                onClick={() => toggleTagFilter(tag.value)}
                isDisabled={false}
              />
            )
          )}
          <FlatButton onClick={onClearFilterClick} label="Clear all filters" />
        </TagsContainer>
      </Stack>
    </FilterContainer>
  );
};

export default AdvancedSearchFilter;
