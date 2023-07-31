import PropTypes from 'prop-types';
import Link from './link';
import styled from '@emotion/styled';

import { designSystem } from '@commercetools-docs/ui-kit';
import { css } from '@emotion/react';

const getStyles = (props) => {
  let tagBgColor; // tag background color;
  let tagFgColor; // tag foreground elements color (text/icon/borders)
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

  return { tagBgColor, tagFgColor };
};

const sharedContainerStyles = (props) =>
  css`
    display: inline-block;
    vertical-align: middle;
    border-radius: ${designSystem.tokens.borderRadiusForBetaFlag};
    color: ${props.styles.tagFgColor};
    font-size: ${designSystem.typography.relativeFontSizes.ultraSmall};
    font-weight: normal;
  `;

const TagContainer = styled.span`
  ${sharedContainerStyles};
  padding: 1px ${designSystem.dimensions.spacings.xs};
  background-color: ${(props) => props.styles.tagBgColor};
  span > svg {
    color: currentColor;
  }
`;

const TagContainerInverted = styled.span`
  ${sharedContainerStyles};
  padding: 1px ${designSystem.dimensions.spacings.xs} 2px
    ${designSystem.dimensions.spacings.xs};
  background-color: ${designSystem.colors.light.surfacePrimary};
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

const TagInnerContainer = styled.span`
  display: inline-block;
  svg {
    height: 1.2em;
    width: 1.2em;
    fill: ${(props) => props.styles.tagFgColor} !important;
  }
  span {
    vertical-align: middle;
  }
`;

const TagWrapper = styled.span`
  h1 &,
  h2 &,
  h3 &,
  h4 &,
  h5 &,
  h6 & {
    margin-left: 0.3em;
    vertical-align: text-bottom;
  }
  display: inline-block;
`;

export const PlanTag = (props) => {
  const styles = getStyles(props);
  const ContainerComponent = props.inverted
    ? TagContainerInverted
    : TagContainer;
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
            <TagInnerContainer styles={styles} hasLink={true}>
              {props.icon}
              <span>{props.text}</span>
            </TagInnerContainer>
          </ContainerComponent>
        </Link>
      ) : (
        <ContainerComponent
          hasIcon={props.icon}
          styles={styles}
          title={props.overHint}
        >
          <TagInnerContainer styles={styles} hasLink={true}>
            {props.icon}
            <span>{props.text}</span>
          </TagInnerContainer>
        </ContainerComponent>
      )}
    </TagWrapper>
  );
};

PlanTag.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.element,
  overHint: PropTypes.string,
  text: PropTypes.string,
  inverted: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  color: PropTypes.string,
};
