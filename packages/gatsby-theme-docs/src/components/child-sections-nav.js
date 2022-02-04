import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  designSystem,
  ContentNotifications,
  createStyledIcon,
} from '@commercetools-docs/ui-kit';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
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
  font-size: ${designSystem.typography.fontSizes.body};
  height: ${designSystem.dimensions.heights.inputSearchPrimary};
  min-height: ${designSystem.dimensions.heights.inputSearchPrimary};
  outline: none;
  overflow: hidden;
  padding: 0
    calc(
      ${designSystem.dimensions.spacings.l} +
        ${designSystem.dimensions.spacings.s}
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
  z-index: ${designSystem.dimensions.stacks.base};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  ${(props) => `${props.position}: 0;`}
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
  padding: ${designSystem.dimensions.spacings.m}
    ${designSystem.dimensions.spacings.m} ${designSystem.dimensions.spacings.s}
    ${designSystem.dimensions.spacings.m};
  border-radius: 0 0 ${designSystem.tokens.borderRadiusForChildSectionNav}
    ${designSystem.tokens.borderRadiusForChildSectionNav};
  columns: auto ${designSystem.dimensions.widths.pageNavigationSmall};
  column-gap: ${designSystem.dimensions.spacings.l};
`;

const ColumnContainer = styled.div`
  margin-bottom: ${(props) =>
    props.hasSubSections
      ? designSystem.dimensions.spacings.l
      : designSystem.dimensions.spacings.s};
  break-inside: avoid-column;
  page-break-inside: avoid;
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  padding: ${designSystem.dimensions.spacings.xs}
    ${designSystem.dimensions.spacings.s};
  font-size: ${designSystem.typography.fontSizes.small};
  color: ${designSystem.colors.light.textSecondary};
  text-decoration: none;
  overflow-wrap: anywhere;
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
      {props.isSubItem ? (
        <Link href={item.url}>
          <SpacingsInline scale="xs">
            <div>-</div>
            <div>{item.title}</div>
          </SpacingsInline>
        </Link>
      ) : (
        <Link href={item.url}>{item.title}</Link>
      )}
      {item.items && (
        <>
          {item.items.map((subitem, index) => (
            <SectionNavigation key={index} tocNode={subitem} isSubItem />
          ))}
        </>
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
  isSubItem: PropTypes.bool,
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

  const filteredSectionToCList = [];
  sectionToC.items.forEach((item) => {
    let matchedItems = [];
    const filterItem = item.title.toLowerCase();
    const values = searchValue.toLowerCase().split(/\W+/);
    const results = values.map((term) => {
      if (term === '' || filterItem.includes(term)) {
        return true;
      }
      if (item.items) {
        item.items.forEach((subItem) => {
          const filterItem = subItem.title.toLowerCase();
          const subResults = values.map((term) => {
            if (term === '' || filterItem.includes(term)) {
              return true;
            }
            return false;
          });
          if (subResults.every(Boolean) && !matchedItems.includes(subItem)) {
            matchedItems.push(subItem);
          }
        });
        if (matchedItems.length > 0) {
          return true;
        }
        return false;
      }
      return false;
    });
    if (results.every(Boolean)) {
      if (matchedItems.length > 0) {
        const modifiedItem = {
          title: item.title,
          url: item.url,
          items: matchedItems,
        };
        filteredSectionToCList.push(modifiedItem);
      } else {
        filteredSectionToCList.push(item);
      }
    }
  });

  const isValid = sectionToC && sectionToC.items && sectionToC.items.length > 0;
  return (
    <div>
      <SearchBoxContainer>
        <SearchBox>
          <SearchInputIcon>
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
              <ColumnContainer key={index} hasSubSections={item.items}>
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
