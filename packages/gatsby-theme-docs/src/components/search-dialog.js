import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { designSystem } from '@commercetools-docs/ui-kit';
import SearchInput from './search-input';
import useIsClientSide from '../hooks/use-is-client-side';

const AlgoliaSearch = React.lazy(() => import('./algolia-search'));

const searchInputId = 'search-bar';

const openDialogAnimation = keyframes`
  from { margin-top: -20%; }
  to { margin-top: 0; }
`;

const centeredContainerStyle = css`
  width: 100%;
  display: block;
  max-width: ${designSystem.dimensions.widths.pageContent};
  margin: 0 auto;
`;

const containerStyle = css`
  width: 100%;
  max-width: 100vw;
  display: block;

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    display: grid;
    grid:
      [row1-start] 'search-dialog-content right-blank' auto [row1-end]
      /
      minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargins},
        ${designSystem.dimensions.widths.pageContentWithMargins}
      )
      1fr;
  }
  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    grid:
      [row1-start] 'search-dialog-content right-blank' auto [row1-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargins},
        ${designSystem.dimensions.widths.pageContentWithMargins}
      )
      minmax(${designSystem.dimensions.widths.pageNavigation}, 1fr);
  }
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    grid:
      [row1-start] 'search-dialog-content right-blank' auto [row1-end]
      /
      minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargins},
        ${designSystem.dimensions.widths.pageContentWithMargins}
      )
      minmax(${designSystem.dimensions.widths.pageNavigationSmall}, 1fr);
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid:
      [row1-start] 'search-dialog-content right-blank' auto [row1-end]
      /
      ${designSystem.dimensions.widths.pageContentWithMargins}
      minmax(${designSystem.dimensions.widths.pageNavigation}, 1fr);
  }
`;
const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  animation: ${openDialogAnimation} 0.15s ease-out alternate;
  background-color: ${designSystem.colors.light.surfacePrimary};
  border-radius: 0 0 ${designSystem.tokens.borderRadiusForSearchDialog}
    ${designSystem.tokens.borderRadiusForSearchDialog};
  box-shadow: ${designSystem.tokens.shadowForSearchDialog};

  height: 100%; /* For browsers that do not support this property yet */
  height: -moz-fit-content;
  height: fit-content;

  min-height: calc(
    ${designSystem.dimensions.heights.inputSearchPrimary} +
      ${designSystem.dimensions.spacings.l}
  );

  margin: 0 ${designSystem.dimensions.spacings.m};
  padding: ${designSystem.dimensions.spacings.s}
    ${designSystem.dimensions.spacings.m} ${designSystem.dimensions.spacings.xl};

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    margin: 0 ${designSystem.dimensions.spacings.xl};
    padding: ${designSystem.dimensions.spacings.s}
      ${designSystem.dimensions.spacings.xl}
      ${designSystem.dimensions.spacings.xl};
  }
`;
const RightBlank = styled.div`
  grid-area: right-blank;
  display: none;

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    display: block;
  }
`;
const Center = styled.div`
  grid-area: search-dialog-content;
`;
const InputPlaceholder = () => (
  <div
    css={css`
      background-color: ${designSystem.colors.light.surfaceSecondary1};
      border: 1px solid ${designSystem.colors.light.borderInput};
      border-radius: ${designSystem.tokens.borderRadiusForSearchInput};
      display: flex;
      flex: 1;
      height: ${designSystem.dimensions.heights.inputSearchPrimary};
      min-height: ${designSystem.dimensions.heights.inputSearchPrimary};
    `}
  />
);

const SearchDialog = (props) => {
  const ref = React.useRef();
  const { onClose } = props;
  const { isClientSide } = useIsClientSide();

  React.useEffect(() => {
    const onKeyPress = (event) => {
      // Listen to "escape" key events to close the dialog
      if (event.key.toLowerCase() === 'escape') {
        onClose();
      }
    };
    window.addEventListener('keyup', onKeyPress);
    return () => {
      window.removeEventListener('keyup', onKeyPress);
    };
  }, [onClose]);

  return (
    <>
      <div css={props.centered ? centeredContainerStyle : containerStyle}>
        <RightBlank />
        <Center>
          <Content
            onClick={(event) => {
              // Prevent overlay to close when clicking on the content area.
              event.stopPropagation();
            }}
          >
            {isClientSide && (
              <React.Suspense fallback={<InputPlaceholder />}>
                <AlgoliaSearch searchInputId={searchInputId} ref={ref}>
                  <SearchInput
                    ref={ref}
                    id={searchInputId}
                    size="scale"
                    onClose={props.onClose}
                  />
                </AlgoliaSearch>
              </React.Suspense>
            )}
          </Content>
        </Center>
      </div>
    </>
  );
};
SearchDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  centered: PropTypes.bool,
};

export default SearchDialog;
