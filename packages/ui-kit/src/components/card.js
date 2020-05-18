import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import css from '@emotion/css';
import SpacingsStack from '@commercetools-uikit/spacings-stack';

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
`;

const Card = (props) => {
  /**
   * todo: if clackable
   * - check for href, throw error if not present
   * - listen for onclick event
   */
  /**
   * todo: use gatsbylink and styled link ('./link') to render links
   */
  return (
    <CardContainer {...props[0]}>
      <SpacingsStack>
        <Title {...props[0]}>{props.title}</Title>
        <div>{props.children}</div>
        {props.href && props.textLink && <ReadMore>{props.textLink}</ReadMore>}
      </SpacingsStack>
    </CardContainer>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  textLink: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default Card;
