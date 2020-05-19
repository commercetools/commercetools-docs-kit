import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import css from '@emotion/css';
import { navigate } from '@reach/router';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import Link from './link';

const flatStyle = css`
  border: 1px solid #cccccc;
`;
const clickableStyle = css`
  cursor: pointer;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.24),
    -1px 1px 3px 0 rgba(0, 0, 0, 0.12);
`;
const CardContainer = styled.div`
  ${(props) => (props.clickable ? clickableStyle : flatStyle)};
  background-color: #ffffff;
  padding: 16px;
  border-radius: 6px;
`;
const Icon = styled.div`
  width: 48px;
  min-width: 48px;
  height: 48px;

  svg {
    width: 100%;
    height: 100%;
  }
`;
const normalTitle = css`
  font-size: 24px;
  line-height: 32px;
`;
const smallTitle = css`
  font-size: 20px;
  line-height: 26px;
`;
const Title = styled.h6`
  ${(props) => (props.smallTitle ? smallTitle : normalTitle)};
  font-weight: 500;
  letter-spacing: 0;
`;
const ReadMore = styled.div`
  border-top: 1px solid #cccccc;
  padding-top: 16px;
`;

const Card = (props) => {
  return (
    <CardContainer
      {...props[0]}
      onClick={props[0].clickable ? handleClick : undefined}
    >
      {props.icon ? renderCardContentWithIconLayout() : renderCardContent()}
    </CardContainer>
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
