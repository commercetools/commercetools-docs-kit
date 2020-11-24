import React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import { designSystem } from '@commercetools-docs/ui-kit';
import LogoSVG from '../icons/ct-logo.svg';
import Link from './link';

const Banner = styled.div`
  border-top: 1px solid ${designSystem.colors.light.borderHighlight};
  p {
    font-size: ${designSystem.typography.fontSizes.small};
  }
`;

const UserResearchBanner = () => {
  return (
    <Banner>
      <div
        css={css`
          padding: ${designSystem.dimensions.spacings.s} 0
            ${designSystem.dimensions.spacings.xs} 0;
        `}
      >
        <LogoSVG />
      </div>
      <p>We want your feedback</p>
      <Link
        href="https://ok.commercetools.com/user-research-program"
        noUnderline
        css={css`
          font-size: ${designSystem.typography.fontSizes.extraSmall};
        `}
      >
        Join our User Research Program
      </Link>
    </Banner>
  );
};

export default UserResearchBanner;
