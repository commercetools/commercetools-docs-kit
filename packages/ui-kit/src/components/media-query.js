import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { dimensions } from '../design-system';

const MediaQuery = styled.div`
  ${(props) => {
    switch (props.forViewport) {
      case 'mobile':
        return css`
          display: none;
          @media screen and (${dimensions.viewports.mobile}) {
            display: block;
          }
        `;
      case 'tablet':
        return css`
          display: none;
          @media screen and (${dimensions.viewports.tablet}) {
            display: block;
          }
        `;
      default:
        return css``;
    }
  }}
`;

export default MediaQuery;
