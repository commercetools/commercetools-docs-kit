import styled from '@emotion/styled';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { designSystem } from '..';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import { Theme, Interpolation, css, SerializedStyles } from '@emotion/react';
import useSelectedPath from '../hooks/use-selected-path';

type OneOrManyChildren = React.ReactElement | React.ReactElement[];
type MultiPathBlockProps = {
  children: OneOrManyChildren;
};

export type LabelSyncPair = {
  label: string;
  syncWith?: string;
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

const getBottomBorderStyles = (background: string): SerializedStyles => css`
  :after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    border-radius: ${designSystem.tokens.boderRadiousForTabBorder};
    background-color: ${background};
    transition: background-color 150ms ease-in-out;
  }
`;

const getLinkStyles = (isActive: boolean): Interpolation<Theme> => [
  css`
    font-size: ${designSystem.typography.fontSizes.h3};
    padding-top: ${designSystem.dimensions.spacings.m};
    padding-bottom: ${designSystem.dimensions.spacings.s};
    padding-left: ${designSystem.dimensions.spacings.m};
    padding-right: ${designSystem.dimensions.spacings.m};
    position: relative;
    text-align: center;
    display: inline-block;
    color: inherit;
    text-decoration: inherit;
    cursor: default;

    &:first-of-type {
      padding-left: ${designSystem.dimensions.spacings.m};
    }

    ${getBottomBorderStyles('transparent')}
  `,
  isActive &&
    css`
      ${getBottomBorderStyles(designSystem.colors.light.borderHighlight)}
      & h3 {
        color: ${designSystem.colors.light.textTabSelected} !important;
      }
    `,
  !isActive &&
    css`
      :hover,
      :focus,
      :active {
        & h3 {
          color: ${designSystem.colors.light.textPrimary} !important;
        }
        cursor: pointer;
      }
    `,
];

type TabContentChildeProps = {
  children: OneOrManyChildren;
  activePathIndex: number;
};

const TabContentChildren = (props: TabContentChildeProps) => (
  <>
    {Array.isArray(props.children) ? (
      // for indexing purpose, we add all the tabs content in the DOM, and hide what is not selected
      props.children.map((child, index) => {
        return (
          <div
            role="tabpanel"
            aria-labelledby={`tab-${index}`}
            key={child.props.label}
            data-tab={child.props.syncWith}
            style={{
              display: index === props.activePathIndex ? 'block' : 'none',
            }}
          >
            {child}
          </div>
        );
      })
    ) : (
      <div>{props.children}</div>
    )}
  </>
);

type TTabHeaderProps = {
  index: number;
  label: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const TabHeader = (props: TTabHeaderProps) => {
  return (
    <span
      role="tab"
      id={`tab-${props.index}`}
      aria-selected={props.isActive}
      key={props.label}
      onClick={props.onClick}
      css={getLinkStyles(props.isActive)}
    >
      <Text.Headline as="h3" truncate={true}>
        {props.label}
      </Text.Headline>
    </span>
  );
};

const SelectorsContainer = styled.div`
  border-bottom: 1px solid ${designSystem.colors.light.borderPrimary};
  padding-top: 8px;
  padding-left: 16px;
`;

const ComponentWrapper = styled.div`
  border: 2px solid ${designSystem.colors.light.borderPrimary};
  border-radius: ${designSystem.tokens.borderRadiusForMultiPath};
`;

const PathsContainer = styled.div`
  padding: 10px;
`;

const MultiPathBlock = (props: MultiPathBlockProps) => {
  const labelSyncItems = extractLabelSyncPair(props.children);
  const [selected, setSelected] = React.useState<LabelSyncPair>(
    labelSyncItems[0]
  );
  const [activePathIndex, setActivePathIndex] = useState<number>(0);

  const { selectedPath, updateSelectedPath } = useSelectedPath();

  useEffect(() => {
    if (selectedPath) {
      const matchedSyncItem = labelSyncItems.find(
        (item) => item.syncWith?.toLowerCase() === selectedPath // case insensitive match
      );
      if (matchedSyncItem) {
        setSelected(matchedSyncItem);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPath]);

  useEffect(() => {
    let activeIndex = 0;

    if (Array.isArray(props.children)) {
      const matchedIndex = props.children.findIndex(
        (child) => child.props.label === selected.label
      );
      activeIndex = matchedIndex !== -1 ? matchedIndex : activeIndex;
    }

    // set matched path index, otherwise just select the first one
    setActivePathIndex(activeIndex);
  }, [props.children, selected]);

  const onTabHeaderClick =
    (e: React.MouseEvent<HTMLElement>) => (labelSyncItem: LabelSyncPair) => {
      e.preventDefault();
      e.stopPropagation();
      if (labelSyncItem.label === selected.label) {
        return;
      }
      setSelected(labelSyncItem);
      if (labelSyncItem.syncWith) {
        updateSelectedPath(labelSyncItem.syncWith);
      } // if no syncWith, do nothing
    };

  return (
    <ComponentWrapper>
      <SelectorsContainer role="tablist">
        <Spacings.Inline alignItems="flex-end">
          {labelSyncItems.map((labelSyncItem, index) => (
            <TabHeader
              index={index}
              key={labelSyncItem.label}
              label={labelSyncItem.label}
              isActive={labelSyncItem.label === selected.label}
              onClick={(e) => onTabHeaderClick(e)(labelSyncItem)}
            />
          ))}
        </Spacings.Inline>
      </SelectorsContainer>
      <PathsContainer>
        <TabContentChildren activePathIndex={activePathIndex}>
          {props.children}
        </TabContentChildren>
      </PathsContainer>
    </ComponentWrapper>
  );
};

type PathBlockProps = LabelSyncPair & {
  children: ReactNode;
};

export const PathBlock = (props: PathBlockProps) => {
  return <div>{props.children}</div>;
};

export default MultiPathBlock;
