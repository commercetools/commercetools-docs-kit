import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { colors, dimensions, typography, tokens } from '../design-system';
import codeBlockParseOptions from '../utils/code-block-parse-options';
import CodeBlock from './code-block';

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
const languagesBackgroundImageUrl = color => {
  return `url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3C!-- Generator: sketchtool 45.2 (43514) - http://www.bohemiancoding.com/sketch --%3E%3Ctitle%3Ecaret-down%3C/title%3E%3Cdesc%3ECreated with sketchtool.%3C/desc%3E%3Cdefs%3E%3C/defs%3E%3Cg id='Icons' stroke='none' stroke-width='1' fill-rule='evenodd'%3E%3Cg id='MC-icon-set' transform='translate(-168.000000, -936.000000)' fill='%23${color}'%3E%3Cg id='Directions' transform='translate(24.000000, 888.000000)'%3E%3Cg id='Caret-Down' transform='translate(144.000000, 48.000000)'%3E%3Cpath d='M20.6658731,7.4053255 C20.4433682,7.16948908 20.1796129,7.05166867 19.8748538,7.05166867 L4.12508466,7.05166867 C3.82020235,7.05166867 3.55663185,7.16948908 3.33394217,7.4053255 C3.11125249,7.64142273 3,7.92055342 3,8.24323919 C3,8.56585976 3.11125249,8.84499045 3.33394217,9.08089208 L11.2088575,17.4207121 C11.4317935,17.6565485 11.695364,17.7746297 12,17.7746297 C12.304636,17.7746297 12.5684528,17.6565485 12.7909578,17.4207121 L20.6658731,9.08082687 C20.8883165,8.84499045 21,8.56585976 21,8.24317399 C21,7.92055342 20.8883165,7.64142273 20.6658731,7.4053255 L20.6658731,7.4053255 Z' id='shape'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;
};

const LanguagesDropDownWrapper = styled.div`
  background-color: ${colors.light.textPrimary};
  background-image: ${languagesBackgroundImageUrl('ffffff')};
  background-repeat: no-repeat, repeat;
  background-position: right 0 top 50%, 0 0;
  background-size: ${dimensions.widths.selectDropDownArrowWith} auto, 100%;
`;
const LanguagesDropDown = styled.select`
  display: block;
  font-size: ${typography.fontSizes.body};
  line-height: ${typography.lineHeights.body};
  color: ${colors.light.surfacePrimary};
  padding-right: ${dimensions.spacings.m};
  box-sizing: border-box;
  cursor: pointer;
  border: none;
  appearance: none;
  background: transparent;

  option {
    color: black;
  }

  ::-ms-expand {
    display: none;
  }

  :hover {
    color: ${colors.light.surfaceInlineCode};
  }

  :focus {
    outline: none;
  }
`;

const languageDisplayNames = {
  sh: 'Terminal',
  zsh: 'Terminal',
  console: 'Terminal',
  bash: 'Terminal',
  js: 'JavaScript',
  javascript: 'JavaScript',
  java: 'Java',
  php: 'PHP',
  cs: 'C#',
  ts: 'TypeScript',
  python: 'Python',
  go: 'Go',
  swift: 'Swift',
  ruby: 'Ruby',
  objectivec: 'Objective-C',
};
function MultiCodeBlock(props) {
  const [currentCodeBlockProps, setCurrentCodeBlockProps] = useState({
    language: props.codeBlockProps[0].language || 'text',
    highlightLines: props.codeBlockProps[0].highlightLines,
    noPromptLines: props.codeBlockProps[0].noPromptLines,
    content: props.codeBlockProps[0].content,
  });

  const langs =
    props.languages && props.languages.length
      ? props.languages
      : props.codeBlockProps[0].language;

  return (
    <Container>
      {renderHeader(props.title, langs)}
      <CodeBlock
        content={currentCodeBlockProps.content}
        language={currentCodeBlockProps.language}
        highlightLines={currentCodeBlockProps.highlightLines}
        noPromptLines={currentCodeBlockProps.noPromptLines}
      />
    </Container>
  );

  function renderHeader(title, languages = []) {
    if (title || languages) {
      return (
        <Header>
          <HeaderInner>
            <HeaderText>{props.title}</HeaderText>
            <SpacingsInline
              scale="m"
              alignItems="center"
              justifyContent="flex-end"
            >
              {renderLanguages(languages)}
            </SpacingsInline>
          </HeaderInner>
        </Header>
      );
    }

    return null;
  }

  function renderLanguages(languages) {
    if (languages.length > 1) {
      return (
        <LanguagesDropDownWrapper>
          <LanguagesDropDown onChange={handleOnLanguageChange}>
            {languages.map(lang => (
              <option key={lang} value={lang}>
                {languageDisplayNames[lang] || lang}
              </option>
            ))}
          </LanguagesDropDown>
        </LanguagesDropDownWrapper>
      );
    }

    return languages[0] === 'text' ? null : (
      <HeaderText>{languages[0]}</HeaderText>
    );
  }

  function handleOnLanguageChange(e) {
    const newProps = props.codeBlockProps.find(
      codeBlockProp => codeBlockProp.language === e.target.value
    );

    setCurrentCodeBlockProps(newProps);
  }
}

MultiCodeBlock.propTypes = {
  title: PropTypes.string,
  languages: PropTypes.arrayOf(PropTypes.string.isRequired),
  codeBlockProps: PropTypes.arrayOf(
    PropTypes.shape({
      language: PropTypes.string,
      highlightLines: PropTypes.arrayOf(PropTypes.number),
      noPromptLines: PropTypes.arrayOf(PropTypes.number),
      content: PropTypes.string,
    }).isRequired
  ).isRequired,
};

export default MultiCodeBlock;

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

  // rendeer multicode with single codeblock as child
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
