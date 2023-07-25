import PropTypes from 'prop-types';
import Link from './link';
import styled from '@emotion/styled';

import { designSystem, Icons } from '@commercetools-docs/ui-kit';

const getStyles = (props) => {
  let tagBgColor; // tag background color;
  let tagFgColor; // tag foreground elements color (text/icon/borders)
  const iconSize = props.size === 'large' ? '20px' : '12px';
  switch (props.color) {
    case 'green':
      tagBgColor = designSystem.colors.light.surfaceTagGreen;
      tagFgColor = designSystem.colors.light.textSearchHeading;
      break;
    default:
      tagBgColor = designSystem.colors.light.surfaceBeta;
      tagFgColor = designSystem.colors.light.textInfo;
      break;
  }

  return { tagBgColor, tagFgColor, iconSize };
};

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: ${designSystem.tokens.borderRadiusForBetaFlag};
  color: ${(props) => props.styles.tagFgColor};
  padding: ${(props) =>
    props.hasIcon
      ? `2px ${designSystem.dimensions.spacings.xs}`
      : `3px ${designSystem.dimensions.spacings.xs}`};
  font-size: ${designSystem.typography.relativeFontSizes.superSmall};
  background-color: ${(props) => props.styles.tagBgColor};
`;

const TagContainerLarge = styled.div`
  display: flex;
  align-items: center;
  border-radius: ${designSystem.tokens.borderRadiusForBetaFlag};
  background-color: ${designSystem.colors.light.surfacePrimary};
  color: ${(props) => props.styles.tagFgColor};
  padding: ${(props) =>
    props.hasIcon
      ? `2px ${designSystem.dimensions.spacings.xs}`
      : `3px ${designSystem.dimensions.spacings.xs}`};
  font-size: ${designSystem.typography.relativeFontSizes.ultraSmall};
  border: 1px solid ${(props) => props.styles.tagFgColor};
  box-shadow: ${designSystem.tokens.shadowForBetaFlag};

  ${(props) =>
    props.hasLink &&
    `
  :active,
  :focus,
  :hover {
    background-color: ${props.styles.tagFgColor};
    box-shadow: none;
    color: ${designSystem.colors.light.textInverted} !important;
    & > span > svg {
      fill: ${designSystem.colors.light.textInverted} !important;
    }
  }
  `}
`;

const IconWrapper = styled.span`
  svg {
    position: relative;
    top: 0;
    height: ${(props) => props.styles.iconSize};
    width: ${(props) => props.styles.iconSize};
    fill: ${(props) => props.styles.tagFgColor} !important;
  }
`;

const TextWrapper = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

const TagWrapper = styled.div`
  display: inline-block;
`;

export const PlanTag = (props) => {
  const styles = getStyles(props);
  const ContainerComponent =
    props.size === 'large' ? TagContainerLarge : TagContainer;
  return (
    <TagWrapper>
      {props.href ? (
        <Link href={props.href} nounderline={true}>
          <ContainerComponent
            hasIcon={props.icon}
            styles={styles}
            title={props.overHint}
            hasLink={true}
          >
            {props.icon && (
              <IconWrapper styles={styles} hasLink={true}>
                {props.icon}
              </IconWrapper>
            )}
            <TextWrapper>{props.text}</TextWrapper>
          </ContainerComponent>
        </Link>
      ) : (
        <ContainerComponent
          hasIcon={props.icon}
          styles={styles}
          title={props.overHint}
        >
          {props.icon && (
            <IconWrapper styles={styles}>{props.icon}</IconWrapper>
          )}
          <TextWrapper>{props.text}</TextWrapper>
        </ContainerComponent>
      )}
    </TagWrapper>
  );
  // if (props.href) {
  //   return (
  //     <Link href={props.href} nounderline={true} css={getStyles(props)}>
  //       {props.text}
  //     </Link>
  //   );
  // }
  // return (
  //   <span css={getStyles(props)} title={props.overHint}>
  //     {props.icon && <IconWrapper>{props.icon}</IconWrapper>}
  //     {props.text}
  //   </span>
  // );
};

PlanTag.propTypes = {
  href: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  icon: PropTypes.element,
  // eslint-disable-next-line react/no-unused-prop-types
  color: PropTypes.string,
  overHint: PropTypes.string,
  text: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  size: PropTypes.string, // defaults to small, it can be "small" or "large"
};
