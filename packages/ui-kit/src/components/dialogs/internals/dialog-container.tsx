import React from 'react';
import type { ReactNode, SyntheticEvent, ComponentType } from 'react';
import { css, ClassNames } from '@emotion/react';
import styled from '@emotion/styled';
import Modal, { type Props as ModalProps } from 'react-modal';
import Card from '@commercetools-uikit/card';
import { getOverlayStyles, getModalContentStyles } from './dialog.styles';
const isBrowser = typeof window !== 'undefined';

// https://github.com/reactjs/react-modal/issues/960
const ModalSafe = Modal as ComponentType<ReactModal['props']>;

const getDefaultParentSelector = () =>
  isBrowser
    ? (document.querySelector<HTMLElement>(`#portals-container`) as HTMLElement)
    : (null as unknown as HTMLElement);

const getOverlayElement: ModalProps['overlayElement'] = (
  props,
  contentElement
) => (
  // Assign the `data-role` to the overlay container, which is used as
  // the CSS selector in the `<PortalsContainer>`.
  <div {...props} data-role="dialog-overlay">
    {contentElement as ReactNode}
  </div>
);

type Props = {
  isOpen: boolean;
  onClose?: (event: SyntheticEvent) => void;
  size: 'm' | 'l' | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 'scale';
  zIndex?: number;
  title: string;
  children: ReactNode;
  getParentSelector: typeof getDefaultParentSelector;
};
const defaultProps: Pick<Props, 'size' | 'getParentSelector'> = {
  // TODO: t-shirt sizes are deprecated but we need to keep using them for
  // backwards compatibility and to help with styling migration
  // After the migration is done, we should change this default value to 13.
  // t-shirt sizes then can be removed in a next breaking change release
  size: 'l',
  getParentSelector: getDefaultParentSelector,
};

type GridAreaProps = {
  name: string;
};
const GridArea = styled.div<GridAreaProps>`
  grid-area: ${(props) => props.name};
`;

const sizeStyles = (props: Pick<Props, 'size'>) => {
  if (props.size === 'scale')
    return css`
      height: 100%;
    `;

  return css``;
};

const DialogContainer = (props: Props) => (
  <ClassNames>
    {({ css: makeClassName }) => (
      <ModalSafe
        isOpen={props.isOpen}
        onRequestClose={props.onClose}
        shouldCloseOnOverlayClick={Boolean(props.onClose)}
        shouldCloseOnEsc={Boolean(props.onClose)}
        overlayElement={getOverlayElement}
        overlayClassName={makeClassName(getOverlayStyles(props))}
        className={makeClassName(getModalContentStyles(props))}
        contentLabel={props.title}
        parentSelector={props.getParentSelector}
        ariaHideApp={false}
      >
        <GridArea name="top" />
        <GridArea name="left" />
        <GridArea name="right" />
        <GridArea name="bottom" />
        <GridArea
          name="main"
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            overflow: hidden;
          `}
        >
          <Card
            // 1. For the min-height: https://stackoverflow.com/questions/28636832/firefox-overflow-y-not-working-with-nested-flexbox/28639686#28639686
            // 2. For the scale size, we want the card to stretch to 100% height
            // 3. For the actual "> div" container with the content, we need to use normal pointer events so that clicking on it does not close the dialog.
            css={css`
              min-height: 0;
              ${sizeStyles(props)}
              padding: 0;

              > div {
                display: flex;
                flex-direction: column;
                pointer-events: auto;
                min-height: 0;
              }
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                align-items: stretch;
                height: 100%;
                min-height: 0;
              `}
            >
              {props.children}
            </div>
          </Card>
        </GridArea>
      </ModalSafe>
    )}
  </ClassNames>
);
DialogContainer.displayName = 'DialogContainer';
DialogContainer.defaultProps = defaultProps;

export default DialogContainer;
