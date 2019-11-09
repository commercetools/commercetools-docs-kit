import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Spacings } from '../../components';
import { colors, dimensions, typography } from '../../design-system';
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

const isSelected = href =>
  href === (typeof window !== 'undefined' && window.location.hash);

const Link = styled.a`
  font-size: ${props => {
    switch (props.level) {
      case 1:
        return typography.fontSizes.small;
      default:
        return typography.fontSizes.extraSmall;
    }
  }};
  color: ${props => {
    if (props.isActive) {
      return colors.light.linkNavigation;
    }
    switch (props.level) {
      case 1:
        return colors.light.textPrimary;
      default:
        return colors.light.textSecondary;
    }
  }};
  text-decoration: none;
  border-left: ${props => {
    if (props.isActive && isSelected(props.href)) {
      return `1px solid ${colors.light.linkNavigation}`;
    }
    return '1px solid transparent';
  }};
  :hover {
    color: ${colors.light.linkNavigation};
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
  grid-gap: ${dimensions.spacings.s};

  /* Nested ul should get no padding */
  ul {
    padding: 0;
  }
`;
const ListItem = styled.li`
  display: grid;
  grid-gap: ${dimensions.spacings.s};
`;
const Indented = styled.div`
  padding: ${props => {
    switch (props.level) {
      case 3:
        return `0 0 0 ${dimensions.spacings.xl}`;
      default:
        return `0 0 0 ${dimensions.spacings.m}`;
    }
  }};
`;
const LevelGroup = props => {
  if (!props.items) {
    return null;
  }
  return (
    <Group level={props.level}>
      {props.items.map((item, subItemIndex) => (
        <ListItem key={subItemIndex}>
          <Link
            href={item.url}
            level={props.level}
            role={`level-${props.level}`}
            isActive={
              props.activeSection &&
              props.activeSection.id.replace('section-', '') ===
                item.url.substring(1)
            }
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
      ))}
    </Group>
  );
};
LevelGroup.displayName = 'LevelGroup';
LevelGroup.propTypes = {
  level: PropTypes.oneOf([2, 3]),
  items: itemsType,
  activeSection: PropTypes.instanceOf(Element),
  children: PropTypes.node,
};
const Container = props => (
  <Spacings.Stack scale="s">
    {props.items.map((item, index) => (
      <Spacings.Stack scale="s" key={index}>
        <Link
          href={item.url}
          level={1}
          role="level-1"
          isActive={
            props.activeSection &&
            props.activeSection.id.replace('section-', '') ===
              item.url.substring(1)
          }
        >
          <Indented level={1}>{item.title}</Indented>
        </Link>
        {props.children &&
          React.cloneElement(props.children, {
            items: item.items,
            activeSection: props.activeSection,
            level: 2,
          })}
      </Spacings.Stack>
    ))}
  </Spacings.Stack>
);
Container.displayName = 'Container';
Container.propTypes = {
  items: itemsType.isRequired,
  activeSection: PropTypes.instanceOf(Element),
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
