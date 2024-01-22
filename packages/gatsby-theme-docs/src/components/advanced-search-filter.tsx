import styled from '@emotion/styled';
import React, { useState } from 'react';
import Card from '@commercetools-uikit/card';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import Stack from '@commercetools-uikit/spacings-stack';
import { designSystem } from '@commercetools-docs/ui-kit';
import PrimaryButton from '@commercetools-uikit/primary-button';
import FlatButton from '@commercetools-uikit/flat-button';
import Inline from '@commercetools-uikit/spacings-inline';

type AdvancedSearchFilterProps = {
  setFilters: (filter: string[]) => void;
  isFilterOpen: boolean;
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

const FilterContainer = styled.div`
  position: absolute;
  z-index: 101;
  top: 45px;
`;

const ContentWrapper = styled.div`
  width: 350px;
  padding: ${designSystem.dimensions.spacings.xs};
`;

const FilterWrapper = styled.div`
  padding-left: ${designSystem.dimensions.spacings.l};
  padding-bottom: ${designSystem.dimensions.spacings.m};
  border-bottom: 1px solid ${designSystem.colors.light.borderPrimary};
`;

const BottonsWrapper = styled.div`
  padding-top: ${designSystem.dimensions.spacings.m};
`;

const AdvancedSearchFilter: React.FC<AdvancedSearchFilterProps> = (
  props: AdvancedSearchFilterProps
) => {
  const [tagsFilter, setTagsFilter] = useState<string[]>([]);

  const onApplyFilterClick = () => {
    props.setFilters(tagsFilter);
  };

  const onClearFilterClick = () => {
    setTagsFilter([]);
    props.setFilters([]);
  };

  const toggleTagFilter = (tag: string) => {
    console.log(tag);
    if (tagsFilter.includes(tag)) {
      setTagsFilter(tagsFilter.filter((item) => item !== tag));
    } else {
      setTagsFilter([...tagsFilter, tag]);
    }
  };

  return props.isFilterOpen ? (
    <FilterContainer>
      <Card>
        <ContentWrapper>
          <FilterWrapper>
            <Stack scale="s">
              {tagsFilterConfig.map((tag) => (
                <CheckboxInput
                  key={tag.value}
                  value={tag.value}
                  onChange={(event) => toggleTagFilter(event.target.value)}
                  isChecked={tagsFilter.includes(tag.value)}
                >
                  {tag.label}
                </CheckboxInput>
              ))}
            </Stack>
          </FilterWrapper>
          <BottonsWrapper>
            <Inline scale="s" alignItems="center" justifyContent="flex-end">
              <FlatButton
                onClick={onClearFilterClick}
                label="Clear all filters"
              />
              <PrimaryButton
                onClick={onApplyFilterClick}
                label="Apply filters"
              />
            </Inline>
          </BottonsWrapper>
        </ContentWrapper>
      </Card>
    </FilterContainer>
  ) : null;
};

export default AdvancedSearchFilter;
