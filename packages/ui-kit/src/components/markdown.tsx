import React from 'react';
import reactIs from 'react-is';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Tooltip from '@commercetools-uikit/tooltip';
import { ClipboardIcon } from '@commercetools-uikit/icons';
import { colors, dimensions, typography, tokens } from '../design-system';
import { CodeBlockMarkdownWrapper as CodeBlock } from './multi-code-block';
import copyToClipboard from '../utils/copy-to-clipboard';

/**
 * Recursively traverse the DOM tree starting from the given element,
 * looking for the first non-react element.
 */
const discoverLeafReactElement = (
  elem: React.ReactChild | React.ReactFragment | React.ReactPortal
) => {
  let leafElem = elem;
  while (reactIs.isElement(leafElem)) {
    leafElem = leafElem.props.children;
  }
  return leafElem;
};

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
  color: ${tokens.websitePrimaryColor};

  /* H1 is the page title and used outside the Typography wrappers so it directly has a margin */
  margin: 0 0 ${dimensions.spacings.s};
`;
const H2 = styled.h2`
  ${headerStyles};
  font-size: ${typography.fontSizes.h2};
  font-weight: ${typography.fontWeights.bold};
  border-bottom: 1px solid ${colors.light.borderPrimary};
  padding-bottom: ${dimensions.spacings.s};
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

const ThematicBreak = styled.hr`
  display: none;
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
  > li > ol {
    list-style-type: lower-alpha;
  }
  > li > ol > li > ol {
    list-style-type: lower-roman;
  }
`;
const Dl = styled.dl`
  > * + dt {
    margin: ${dimensions.spacings.s} 0 0;
  }
  > * + dd {
    margin: ${dimensions.spacings.xs} 0 0;
  }
`;
const Dt = styled.dt`
  color: ${colors.light.textSecondary};
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
  > * + ${Ul}, > * + ${Ol}, > * + ${Dl} {
    margin-top: ${dimensions.spacings.s};
  }
`;

const Dd = styled.dd`
  ${containerStyles}
  padding: 0 0 0 ${dimensions.spacings.l};

  > * + * {
    margin: ${dimensions.spacings.s} 0;
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

// @ts-ignore
const Table = styled.table`
  width: 100%;
  border: 1px solid ${colors.light.borderPrimary};
  border-top: 2px solid ${colors.light.borderPrimary};
  border-collapse: collapse;
  font-size: ${typography.fontSizes.body};
  margin: 0;
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
        (elem) =>
          reactIs.isElement(elem) &&
          (elem.type === 'thead' || elem.props.mdxType === 'thead')
      );
      if (!tableHeaders) return null;
      const rowHeaders =
        reactIs.isElement(tableHeaders) && tableHeaders.props.children;
      const rowHeadersChildren = Array.isArray(rowHeaders)
        ? rowHeaders
        : rowHeaders.props.children;
      return React.Children.toArray(rowHeadersChildren).reduce(
        (styles, elem, index) => `
        ${styles}
        td:nth-of-type(${
          index + 1
        })::before { content: "${discoverLeafReactElement(elem)}"; }
      `,
        ''
      ) as string;
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
  border: 1px solid ${colors.light.borderSecondary};
  color: ${colors.light.textPrimary};
  border-radius: ${dimensions.spacings.xs};
  font-family: ${typography.fontFamilies.primary};
  font-feature-settings: 'salt', 'tnum', 'ss02';
  letter-spacing: 0;
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

  section > p > img,
  section > img {
    display: block;
    position: relative;
    padding: 0 ${dimensions.spacings.s};
    margin: ${dimensions.spacings.m} auto;
  }

  section > * + * {
    margin-top: ${dimensions.spacings.m};
  }

  section:first-of-type > *:first-child {
    margin-top: 0 !important;
  }

  section > ${H2} + *,
  section > ${H3} + *,
  section > ${H4} + *,
  section > ${H5} + *,
  section > ${H6} + * {
    margin-top: ${dimensions.spacings.s};
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
    margin: ${dimensions.spacings.xl} 0 0;
  }
  section > ${H4} {
    margin: ${dimensions.spacings.l} 0 0;
  }
  section > ${H5} {
    margin: ${dimensions.spacings.l} 0 0;
  }
  section > ${H6} {
    margin: ${dimensions.spacings.m} 0 ${dimensions.spacings.s};
  }
  section > ${Blockquote} {
    margin: ${dimensions.spacings.l} ${dimensions.spacings.xxl};
  }
  section > ${Ul}, section > ${Ol}, section > ${Dl} {
    margin-top: ${dimensions.spacings.s};
  }
`;

const TypographyContainer = styled.div`
  ${containerStyles};
`;

const CopyArea = styled.div`
  cursor: pointer;
`;

const TooltipBodyComponent = styled.div`
  background-color: ${colors.light.surfaceCodeCopy};
  color: ${colors.light.textInverted};
  font-weight: ${typography.fontWeights.regular};
  border-radius: ${tokens.borderRadiusForTooltip};
  font-size: ${typography.fontSizes.extraSmall};
  padding: ${dimensions.spacings.xs} ${dimensions.spacings.s};
`;

/* eslint-disable react/display-name */
const withCopyToClipboard =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Component: React.ComponentType) => (props: any) => {
    const [isCopiedToClipboard, setIsCopiedToClipboard] = React.useState(false);
    const handleCopyToClipboardClick = (event: React.SyntheticEvent) => {
      event.preventDefault();
      const sectionUrl = `${window.location.href.split('#')[0]}#${props.id}`;
      copyToClipboard(sectionUrl);
      setIsCopiedToClipboard(true);
    };

    const handleTooltipClose = () => {
      setIsCopiedToClipboard(false);
    };
    return (
      <Component
        {...props}
        css={css`
          display: flex;
          align-items: baseline;
          :hover {
            div {
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
        <Tooltip
          title={isCopiedToClipboard ? 'Copied' : 'Copy link to clipboard'}
          placement="right"
          components={{ BodyComponent: TooltipBodyComponent }}
          onClose={handleTooltipClose}
        >
          <CopyArea onClick={handleCopyToClipboardClick}>
            <ClipboardIcon />
          </CopyArea>
        </Tooltip>
      </Component>
    );
  };

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
  withCopyToClipboard,
};
