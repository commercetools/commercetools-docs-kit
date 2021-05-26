import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import { CloseIcon } from '@commercetools-uikit/icons';
import { designSystem, createStyledIcon } from '@commercetools-docs/ui-kit';
import { SearchSvgIcon, SlashSvgIcon } from '../icons';

const SearchIcon = createStyledIcon(SearchSvgIcon);
const iconHeight = '16px';

const Container = styled.div`
  position: relative;
  width: 100%;
`;
const Input = styled.input`
  appearance: none;
  background-color: ${designSystem.colors.light.surfacePrimary};
  border: 1px solid ${designSystem.colors.light.borderInput};
  border-radius: ${designSystem.tokens.borderRadiusForSearchInput};
  box-shadow: none;
  box-sizing: border-box;
  color: ${designSystem.colors.light.textPrimary};
  display: flex;
  flex: 1;
  font-family: inherit;
  font-size: ${designSystem.typography.fontSizes.small};
  height: ${designSystem.dimensions.heights.inputSearchSecondary};
  min-height: ${designSystem.dimensions.heights.inputSearchSecondary};
  outline: none;
  overflow: hidden;
  padding: 1px
    calc(
      ${designSystem.dimensions.spacings.l} +
        ${designSystem.dimensions.spacings.xs}
    )
    0
    calc(
      ${designSystem.dimensions.spacings.l} +
        ${designSystem.dimensions.spacings.xs}
    );
  width: 100%;
  &::placeholder {
    color: ${designSystem.colors.light.textFaded};
  }
  &:active,
  &:focus:not(:disabled) {
    border-color: ${designSystem.colors.light.borderHighlight};
    padding-right: ${designSystem.dimensions.spacings.xs};
  }
`;
const SearchInputIcon = styled.span`
  position: absolute;
  z-index: ${designSystem.dimensions.stacks.base};
  top: calc(
    (${designSystem.dimensions.heights.inputSearchSecondary} - ${iconHeight}) /
      2
  );
  width: ${designSystem.dimensions.spacings.l};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${(props) => `${props.position}: ${designSystem.dimensions.spacings.xs};`}
`;

const SearchInput = React.forwardRef((props, ref) => {
  const { onFocus } = props;
  const [isActive, setIsActive] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleFocus = (event) => {
    if (props.isDisabled) return;
    if (onFocus) onFocus(event);
    setIsActive(true);
  };
  const handleBlur = () => {
    if (props.isDisabled) return;
    setIsActive(false);
  };
  React.useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    }
    const onKeyPress = (event) => {
      // Listen to "slash" key events to focus the search input
      if (event.key === '/') {
        if (onFocus) onFocus(event);
        else setIsActive(true);
      }
    };
    if (!props.isDisabled) {
      window.addEventListener('keyup', onKeyPress);
    }
    return () => {
      if (!props.isDisabled) {
        window.removeEventListener('keyup', onKeyPress);
      }
    };
  }, [onFocus, isLoading, props.isDisabled]);
  return (
    <Container>
      <SearchInputIcon position="left">
        <SearchIcon size="medium" />
      </SearchInputIcon>
      <SearchInputIcon position="right" hidden={isActive}>
        <SlashSvgIcon height={16} />
      </SearchInputIcon>
      {props.onClose && (
        <SearchInputIcon position="right">
          <SecondaryIconButton
            label="Close search dialog"
            onClick={props.onClose}
            icon={<CloseIcon size="medium" />}
          />
        </SearchInputIcon>
      )}
      <Input
        ref={ref}
        key={props.id}
        id={props.id}
        type="text"
        placeholder="Search"
        aria-label="Search"
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={props.isDisabled || isLoading}
      />
    </Container>
  );
});
SearchInput.displayName = 'SearchInput';
SearchInput.propTypes = {
  id: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  size: PropTypes.oneOf(['small', 'scale']).isRequired,
  onFocus: PropTypes.func,
  onClose: PropTypes.func,
  isDisabled: PropTypes.bool.isRequired,
};
SearchInput.defaultProps = {
  isDisabled: false,
};

export default SearchInput;
