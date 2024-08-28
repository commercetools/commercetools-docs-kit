import styled from '@emotion/styled';
import React, { ReactElement, useEffect, useState } from 'react';
import { PathBlockProps } from './path-block';

type OneOrManyChildren = React.ReactElement | React.ReactElement[];
type MultiPathBlockProps = {
  children: OneOrManyChildren;
};

type LabelSyncPair = {
  label: string;
  syncWith: string | undefined;
};

function extractLabelSyncPair(children: OneOrManyChildren): LabelSyncPair[] {
  if (Array.isArray(children)) {
    return children
      .filter((child) => React.isValidElement(child))
      .map((child) => {
        return {
          label: (child as ReactElement<PathBlockProps>).props.label,
          syncWith: (child as ReactElement<PathBlockProps>).props.syncWith,
        };
      });
  }

  return [
    {
      label: (children as ReactElement<PathBlockProps>).props.label,
      syncWith: (children as ReactElement<PathBlockProps>).props.syncWith,
    },
  ];
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
  const labelSyncItems = extractLabelSyncPair(props.children);
  const [selected, setSelected] = React.useState<LabelSyncPair>(
    labelSyncItems[0]
  );
  const [activePath, setActivePath] = useState<
    React.ReactElement | undefined
  >();

  useEffect(() => {
    setActivePath(
      Array.isArray(props.children)
        ? props.children.find((child) => child.props.label === selected.label)
        : props.children
    );
  }, [props.children, selected]);

  return (
    <div>
      <SelectorsContainer>
        {labelSyncItems.map((labelSyncItem) => (
          <SelectorItem
            key={labelSyncItem.label}
            isSelected={labelSyncItem.label === selected.label}
            onClick={() => setSelected(labelSyncItem)}
          >
            {labelSyncItem.label}
          </SelectorItem>
        ))}
      </SelectorsContainer>
      <ActivePathContainer>{activePath}</ActivePathContainer>
    </div>
  );
};

export default MultiPathBlock;
