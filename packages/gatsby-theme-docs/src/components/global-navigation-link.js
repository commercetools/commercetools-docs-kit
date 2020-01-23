import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';
import Link from './link';

const GlobalNavigationLink = styled(Link)`
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  line-height: 1.75;
  color: ${designSystem.colors.light.textPrimary} !important;
  text-decoration: none !important;

  svg {
    * {
      fill: ${designSystem.colors.light.textPrimary} !important;
    }
  }

  :hover {
    color: ${designSystem.colors.light.linkNavigation} !important;

    svg {
      * {
        fill: ${designSystem.colors.light.linkNavigation} !important;
      }
    }
  }
`;

export default GlobalNavigationLink;
