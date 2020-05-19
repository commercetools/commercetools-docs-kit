import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import css from '@emotion/css';
import { navigate } from '@reach/router';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { designSystem } from '@commercetools-docs/ui-kit';
import Link from './link';

const flatStyle = css`
  border: 1px solid ${designSystem.colors.light.borderSecondary};
`;
const clickableStyle = css`
  cursor: pointer;
  box-shadow: ${designSystem.tokens.shadowForClickableCard};
`;
const Container = styled.div`
  ${(props) => (props.clickable ? clickableStyle : flatStyle)};
  background-color: ${designSystem.colors.light.surfacePrimary};
  padding: ${designSystem.dimensions.spacings.m};
  border-radius: ${designSystem.tokens.borderRadiusForCard};
`;
const Icon = styled.div`
  width: ${designSystem.dimensions.spacings.big};
  min-width: ${designSystem.dimensions.spacings.big};
  height: ${designSystem.dimensions.spacings.big};

  svg {
    width: 100%;
    height: 100%;
  }
`;
const normalTitle = css`
  font-size: ${designSystem.typography.fontSizes.h3};
  line-height: ${designSystem.typography.lineHeights.cardNormalTitle};
`;
const smallTitle = css`
  font-size: ${designSystem.typography.fontSizes.h4};
  line-height: ${designSystem.typography.lineHeights.cardSmallTitle};
`;
const Title = styled.h6`
  ${(props) => (props.smallTitle ? smallTitle : normalTitle)};
  font-weight: ${designSystem.typography.fontWeights.medium};
  letter-spacing: 0;
`;
const ReadMore = styled.div`
  border-top: 1px solid ${designSystem.colors.light.borderSecondary};
  padding-top: ${designSystem.dimensions.spacings.m};
`;

const Card = (props) => {
  return (
    <Container
      {...props[0]}
      onClick={props[0].clickable ? handleClick : undefined}
    >
      {props.icon ? renderCardContentWithIconLayout() : renderCardContent()}
    </Container>
  );

  function handleClick(e) {
    e.preventDefault();
    navigate(props.href);
  }

  function renderCardContentWithIconLayout() {
    return props[0].narrow ? (
      <SpacingsStack scale="m">{renderCardContent()}</SpacingsStack>
    ) : (
      <SpacingsInline scale="m">{renderCardContent()}</SpacingsInline>
    );
  }

  function renderCardContent() {
    return (
      <>
        {props.icon && <Icon>{props.icon}</Icon>}

        <SpacingsStack>
          <Title {...props[0]}>{props.title}</Title>
          <div>{props.children}</div>
          {props.href && props.textLink && (
            <ReadMore>
              <Link href={props.href} noUnderline>
                {props.textLink}
              </Link>
            </ReadMore>
          )}
        </SpacingsStack>
      </>
    );
  }
};

Card.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  textLink: PropTypes.string,
  icon: PropTypes.element,
  children: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default Card;
