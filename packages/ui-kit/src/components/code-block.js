import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Tooltip from '@commercetools-uikit/tooltip';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { ClipboardIcon } from '@commercetools-uikit/icons';
import theme from 'prism-react-renderer/themes/nightOwl';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { colors, dimensions, typography, tokens } from '../design-system';
import copyToClipboard from '../utils/copy-to-clipboard';
import codeBlockParseOptions from '../utils/code-block-parse-options';

const Container = styled.div`
  border: 1px solid ${colors.light.surfaceCodeHighlight};
  border-radius: ${tokens.borderRadiusForCodeBlock};
  margin: 0 0 ${dimensions.spacings.xxl};
`;
const Header = styled.div`
  background-color: ${colors.light.textPrimary};
  border-bottom: 1px solid ${colors.light.surfaceCodeHighlight};
  padding: ${dimensions.spacings.s} ${dimensions.spacings.m};
`;
const HeaderInner = styled.div`
  display: grid;
  grid-gap: ${dimensions.spacings.m};
  grid-template-columns: 1fr 1fr;
`;
const HeaderText = styled.span`
  color: ${colors.light.textFaded};
`;
const HighlightedContainer = styled.div`
  background-color: ${colors.light.surfaceCode};
  margin: 0;
  padding: ${dimensions.spacings.s} ${dimensions.spacings.xs}
    ${dimensions.spacings.s} ${dimensions.spacings.m};
  overflow: auto;
`;
const Preformatted = styled.pre`
  font-family: ${typography.fontFamilies.code};
  font-size: ${typography.fontSizes.small};
  background-color: ${colors.light.surfaceCode} !important;
  margin: 0;
  padding: 0;
  width: 100%;
  white-space: pre-wrap;
`;
const CopyArea = styled.div`
  cursor: pointer;
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
`;
const TooltipWrapperComponent = props =>
  ReactDOM.createPortal(props.children, document.body);
const TooltipBodyComponent = styled.div`
  background-color: ${colors.light.surfaceCodeHighlight};
  border-radius: ${tokens.borderRadiusForTooltip};
  color: ${colors.light.textInverted};
  font-size: ${typography.fontSizes.extraSmall};
  padding: ${dimensions.spacings.xs} ${dimensions.spacings.s};
`;

const getLineStyles = options => {
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
          ? colors.light.surfaceSecondary3
          : colors.light.surfaceCode};
      }
    `;
  }
  if (options.shouldHighlightLine) {
    highlightLineStyles = css`
      background-color: ${colors.light.surfaceCodeHighlight};

      /* stylelint-disable function-calc-no-invalid */
      width: calc(
        100% - ${options.shouldShowPrompt ? dimensions.spacings.m : '0px'}
      );
    `;
  }
  return [promptLineStyles, highlightLineStyles];
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
const languageAliases = {
  sh: 'bash',
  zsh: 'bash',
  console: 'bash',
  terminal: 'bash',
  js: 'javascript',
};
const CodeBlock = props => {
  const [content, setContent] = React.useState(
    props.multiLanguage ? props.multiLanguage.props[0].content : props.content
  );
  const [languageCode, setLanguageCode] = React.useState(
    props.multiLanguage
      ? props.multiLanguage.props[0].language
      : props.language || 'text'
  );
  const [highlightLines, setHighlightLines] = React.useState(
    props.multiLanguage
      ? props.multiLanguage.props[0].highlightLines
      : props.highlightLines
  );
  const [noPromptLines, setNoPromptLines] = React.useState(
    props.multiLanguage
      ? props.multiLanguage.props[0].noPromptLines
      : props.noPromptLines
  );

  // TODO: use parsing functionality of building array of highlightLines and noPromptLines

  const language = languageAliases[languageCode] || languageCode;
  const isCommandLine = ['terminal', 'console'].includes(languageCode);

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
    <Container>
      {props.multiLanguage
        ? renderMultiLanguageHeader(
            props.multiLanguage.title,
            props.multiLanguage.props.map(prop => prop.language)
          )
        : renderTitle(props.title, languageCode)}
      <Highlight
        {...defaultProps}
        code={content}
        language={language}
        theme={theme}
      >
        {({
          className,
          style,
          tokens: syntaxTokens,
          getLineProps,
          getTokenProps,
        }) => (
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

                  const shouldShowPrompt = isCommandLine
                    ? !noPromptLines.includes(index + 1)
                    : false;
                  const shouldHighlightLine =
                    highlightLines && highlightLines.length > 0
                      ? highlightLines.some(
                          highlightine => highlightine === index + 1
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
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  );
                })}
              </Preformatted>
              <Tooltip
                placement="left"
                title={isCopiedToClipboard ? 'Copied' : 'Copy to clipboard'}
                components={{
                  TooltipWrapperComponent,
                  BodyComponent: TooltipBodyComponent,
                }}
              >
                <CopyArea onClick={handleCopyToClipboardClick}>
                  <ClipboardIcon />
                </CopyArea>
              </Tooltip>
            </SpacingsInline>
          </HighlightedContainer>
        )}
      </Highlight>
    </Container>
  );

  function renderTitle(title, langCode) {
    if (title) {
      return (
        <Header>
          <HeaderInner>
            <HeaderText>{title}</HeaderText>
            <SpacingsInline
              scale="m"
              alignItems="center"
              justifyContent="flex-end"
            >
              {langCode === 'text' ? null : <HeaderText>{langCode}</HeaderText>}
            </SpacingsInline>
          </HeaderInner>
        </Header>
      );
    }

    return null;
  }
  function renderMultiLanguageHeader(title, languages = []) {
    if (title || languages.length) {
      return (
        <Header>
          <HeaderInner>
            <HeaderText>{title}</HeaderText>
            <SpacingsInline
              scale="m"
              alignItems="center"
              justifyContent="flex-end"
            >
              <select onChange={handleOnLanguageChange}>
                {languages.map(lang => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </SpacingsInline>
          </HeaderInner>
        </Header>
      );
    }

    return null;
  }

  function handleOnLanguageChange(e) {
    const code = props.multiLanguage.props.find(
      prop => prop.language === e.target.value
    );
    setLanguageCode(code.language);
    setContent(code.content);
    setHighlightLines(code.highlightLines || []);
    setNoPromptLines(code.noPromptLines || []);
  }
};
CodeBlock.propTypes = {
  language: PropTypes.string,
  title: PropTypes.string,
  highlightLines: PropTypes.arrayOf(PropTypes.number),
  noPromptLines: PropTypes.arrayOf(PropTypes.number),
  content: PropTypes.string,
  multiLanguage: PropTypes.shape({
    title: PropTypes.string,
    props: PropTypes.arrayOf(
      PropTypes.shape({
        language: PropTypes.string,
        title: PropTypes.string,
        highlightLines: PropTypes.arrayOf(PropTypes.number),
        noPromptLines: PropTypes.arrayOf(PropTypes.number),
        content: PropTypes.string.isRequired,
      })
    ),
  }),
  oneOfContentOrMultiLanguage: (props, propName, componentName) => {
    if (!props.content && !props.multiLanguage) {
      return new Error(
        `One of props 'content' or 'multiLanguage' was not specified in '${componentName}'.`
      );
    }

    return null;
  },
};

export default CodeBlock;

/* eslint-disable react/display-name,react/prop-types */
// Maps the props coming from MDX to the underlying <CodeBlock> component.
export const CodeBlockMarkdownWrapper = props => {
  const className = props.children.props ? props.children.props.className : '';
  const languageToken = className || 'language-text';
  const [, languageCode] = languageToken.split('language-');
  const { title, highlightLines, noPromptLines } = codeBlockParseOptions(
    props.children.props
  );
  const content =
    props.children.props && props.children.props.children
      ? props.children.props.children
      : props.children;
  return (
    <CodeBlock
      language={languageCode}
      title={title}
      highlightLines={highlightLines}
      noPromptLines={noPromptLines}
      content={content}
    />
  );
};
