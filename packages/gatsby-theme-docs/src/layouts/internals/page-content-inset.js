import styled from '@emotion/styled';
import { dimensions } from '../../design-system';

const PageContentInset = styled.div`
  padding: ${dimensions.spacings.m} ${dimensions.spacings.m}
    ${dimensions.spacings.xl};

  > * + * {
    margin: ${dimensions.spacings.xl} 0 0;
  }

  @media screen and (${dimensions.viewports.desktop}) {
    padding: ${dimensions.spacings.m} ${dimensions.spacings.xl}
      ${dimensions.spacings.xl};
  }
`;

export default PageContentInset;
