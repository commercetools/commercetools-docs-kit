import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import {
  SafeHTMLElement,
  designSystem,
  ContentNotifications,
} from '@commercetools-docs/ui-kit';
import useActiveSection from '../../hooks/use-active-section';

const itemsType = PropTypes.arrayOf(
  PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string,
      })
    ),
  })
);

function flatten(items) {
  return items.reduce((acc, item) => {
    const itemCopy = { ...item };
    let newAcc = acc.concat(itemCopy);
    if (itemCopy.items) {
      newAcc = newAcc.concat(flatten(itemCopy.items));
    }
    return newAcc;
  }, []);
}

const getIsActive = (activeSection, item, recursive = false) => {
  if (!activeSection) return false;

  let itemAndChildUrls;

  if (item.items && recursive) {
    const flattenedItems = flatten(item.items);
    const flattenedItemUrls = flattenedItems.map((flatChild) => flatChild.url);
    itemAndChildUrls = [item.url, ...flattenedItemUrls];
  } else {
    itemAndChildUrls = [item.url];
  }

  return itemAndChildUrls.includes(
    `#${activeSection.id.replace('section-', '')}`
  );
};

const Link = styled.a`
  font-size: ${(props) => {
    switch (props.level) {
      case 1:
        return designSystem.typography.fontSizes.small;
      default:
        return designSystem.typography.fontSizes.extraSmall;
    }
  }};
  color: ${(props) => {
    if (props.isActive) {
      return designSystem.colors.light.linkHover;
    }
    switch (props.level) {
      case 1:
        return designSystem.colors.light.textPrimary;
      default:
        return designSystem.colors.light.textSecondary;
    }
  }};
  text-decoration: none;
  border-left: ${(props) => {
    if (props.isActive) {
      return `1px solid ${designSystem.colors.light.linkHover}`;
    }
    return '1px solid transparent';
  }};
  :hover {
    color: ${designSystem.colors.light.linkHover};
  }
  :hover,
  :active {
    outline-width: 0;
  }
`;
const Group = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-gap: ${designSystem.dimensions.spacings.s};

  /* Nested ul should get no padding */
  ul {
    padding: 0;
  }
`;
const ListItem = styled.li`
  display: grid;
  grid-gap: ${designSystem.dimensions.spacings.s};
`;
const Indented = styled.div`
  padding: ${(props) => {
    switch (props.level) {
      case 3:
        return `0 ${designSystem.dimensions.spacings.xl}`;
      default:
        return `0 ${designSystem.dimensions.spacings.m}`;
    }
  }};
`;
const LevelGroup = (props) => {
  if (
    !props.items ||
    /* only render children if they are not empty wrappers around deep levels that
  are not part of the index nav to prevent unnecessary spacing in the layout */
    (props.level >= props.navLevels &&
      props.items.length === 1 &&
      !props.items[0].title)
  ) {
    return null;
  }
  return (
    <Group level={props.level}>
      {props.items.map((item, subItemIndex) => {
        if (item.url) {
          const isActive = getIsActive(
            props.activeSection,
            item,
            /* recurse if last rendered level or containing an empty level below */
            props.level >= props.navLevels ||
              (item.items && item.items.length === 1 && !item.items[0].title)
          );
          return (
            <ListItem key={subItemIndex}>
              <Link
                href={item.url}
                level={props.level}
                role={`level-${props.level}`}
                isActive={isActive}
                aria-current={isActive}
              >
                <Indented level={props.level}>{item.title}</Indented>
              </Link>
              {props.children &&
                React.cloneElement(props.children, {
                  items: item.items,
                  level: props.level + 1,
                  activeSection: props.activeSection,
                })}
            </ListItem>
          );
        }
        console.warn(
          `The items in the table of contents are missing the heading for level ${props.level}. Please make sure to check the heading structure in the MDX content page.`
        );
        // Render the list without the link, but show an error message
        return (
          <ListItem key={subItemIndex}>
            <Indented level={props.level}>
              <ContentNotifications.Error>{`Missing heading for level ${props.level}`}</ContentNotifications.Error>
            </Indented>

            {props.children &&
              React.cloneElement(props.children, {
                items: item.items,
                level: props.level + 1,
                activeSection: props.activeSection,
              })}
          </ListItem>
        );
      })}
    </Group>
  );
};
LevelGroup.displayName = 'LevelGroup';
LevelGroup.propTypes = {
  level: PropTypes.oneOf([2, 3]),
  items: itemsType,
  activeSection: PropTypes.instanceOf(SafeHTMLElement),
  children: PropTypes.node,
  navLevels: PropTypes.number.isRequired,
};
const Container = (props) => (
  <SpacingsStack scale="m">
    {props.items.map((item, index) => {
      const level = 1;
      let skipsOneLevelOfNav;

      if (props.navLevels === 2) {
        skipsOneLevelOfNav = Boolean(
          item.items && !item.items[0].title && item.items[0].items
        );
      }

      if (props.navLevels === 3) {
        skipsOneLevelOfNav = Boolean(
          item.items &&
            item.items[0].items &&
            !item.items[0].items[0].title &&
            item.items[0].items[0].items
        );
      }

      const isActive = getIsActive(
        props.activeSection,
        item,
        skipsOneLevelOfNav
      );

      return (
        <SpacingsStack scale="s" key={index}>
          <Link
            href={item.url}
            level={level}
            role={`level-${level}`}
            isActive={isActive}
            aria-current={isActive && !skipsOneLevelOfNav}
          >
            <Indented level={1}>{item.title}</Indented>
          </Link>
          {props.children &&
            React.cloneElement(props.children, {
              items: item.items,
              activeSection: props.activeSection,
              level: 2,
            })}
        </SpacingsStack>
      );
    })}
  </SpacingsStack>
);
Container.displayName = 'Container';
Container.propTypes = {
  items: itemsType.isRequired,
  activeSection: PropTypes.instanceOf(SafeHTMLElement),
  children: PropTypes.node,
  navLevels: PropTypes.number.isRequired,
};

const PageNavigation = (props) => {
  const activeSection = useActiveSection();
  return (
    <Container
      items={props.tableOfContents.items}
      activeSection={activeSection}
      navLevels={props.navLevels}
    >
      {props.navLevels >= 2 && (
        <LevelGroup navLevels={props.navLevels}>
          {props.navLevels >= 3 && <LevelGroup navLevels={props.navLevels} />}
        </LevelGroup>
      )}
    </Container>
  );
};
PageNavigation.displayName = 'PageNavigation';
PageNavigation.propTypes = {
  tableOfContents: PropTypes.shape({
    items: itemsType,
  }),
  navLevels: PropTypes.number.isRequired,
};

export default PageNavigation;
