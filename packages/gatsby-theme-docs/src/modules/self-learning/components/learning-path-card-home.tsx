import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import {
  Markdown,
  markdownFragmentToReact,
  cardElements,
  designSystem,
  LordIcon,
} from '@commercetools-docs/ui-kit';
import { CardBottomContainer } from './course-card';
import {
  ClockIcon,
  GraduationCapIcon,
  StackIcon,
} from '@commercetools-uikit/icons';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { navigate } from 'gatsby';

const { InlineContainer } = cardElements;

type LearningPathCardProp = {
  title: string;
  icon: string;
  duration: string;
  productName: string;
  href: string;
  children: ReactNode;
};

export const StackContainer = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
`;

const Title = styled.h4`
  color: ${designSystem.colors.light.textPrimary};
  font-size: ${designSystem.typography.fontSizes.h4};
  font-weight: ${designSystem.typography.fontWeights.medium};
  letter-spacing: 0;
  margin-bottom: 10px;
`;

type BodyContentProps = {
  children: ReactNode;
};

const LeftBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${designSystem.dimensions.spacings.s};
`;

const RightBottomContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

type IconWithTextContainerProps = {
  textSize?: string;
};

export const BodyContainer = styled.div`
  color: ${designSystem.colors.light.textPrimary};
  display: flex;
  flex-direction: row;
`;

export const IconWithTextContainer = styled.div<IconWithTextContainerProps>`
  min-width: 18px;

  svg {
    display: inline-block;
  }
  p {
    margin-left: ${designSystem.dimensions.spacings.xs};
    font-size: ${(props) => (props.textSize === 'large' ? '14px' : '12px')};
    color: ${designSystem.colors.light.textPrimary};
    display: inline-block;
  }
`;

const BodyContent = (props: BodyContentProps) => {
  return (
    <div
      css={css`
        font-size: ${designSystem.typography.fontSizes.small};
        line-height: ${designSystem.typography.lineHeights.body};
        margin-bottom: 10px;
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

export const CardContainer = styled.li`
  width: 343px;
  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    width: 400px;
  }

  display: block;
  background-color: ${designSystem.colors.light.surfacePrimary};
  padding: ${designSystem.dimensions.spacings.m};
  border-radius: ${designSystem.tokens.borderRadiusForCard};
  list-style: none;
`;

const BodyIcon = styled.div`
  align-items: center;
  display: none;
  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    display: flex;
  }
`;

const LearningPathCardHome = (props: LearningPathCardProp) => {
  return (
    <CardContainer {...props}>
      <StackContainer>
        <InlineContainer>
          <StackContainer>
            <BodyContainer>
              <BodyContent>
                <Title>{props.title}</Title>
                {props.children}
              </BodyContent>
              <BodyIcon>
                <LordIcon
                  iconName={props.icon}
                  trigger="hover"
                  height="96"
                  width="96"
                />
              </BodyIcon>
            </BodyContainer>

            <CardBottomContainer separator>
              <LeftBottomContainer>
                <IconWithTextContainer textSize="large">
                  <ClockIcon />
                  <p>{props.duration}</p>
                </IconWithTextContainer>
                <IconWithTextContainer textSize="large">
                  <StackIcon />
                  <p>{props.productName}</p>
                </IconWithTextContainer>
              </LeftBottomContainer>
              <RightBottomContainer>
                <PrimaryButton
                  label="Start"
                  onClick={() => navigate(props.href)}
                />
              </RightBottomContainer>
            </CardBottomContainer>
          </StackContainer>
        </InlineContainer>
      </StackContainer>
    </CardContainer>
  );
};

export default LearningPathCardHome;
