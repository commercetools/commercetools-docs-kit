import React from 'react';
import { css, Global } from '@emotion/core';
import styled from '@emotion/styled';
import { designSystem, createStyledIcon } from '@commercetools-docs/ui-kit';
import UnstyledSearchIcon from '../icons/search.svg';
import UnstyledSlashIcon from '../icons/slash.svg';

const SearchIcon = createStyledIcon(UnstyledSearchIcon);

const algoliaStyles = css`
  .algolia-docsearch-suggestion--highlight {
    color: ${designSystem.colors.light.textInfo};
  }

  .algolia-autocomplete .ds-dropdown-menu {
    font-size: ${designSystem.typography.fontSizes.body};
    box-shadow: ${designSystem.tokens.shadow4};
    border-radius: ${designSystem.tokens.borderRadius6};
    background: ${designSystem.colors.light.surfacePrimary};
    text-align: left;
    padding: 0 ${designSystem.dimensions.spacings.m};
    margin: ${designSystem.dimensions.spacings.xs} 0 0;
    position: relative;
    right: 0 !important;
    left: inherit !important;
    overflow: auto;
    border: ${designSystem.dimensions.spacings.m} solid
      ${designSystem.colors.light.surfacePrimary};
    border-left: none;
    border-right: none;
    z-index: 999;

    /* viewport width, padding left/right, space left/right */
    width: calc(100vw - 1rem * 2 - 1rem * 2);

    /* viewport height, border top/bottom, margin top */
    max-height: calc(
      100vh - ${designSystem.dimensions.heights.header} -
        ${designSystem.dimensions.spacings.xs} - 1rem * 2
    );
  }

  @media (${designSystem.dimensions.viewports.tablet}) {
    .algolia-autocomplete .ds-dropdown-menu {
      max-height: 80vh;
      max-width: ${designSystem.dimensions.widths.pageContent};
      min-width: ${designSystem.dimensions.widths.pageContentSmall};
    }
  }

  .algolia-autocomplete .ds-dropdown-menu .ds-suggestions {
    position: relative;
    z-index: 1000;
  }

  .algolia-autocomplete .ds-dropdown-menu .ds-suggestion {
    cursor: pointer;
  }

  .algolia-autocomplete .ds-dropdown-menu [class^='ds-dataset-'] {
    position: relative;
    padding: 0;
  }

  .algolia-autocomplete .ds-dropdown-menu * {
    box-sizing: border-box;
  }

  .algolia-autocomplete .algolia-docsearch-suggestion {
    display: block;
    position: relative;
    padding: 0;
    overflow: hidden;
    text-decoration: none;
  }

  .algolia-autocomplete .ds-cursor .algolia-docsearch-suggestion--wrapper {
    background: ${designSystem.colors.light.surfaceSearchHighlight};
  }

  .algolia-autocomplete .algolia-docsearch-suggestion--highlight {
    background: ${designSystem.colors.light.surfaceInlineCode};
    border: 1px solid ${designSystem.colors.light.surfaceInfo};
    padding: 2px 0;
  }

  .algolia-autocomplete
    .algolia-docsearch-suggestion--category-header
    .algolia-docsearch-suggestion--category-header-lvl0
    .algolia-docsearch-suggestion--highlight,
  .algolia-autocomplete
    .algolia-docsearch-suggestion--category-header
    .algolia-docsearch-suggestion--category-header-lvl1
    .algolia-docsearch-suggestion--highlight {
    color: inherit;
    background: inherit;
    border: inherit;
  }

  .algolia-autocomplete .algolia-docsearch-suggestion--content {
    display: block;
    position: relative;
    padding: ${designSystem.dimensions.spacings.s} 0
      ${designSystem.dimensions.spacings.s}
      ${designSystem.dimensions.spacings.m};
    cursor: pointer;
    border-left: 1px solid ${designSystem.colors.light.borderPrimary};
  }

  .algolia-autocomplete .algolia-docsearch-suggestion--category-header {
    position: relative;
    display: none;
    border-bottom: 1px solid ${designSystem.colors.light.borderPrimary};
    color: ${designSystem.colors.light.textSearchHeading};
    margin: 0;
    padding: ${designSystem.dimensions.spacings.xs} 0;
  }

  .algolia-autocomplete .algolia-docsearch-suggestion--wrapper {
    background-color: ${designSystem.colors.light.surfacePrimary};
    width: 100%;
    margin: 0 0 ${designSystem.dimensions.spacings.s};
    display: flex;
    align-items: flex-start;
  }

  .algolia-autocomplete .algolia-docsearch-suggestion--subcategory-column {
    width: 30%;
    min-width: 30%;
    text-align: right;
    position: relative;
    padding: ${designSystem.dimensions.spacings.s}
      ${designSystem.dimensions.spacings.m}
      ${designSystem.dimensions.spacings.s} 0;
    color: transparent;
    font-size: ${designSystem.typography.fontSizes.small};
    word-wrap: break-word;
  }

  .algolia-autocomplete
    .algolia-docsearch-suggestion.algolia-docsearch-suggestion__main
    .algolia-docsearch-suggestion--category-header,
  .algolia-autocomplete
    .algolia-docsearch-suggestion.algolia-docsearch-suggestion__secondary {
    display: block;
  }

  .algolia-autocomplete
    .algolia-docsearch-suggestion--subcategory-column
    .algolia-docsearch-suggestion--highlight {
    background-color: inherit;
    border: inherit;
    color: inherit;
  }

  .algolia-autocomplete .algolia-docsearch-suggestion--subcategory-inline {
    display: none;
  }

  .algolia-autocomplete .algolia-docsearch-suggestion--title {
    color: ${designSystem.colors.light.textPrimary};
    font-size: ${designSystem.typography.fontSizes.small};
    font-weight: ${designSystem.typography.fontWeights.regular};
  }

  .algolia-autocomplete .algolia-docsearch-suggestion--text {
    display: block;
    line-height: 1.2em;
    font-size: ${designSystem.typography.fontSizes.extraSmall};
    color: ${designSystem.colors.light.textSecondary};
    padding: ${designSystem.dimensions.spacings.xs} 0 0;
  }

  .algolia-autocomplete .algolia-docsearch-suggestion--no-results {
    width: 100%;
    padding: ${designSystem.dimensions.spacings.s} 0;
    text-align: center;
    font-size: ${designSystem.typography.fontSizes.body};
    border: none;
    cursor: default;
  }

  .algolia-autocomplete
    .algolia-docsearch-suggestion--no-results
    .algolia-docsearch-suggestion--text {
    color: ${designSystem.colors.light.textPrimary};
    margin: 0;
  }

  .algolia-autocomplete .algolia-docsearch-suggestion--no-results::before {
    display: none;
  }

  .algolia-autocomplete .algolia-docsearch-suggestion code {
    background-color: ${designSystem.colors.light.surfaceInlineCode};
    border: 1px solid ${designSystem.colors.light.surfaceInfo};
    border-radius: ${designSystem.dimensions.spacings.xs};
    color: ${designSystem.colors.light.textCode};
    font-family: ${designSystem.typography.fontFamilies.code};
    font-size: ${designSystem.typography.fontSizes.small};
    padding: 0 ${designSystem.dimensions.spacings.xs};
  }

  .algolia-autocomplete
    .algolia-docsearch-suggestion
    code
    .algolia-docsearch-suggestion--highlight {
    background: none;
  }

  .algolia-autocomplete
    .algolia-docsearch-suggestion.algolia-docsearch-suggestion__secondary
    .algolia-docsearch-suggestion--subcategory-column {
    display: block;
    color: ${designSystem.colors.light.textSecondary};
  }

  .algolia-autocomplete .algolia-docsearch-footer {
    background-color: ${designSystem.colors.light.surfacePrimary};
    width: 100%;
    height: 30px;
    z-index: 2000;
    float: right;
    font-size: 0;
    line-height: 0;
  }

  .algolia-autocomplete .algolia-docsearch-footer--logo {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 18"><defs><linearGradient id="a" x1="-36.87%" x2="129.43%" y1="134.94%" y2="-27.7%"><stop stop-color="%2300AEFF" offset="0%"/><stop stop-color="%233369E7" offset="100%"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><path fill="url(%23a)" d="M59.4.02h13.3a2.37 2.37 0 0 1 2.38 2.37V15.6a2.37 2.37 0 0 1-2.38 2.36H59.4a2.37 2.37 0 0 1-2.38-2.36V2.38A2.37 2.37 0 0 1 59.4.02z"/><path fill="%23FFF" d="M66.26 4.56c-2.82 0-5.1 2.27-5.1 5.08 0 2.8 2.28 5.07 5.1 5.07 2.8 0 5.1-2.26 5.1-5.07 0-2.8-2.28-5.07-5.1-5.07zm0 8.65c-2 0-3.6-1.6-3.6-3.56 0-1.97 1.6-3.58 3.6-3.58 1.98 0 3.6 1.6 3.6 3.58a3.58 3.58 0 0 1-3.6 3.57zm0-6.4v2.66c0 .07.08.13.15.1l2.4-1.24c.04-.02.06-.1.03-.14a2.96 2.96 0 0 0-2.46-1.5c-.06 0-.1.05-.1.1zm-3.33-1.96l-.3-.3a.78.78 0 0 0-1.12 0l-.36.36a.77.77 0 0 0 0 1.1l.3.3c.05.05.13.04.17 0 .2-.25.4-.5.6-.7.23-.23.46-.43.7-.6.07-.04.07-.1.03-.16zm5-.8V3.4a.78.78 0 0 0-.78-.78h-1.83a.78.78 0 0 0-.78.78v.63c0 .07.06.12.14.1a5.74 5.74 0 0 1 1.58-.22c.52 0 1.04.07 1.54.2a.1.1 0 0 0 .13-.1z"/><path fill="%23182359" d="M102.16 13.76c0 1.46-.37 2.52-1.12 3.2-.75.67-1.9 1-3.44 1-.56 0-1.74-.1-2.67-.3l.34-1.7c.78.17 1.82.2 2.36.2.86 0 1.48-.16 1.84-.5.37-.36.55-.88.55-1.57v-.35a6.37 6.37 0 0 1-.84.3 4.15 4.15 0 0 1-1.2.17 4.5 4.5 0 0 1-1.6-.28 3.38 3.38 0 0 1-1.26-.82 3.74 3.74 0 0 1-.8-1.35c-.2-.54-.3-1.5-.3-2.2 0-.67.1-1.5.3-2.06a3.92 3.92 0 0 1 .9-1.43 4.12 4.12 0 0 1 1.45-.92 5.3 5.3 0 0 1 1.94-.37c.7 0 1.35.1 1.97.2a15.86 15.86 0 0 1 1.6.33v8.46zm-5.95-4.2c0 .9.2 1.88.6 2.3.4.4.9.62 1.53.62.34 0 .66-.05.96-.15a2.75 2.75 0 0 0 .73-.33V6.7a8.53 8.53 0 0 0-1.42-.17c-.76-.02-1.36.3-1.77.8-.4.5-.62 1.4-.62 2.23zm16.13 0c0 .72-.1 1.26-.32 1.85a4.4 4.4 0 0 1-.9 1.53c-.38.42-.85.75-1.4.98-.54.24-1.4.37-1.8.37-.43 0-1.27-.13-1.8-.36a4.1 4.1 0 0 1-1.4-.97 4.5 4.5 0 0 1-.92-1.52 5.04 5.04 0 0 1-.33-1.84c0-.72.1-1.4.32-2 .22-.6.53-1.1.92-1.5.4-.43.86-.75 1.4-.98a4.55 4.55 0 0 1 1.78-.34 4.7 4.7 0 0 1 1.8.34c.54.23 1 .55 1.4.97.38.42.68.92.9 1.5.23.6.35 1.3.35 2zm-2.2 0c0-.92-.2-1.7-.6-2.22-.38-.54-.94-.8-1.64-.8-.72 0-1.27.26-1.67.8-.4.54-.58 1.3-.58 2.22 0 .93.2 1.56.6 2.1.38.54.94.8 1.64.8s1.25-.26 1.65-.8c.4-.55.6-1.17.6-2.1zm6.97 4.7c-3.5.02-3.5-2.8-3.5-3.27L113.57.92l2.15-.34v10c0 .25 0 1.87 1.37 1.88v1.8zm3.77 0h-2.15v-9.2l2.15-.33v9.54zM119.8 3.74c.7 0 1.3-.58 1.3-1.3 0-.7-.58-1.3-1.3-1.3-.73 0-1.3.6-1.3 1.3 0 .72.58 1.3 1.3 1.3zm6.43 1c.7 0 1.3.1 1.78.27.5.18.88.42 1.17.73.28.3.5.74.6 1.18.13.46.2.95.2 1.5v5.47a25.24 25.24 0 0 1-1.5.25c-.67.1-1.42.15-2.25.15a6.83 6.83 0 0 1-1.52-.16 3.2 3.2 0 0 1-1.18-.5 2.46 2.46 0 0 1-.76-.9c-.18-.37-.27-.9-.27-1.44 0-.52.1-.85.3-1.2.2-.37.48-.67.83-.9a3.6 3.6 0 0 1 1.23-.5 7.07 7.07 0 0 1 2.2-.1l.83.16v-.35c0-.25-.03-.48-.1-.7a1.5 1.5 0 0 0-.3-.58c-.15-.18-.34-.3-.58-.4a2.54 2.54 0 0 0-.92-.17c-.5 0-.94.06-1.35.13-.4.08-.75.16-1 .25l-.27-1.74c.27-.1.67-.18 1.2-.28a9.34 9.34 0 0 1 1.65-.14zm.18 7.74c.66 0 1.15-.04 1.5-.1V10.2a5.1 5.1 0 0 0-2-.1c-.23.03-.45.1-.64.2a1.17 1.17 0 0 0-.47.38c-.13.17-.18.26-.18.52 0 .5.17.8.5.98.32.2.74.3 1.3.3zM84.1 4.8c.72 0 1.3.08 1.8.26.48.17.87.42 1.15.73.3.3.5.72.6 1.17.14.45.2.94.2 1.47v5.48a25.24 25.24 0 0 1-1.5.26c-.67.1-1.42.14-2.25.14a6.83 6.83 0 0 1-1.52-.16 3.2 3.2 0 0 1-1.18-.5 2.46 2.46 0 0 1-.76-.9c-.18-.38-.27-.9-.27-1.44 0-.53.1-.86.3-1.22.2-.36.5-.65.84-.88a3.6 3.6 0 0 1 1.24-.5 7.07 7.07 0 0 1 2.2-.1c.26.03.54.08.84.15v-.35c0-.24-.03-.48-.1-.7a1.5 1.5 0 0 0-.3-.58c-.15-.17-.34-.3-.58-.4a2.54 2.54 0 0 0-.9-.15c-.5 0-.96.05-1.37.12-.4.07-.75.15-1 .24l-.26-1.75c.27-.08.67-.17 1.18-.26a8.9 8.9 0 0 1 1.66-.15zm.2 7.73c.65 0 1.14-.04 1.48-.1v-2.17a5.1 5.1 0 0 0-1.98-.1c-.24.03-.46.1-.65.18a1.17 1.17 0 0 0-.47.4c-.12.17-.17.26-.17.52 0 .5.18.8.5.98.32.2.75.3 1.3.3zm8.68 1.74c-3.5 0-3.5-2.82-3.5-3.28L89.45.92 91.6.6v10c0 .25 0 1.87 1.38 1.88v1.8z"/><path fill="%231D3657" d="M5.03 11.03c0 .7-.26 1.24-.76 1.64-.5.4-1.2.6-2.1.6-.88 0-1.6-.14-2.17-.42v-1.2c.36.16.74.3 1.14.38.4.1.78.15 1.13.15.5 0 .88-.1 1.12-.3a.94.94 0 0 0 .35-.77.98.98 0 0 0-.33-.74c-.22-.2-.68-.44-1.37-.72-.72-.3-1.22-.62-1.52-1C.23 8.27.1 7.82.1 7.3c0-.65.22-1.17.7-1.55.46-.37 1.08-.56 1.86-.56.76 0 1.5.16 2.25.48l-.4 1.05c-.7-.3-1.32-.44-1.87-.44-.4 0-.73.08-.94.26a.9.9 0 0 0-.33.72c0 .2.04.38.12.52.08.15.22.3.42.4.2.14.55.3 1.06.52.58.24 1 .47 1.27.67.27.2.47.44.6.7.12.26.18.57.18.92zM9 13.27c-.92 0-1.64-.27-2.16-.8-.52-.55-.78-1.3-.78-2.24 0-.97.24-1.73.72-2.3.5-.54 1.15-.82 2-.82.78 0 1.4.25 1.85.72.46.48.7 1.14.7 1.97v.67H7.35c0 .58.17 1.02.46 1.33.3.3.7.47 1.24.47.36 0 .68-.04.98-.1a5.1 5.1 0 0 0 .98-.33v1.02a3.87 3.87 0 0 1-.94.32 5.72 5.72 0 0 1-1.08.1zm-.22-5.2c-.4 0-.73.12-.97.38s-.37.62-.42 1.1h2.7c0-.48-.13-.85-.36-1.1-.23-.26-.54-.38-.94-.38zm7.7 5.1l-.26-.84h-.05c-.28.36-.57.6-.86.74-.28.13-.65.2-1.1.2-.6 0-1.05-.16-1.38-.48-.32-.32-.5-.77-.5-1.34 0-.62.24-1.08.7-1.4.45-.3 1.14-.47 2.07-.5l1.02-.03V9.2c0-.37-.1-.65-.27-.84-.17-.2-.45-.28-.82-.28-.3 0-.6.04-.88.13a6.68 6.68 0 0 0-.8.33l-.4-.9a4.4 4.4 0 0 1 1.05-.4 4.86 4.86 0 0 1 1.08-.12c.76 0 1.33.18 1.7.5.4.33.6.85.6 1.56v4h-.9zm-1.9-.87c.47 0 .83-.13 1.1-.38.3-.26.43-.62.43-1.08v-.52l-.76.03c-.6.03-1.02.13-1.3.3s-.4.45-.4.82c0 .26.08.47.24.6.16.16.4.23.7.23zm7.57-5.2c.25 0 .46.03.62.06l-.12 1.18a2.38 2.38 0 0 0-.56-.06c-.5 0-.92.16-1.24.5-.3.32-.47.75-.47 1.27v3.1h-1.27V7.23h1l.16 1.05h.05c.2-.36.45-.64.77-.85a1.83 1.83 0 0 1 1.02-.3zm4.12 6.17c-.9 0-1.58-.27-2.05-.8-.47-.52-.7-1.27-.7-2.25 0-1 .24-1.77.73-2.3.5-.54 1.2-.8 2.12-.8.63 0 1.2.1 1.7.34l-.4 1c-.52-.2-.96-.3-1.3-.3-1.04 0-1.55.68-1.55 2.05 0 .67.13 1.17.38 1.5.26.34.64.5 1.13.5a3.23 3.23 0 0 0 1.6-.4v1.1a2.53 2.53 0 0 1-.73.28 4.36 4.36 0 0 1-.93.08zm8.28-.1h-1.27V9.5c0-.45-.1-.8-.28-1.02-.18-.23-.47-.34-.88-.34-.53 0-.9.16-1.16.48-.25.3-.38.85-.38 1.6v2.94h-1.26V4.8h1.26v2.12c0 .34-.02.7-.06 1.1h.08a1.76 1.76 0 0 1 .72-.67c.3-.16.66-.24 1.07-.24 1.43 0 2.15.74 2.15 2.2v3.86zM42.2 7.1c.74 0 1.32.28 1.73.82.4.53.62 1.3.62 2.26 0 .97-.2 1.73-.63 2.27-.42.54-1 .82-1.75.82s-1.33-.27-1.75-.8h-.08l-.23.7h-.94V4.8h1.26v2l-.02.64-.03.56h.05c.4-.6 1-.9 1.78-.9zm-.33 1.04c-.5 0-.88.15-1.1.45-.22.3-.34.8-.35 1.5v.08c0 .72.12 1.24.35 1.57.23.32.6.48 1.12.48.44 0 .78-.17 1-.53.24-.35.36-.87.36-1.53 0-1.35-.47-2.03-1.4-2.03zm3.24-.92h1.4l1.2 3.37c.18.47.3.92.36 1.34h.04l.18-.72 1.37-4H51l-2.53 6.73c-.46 1.23-1.23 1.85-2.3 1.85-.3 0-.56-.03-.83-.1v-1c.2.05.4.08.65.08.6 0 1.03-.36 1.28-1.06l.22-.56-2.4-5.94z"/></g></svg>');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    overflow: hidden;
    text-indent: -9000px;
    width: 110px;
    height: 100%;
    display: block;
    margin-left: auto;
    margin-right: 5px;
  }
`;

const SearchInput = styled.input`
  appearance: none;
  background-color: ${designSystem.colors.light.surfacePrimary};
  border: 1px solid ${designSystem.colors.light.borderInput};
  border-radius: ${designSystem.tokens.borderRadius6};
  box-shadow: none;
  box-sizing: border-box;
  color: ${designSystem.colors.light.textPrimary};
  display: flex;
  flex: 1;
  font-family: inherit;
  font-size: ${designSystem.typography.fontSizes.small};
  height: ${designSystem.dimensions.heights.inputSearch};
  min-height: ${designSystem.dimensions.heights.inputSearch};
  outline: none;
  overflow: hidden;
  padding: 0
    calc(
      ${designSystem.dimensions.spacings.l} +
        ${designSystem.dimensions.spacings.xs}
    );
  width: ${designSystem.dimensions.widths.searchBar};
  &::placeholder {
    color: ${designSystem.colors.light.textFaded};
  }
  &:active,
  &:focus {
    border-color: ${designSystem.colors.light.borderHighlight};
    padding-right: ${designSystem.dimensions.spacings.xs};
  }

  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    width: ${designSystem.dimensions.widths.searchBarSmall};
  }
`;
const SearchInputIcon = styled.span`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  width: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${props => `${props.position}: ${designSystem.dimensions.spacings.xs};`}
`;

const SearchBar = () => {
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [isActive, setIsActive] = React.useState(false);
  const searchBarRef = React.useRef(null);

  React.useEffect(() => {
    // https://github.com/algolia/docsearch/issues/352
    const isClient = typeof window !== 'undefined';
    if (isClient) {
      import('docsearch.js').then(({ default: docsearch }) => {
        docsearch({
          apiKey: '6643ae30b54ef6784e4baaf9c8dbde07',
          indexName: 'commercetools',
          inputSelector: '#search-bar',
          bindKeyboardShortcuts: false,
          debug: process.env.NODE_ENV !== 'production',
          algoliaOptions: {
            hitsPerPage: 20,
          },
        });
      });
    } else {
      console.warn('Search has failed to load and now is being disabled');
      setIsEnabled(false);
    }
  }, []);

  React.useEffect(() => {
    const onKeyPress = event => {
      // Listen to "slash" key events to focus the search input
      if (event.key === '/') {
        searchBarRef.current.focus();
        setIsActive(true);
      }
    };
    window.addEventListener('keyup', onKeyPress);
    return () => {
      window.removeEventListener('keyup', onKeyPress);
    };
  });

  const handleFocus = event => {
    if (!searchBarRef.current.contains(event.target)) {
      searchBarRef.current.focus();
    }
    setIsActive(true);
  };
  const handleBlur = () => {
    setIsActive(false);
  };

  if (!isEnabled) {
    return null;
  }
  return (
    <div>
      <Global styles={algoliaStyles} />
      <div
        css={css`
          position: relative;
        `}
      >
        <SearchInputIcon position="left">
          <SearchIcon size="medium" />
        </SearchInputIcon>
        <SearchInputIcon position="right" hidden={isActive}>
          <UnstyledSlashIcon height={16} />
        </SearchInputIcon>
        <SearchInput
          id="search-bar"
          type="search"
          placeholder="Search"
          aria-label="Search"
          disabled={!isEnabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={searchBarRef}
        />
      </div>
    </div>
  );
};

export default SearchBar;
