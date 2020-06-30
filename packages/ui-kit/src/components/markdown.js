import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import RibbonIcon from '../icons/ribbon-icon.svg';
import { colors, dimensions, typography, tokens } from '../design-system';
import {
  CodeBlockMarkdownWrapper as CodeBlock,
  Container as CodeBlockContainer,
} from './multi-code-block';

const headerStyles = () => css`
  line-height: 1.3;
`;

const Paragraph = styled.p`
  margin: 0;
`;
const H1 = styled.h1`
  ${headerStyles};
  font-size: ${typography.fontSizes.h1};
  font-weight: ${typography.fontWeights.regular};
  line-height: 1.15;
  color: ${(props) => props.theme.colors.light.primary};

  /* H1 is the page title and used outside the Typography wrappers so it directly has a margin */
  margin: 0 0 ${dimensions.spacings.s};
`;
const H2 = styled.h2`
  ${headerStyles};
  font-size: ${typography.fontSizes.h2};
  font-weight: ${typography.fontWeights.bold};
  border-bottom: 1px solid ${colors.light.borderPrimary};
  padding-bottom: ${dimensions.spacings.s};
  max-width: 100% !important;
`;
const H3 = styled.h3`
  ${headerStyles};
  font-size: ${typography.fontSizes.h3};
  font-weight: ${typography.fontWeights.medium};
`;
const H4 = styled.h4`
  ${headerStyles};
  font-size: ${typography.fontSizes.h4};
  font-weight: ${typography.fontWeights.medium};
`;
const H5 = styled.h5`
  ${headerStyles};
  font-size: ${typography.fontSizes.h5};
  font-weight: ${typography.fontWeights.regular};
`;
const H6 = styled.h6`
  ${headerStyles};
  font-size: ${typography.fontSizes.h6};
  font-weight: ${typography.fontWeights.regular};
  line-height: 1.4;
`;

/*
The "container" styles have to be applied to containers that render markdown inside a surrounding
visual box like a blockquote, notification box, card, or Subtitle.
Heading margins are not set here because headings can and should not be used inside such containers.
*/
const containerStyles = () => css`
  > * + * {
    margin-top: ${dimensions.spacings.m};
  }
`;

const ThematicBreak = styled.hr`
  display: none;
`;
const Blockquote = styled.blockquote`
  ${containerStyles};
  background-color: ${colors.light.surfaceQuote};
  border-left: 1px solid ${colors.light.borderHighlight};
  border-radius: 0 ${tokens.borderRadiusForBlockquote}
    ${tokens.borderRadiusForBlockquote} 0;
  color: ${colors.light.textFaded};
  font-size: ${typography.fontSizes.small};
  padding: ${dimensions.spacings.xs} ${dimensions.spacings.s};
`;
const Ul = styled.ul`
  padding-left: ${dimensions.spacings.xl};
  list-style-type: disc;
  > * + * {
    margin-top: ${dimensions.spacings.s};
  }
`;
const Ol = styled.ol`
  padding-left: ${dimensions.spacings.xl};
  > * + * {
    margin-top: ${dimensions.spacings.s};
  }
`;
const Li = styled.li`
  ${containerStyles};
  line-height: 1.46;

  > ul,
  > ol {
    margin: ${dimensions.spacings.s} 0 ${dimensions.spacings.m};
  }
  > ul {
    list-style-type: circle;
  }
`;
const Dl = styled.dl`
  > dd + * {
    margin: ${dimensions.spacings.m} 0 0;
  }
`;
const Dt = styled.dt`
  color: ${colors.light.textSecondary};
`;
const Dd = styled.dd`
  ${containerStyles}
  padding: 0 0 0 ${dimensions.spacings.l};

  > * + * {
    margin: ${dimensions.spacings.m} 0 0;
  }
`;
const Table = styled.table`
  border: 1px solid ${colors.light.borderPrimary};
  border-top: 2px solid ${colors.light.borderPrimary};
  border-collapse: collapse;
  font-size: ${typography.fontSizes.body};
  margin: 0;
  max-width: 100% !important;
  tbody {
    border-top: 2px solid ${colors.light.borderPrimary};
  }
  thead tr {
    background: ${colors.light.surfacePrimary} !important;
  }

  @media screen and (${dimensions.viewports.mobile}) {
    display: block;
    tbody {
      display: block;
    }
    thead {
      display: block;
    }
    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
    ${(props) => {
      const tableHeaders = React.Children.toArray(props.children).find(
        (elem) => elem.type === 'thead' || elem.props.mdxType === 'thead'
      );
      if (!tableHeaders) return null;
      const rowHeaders = tableHeaders.props.children;
      const rowHeadersChildren = Array.isArray(rowHeaders)
        ? rowHeaders
        : rowHeaders.props.children;
      return React.Children.toArray(rowHeadersChildren).reduce(
        (styles, elem, index) => `
        ${styles}
        td:nth-of-type(${index + 1})::before { content: "${
          elem.props.children
        }"; }
      `,
        ''
      );
    }}
  }
`;
const TableRow = styled.tr`
  &:nth-of-type(odd) {
    background: ${colors.light.surfaceSecondary1};
  }
  &:nth-of-type(even) {
    background: ${colors.light.surfacePrimary};
  }

  > * + * {
    border-left: 1px solid ${colors.light.borderPrimary};
  }

  @media screen and (${dimensions.viewports.mobile}) {
    display: block;
    border: 1px solid ${colors.light.borderPrimary};
  }
`;
const TableCell = styled.td`
  ${containerStyles};
  border-bottom: 1px solid ${colors.light.borderPrimary};
  font-size: ${typography.fontSizes.small};
  padding: ${dimensions.spacings.s};
  white-space: pre-wrap;
  vertical-align: top;
  text-align: ${(props) => props.align || 'left'};

  @media screen and (${dimensions.viewports.mobile}) {
    display: block;
    border: none;
    border-bottom: 1px solid ${colors.light.borderPrimary};

    ::before {
      display: flex;
      font-weight: ${typography.fontWeights.bold};
    }
  }
`;
const TableHeader = styled.th`
  ${containerStyles};
  font-size: ${typography.fontSizes.small};
  padding: ${dimensions.spacings.s};
  text-align: left;

  @media screen and (${dimensions.viewports.mobile}) {
    display: block;
  }
`;
const InlineCode = styled.code`
  background-color: ${colors.light.surfaceInlineCode};
  border: 1px solid ${colors.light.surfaceInfo};
  border-radius: ${dimensions.spacings.xs};
  color: ${colors.light.textCode};
  font-family: ${typography.fontFamilies.code};
  font-size: ${typography.fontSizes.small};
  padding: 0 ${dimensions.spacings.xs};
`;

const Em = styled.em``;
const Strong = styled.strong``;
const Delete = styled.span`
  text-decoration: line-through;
`;
const Hr = styled(ThematicBreak)``;

const TypographyPage = styled.div`
  font-family: ${typography.fontFamilies.primary};
  font-size: ${typography.fontSizes.body};
  font-weight: ${typography.fontWeights.regular};
  line-height: 1.5;

  section > * + * {
    margin-top: ${dimensions.spacings.m};
  }

  .section-h4,
  .section-h5,
  .section-h6,
  .section-h7 {
    padding: 0 0 0 ${dimensions.spacings.l};
  }

  section > ${H2} {
    margin: ${dimensions.spacings.huge} 0 ${dimensions.spacings.m};
  }
  section > ${H3} {
    margin: ${dimensions.spacings.big} 0 0;
  }
  section > ${H4} {
    margin: ${dimensions.spacings.xl} 0 0;
  }
  section > ${H5} {
    margin: ${dimensions.spacings.xl} 0 0;
  }
  section > ${H6} {
    margin: ${dimensions.spacings.m} 0 ${dimensions.spacings.s};
  }
  section > ${Blockquote} {
    margin: ${dimensions.spacings.l} ${dimensions.spacings.xxl};
  }
  section > ${Ul}, section > ${Ol} {
    margin-bottom: ${dimensions.spacings.xxl};
  }
  section > ${CodeBlockContainer} {
    margin-bottom: ${dimensions.spacings.xxl};
  }
`;

const TypographyContainer = styled.div`
  ${containerStyles};
`;

/* eslint-disable react/display-name,react/prop-types */
const withAnchorLink = (Component) => (props) => {
  return (
    <Component
      {...props}
      css={css`
        display: flex;
        align-items: baseline;
        :hover {
          [data-link-type='anchor-link'] {
            svg {
              * {
                fill: ${colors.light.linkNavigation};
              }
            }
          }
        }
        > * + * {
          margin: 0 0 0 ${dimensions.spacings.s};
        }
      `}
    >
      <span>{props.children}</span>
      <a href={`#${props.id}`} data-link-type="anchor-link">
        <RibbonIcon />
      </a>
    </Component>
  );
};
/* eslint-enable */

export {
  TypographyPage,
  TypographyContainer,
  Paragraph,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  ThematicBreak,
  Blockquote,
  Ul,
  Ol,
  Li,
  Dl,
  Dt,
  Dd,
  Table,
  TableRow,
  TableCell,
  TableHeader,
  InlineCode,
  CodeBlock,
  Em,
  Strong,
  Delete,
  Hr,
  withAnchorLink,
};
