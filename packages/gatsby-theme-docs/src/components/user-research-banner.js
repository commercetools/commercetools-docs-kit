import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { designSystem, Icons } from '@commercetools-docs/ui-kit';
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
        <Icons.CtLogoSvgIcon width={20} />
      </div>
      <p>We want your feedback</p>
      <Link
        href="https://ok.commercetools.com/user-research-program"
        nounderline
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
