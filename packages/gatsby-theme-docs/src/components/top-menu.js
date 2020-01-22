import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { designSystem } from '@commercetools-docs/ui-kit';
import Link from './link';
import BetaFlag from './beta-flag';

const Container = styled.div`
  width: 100%;
  max-width: 100vw;

  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    overflow: auto;
  }
`;
const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background-color: ${designSystem.colors.light.surfacePrimary};
  box-shadow: ${designSystem.tokens.shadowForSearchDialog};
  margin: 0;
  padding: 0;

  /* stylelint-disable declaration-block-no-duplicate-properties */
  height: 100%; /* For browsers that do not support this property yet */
  height: fit-content;
  /* stylelint-enable */
`;
const ContentGrid = styled.div`
  width: 100%;
  position: relative;
  display: grid;
  grid:
    [row1-start] 'menu-main' 1fr [row1-end]
    / 1fr;

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    grid:
      [row1-start] 'menu-left-blank menu-main' 1fr [row1-end]
      / 123px 1fr;
  }
  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    grid:
      [row1-start] 'menu-left-blank menu-main' 1fr [row1-end]
      / 123px minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargings},
        ${designSystem.dimensions.widths.pageContentWithMargings}
      );
  }
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    grid:
      [row1-start] 'menu-left-blank menu-main' 1fr [row1-end]
      / ${designSystem.dimensions.widths.pageNavigationSmall} minmax(${designSystem.dimensions.widths.pageContentSmallWithMargings}, ${designSystem.dimensions.widths.pageContentWithMargings});
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid:
      [row1-start] 'menu-left-blank menu-main' 1fr [row1-end]
      / ${designSystem.dimensions.widths.pageNavigation} ${designSystem.dimensions.widths.pageContentWithMargings};
  }
`;
const LeftBlank = styled.div`
  grid-area: menu-left-blank;
`;
const Center = styled.div`
  grid-area: menu-main;
`;
const Columns = styled.div`
  display: grid;
  grid-gap: ${designSystem.dimensions.spacings.xl};
  grid-auto-columns: 1fr;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    display: block;

    > * + * {
      border-top: 1px solid ${designSystem.colors.light.borderSecondary};
    }
  }
`;
const Column = styled.div`
  padding: ${designSystem.dimensions.spacings.xl} 0;

  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    padding: ${designSystem.dimensions.spacings.m};
  }
`;
const SideColumn = styled(Column)`
  border-left: 1px solid ${designSystem.colors.light.borderSecondary};
  padding-left: ${designSystem.dimensions.spacings.xl};

  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    border-left: unset;
    padding-left: ${designSystem.dimensions.spacings.m};
  }
`;
const ColumnTitle = styled.div`
  color: ${designSystem.colors.light.textFaded};
  border-bottom: 1px solid ${designSystem.colors.light.borderSecondary};
  padding: 0 0 ${designSystem.dimensions.spacings.s} 0;

  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    border-bottom: unset;
  }
`;
const MenuLink = styled(Link)`
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  line-height: 1.75;
  color: ${designSystem.colors.light.textPrimary} !important;
  text-decoration: none;

  svg {
    * {
      fill: ${designSystem.colors.light.textPrimary};
    }
  }

  :hover {
    color: ${designSystem.colors.light.linkNavigation} !important;

    svg {
      * {
        fill: ${designSystem.colors.light.linkNavigation};
      }
    }
  }
`;
const SideMenuLink = styled(MenuLink)`
  color: ${designSystem.colors.light.textFaded} !important;

  svg {
    * {
      fill: ${designSystem.colors.light.textFaded};
    }
  }
`;

const TopMenu = () => {
  const data = useStaticQuery(graphql`
    query GetTopMenuLinks {
      allTopMenuYaml {
        nodes {
          id
          menuTitle
          items {
            label
            href
            beta
          }
        }
      }
      allTopSideMenuYaml {
        nodes {
          id
          label
          href
        }
      }
    }
  `);

  return (
    <Container>
      <Content
        onClick={event => {
          // Prevent overlay to close when clicking on the content area.
          event.stopPropagation();
        }}
      >
        <ContentGrid>
          <LeftBlank />
          <Center>
            <Columns>
              {data.allTopMenuYaml.nodes.map(node => (
                <Column key={node.id}>
                  <SpacingsStack scale="s">
                    <ColumnTitle>{node.menuTitle}</ColumnTitle>
                    {node.items.map((item, index) => (
                      <SpacingsInline
                        alignItems="center"
                        key={`${node.id}-${index}`}
                      >
                        <MenuLink href={item.href}>{item.label}</MenuLink>
                        {item.beta === true ? <BetaFlag /> : null}
                      </SpacingsInline>
                    ))}
                  </SpacingsStack>
                </Column>
              ))}
              <SideColumn>
                <SpacingsStack scale="s">
                  {data.allTopSideMenuYaml.nodes.map(node => (
                    <SideMenuLink href={node.href} key={node.id}>
                      {node.label}
                    </SideMenuLink>
                  ))}
                </SpacingsStack>
              </SideColumn>
            </Columns>
          </Center>
        </ContentGrid>
      </Content>
    </Container>
  );
};

export default TopMenu;
