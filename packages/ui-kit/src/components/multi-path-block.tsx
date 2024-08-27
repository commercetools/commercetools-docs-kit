import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

type OneOrManyChildren = React.ReactElement | React.ReactElement[];
type MultiPathBlockProps = {
  title?: string;
  children: OneOrManyChildren;
};

function extractLanguages(children: OneOrManyChildren): string[] {
  if (Array.isArray(children)) {
    return children.map((child) => child.props.language);
  }

  return [children.props.language];
}

const SelectorsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const SelectorItem = styled.div<{ isSelected: boolean }>`
  padding: 10px;
  cursor: ${(props) => (props.isSelected ? 'default' : 'pointer')};
  background-color: ${(props) =>
    props.isSelected ? '#f0f0f0' : 'transparent'};
  margin-right: 5px;
  border-radius: 5px;
`;

const ActivePathContainer = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  padding: 10px;
`;

const MultiPathBlock = (props: MultiPathBlockProps) => {
  const langs = extractLanguages(props.children);
  const [selected, setSelected] = React.useState<string | undefined>(langs[0]);
  const [activePath, setActivePath] = useState<
    React.ReactElement | undefined
  >();

  useEffect(() => {
    setActivePath(
      Array.isArray(props.children)
        ? props.children.find((child) => child.props.language === selected)
        : props.children
    );
  }, [props.children, selected]);

  return (
    <div>
      <h3>{props.title}</h3>
      <SelectorsContainer>
        {langs.map((lang) => (
          <SelectorItem
            key={lang}
            isSelected={lang === selected}
            onClick={() => setSelected(lang)}
          >
            {lang}
          </SelectorItem>
        ))}
      </SelectorsContainer>
      <ActivePathContainer>{activePath}</ActivePathContainer>
    </div>
  );
};

export default MultiPathBlock;
