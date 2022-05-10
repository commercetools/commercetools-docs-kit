import React from 'react';
import reactIs from 'react-is';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { colors, dimensions, typography, tokens } from '../design-system';
import parseCodeBlockOptions from '../utils/code-block-parse-options';
import CodeBlock from './code-block';

export const Container = styled.div`
  background-color: ${(props) => props.theme.codeBlockColors!.surface};
  border: 1px solid ${(props) => props.theme.codeBlockColors!.border};
  border-radius: ${tokens.borderRadiusForCodeBlock};
  word-break: break-word;
`;
const Header = styled.div`
  background-color: ${(props) => props.theme.codeBlockColors!.surfaceHeader};
  border-radius: ${tokens.borderRadiusForCodeBlock}
    ${tokens.borderRadiusForCodeBlock} 0 0;
  border-bottom: 1px solid ${(props) => props.theme.codeBlockColors!.border};
  padding: ${dimensions.spacings.s} ${dimensions.spacings.m};
`;
const HeaderInner = styled.div`
  display: grid;
  grid-gap: ${dimensions.spacings.m};
  grid-template-columns: auto 1fr;
`;
const HeaderText = styled.span`
  color: ${(props) => props.theme.codeBlockColors!.textHeader};
`;

const getCaretSvgUrl = (color: string) =>
  `url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg id='Icons' stroke='none' stroke-width='1' fill-rule='evenodd'%3E%3Cg id='MC-icon-set' transform='translate(-168.000000, -936.000000)' fill='%23${color}'%3E%3Cg id='Directions' transform='translate(24.000000, 888.000000)'%3E%3Cg id='Caret-Down' transform='translate(144.000000, 48.000000)'%3E%3Cpath d='M20.6658731,7.4053255 C20.4433682,7.16948908 20.1796129,7.05166867 19.8748538,7.05166867 L4.12508466,7.05166867 C3.82020235,7.05166867 3.55663185,7.16948908 3.33394217,7.4053255 C3.11125249,7.64142273 3,7.92055342 3,8.24323919 C3,8.56585976 3.11125249,8.84499045 3.33394217,9.08089208 L11.2088575,17.4207121 C11.4317935,17.6565485 11.695364,17.7746297 12,17.7746297 C12.304636,17.7746297 12.5684528,17.6565485 12.7909578,17.4207121 L20.6658731,9.08082687 C20.8883165,8.84499045 21,8.56585976 21,8.24317399 C21,7.92055342 20.8883165,7.64142273 20.6658731,7.4053255 L20.6658731,7.4053255 Z' id='shape'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;
const LanguagesDropDownWrapper = styled.div`
  /* stylelint-disable function-url-quotes */
  background-image: ${(props) =>
    getCaretSvgUrl(
      props.theme.codeBlockColors!.surfaceLanguageDropdown.replace('#', '')
    )};
  background-repeat: no-repeat, repeat;
  background-position: right 0 top 50%, 0 0;
  background-size: ${dimensions.widths.selectDropDownArrowWith} auto, 100%;
`;
const LanguagesDropDown = styled.select`
  display: block;
  font-size: ${typography.fontSizes.body};
  line-height: ${typography.lineHeights.body};
  color: ${(props) => props.theme.codeBlockColors!.surfaceLanguageDropdown};
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
    color: ${(props) =>
      props.theme.codeBlockColors!.surfaceLanguageDropdownHover};
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

function MultiCodeBlock(props: MultiCodeBlockProps) {
  const langs = extractLanguages(props.children);

  const [selected, setSelected] = React.useState(langs[0]);
  const handleOnLanguageChange = React.useCallback(
    (event: { target: { value: React.SetStateAction<string> } }) => {
      setSelected(event.target.value);
    },
    []
  );

  const codeBlockTheme = {
    codeBlockColors:
      colors.light.codeBlocks[props.secondaryTheme ? 'secondary' : 'primary'],
  };

  let selectedElement: React.ReactElement | undefined;
  if (Array.isArray(props.children)) {
    selectedElement =
      props.children.find((child) => child.props.language === selected) ||
      undefined;
  } else {
    selectedElement = props.children;
  }

  return (
    <ThemeProvider theme={codeBlockTheme}>
      <Container theme={codeBlockTheme}>
        {props.title || langs.length > 1 ? (
          <Header theme={codeBlockTheme}>
            <HeaderInner>
              <HeaderText theme={codeBlockTheme}>{props.title}</HeaderText>
              <SpacingsInline
                scale="m"
                alignItems="center"
                justifyContent="flex-end"
              >
                {(() => {
                  if (langs.length > 1) {
                    return (
                      <LanguagesDropDownWrapper theme={codeBlockTheme}>
                        <LanguagesDropDown
                          theme={codeBlockTheme}
                          onChange={handleOnLanguageChange}
                        >
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
                    <HeaderText theme={codeBlockTheme}>
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
            secondaryTheme: props.secondaryTheme,
          })}
      </Container>
    </ThemeProvider>
  );
}

type OneOrManyChildren = React.ReactElement | React.ReactElement[];
type MultiCodeBlockProps = {
  secondaryTheme?: boolean;
  title?: string;
  children: OneOrManyChildren;
};

export default MultiCodeBlock;

/* eslint-disable react/display-name */
// Maps the props coming from MDX to the underlying <CodeBlock> component.
export const CodeBlockMarkdownWrapper = (props: {
  children?: React.ReactNode;
}) => {
  const childElement = reactIs.isElement(props.children)
    ? props.children
    : null;
  const childProps = childElement?.props;
  const className = childProps ? childProps.className : '';
  const languageToken = className || 'language-text';
  const [, languageCode] = languageToken.split('language-');
  const parsedOptions = parseCodeBlockOptions(childProps);
  const content =
    childProps && childProps.children ? childProps.children : childProps;

  return (
    <MultiCodeBlock {...parsedOptions}>
      <CodeBlock {...parsedOptions} content={content} language={languageCode} />
    </MultiCodeBlock>
  );
};
