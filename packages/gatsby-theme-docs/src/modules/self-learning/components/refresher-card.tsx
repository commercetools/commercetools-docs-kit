import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import {
  Markdown,
  markdownFragmentToReact,
  cardElements,
  designSystem,
} from '@commercetools-docs/ui-kit';
import { IconWithTextContainer, CardBottomContainer } from './course-card';
import { StackIcon } from '@commercetools-uikit/icons';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { navigate } from 'gatsby';

const { CardContainer, StackContainer, InlineContainer, BodyContainer } =
  cardElements;

type RefresherCardProps = {
  title: string;
  productName: string;
  href: string;
  children: ReactNode;
};

const Title = styled.h4`
  color: ${designSystem.colors.light.textPrimary};
  font-size: ${designSystem.typography.fontSizes.h4};
  font-weight: ${designSystem.typography.fontWeights.medium};
  letter-spacing: 0;
`;

type BodyContentProps = {
  children: ReactNode;
};

const BodyContent = (props: BodyContentProps) => {
  return (
    <div
      css={css`
        font-size: ${designSystem.typography.fontSizes.small};
      `}
    >
      {typeof props.children === 'string' ? (
        <Markdown.TypographyContainer>
          {markdownFragmentToReact(props.children)}
        </Markdown.TypographyContainer>
      ) : (
        props.children
      )}
    </div>
  );
};

const RefresherCard = (props: RefresherCardProps) => {
  return (
    <CardContainer {...props}>
      <StackContainer>
        <InlineContainer>
          <StackContainer scale="m">
            <Title>{props.title}</Title>
            <BodyContainer>
              <BodyContent>{props.children}</BodyContent>
            </BodyContainer>
            <CardBottomContainer separator>
              <IconWithTextContainer textSize="large">
                <StackIcon />
                <p>{props.productName}</p>
              </IconWithTextContainer>
              <IconWithTextContainer textSize="large">
                <PrimaryButton
                  label="Start"
                  onClick={() => navigate(props.href)}
                />
              </IconWithTextContainer>
            </CardBottomContainer>
          </StackContainer>
        </InlineContainer>
      </StackContainer>
    </CardContainer>
  );
};

export default RefresherCard;
