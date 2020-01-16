import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';
import SearchInput from './search-input';

const AlgoliaSearch = React.lazy(() => import('./algolia-search'));

const searchInputId = 'search-bar';

const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  display: block;

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    display: grid;
    grid:
      [row1-start] 'search-dialog-content right-blank' auto [row1-end]
      /
      minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargings},
        ${designSystem.dimensions.widths.pageContentWithMargings}
      )
      1fr;
  }
  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    grid:
      [row1-start] 'search-dialog-content right-blank' auto [row1-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargings},
        ${designSystem.dimensions.widths.pageContentWithMargings}
      )
      minmax(${designSystem.dimensions.widths.pageNavigation}, 1fr);
  }
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    grid:
      [row1-start] 'search-dialog-content right-blank' auto [row1-end]
      /
      minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargings},
        ${designSystem.dimensions.widths.pageContentWithMargings}
      )
      minmax(${designSystem.dimensions.widths.pageNavigationSmall}, 1fr);
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid:
      [row1-start] 'search-dialog-content right-blank' auto [row1-end]
      /
      ${designSystem.dimensions.widths.pageContentWithMargings}
      minmax(${designSystem.dimensions.widths.pageNavigation}, 1fr);
  }
`;
const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background-color: ${designSystem.colors.light.surfacePrimary};
  border-radius: 0 0 ${designSystem.tokens.borderRadiusForSearchDialog}
    ${designSystem.tokens.borderRadiusForSearchDialog};
  box-shadow: ${designSystem.tokens.shadowForSearchDialog};

  /* stylelint-disable declaration-block-no-duplicate-properties */
  height: 100%; /* For browsers that do not support this property yet */
  height: fit-content;
  /* stylelint-enable */

  min-height: calc(
    ${designSystem.dimensions.heights.inputSearch} +
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
const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const SearchDialog = props => {
  const ref = React.useRef();
  const { onClose } = props;
  React.useEffect(() => {
    const onKeyPress = event => {
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
      <Container>
        <RightBlank />
        <Center>
          <Content
            onClick={event => {
              // Prevent overlay to close when clicking on the content area.
              event.stopPropagation();
            }}
          >
            <React.Suspense
              fallback={<Loading>{'Initializing search...'}</Loading>}
            >
              <AlgoliaSearch searchInputId={searchInputId} ref={ref}>
                <SearchInput
                  ref={ref}
                  id={searchInputId}
                  size="scale"
                  onClose={props.onClose}
                />
              </AlgoliaSearch>
            </React.Suspense>
          </Content>
        </Center>
      </Container>
    </>
  );
};
SearchDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SearchDialog;
