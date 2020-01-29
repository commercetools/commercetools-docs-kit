import styled from '@emotion/styled';
import { colors } from '../design-system';

const Link = styled.a`
  &,
  > code {
    color: ${colors.light.link};
    :active,
    :focus,
    :hover {
      color: ${colors.light.linkHover};
    }
  }
`;

export default Link;
