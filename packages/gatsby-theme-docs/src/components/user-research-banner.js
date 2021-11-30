import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { designSystem } from '@commercetools-docs/ui-kit';
import { CtLogoSvgIcon } from '../icons';
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
          padding: ${designSystem.dimensions.spacings.xs} 0;
        `}
      >
        <CtLogoSvgIcon />
      </div>
      <span>We want your feedback</span>
      <Link
        href="https://ok.commercetools.com/user-research-program"
        noUnderline
        css={css`
          font-size: ${designSystem.typography.fontSizes.extraSmall};
        `}
      >
        Join our user research program
      </Link>
    </Banner>
  );
};

export default UserResearchBanner;
