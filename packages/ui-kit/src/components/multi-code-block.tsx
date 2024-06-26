import React, { ReactElement } from 'react';
import reactIs from 'react-is';
import styled from '@emotion/styled';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import {
  colors,
  dimensions,
  typography,
  tokens,
  tokensToCssVars,
} from '../design-system';
import parseCodeBlockOptions from '../utils/code-block-parse-options';
import { cssVarToValue } from '../utils/css-variables';
import CodeBlock from './code-block';

type OneOrManyChildren = React.ReactElement | React.ReactElement[];
type MultiCodeBlockProps = {
  secondaryTheme?: boolean;
  title?: string;
  children: OneOrManyChildren;
};

export const Container = styled.div`
  background-color: ${tokens.surfaceForCodeBlock};
  border: 1px solid ${tokens.borderForCodeBlock};
  border-radius: ${tokens.borderRadiusForCodeBlock};
  word-break: break-word;
`;
const Header = styled.div`
  background-color: ${tokens.surfaceHeaderForCodeBlock};
  border-radius: ${tokens.borderRadiusForCodeBlock}
    ${tokens.borderRadiusForCodeBlock} 0 0;
  border-bottom: 1px solid ${tokens.borderForCodeBlock};
  padding: ${dimensions.spacings.s} ${dimensions.spacings.m};
`;
const HeaderInner = styled.div`
  display: grid;
  grid-gap: ${dimensions.spacings.m};
  grid-template-columns: auto 1fr;
`;
const HeaderText = styled.span`
  color: ${tokens.textHeaderForCodeBlock};
`;

const createStyledCaretSvgUrl = (fillColor: string) =>
  `url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg id='Icons' stroke='none' stroke-width='1' fill-rule='evenodd'%3E%3Cg id='MC-icon-set' transform='translate(-168.000000, -936.000000)' fill='%23${fillColor}'%3E%3Cg id='Directions' transform='translate(24.000000, 888.000000)'%3E%3Cg id='Caret-Down' transform='translate(144.000000, 48.000000)'%3E%3Cpath d='M20.6658731,7.4053255 C20.4433682,7.16948908 20.1796129,7.05166867 19.8748538,7.05166867 L4.12508466,7.05166867 C3.82020235,7.05166867 3.55663185,7.16948908 3.33394217,7.4053255 C3.11125249,7.64142273 3,7.92055342 3,8.24323919 C3,8.56585976 3.11125249,8.84499045 3.33394217,9.08089208 L11.2088575,17.4207121 C11.4317935,17.6565485 11.695364,17.7746297 12,17.7746297 C12.304636,17.7746297 12.5684528,17.6565485 12.7909578,17.4207121 L20.6658731,9.08082687 C20.8883165,8.84499045 21,8.56585976 21,8.24317399 C21,7.92055342 20.8883165,7.64142273 20.6658731,7.4053255 L20.6658731,7.4053255 Z' id='shape'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;
const caretSvgUrlThemePrimary = createStyledCaretSvgUrl(
  cssVarToValue(
    colors.light.codeBlocks.primary.surfaceLanguageDropdownForCodeBlock
  ).replace('#', '')
);
const caretSvgUrlThemeSecondary = createStyledCaretSvgUrl(
  cssVarToValue(
    colors.light.codeBlocks.secondary.surfaceLanguageDropdownForCodeBlock
  ).replace('#', '')
);
const LanguagesDropDownWrapper = styled.div`
  background-repeat: no-repeat, repeat;
  background-position: right 0 top 50%, 0 0;
  background-size: ${dimensions.widths.selectDropDownArrowWith} auto, 100%;

  ${Container}[data-code-block-theme='primary'] & {
    background-image: ${caretSvgUrlThemePrimary};
  }
  ${Container}[data-code-block-theme='secondary'] & {
    background-image: ${caretSvgUrlThemeSecondary};
  }
`;
const LanguagesDropDown = styled.select`
  display: block;
  font-size: ${typography.fontSizes.body};
  line-height: ${typography.lineHeights.body};
  color: ${tokens.surfaceLanguageDropdownForCodeBlock};
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
    color: ${tokens.surfaceLanguageDropdownHoverForCodeBlock};
  }

  :focus {
    outline: none;
  }
`;

const languageDisplayNames: { [key: string]: string } = {
  sh: 'Terminal',
  zsh: 'Terminal',
  console: 'Terminal',
  bash: 'Terminal',
  curl: 'cURL',
  js: 'JavaScript',
  javascript: 'JavaScript',
  jsx: 'JavaScript React',
  java: 'Java',
  scala: 'Scala',
  php: 'PHP',
  cs: 'C#',
  ts: 'TypeScript',
  tsx: 'TypeScript React',
  python: 'Python',
  go: 'Go',
  swift: 'Swift',
  ruby: 'Ruby',
  objectivec: 'Objective-C',
};

function extractLanguages(children: OneOrManyChildren): string[] {
  if (Array.isArray(children)) {
    return children.map((child) => child.props.language);
  }

  return [children.props.language];
}

export const MultiCodeBlock = (props: MultiCodeBlockProps) => {
  const langs = extractLanguages(props.children);

  const [selected, setSelected] = React.useState(langs[0]);
  const handleOnLanguageChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement> | undefined) => {
      setSelected(event?.target?.value || '');
    },
    []
  );

  let selectedElement: React.ReactElement | undefined;
  if (Array.isArray(props.children)) {
    selectedElement =
      props.children.find((child) => child.props.language === selected) ||
      undefined;
  } else {
    selectedElement = props.children;
  }

  const codeBlockTheme = props.secondaryTheme ? 'secondary' : 'primary';

  return (
    <Container
      style={tokensToCssVars(colors.light.codeBlocks[codeBlockTheme])}
      data-code-block-theme={codeBlockTheme}
    >
      {props.title || langs.length > 1 ? (
        <Header>
          <HeaderInner>
            <HeaderText>{props.title}</HeaderText>
            <SpacingsInline
              scale="m"
              alignItems="center"
              justifyContent="flex-end"
            >
              {(() => {
                if (langs.length > 1) {
                  return (
                    <LanguagesDropDownWrapper>
                      <LanguagesDropDown onChange={handleOnLanguageChange}>
                        {langs.map((lang) => (
                          <option key={lang} value={lang}>
                            {languageDisplayNames[lang] || lang}
                          </option>
                        ))}
                      </LanguagesDropDown>
                    </LanguagesDropDownWrapper>
                  );
                }
                return langs[0] === 'text' ? null : (
                  <HeaderText>
                    {languageDisplayNames[langs[0]] || langs[0]}
                  </HeaderText>
                );
              })()}
            </SpacingsInline>
          </HeaderInner>
        </Header>
      ) : null}

      {selectedElement &&
        React.cloneElement(selectedElement, {
          isMulti: true,
          secondaryTheme: props.secondaryTheme,
        })}
    </Container>
  );
};

const getCodeBlockPropsFromMdxPreNodeProps = (props: {
  children?: React.ReactNode;
}) => {
  let childElement = null;
  if (Array.isArray(props.children) && reactIs.isElement(props.children[0])) {
    childElement = props.children[0];
  } else if (reactIs.isElement(props.children)) {
    childElement = props.children;
  }
  const childProps = childElement?.props;
  const className = childProps ? childProps.className : '';
  const languageToken: string = className || 'language-text';
  const [, languageCode] = languageToken.split('language-');
  const parsedOptions = parseCodeBlockOptions(childProps);

  const content = Array.isArray(childProps?.children)
    ? childProps.children[0]
    : childProps?.children || childProps;

  return {
    ...parsedOptions,
    content,
    language: languageCode,
  };
};

/* eslint-disable react/display-name */
// Maps the props coming from MDX to the underlying <CodeBlock> component.
export const CodeBlockMarkdownWrapper = (props: {
  children?: React.ReactNode;
}) => {
  const options = getCodeBlockPropsFromMdxPreNodeProps(props);
  return (
    <MultiCodeBlock {...options}>
      <CodeBlock {...options} />
    </MultiCodeBlock>
  );
};

// takes the mdx fenced code block children and makes then <CodeBlock>s
export const MultiCodeBlockMarkdownWrapper = (props: {
  title: string;
  children: React.ReactNode[];
}) => {
  const children = React.Children.toArray(props.children);
  const codeBlocks = children.map((child) => {
    // TODO b) the interface of the functions is likely unfortunate -> refactor something
    const options = getCodeBlockPropsFromMdxPreNodeProps({
      children: Array.isArray((child as ReactElement).props.children)
        ? (child as ReactElement)
        : (child as ReactElement).props.children,
    });
    return <CodeBlock {...options} key={options.language} />;
  });

  return <MultiCodeBlock title={props.title}>{codeBlocks}</MultiCodeBlock>;
};
