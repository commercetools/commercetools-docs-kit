import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { SafeHTMLElement, designSystem } from '@commercetools-docs/ui-kit';
import useActiveSection from '../../hooks/use-active-section';

const itemType = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
const itemsType = PropTypes.arrayOf(
  PropTypes.shape({
    ...itemType,
    items: PropTypes.arrayOf(PropTypes.shape(itemType)),
  })
);

const getIsActive = (activeSection, urlHash) =>
  activeSection &&
  activeSection.id.replace('section-', '') === urlHash.substring(1);

const Link = styled.a`
  font-size: ${props => {
    switch (props.level) {
      case 1:
        return designSystem.typography.fontSizes.small;
      default:
        return designSystem.typography.fontSizes.extraSmall;
    }
  }};
  color: ${props => {
    if (props.isActive) {
      return designSystem.colors.light.linkNavigation;
    }
    switch (props.level) {
      case 1:
        return designSystem.colors.light.textPrimary;
      default:
        return designSystem.colors.light.textSecondary;
    }
  }};
  text-decoration: none;
  border-left: ${props => {
    if (props.isActive) {
      return `1px solid ${designSystem.colors.light.linkNavigation}`;
    }
    return '1px solid transparent';
  }};
  :hover {
    color: ${designSystem.colors.light.linkNavigation};
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
  padding: ${props => {
    switch (props.level) {
      case 3:
        return `0 ${designSystem.dimensions.spacings.xl}`;
      default:
        return `0 ${designSystem.dimensions.spacings.m}`;
    }
  }};
`;
const LevelGroup = props => {
  if (!props.items) {
    return null;
  }
  return (
    <Group level={props.level}>
      {props.items.map((item, subItemIndex) => {
        const isActive = getIsActive(props.activeSection, item.url);
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
};
const Container = props => (
  <SpacingsStack scale="s">
    {props.items.map((item, index) => {
      const level = 1;
      const isActive = getIsActive(props.activeSection, item.url);
      return (
        <SpacingsStack scale="s" key={index}>
          <Link
            href={item.url}
            level={level}
            role={`level-${level}`}
            isActive={isActive}
            aria-current={isActive}
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
};

const PageNavigation = props => {
  const activeSection = useActiveSection();
  return (
    <Container
      items={props.tableOfContents.items}
      activeSection={activeSection}
    >
      <LevelGroup>
        <LevelGroup />
      </LevelGroup>
    </Container>
  );
};
PageNavigation.displayName = 'PageNavigation';
PageNavigation.propTypes = {
  tableOfContents: PropTypes.shape({
    items: itemsType,
  }),
};

export default PageNavigation;
