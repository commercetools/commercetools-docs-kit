import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { designSystem, ContentNotifications } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { usePageToc } from '../hooks/use-page-toc';

const Container = styled.div`
  border: 1px solid ${designSystem.colors.light.borderSecondary};
  padding: ${designSystem.dimensions.spacings.m};
  border-radius: ${designSystem.tokens.borderRadiusForChildSectionNav};
  columns: auto ${designSystem.dimensions.widths.pageNavigationSmall};
  column-gap: ${designSystem.dimensions.spacings.l};
`;
const ColumnContainer = styled.div`
  margin-bottom: ${designSystem.dimensions.spacings.s};
  break-inside: avoid-column;
`;
const ChildrenContainer = styled.div`
  padding: 0 ${designSystem.dimensions.spacings.m};
  margin-top: ${designSystem.dimensions.spacings.s};
`;
const Link = styled.a`
  display: block;
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  color: ${designSystem.colors.light.textSecondary};
  text-decoration: none;
  overflow-wrap: break-word;
  :hover {
    color: ${designSystem.colors.light.linkNavigation};
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
  const sectionToC = skipEmptyLevels(
    findCurrentSection(props.parent, usePageToc())
  );
  const isValid = sectionToC && sectionToC.items && sectionToC.items.length > 0;
  return (
    <Container>
      {isValid ? (
        sectionToC.items.map((item, index) => (
          <ColumnContainer key={index}>
            <SectionNavigation tocNode={item} />
          </ColumnContainer>
        ))
      ) : (
        <ContentNotifications.Warning>
          Content Error: Section ID <code>{props.parent}</code> not found.
          Please pass a valid Section ID as the parent property and make sure it
          has child sections.
        </ContentNotifications.Warning>
      )}
    </Container>
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
