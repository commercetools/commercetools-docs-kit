import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Tooltip from '@commercetools-uikit/tooltip';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { ClipboardIcon } from '@commercetools-uikit/icons';
import { colors, dimensions, typography, tokens } from '../design-system';
import copyToClipboard from '../utils/copy-to-clipboard';
import codeBlockParseOptions from '../utils/code-block-parse-options';
import codeBlockHighlightCode from '../utils/code-block-highlight-code';
import HtmlToJsx from './html-to-jsx';

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
  const languageCode = props.language || 'text';
  const language = languageAliases[languageCode] || languageCode;
  const useCommandLine = ['terminal', 'console'].includes(languageCode);
  const formattedContent = codeBlockHighlightCode({
    language,
    code: props.content,
    highlightLines: props.highlightLines,
    noPromptLines: props.noPromptLines,
    useCommandLine,
  }).replace(/\n$/, '');

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
    <Container>
      {props.title && (
        <Header>
          <HeaderInner>
            <HeaderText>{props.title}</HeaderText>
            <SpacingsInline
              scale="m"
              alignItems="center"
              justifyContent="flex-end"
            >
              {languageCode === 'text' ? null : (
                <HeaderText>{languageCode}</HeaderText>
              )}
            </SpacingsInline>
          </HeaderInner>
        </Header>
      )}
      <div
        className={[
          'gatsby-highlight',
          props.highlightLines &&
            props.highlightLines.length > 0 &&
            'has-highlighted-lines',
        ]
          .filter(Boolean)
          .join(' ')}
        data-language={language}
      >
        <SpacingsInline scale="xs" alignItems="flex-start">
          <pre className={`language-${language}`}>
            {/* Previously we were using `dangerouslySetInnerHTML` but somehow the
            HTML markup gets lost when the application is re-hydrated after SSR. */}
            <code className={`language-${language}`}>
              <HtmlToJsx value={formattedContent} />
            </code>
          </pre>
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
      </div>
    </Container>
  );
};
CodeBlock.propTypes = {
  language: PropTypes.string,
  title: PropTypes.string,
  highlightLines: PropTypes.arrayOf(PropTypes.number),
  noPromptLines: PropTypes.arrayOf(PropTypes.number),
  content: PropTypes.string.isRequired,
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
