import styled from '@emotion/styled';
import React, { ReactElement, useEffect, useState } from 'react';
import { PathBlockProps } from './path-block';
import { designSystem } from '..';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import { Theme, Interpolation, css, SerializedStyles } from '@emotion/react';
import useSelectedLanguage from '../hooks/use-selected-language';

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

export const getLinkStyles = (isActive: boolean): Interpolation<Theme> => [
  css`
    font-size: ${designSystem.typography.fontSizes.h3};
    padding-top: ${designSystem.dimensions.spacings.s};
    padding-bottom: ${designSystem.dimensions.spacings.s};
    padding-left: ${designSystem.dimensions.spacings.m};
    padding-right: ${designSystem.dimensions.spacings.m};
    position: relative;
    text-align: center;
    display: inline-block;
    color: inherit;
    text-decoration: inherit;

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
      }
    `,
];

type TTabHeaderProps = {
  label: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const TabHeader = (props: TTabHeaderProps) => {
  return (
    <a
      role="tab"
      aria-selected={props.isActive}
      key={props.label}
      onClick={props.onClick}
      css={getLinkStyles(props.isActive)}
      href="."
    >
      <Text.Headline as="h3" truncate={true}>
        {props.label}
      </Text.Headline>
    </a>
  );
};

const SelectorsContainer = styled.div``;

const ActivePathContainer = styled.div`
  border: 1px solid ${designSystem.colors.light.borderPrimary};
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

  const { selectedLanguage, updateSelectedLanguage } = useSelectedLanguage();

  useEffect(() => {
    if (selectedLanguage) {
      const matchedSyncItem = labelSyncItems.find(
        (item) => item.syncWith === selectedLanguage
      );
      if (matchedSyncItem) {
        setSelected(matchedSyncItem);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage]);

  useEffect(() => {
    setActivePath(
      Array.isArray(props.children)
        ? props.children.find((child) => child.props.label === selected.label)
        : props.children
    );
  }, [props.children, selected]);

  const onTabHeaderClick =
    (e: React.MouseEvent<HTMLElement>) => (labelSyncItem: LabelSyncPair) => {
      e.preventDefault();
      e.stopPropagation();
      setSelected(labelSyncItem);
      if (labelSyncItem.syncWith) {
        updateSelectedLanguage(labelSyncItem.syncWith);
      } else {
        updateSelectedLanguage('');
      }
    };

  return (
    <div>
      <SelectorsContainer role="tablist">
        <Spacings.Inline alignItems="flex-end">
          {labelSyncItems.map((labelSyncItem) => (
            <TabHeader
              key={labelSyncItem.label}
              label={labelSyncItem.label}
              isActive={labelSyncItem.label === selected.label}
              onClick={(e) => onTabHeaderClick(e)(labelSyncItem)}
            />
          ))}
        </Spacings.Inline>
      </SelectorsContainer>
      <ActivePathContainer>{activePath}</ActivePathContainer>
    </div>
  );
};

export default MultiPathBlock;
