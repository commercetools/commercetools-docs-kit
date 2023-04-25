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
import {
  ClockIcon,
  GraduationCapIcon,
  StackIcon,
} from '@commercetools-uikit/icons';

const { CardContainer, StackContainer, InlineContainer, BodyContainer } =
  cardElements;

type LearningPathCardProp = {
  title: string;
  duration: string;
  productName: string;
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
  if (typeof props.children === 'string') {
    markdownFragmentToReact(props.children, { a: styled.span`` });
  }
  return (
    <div
      css={css`
        font-size: ${designSystem.typography.fontSizes.small};
      `}
    >
      <Markdown.TypographyContainer>
        {props.children}
      </Markdown.TypographyContainer>
    </div>
  );
};

const LearningPathCard = (props: LearningPathCardProp) => {
  return (
    <CardContainer {...props}>
      <StackContainer>
        <InlineContainer>
          <StackContainer scale="m">
            <Title>{props.title}</Title>
            <BodyContainer>
              <BodyContent>{props.children}</BodyContent>
            </BodyContainer>
            <IconWithTextContainer textSize="large">
              <ClockIcon />
              <p>{props.duration}</p>
            </IconWithTextContainer>
            <CardBottomContainer separator>
              <IconWithTextContainer textSize="large">
                <StackIcon />
                <p>{props.productName}</p>
              </IconWithTextContainer>
              <IconWithTextContainer textSize="large">
                <GraduationCapIcon />
                <p>Learning path</p>
              </IconWithTextContainer>
            </CardBottomContainer>
          </StackContainer>
        </InlineContainer>
      </StackContainer>
    </CardContainer>
  );
};

export default LearningPathCard;
