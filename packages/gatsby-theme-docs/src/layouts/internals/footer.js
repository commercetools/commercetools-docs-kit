import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { designSystem, MediaQuery, Icons } from '@commercetools-docs/ui-kit';
import { GlobalNavigationLink, BetaTag } from '../../components';

const Center = styled.div`
  grid-area: footer-main;
  width: 100%;
  margin: 0;

  > * + * {
    margin: ${designSystem.dimensions.spacings.l} 0 0;
    padding: ${designSystem.dimensions.spacings.l} 0 0;
    border-top: 1px solid ${designSystem.colors.light.borderSecondary};
  }

  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    > * + * {
      margin: 0;
      padding: 0;
      border-top: none;
    }
  }
  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    width: calc(100% - ${designSystem.dimensions.spacings.m} * 2);
    margin: ${designSystem.dimensions.spacings.l}
      ${designSystem.dimensions.spacings.m};
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
    ${(props) => React.Children.count(props.children)},
    1fr
  );

  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    display: block;

    > * + * {
      border-bottom: 1px solid ${designSystem.colors.light.borderSecondary};
      padding: ${designSystem.dimensions.spacings.m};
    }
  }
`;
const Column = styled.div``;
const SideColumn = styled(Column)`
  border-left: 1px solid ${designSystem.colors.light.borderSecondary};
  padding-left: ${designSystem.dimensions.spacings.xl};

  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    border-left: unset;
    padding: ${designSystem.dimensions.spacings.m};
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
const Row = styled.div`
  display: grid;
  grid:
    [row1-start] 'footer-copy footer-links' auto [row1-end]
    / 1fr 1fr;

  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    grid:
      [row1-start] 'footer-links' auto [row1-end]
      [row2-start] 'footer-copy' auto [row2-end]
      / 1fr;
  }
`;
const RowItem = styled.div`
  grid-area: ${(props) => props.gridArea};
  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    padding: ${designSystem.dimensions.spacings.m};
  }
`;
const CopyText = styled.div`
  font-size: ${designSystem.typography.fontSizes.extraSmall};
`;
const AlignedRight = styled.div`
  text-align: right;

  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    text-align: unset;
    > * + * {
      display: block;
      margin: ${designSystem.dimensions.spacings.s} 0 0;
    }
  }
  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    > * + * {
      ::before {
        content: '|';
        margin: 0 ${designSystem.dimensions.spacings.s};
      }
    }
  }
`;

const LayoutFooter = () => {
  const data = useStaticQuery(graphql`
    query GetFooterLinks {
      allTopSideMenuYaml {
        nodes {
          id
          label
          href
        }
      }
      allFooterYaml {
        nodes {
          id
          label
          href
        }
      }
    }
  `);

  /**
   * The footer changes the layout a bit on mobile screens, as the position
   * of some elements is different. This includes for example the logo, the
   * copyright and the privacy/imprint links.
   * To make this work, we need to do a couple of things:
   * - use the `<MediaQuery>` component to show/hide certain elements based
   *   on the viewport
   * - render some elements using css grid with area names, so we can place
   *   the elements in the grid layout as we like
   */
  return (
    <Center>
      <Columns>
        <Column>
          <MediaQuery forViewport="tablet">
            <Icons.LogoHorizontalSvgIcon />
          </MediaQuery>
        </Column>
        {/* {data.allTopMenuYaml.nodes.map((node) => (
          <Column key={node.id}>
            <SpacingsStack scale="s">
              <ColumnTitle>{node.menuTitle}</ColumnTitle>
              {node.items.map((item, index) => (
                <SpacingsInline alignItems="center" key={`${node.id}-${index}`}>
                  <GlobalNavigationLink href={item.href}>
                    {item.label}
                  </GlobalNavigationLink>
                  {item.beta === true ? <BetaTag /> : null}
                </SpacingsInline>
              ))}
            </SpacingsStack>
          </Column>
        ))} */}
        <SideColumn>
          <SpacingsStack scale="s">
            {data.allTopSideMenuYaml.nodes.map((node) => (
              <GlobalNavigationLink href={node.href} key={node.id}>
                {node.label}
              </GlobalNavigationLink>
            ))}
            <GlobalNavigationLink href="https://ok.commercetools.com/user-research-program">
              User Research Program
            </GlobalNavigationLink>
          </SpacingsStack>
        </SideColumn>
      </Columns>
      <Row>
        <RowItem gridArea="footer-copy">
          <SpacingsStack>
            <MediaQuery forViewport="mobile">
              <Icons.LogoHorizontalSvgIcon height={64} />
            </MediaQuery>
            <SpacingsInline scale="m" alignItems="center">
              <CopyText>
                {'Copyright '}&copy;
                {` ${new Date().getFullYear()} commercetools`}
              </CopyText>
            </SpacingsInline>
          </SpacingsStack>
        </RowItem>
        <RowItem gridArea="footer-links">
          <AlignedRight>
            {data.allFooterYaml.nodes.map((node) => (
              <GlobalNavigationLink href={node.href} key={node.id}>
                {node.label}
              </GlobalNavigationLink>
            ))}
          </AlignedRight>
        </RowItem>
      </Row>
    </Center>
  );
};

export default LayoutFooter;
