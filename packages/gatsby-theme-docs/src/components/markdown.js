import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Tooltip } from '@commercetools-frontend/ui-kit';
import ClipboardIcon from '../icons/clipboard-icon.svg';
import RibbonIcon from '../icons/ribbon-icon.svg';
import { colors, dimensions, typography, tokens } from '../design-system';
import copyToClipboard from '../utils/copy-to-clipboard';
import codeBlockParseOptions from '../utils/code-block-parse-options';
import codeBlockHighlightCode from '../utils/code-block-highlight-code';
import Link from './link';

const TypographyPage = styled.div`
  font-family: ${typography.fontFamilies.primary};
  font-size: ${typography.fontSizes.body};
  font-weight: ${typography.fontWeights.regular};
  line-height: 1.5;
  word-spacing: 2px;

  section > * + * {
    margin-top: ${dimensions.spacings.m};
  }
`;
const headerStyles = () => css`
  font-weight: ${typography.fontWeights.medium};
  line-height: 1.3;
  margin: ${dimensions.spacings.m} 0 ${dimensions.spacings.s};
`;

const Paragraph = styled.p`
  margin: 0;
`;
const H1 = styled.h1`
  ${headerStyles};
  font-size: ${typography.fontSizes.h1};
  margin: 0 0 ${dimensions.spacings.s};
  font-weight: ${typography.fontWeights.regular};
  line-height: 1.15;
  color: ${colors.light.primary};
`;
const H2 = styled.h2`
  ${headerStyles};
  border-bottom: 1px solid ${colors.light.borderPrimary};
  font-size: ${typography.fontSizes.h2};
  font-weight: ${typography.fontWeights.bold};
  margin: ${dimensions.spacings.xxxxl} 0 ${dimensions.spacings.xl};
  padding-bottom: ${dimensions.spacings.s};
`;
const H3 = styled.h3`
  ${headerStyles};
  font-size: ${typography.fontSizes.h3};
`;
const H4 = styled.h4`
  ${headerStyles};
  font-size: ${typography.fontSizes.h4};
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
const Blockquote = styled.blockquote`
  background-color: ${colors.light.surfaceQuote};
  border-left: 1px solid ${colors.light.borderHighlight};
  border-radius: 0 ${tokens.borderRadius6} ${tokens.borderRadius6} 0;
  color: ${colors.light.textFaded};
  font-size: ${typography.fontSizes.small};
  margin: ${dimensions.spacings.l} ${dimensions.spacings.xxl};
  padding: ${dimensions.spacings.xs} ${dimensions.spacings.s};

  > :first-of-type {
    margin-top: 0;
  }
  > :last-of-type {
    margin-bottom: 0;
  }
`;
const Ul = styled.ul`
  margin: 0;
  padding-left: 2em;
  > * + * {
    margin-top: 0.25em;
  }
`;
const Ol = styled.ol`
  margin: 0;
  padding-left: 2em;
  > * + * {
    margin-top: 0.25em;
  }
`;
const Li = styled.li``;
const Table = styled.table`
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
    ${props => {
      const tableHeaders = React.Children.toArray(props.children).find(
        elem => elem.props.mdxType === 'thead'
      );
      const rowHeaders = tableHeaders.props.children;
      return React.Children.toArray(rowHeaders.props.children).reduce(
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
  border-bottom: 1px solid ${colors.light.borderPrimary};
  font-size: ${typography.fontSizes.small};
  padding: ${dimensions.spacings.s};
  white-space: pre-wrap;
  vertical-align: top;
  text-align: ${props => props.align || 'left'};

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
  font-size: ${typography.fontSizes.small};
  padding: ${dimensions.spacings.s};
  text-align: left;

  @media screen and (${dimensions.viewports.mobile}) {
    display: block;
  }
`;
const InlineCode = styled.code`
  background-color: ${colors.light.borderPrimary};
  border: 1px solid ${colors.light.surfaceInfo};
  border-radius: ${dimensions.spacings.xs};
  color: ${colors.light.textCode};
  font-family: ${typography.fontFamilies.code};
  font-size: ${typography.fontSizes.small};
  padding: 0 ${dimensions.spacings.xs};
`;
const TooltipWrapperComponent = props =>
  ReactDOM.createPortal(props.children, document.body);
const TooltipBodyComponent = styled.div`
  background-color: ${colors.light.surfaceCodeHighlight};
  border-radius: ${tokens.borderRadius4};
  color: ${colors.light.textInverted};
  font-size: ${typography.fontSizes.extraSmall};
  padding: ${dimensions.spacings.xs} ${dimensions.spacings.s};
`;

/**
 * This components implements most of the logic from `gatsby-remark-prismjs`.
 * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-prismjs
 *
 * We need to implement this logic on our own (at least for now) because of the
 * copy-to-clipboard functionality, as we need access to the raw content.
 * If we were to use the gatsby plugin, we would get the formatted content from props.
 *
 * ## Description
 * The CodeBlock component is used to provide syntax highlighting to the markdown
 * code block syntax ```.
 * It supports all the "common languages" as well as some extra features.
 *
 * ## Usage
 * The normal way to use it is by adding the appropriate language of your choice next
 * to the code block syntax:
 *
 * ```javascript
 * // This is a js comment
 * ```
 *
 * ## Additional features
 * The CodeBlock component also supports optional features to enhance the final output.
 * Those features are controlled by using the "infostring" syntax supported by MDX.
 * https://github.com/mdx-js/mdx/pull/257
 *
 * ```javascript foo=bar
 * // This is a js comment
 * ```
 *
 * Given the above syntax, the CodeBlock component will receive the following props:
 *
 * {
 *   children: {
 *    props: {
 *      children: '// This is a js comment',
 *      className: 'language-javascript',
 *      foo: 'bar',
 *      mdxType: 'code',
 *      metastring: 'foo=bar',
 *      originalType: 'code',
 *      parentName: 'pre',
 *    }
 *   }
 * }
 *
 * ### Highlighted lines
 * This feature allows to select lines to be visually highlighted in the final output.
 * To use this, you need to pass `highlightLines=<range>`. The range can be a single line
 * number or a range of line numbers separated by `-`. Multiple highlighted lines can be
 * provided as comma-separated values.
 *
 * ```javascript highlightLines=1,5
 * const sum = (x, y) => {
 *   if (typeof x !== 'number' || typeof y !== 'number') {
 *     throw new Error('Both arguments need to be numbers.');
 *   }
 *   return x + y;
 * }
 * ```
 *
 * ### Prompt lines
 * This feature allows to mark a line with a prompt `$` in front of it.
 * To use this, you need to pass `promptLines=<range>`. The range can be a single line
 * number or a range of line numbers separated by `-`. Multiple highlighted lines can be
 * provided as comma-separated values.
 * This feature only works for the `console` or `terminal` language syntax.
 *
 * ```console promptLines=1-2,5-6
 * cd project
 * cp -R \
 *   dist \
 *   public/
 * rm -rf dist
 * yarn start
 * ```
 */
const CodeBlock = props => {
  const className = props.children.props ? props.children.props.className : '';
  const languageToken = className || 'language-text';
  const languageAliases = {
    sh: 'bash',
    zsh: 'bash',
    console: 'bash',
    terminal: 'bash',
    js: 'javascript',
  };
  const [, languageCode] = languageToken.split('language-');
  const language = languageAliases[languageCode] || languageCode;
  const { highlightLines, noPromptLines } = codeBlockParseOptions(
    props.children.props
  );
  const useCommandLine = ['terminal', 'console'].includes(languageCode);
  const content =
    props.children.props && props.children.props.children
      ? props.children.props.children
      : props.children;
  const formattedContent = codeBlockHighlightCode({
    language,
    code: content,
    highlightLines,
    noPromptLines,
    useCommandLine,
  }).replace(/\n$/, '');

  // Copy to clipboard logic
  const [isCopiedToClipboard, setIsCopiedToClipboard] = React.useState(false);
  const handleCopyToClipboardClick = () => {
    copyToClipboard(content);

    setIsCopiedToClipboard(true);
    setTimeout(() => {
      setIsCopiedToClipboard(false);
    }, 1500);
  };

  return (
    <div
      css={css`
        border: 1px solid ${colors.light.surfaceCodeHighlight};
        border-radius: ${tokens.borderRadius6};
        margin: 0;
        overflow: auto;
      `}
    >
      <div
        css={css`
          background-color: ${colors.light.textPrimary};
          border-bottom: 1px solid ${colors.light.surfaceCodeHighlight};
          padding: ${dimensions.spacings.s} ${dimensions.spacings.m};
          display: flex;
          align-items: center;
          justify-content: flex-end;
          > * + * {
            margin: 0 0 0 ${dimensions.spacings.m};
          }
        `}
      >
        {languageCode === 'text' ? null : (
          <span
            css={css`
              color: ${colors.light.textFaded};
            `}
          >
            {languageCode}
          </span>
        )}
        <Tooltip
          placement="left"
          title={isCopiedToClipboard ? 'Copied' : 'Copy to clipboard'}
          components={{
            TooltipWrapperComponent,
            BodyComponent: TooltipBodyComponent,
          }}
        >
          <div
            css={css`
              cursor: pointer;
              height: ${dimensions.spacings.l};
              svg {
                * {
                  fill: ${colors.light.surfacePrimary};
                }
              }
              :hover {
                svg {
                  * {
                    fill: ${colors.light.surfaceCodeHighlight};
                  }
                }
              }
            `}
            onClick={handleCopyToClipboardClick}
            title={isCopiedToClipboard ? 'Copied' : 'Copy to clipboard'}
          >
            <ClipboardIcon />
          </div>
        </Tooltip>
      </div>
      <div
        className={[
          'gatsby-highlight',
          highlightLines &&
            highlightLines.length > 0 &&
            'has-highlighted-lines',
        ]
          .filter(Boolean)
          .join(' ')}
        data-language={language}
      >
        <pre className={`language-${language}`}>
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{
              __html: formattedContent,
            }}
          />
        </pre>
      </div>
    </div>
  );
};
CodeBlock.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};
const Em = styled.em``;
const Strong = styled.strong``;
const Delete = styled.span`
  text-decoration: line-through;
`;
const Hr = styled(ThematicBreak)``;

/* eslint-disable react/display-name,react/prop-types */
const withAnchorLink = Component => props => {
  return (
    <Component
      {...props}
      css={css`
        display: flex;
        align-items: baseline;
        :hover {
          [role='anchor-link'] {
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
      <a href={`#${props.id}`} role="anchor-link">
        <RibbonIcon />
      </a>
    </Component>
  );
};
/* eslint-enable */

export {
  TypographyPage,
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
  Link,
  withAnchorLink,
};
