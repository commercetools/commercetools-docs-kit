import { Icons, designSystem } from '@commercetools-docs/ui-kit';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

const FeedbackContainer = styled.div`
  border: 1px solid ${designSystem.colors.light.surfaceSecondary2};
  background-color: ${designSystem.colors.light.surfacePrimary};
  padding: 22px;
`;

const FeedBackContent = styled.div`
  display: flex;
  align-items: center;
  font-size: ${designSystem.typography.fontSizes.small} !important;
  font-weight: ${designSystem.typography.fontWeights.regular};
  & svg {
    margin-right: 10px;
  }
  & a {
    font-size: 14px;
    color: ${designSystem.colors.light.link};
    text-decoration: none;
    :hover {
      color: ${designSystem.colors.light.linkHover};
    }
  }
`;

const TopMenuFeedbackBanner = () => {
  return (
    <FeedbackContainer>
      <FeedBackContent>
        <Icons.CtLogoSvgIcon height={24} width={24} />
        <div css={{ display: 'flex', flexDirection: 'column' }}>
          <p>We want your feedback</p>
          <Link
            href="#"
            nounderline
            css={css`
              font-size: ${designSystem.typography.fontSizes.extraSmall};
            `}
          >
            Join our user research program
          </Link>
        </div>
      </FeedBackContent>
    </FeedbackContainer>
  );
};

export default TopMenuFeedbackBanner;
