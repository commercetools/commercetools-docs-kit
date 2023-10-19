import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Tooltip from '@commercetools-uikit/tooltip';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { ClipboardIcon } from '@commercetools-uikit/icons';
import { Highlight, Token } from 'prism-react-renderer';
import {
  colors,
  dimensions,
  typography,
  tokens,
  tokensToCssVars,
} from '../design-system';
import themePrimary from '../prism-themes/commercetools';
import themeSecondary from '../prism-themes/commercetoolsLight';
import copyToClipboard from '../utils/copy-to-clipboard';

type CodeBlockProps = {
  isMulti?: boolean;
  secondaryTheme?: boolean;
  language?: string;
  highlightLines?: number[];
  noPromptLines?: number[];
  content: string;
};

const HighlightedContainer = styled.div`
  background-color: ${tokens.surfaceForCodeBlock};
  border-radius: ${tokens.borderRadiusForCodeBlock};
  margin: 0;
  padding: ${dimensions.spacings.s} ${dimensions.spacings.xs}
    ${dimensions.spacings.s} ${dimensions.spacings.m};
  overflow: auto;
`;
const Preformatted = styled.pre`
  font-family: ${typography.fontFamilies.code};
  font-size: ${typography.fontSizes.small};
  background-color: ${tokens.surfaceForCodeBlock} !important;
  margin: 0;
  padding: 0;
  width: 100%;
  white-space: pre-wrap;
`;
const CopyArea = styled.div`
  cursor: pointer;
  svg {
    fill: ${tokens.surfaceCopyIconForCodeBlock};
  }
  :hover {
    svg {
      fill: ${tokens.surfaceCopyIconHoverForCodeBlock};
    }
  }
`;
const TooltipWrapperComponent = (props: { children?: React.ReactNode }) =>
  ReactDOM.createPortal(props.children, document.body);
const TooltipBodyComponent = (props: { children?: React.ReactNode }) => {
  return (
    <div
      css={css`
        background-color: ${tokens.surfaceCopyTooltipForCodeBlock};
        border-radius: ${tokens.borderRadiusForTooltip};
        color: ${tokens.textCopyTooltipForCodeBlock};
        font-size: ${typography.fontSizes.extraSmall};
        padding: ${dimensions.spacings.xs} ${dimensions.spacings.s};
      `}
      {...props}
    />
  );
};

const getLineStyles = (options: {
  shouldShowPrompt: boolean;
  isCommandLine: boolean;
  shouldHighlightLine: boolean;
}) => {
  let promptLineStyles;
  let highlightLineStyles;
  if (options.isCommandLine) {
    promptLineStyles = css`
      margin: 0 0 0 ${dimensions.spacings.m};

      ::before {
        content: attr(data-prompt);
        margin: 0 0 0 -${dimensions.spacings.m};
        padding: 0 ${dimensions.spacings.s} 0 0;
        color: ${options.shouldShowPrompt
          ? tokens.surfacePromptForCodeBlock
          : 'transparent'};
      }
    `;
  }
  if (options.shouldHighlightLine) {
    const width = options.isCommandLine
      ? `calc(100% - ${dimensions.spacings.s})`
      : '100%';
    highlightLineStyles = css`
      background-color: ${tokens.surfaceLineHighlightForCodeBlock};
      width: ${width};
    `;
  }
  return [promptLineStyles, highlightLineStyles];
};

const getTokenStyles = (options: {
  token: Token;
  shouldHighlightLine: boolean;
}) => {
  if (options.token.types.includes('comment') && options.shouldHighlightLine) {
    return {
      color: colors.light.textInverted,
    };
  }

  return {};
};

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
 * However, to support values with whitespaces between words (e.g. `title="This is a title"`)
 * we need to add a **restriction to always wrap the value in quotes**!
 *
 * ### Title
 * This feature allows to pass a title to the code block header.
 * To use this, you need to pass `title="<title>"`.
 *
 * ```javascript title="Sum function implementation"
 * const sum = (x, y) => {
 *   if (typeof x !== 'number' || typeof y !== 'number') {
 *     throw new Error('Both arguments need to be numbers.');
 *   }
 *   return x + y;
 * }
 * ```
 *
 * ### Highlighted lines
 * This feature allows to select lines to be visually highlighted in the final output.
 * To use this, you need to pass `highlightLines="<range>"`. The range can be a single line
 * number or a range of line numbers separated by `-`. Multiple highlighted lines can be
 * provided as comma-separated values.
 *
 * ```javascript highlightLines="1,5"
 * const sum = (x, y) => {
 *   if (typeof x !== 'number' || typeof y !== 'number') {
 *     throw new Error('Both arguments need to be numbers.');
 *   }
 *   return x + y;
 * }
 * ```
 *
 * ### Prompt lines
 * This feature allows to remove the prompt `$` from the specified lines.
 * To use this, you need to pass `noPromptLines="<range>"`. The range can be a single line
 * number or a range of line numbers separated by `-`. Multiple lines can be
 * provided as comma-separated values.
 * This feature only works for the `console` or `terminal` language syntax.
 *
 * ```console noPromptLines="1-2,5-6"
 * cd project
 * cp -R \
 *   dist \
 *   public/
 * rm -rf dist
 * yarn start
 * ```
 */
const languageAliases: { [key: string]: string } = {
  sh: 'bash',
  zsh: 'bash',
  console: 'bash',
  terminal: 'bash',
  curl: 'bash',
  js: 'javascript',
  yml: 'yaml',
};

const CodeBlock = (props: CodeBlockProps) => {
  const languageCode = props.language || 'text';
  const language = languageAliases[languageCode] || languageCode;
  const isCommandLine = ['terminal', 'console'].includes(languageCode);

  // Copy to clipboard logic
  const [isCopiedToClipboard, setIsCopiedToClipboard] = React.useState(false);
  const handleCopyToClipboardClick = () => {
    copyToClipboard(props.content);

    setIsCopiedToClipboard(true);
    setTimeout(() => {
      setIsCopiedToClipboard(false);
    }, 1500);
  };

  return (
    <Highlight
      code={props.content.length ? props.content : ''}
      language={language}
      theme={props.secondaryTheme ? themeSecondary : themePrimary}
    >
      {({
        className,
        style,
        tokens: syntaxTokens,
        getLineProps,
        getTokenProps,
      }) => (
        <div
          style={
            props.isMulti
              ? {}
              : tokensToCssVars(
                  colors.light.codeBlocks[
                    props.secondaryTheme ? 'secondary' : 'primary'
                  ]
                )
          }
        >
          <HighlightedContainer>
            <SpacingsInline scale="xs" alignItems="flex-start">
              <Preformatted className={className} style={style}>
                {syntaxTokens.map((line, index) => {
                  const isLastLine = syntaxTokens.length - 1 === index;
                  if (isLastLine) {
                    if (line.length === 1 && line[0].empty) {
                      return null;
                    }
                  }

                  const shouldShowPrompt =
                    isCommandLine && props.noPromptLines
                      ? !props.noPromptLines.includes(index + 1)
                      : false;

                  const shouldHighlightLine =
                    props.highlightLines && props.highlightLines.length > 0
                      ? props.highlightLines.some(
                          (highlightine) => highlightine === index + 1
                        )
                      : false;

                  return (
                    <div
                      key={index}
                      {...getLineProps({
                        line,
                        key: index,
                        ...(isCommandLine ? { 'data-prompt': '$' } : {}),
                      })}
                      css={getLineStyles({
                        isCommandLine,
                        shouldShowPrompt,
                        shouldHighlightLine,
                      })}
                    >
                      {line.map((token, key) => (
                        <span
                          key={key}
                          {...getTokenProps({
                            token,
                            key,
                            style: getTokenStyles({
                              token,
                              shouldHighlightLine,
                            }),
                          })}
                        />
                      ))}
                    </div>
                  );
                })}
              </Preformatted>
              <Tooltip
                placement="left"
                title={isCopiedToClipboard ? 'Copied' : 'Copy to clipboard'}
                components={{
                  // @ts-ignore
                  TooltipWrapperComponent,
                  BodyComponent: TooltipBodyComponent,
                }}
                styles={{
                  body: tokensToCssVars(
                    colors.light.codeBlocks[
                      props.secondaryTheme ? 'secondary' : 'primary'
                    ]
                  ),
                }}
              >
                <CopyArea onClick={handleCopyToClipboardClick}>
                  <ClipboardIcon />
                </CopyArea>
              </Tooltip>
            </SpacingsInline>
          </HighlightedContainer>
        </div>
      )}
    </Highlight>
  );
};

export default CodeBlock;
