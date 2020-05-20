import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import css from '@emotion/css';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { designSystem } from '@commercetools-docs/ui-kit';
import markdownFragmentToReact from '../utils/markdown-fragment-to-react';
import Link from './link';

// todo: parse markdown fragment of body, markdownFragmentToReact currently not working as expected
// todo: if card is clickable, render all links in body as span

const flatStyle = css`
  border: 1px solid ${designSystem.colors.light.borderSecondary};
`;
const clickableStyle = css`
  cursor: pointer;
  box-shadow: ${designSystem.tokens.shadowForClickableCard};
  :hover {
    box-shadow: ${designSystem.tokens.shadowForClickableCardOnHover};
  }
  transition: box-shadow 0.3s ease-in-out;
`;
const Container = styled.li`
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
  color: ${designSystem.colors.light.textPrimary};
  font-weight: ${designSystem.typography.fontWeights.medium};
  letter-spacing: 0;
`;
const Body = styled.div`
  color: ${designSystem.colors.light.textPrimary};
`;
const ReadMore = styled.div`
  border-top: 1px solid ${designSystem.colors.light.borderSecondary};
  padding-top: ${designSystem.dimensions.spacings.m};
`;

const Card = (props) => {
  return (
    <Container {...props}>
      {props.clickable && props.href ? (
        <Link href={props.href} noUnderline>
          {renderNarrowOrWideCard()}
        </Link>
      ) : (
        renderNarrowOrWideCard()
      )}
    </Container>
  );

  function renderNarrowOrWideCard() {
    return props.narrow ? (
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
          <Title smallTitle={props.smallTitle}>{props.title}</Title>
          <Body>{markdownFragmentToReact(props.children)}</Body>
          {props.href && props.textLink && (
            <ReadMore>
              {props.clickable ? (
                props.textLink
              ) : (
                <Link href={props.href} noUnderline>
                  {props.textLink}
                </Link>
              )}
            </ReadMore>
          )}
        </SpacingsStack>
      </>
    );
  }
};

Card.propTypes = {
  clickable: PropTypes.bool,
  narrow: PropTypes.bool,
  smallTitle: PropTypes.bool,
  title: PropTypes.string,
  href: PropTypes.string,
  textLink: PropTypes.string,
  icon: PropTypes.element,
  children: PropTypes.string.isRequired,
};

export default Card;
