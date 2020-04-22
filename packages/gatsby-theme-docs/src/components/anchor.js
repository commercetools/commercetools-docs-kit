import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const A = styled.a``;

const Anchor = (props) => <A name={props.name} />;

Anchor.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Anchor;
