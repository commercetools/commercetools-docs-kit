import React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import { designSystem } from '@commercetools-docs/ui-kit';
import ctLogo from '../../static/ct-logo.png';
import Link from './link';

const Banner = styled.div`
  div {
    border-top: 1px solid ${designSystem.colors.light.borderHighlight};
  }
  img {
    margin: 4px 0 0 -4px;
  }
  p {
    font-size: ${designSystem.typography.fontSizes.small};
  }
`;

const UserResearchBanner = () => {
  return (
    <Banner>
      <div>
        <img width="22px" height="22px" src={ctLogo}></img>
        <p>We want your feedback</p>
        <Link
          href={'https://ok.commercetools.com/user-research-program'}
          noUnderline
          css={css`
            font-size: ${designSystem.typography.fontSizes.extraSmall};
          `}
        >
          Join our user Research Program
        </Link>
      </div>
    </Banner>
  );
};

export default UserResearchBanner;
