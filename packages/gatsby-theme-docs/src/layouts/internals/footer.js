import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { designSystem } from '@commercetools-docs/ui-kit';
import LogoHorizontalSvg from '../../icons/logo-horizontal.svg';
import { Link, BetaFlag } from '../../components';

const Container = styled.footer`
  background-color: ${designSystem.colors.light.surfaceSecondary2};
`;
const ContentGrid = styled.div`
  width: 100%;
  position: relative;
  display: grid;
  grid:
    [row1-start] 'footer-main' 1fr [row1-end]
    / 1fr;

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    grid:
      [row1-start] 'footer-main footer-right-blank' 1fr [row1-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargings},
        ${designSystem.dimensions.widths.pageContentWithMargings}
      )
      1fr;
  }
  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    grid:
      [row1-start] 'footer-main footer-right-blank' 1fr [row1-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargings},
        ${designSystem.dimensions.widths.pageContentWithMargings}
      )
      minmax(${designSystem.dimensions.widths.pageNavigation}, 1fr);
  }
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    grid:
      [row1-start] 'footer-main footer-right-blank' 1fr [row1-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargings},
        ${designSystem.dimensions.widths.pageContentWithMargings}
      )
      minmax(${designSystem.dimensions.widths.pageNavigationSmall}, 1fr);
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid:
      [row1-start] 'footer-main footer-right-blank' 1fr [row1-end]
      / ${designSystem.dimensions.widths.pageContentWithMargings}
      minmax(${designSystem.dimensions.widths.pageNavigation}, 1fr);
  }
`;
const RightBlank = styled.div`
  grid-area: right-blank;
  display: none;

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    display: block;
  }
`;
const Center = styled.div`
  grid-area: footer-main;
  width: calc(100% - ${designSystem.dimensions.spacings.m} * 2);
  margin: ${designSystem.dimensions.spacings.l}
    ${designSystem.dimensions.spacings.m};

  > * + * {
    margin: ${designSystem.dimensions.spacings.l} 0 0;
    padding: ${designSystem.dimensions.spacings.l} 0 0;
    border-top: 1px solid ${designSystem.colors.light.borderSecondary};
  }

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    width: calc(100% - ${designSystem.dimensions.spacings.m});
    margin-right: 0;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: calc(100% - ${designSystem.dimensions.spacings.xl});
    margin-left: ${designSystem.dimensions.spacings.xl};
  }
`;
const Columns = styled.div`
  display: grid;
  grid-gap: ${designSystem.dimensions.spacings.xl};
  grid-auto-columns: 1fr;
  grid-template-columns: repeat(
    ${props => React.Children.count(props.children)},
    1fr
  );

  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    display: block;

    > * + * {
      border-top: 1px solid ${designSystem.colors.light.borderSecondary};
      padding: ${designSystem.dimensions.spacings.m} 0;
    }
  }
`;
const Column = styled.div``;
const SideColumn = styled(Column)`
  border-left: 1px solid ${designSystem.colors.light.borderSecondary};
  padding-left: ${designSystem.dimensions.spacings.xl};

  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    border-left: unset;
    padding-left: unset;
  }
`;
const ColumnTitle = styled.div`
  color: ${designSystem.colors.light.textPrimary};
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  font-weight: ${designSystem.typography.fontWeights.bold};
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
      fill: ${designSystem.colors.light.textPrimary} !important;
    }
  }

  :hover {
    color: ${designSystem.colors.light.linkNavigation} !important;

    svg {
      * {
        fill: ${designSystem.colors.light.linkNavigation} !important;
      }
    }
  }
`;
const Row = styled.div`
  display: grid;
  grid-gap: ${designSystem.dimensions.spacings.xl};
  grid-auto-columns: 1fr;
  grid-template-columns: repeat(
    ${props => React.Children.count(props.children)},
    1fr
  );

  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    grid-gap: ${designSystem.dimensions.spacings.m};
    grid-template-columns: 1fr;
  }
`;
const CopyText = styled.div`
  font-size: ${designSystem.typography.fontSizes.extraSmall};
`;
const AlignedRight = styled.div`
  text-align: right;

  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    text-align: unset;
  }
`;

const LayoutFooter = () => {
  const data = useStaticQuery(graphql`
    query GetFooterLinks {
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
      <ContentGrid>
        <Center>
          <Columns>
            <Column>
              <LogoHorizontalSvg />
            </Column>
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
                  <MenuLink href={node.href} key={node.id}>
                    {node.label}
                  </MenuLink>
                ))}
              </SpacingsStack>
            </SideColumn>
          </Columns>
          <Row>
            <SpacingsInline scale="m" alignItems="center">
              <CopyText>
                {'Copyright '}&copy;
                {` ${new Date().getFullYear()} commercetools`}
              </CopyText>
            </SpacingsInline>
            <AlignedRight>
              <MenuLink href="https://commercetools.com/privacy">
                {'Privacy Policy'}
              </MenuLink>
              {` | `}
              <MenuLink href="https://commercetools.com/imprint">
                {'Imprint'}
              </MenuLink>
            </AlignedRight>
          </Row>
        </Center>
        <RightBlank />
      </ContentGrid>
    </Container>
  );
};

export default LayoutFooter;
