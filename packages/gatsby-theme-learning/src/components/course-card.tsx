import { ReactNode } from 'react';
import { Link } from 'gatsby';
import {
  Markdown,
  markdownFragmentToReact,
  cardElements,
  designSystem,
} from '@commercetools-docs/ui-kit';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ClockIcon, CheckActiveIcon } from '@commercetools-uikit/icons';
import Stamp from '@commercetools-uikit/stamp';

const { CardContainer, StackContainer, InlineContainer, BodyContainer } =
  cardElements;

const StyledLink = styled.a`
  &,
  > code {
    color: ${designSystem.colors.light.link};
    text-decoration: none;
    :active,
    :focus,
    :hover {
      color: ${designSystem.colors.light.link};
    }
  }
`;

const GatsbyRouterLink = StyledLink.withComponent(Link);

const Title = styled.h6`
  color: ${designSystem.colors.light.link};
  font-size: 14px;
  font-weight: ${designSystem.typography.fontWeights.medium};
  letter-spacing: 0;
`;

export const IconWithTextContainer = styled.div`
  width: 50%;
  min-width: 18px;
  height: 18px;

  svg {
    display: inline-block;
  }
  p {
    margin-left: ${designSystem.dimensions.spacings.xs};
    font-size: 12px;
    color: ${designSystem.colors.light.textPrimary};
    display: inline-block;
  }
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
        font-size: 12px;
      `}
    >
      <Markdown.TypographyContainer>
        {props.children}
      </Markdown.TypographyContainer>
    </div>
  );
};

type CourseCardProps = {
  title: string;
  href: string;
  courseId: number;
  children: ReactNode;
  duration: string;
};

const CourseCard = (props: CourseCardProps) => (
  <CardContainer {...props}>
    <GatsbyRouterLink to={props.href}>
      <StackContainer>
        <InlineContainer>
          <StackContainer scale="s">
            <Title>{props.title}</Title>
            <BodyContainer>
              <BodyContent>{props.children}</BodyContent>
            </BodyContainer>
            <IconWithTextContainer>
              <ClockIcon />
              <p>{props.duration}</p>
            </IconWithTextContainer>
            <div>
              <Stamp
                tone="primary"
                isCondensed
                icon={<CheckActiveIcon />}
                label="Completed"
              />
            </div>
          </StackContainer>
        </InlineContainer>
      </StackContainer>
    </GatsbyRouterLink>
  </CardContainer>
);

export default CourseCard;
