import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import css from '@emotion/css';

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

const Card = (props) => {
  /**
   * todo: if clackable
   * - check for href, throw error if not present
   * - listen for onclick event
   */
  return <CardContainer {...props[0]}>{props.children}</CardContainer>;
};

Card.propTypes = {
  children: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default Card;
