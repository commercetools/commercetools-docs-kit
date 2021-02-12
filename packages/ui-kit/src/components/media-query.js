import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { dimensions } from '../design-system';

const MediaQuery = styled.div`
  ${(props) => {
    switch (props.forViewport) {
      case 'mobile':
        return css`
          display: ${props.hideIfMatch ? 'block' : 'none'};
          @media screen and (${dimensions.viewports.mobile}) {
            display: ${props.hideIfMatch ? 'none' : 'block'};
          }
        `;
      case 'tablet':
        return css`
          display: ${props.hideIfMatch ? 'block' : 'none'};
          @media screen and (${dimensions.viewports.tablet}) {
            display: ${props.hideIfMatch ? 'none' : 'block'};
          }
        `;
      case 'laptop':
        return css`
          display: ${props.hideIfMatch ? 'block' : 'none'};
          @media screen and (${dimensions.viewports.laptop}) {
            display: ${props.hideIfMatch ? 'none' : 'block'};
          }
        `;
      default:
        return css``;
    }
  }}
`;

export default MediaQuery;
