import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { dimensions } from '../design-system';

type MediaQueryProps = {
  forViewport?: string;
  hideIfMatch?: boolean;
};

const MediaQuery = styled.div<MediaQueryProps>`
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
      case 'largeTablet':
        return css`
          display: ${props.hideIfMatch ? 'block' : 'none'};
          @media screen and (${dimensions.viewports.largeTablet}) {
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
