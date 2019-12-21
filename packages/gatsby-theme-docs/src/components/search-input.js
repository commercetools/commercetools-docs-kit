import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { designSystem, createStyledIcon } from '@commercetools-docs/ui-kit';
import UnstyledSearchIcon from '../icons/search.svg';
import UnstyledSlashIcon from '../icons/slash.svg';

const SearchIcon = createStyledIcon(UnstyledSearchIcon);

const Container = styled.div`
  position: relative;
  width: 100%;
`;
const Input = styled.input`
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
  width: ${props =>
    props.size === 'small'
      ? designSystem.dimensions.widths.searchBarSmall
      : '100%'};
  &::placeholder {
    color: ${designSystem.colors.light.textFaded};
  }
  &:active,
  &:focus {
    border-color: ${designSystem.colors.light.borderHighlight};
    padding-right: ${designSystem.dimensions.spacings.xs};
  }
`;
const SearchInputIcon = styled.span`
  position: absolute;
  z-index: 1;
  top: ${designSystem.dimensions.spacings.s};
  width: ${designSystem.dimensions.spacings.l};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${props => `${props.position}: ${designSystem.dimensions.spacings.xs};`}
`;

const SearchInput = React.forwardRef((props, ref) => {
  const { onFocus } = props;
  const [isActive, setIsActive] = React.useState(false);
  const handleFocus = event => {
    if (onFocus) onFocus(event);
    setIsActive(true);
  };
  const handleBlur = () => {
    setIsActive(false);
  };
  React.useEffect(() => {
    const onKeyPress = event => {
      // Listen to "slash" key events to focus the search input
      if (event.key === '/') {
        if (onFocus) onFocus(event);
        else setIsActive(true);
      }
    };
    window.addEventListener('keyup', onKeyPress);
    return () => {
      window.removeEventListener('keyup', onKeyPress);
    };
  }, [onFocus]);
  return (
    <Container>
      <SearchInputIcon position="left">
        <SearchIcon size="medium" />
      </SearchInputIcon>
      <SearchInputIcon position="right" hidden={isActive}>
        <UnstyledSlashIcon height={16} />
      </SearchInputIcon>
      <Input
        ref={ref}
        key={props.id}
        id={props.id}
        type="search"
        placeholder="Search"
        aria-label="Search"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </Container>
  );
});
SearchInput.displayName = 'SearchInput';
SearchInput.propTypes = {
  id: PropTypes.string,
  size: PropTypes.oneOf(['small', 'scale']).isRequired,
  onFocus: PropTypes.func,
};

export default SearchInput;
