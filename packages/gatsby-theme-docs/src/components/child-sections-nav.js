import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  designSystem,
  ContentNotifications,
  createStyledIcon,
} from '@commercetools-docs/ui-kit';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { CloseIcon } from '@commercetools-uikit/icons';
import { usePageData } from '../hooks/use-page-data';
import { SearchSvgIcon } from '../icons';

const SearchIcon = createStyledIcon(SearchSvgIcon);

const SearchBoxContainer = styled.div`
  border: 1px solid ${designSystem.colors.light.borderSecondary};
  border-bottom: none;
  padding: ${designSystem.dimensions.spacings.m};
  border-radius: ${designSystem.tokens.borderRadiusForChildSectionNav}
    ${designSystem.tokens.borderRadiusForChildSectionNav} 0 0;
`;

// TODO: this component is visually similar to the `SearchInput` component used
// for the docs search. As a follow up, we should look into extracting the common logic
// into one input component.
const SearchInput = styled.input`
  appearance: none;
  background-color: ${designSystem.colors.light.surfacePrimary};
  border: 1px solid ${designSystem.colors.light.borderInput};
  border-radius: ${designSystem.tokens.borderRadiusForSearchInput};
  box-shadow: none;
  box-sizing: border-box;
  color: ${designSystem.colors.light.textPrimary};
  display: flex;
  flex: 1;
  font-family: inherit;
  font-size: ${designSystem.typography.fontSizes.small};
  height: ${designSystem.dimensions.heights.inputSearch};
  min-height: ${designSystem.dimensions.heights.inputSearch};
  outline: none;
  overflow: hidden;
  padding: 0
    calc(
      ${designSystem.dimensions.spacings.l} +
        ${designSystem.dimensions.spacings.xs}
    );
  width: ${designSystem.dimensions.widths.searchBar};
  &::placeholder {
    color: ${designSystem.colors.light.textFaded};
  }
  &:active,
  &:focus:not(:disabled) {
    border-color: ${designSystem.colors.light.borderHighlight};
    padding-right: ${designSystem.dimensions.spacings.xs};
  }
  &:disabled {
    background-color: ${designSystem.colors.light
      .surfaceForSearchInputWhenDisabled};
  }
`;

const SearchInputIcon = styled.span`
  position: absolute;
  z-index: 1;
  width: ${designSystem.dimensions.spacings.l};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: ${designSystem.dimensions.spacings.s};
  padding-left: ${designSystem.dimensions.spacings.xs};
  ${(props) => `${props.position}: ${designSystem.dimensions.spacings.xs};`}
`;

const SearchBox = styled.div`
  position: relative;
  width: ${designSystem.dimensions.widths.searchBar};
`;

const Container = styled.div`
  min-height: calc(90px - ${designSystem.dimensions.spacings.m} * 2);
  border: 1px solid ${designSystem.colors.light.borderSecondary};
  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    padding: ${designSystem.dimensions.spacings.s};
  }
  padding: ${designSystem.dimensions.spacings.m};
  border-radius: 0 0 ${designSystem.tokens.borderRadiusForChildSectionNav}
    ${designSystem.tokens.borderRadiusForChildSectionNav};
  columns: auto ${designSystem.dimensions.widths.pageNavigationSmall};
  column-gap: ${designSystem.dimensions.spacings.l};
`;
const ColumnContainer = styled.div`
  break-inside: avoid-column;
  margin-bottom: ${designSystem.dimensions.spacings.s};
`;
const ChildrenContainer = styled.div`
  padding: 0 ${designSystem.dimensions.spacings.m};
  margin-top: ${designSystem.dimensions.spacings.s};
`;
const Link = styled.a`
  height: ${designSystem.dimensions.heights.childSectionNavLink};
  display: flex;
  align-items: center;
  padding-left: ${designSystem.dimensions.spacings.s};
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  color: ${designSystem.colors.light.textSecondary};
  text-decoration: none;
  overflow-wrap: break-word;
  :hover {
    color: ${designSystem.colors.light.linkNavigation};
    background-color: ${designSystem.colors.light.surfaceSecondary1};
  }
  :hover,
  :active {
    outline-width: 0;
  }
`;

const SectionNavigation = (props) => {
  const item = props.tocNode;
  return (
    <>
      <Link href={item.url}>{item.title}</Link>
      {item.items && (
        <ChildrenContainer>
          <SpacingsStack scale="s">
            {item.items.map((subitem, index) => (
              <SectionNavigation key={index} tocNode={subitem} />
            ))}
          </SpacingsStack>
        </ChildrenContainer>
      )}
    </>
  );
};
const itemType = {
  url: PropTypes.string,
  title: PropTypes.string,
};
const itemsType = PropTypes.arrayOf(
  PropTypes.shape({
    ...itemType,
    items: PropTypes.arrayOf(PropTypes.shape(itemType)),
  })
);
SectionNavigation.propTypes = {
  tocNode: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    items: itemsType,
  }),
};

const ChildSectionsNav = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const pageData = usePageData();
  const sectionToC = skipEmptyLevels(
    findCurrentSection(props.parent, pageData.tableOfContents)
  );
  const filteredSectionToCList = sectionToC.items.filter(
    (item) =>
      !searchValue ||
      item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const isValid = sectionToC && sectionToC.items && sectionToC.items.length > 0;
  return (
    <div>
      <SearchBoxContainer>
        <SearchBox>
          <SearchInputIcon position="left">
            <SearchIcon size="medium" />
          </SearchInputIcon>
          {searchValue !== '' ? (
            <SearchInputIcon position="right">
              <SecondaryIconButton
                label="Reset input"
                onClick={() => setSearchValue('')}
                icon={<CloseIcon size="medium" />}
              />
            </SearchInputIcon>
          ) : null}
          <SearchInput
            type="text"
            id="searchInput"
            aria-label="Search"
            value={searchValue || ''}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </SearchBox>
      </SearchBoxContainer>
      <Container>
        {isValid ? (
          filteredSectionToCList.map((item, index) => {
            return (
              <ColumnContainer key={index}>
                <SectionNavigation tocNode={item} />
              </ColumnContainer>
            );
          })
        ) : (
          <ContentNotifications.Warning>
            Content Error: Section ID <code>{props.parent}</code> not found.
            Please pass a valid Section ID as the parent property and make sure
            it has child sections.
          </ContentNotifications.Warning>
        )}
      </Container>
    </div>
  );
};
ChildSectionsNav.propTypes = {
  parent: PropTypes.string.isRequired,
};

function findCurrentSection(parentId, toc) {
  if (toc.url === `#${parentId}`) {
    return toc;
  }
  if (Array.isArray(toc.items)) {
    let result = null;
    for (let i = 0; result == null && i < toc.items.length; i += 1) {
      result = findCurrentSection(parentId, toc.items[i]);
    }
    return result;
  }
  return null;
}

function skipEmptyLevels(toc) {
  if (toc && toc.items && toc.items.length === 1 && !toc.items[0].title) {
    return skipEmptyLevels(toc.items[0]);
  }
  return toc;
}

export default ChildSectionsNav;
